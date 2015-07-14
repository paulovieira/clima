// Prepare yourself, this is where the dirty stuff lives!
// access the database to interact with the data

var Path = require("path");
var Fs = require("fs");
var Exec = require("child_process").exec;
var Hoek = require("hoek");
var Boom = require("boom");
var Bcrypt = require("bcrypt");
var Q = require("q");
var Config = require("config");
var Rimraf = require("rimraf");
var Unzip = require('unzip');
var _ = require("underscore");
var _s = require("underscore.string");
var ChangeCase = require("change-case-keys");

var Db = require("..");
var Utils = require("../../lib/common/utils");

var internals = {};

module.exports = function(options){

    var seneca = this;

    seneca.add("role:shapes, cmd:readAll", internals.shapesReadAll);
    seneca.add("role:shapes, cmd:read",    internals.shapesRead);
    seneca.add("role:geoTables, cmd:readAll",    internals.geoTablesReadAll);
    seneca.add("role:shapes, cmd:create",  internals.shapesCreate);
    seneca.add("role:shapes, cmd:update",  internals.shapesUpdate);
    seneca.add("role:shapes, cmd:delete",  internals.shapesDelete);
};

internals.transformMap = {

    // a) properties to be maintained
    "id": "id",
    "schemaName": "schema_name",
    "tableName": "table_name",
    "srid": "srid",
    "geometryType": "geometry_type",
    "attributesInfo": "attributes_info",
    "description": "description",

    "createdAt": "created_at",

    // c) changed properties (some fields from ownerData, such as pwHash, will be deleted)
    "fileData.id": "file_data.id",
    "fileData.name": "file_data.name",
    "fileData.webPath": "file_data.web_path",

    "ownerData.id": "owner_data.id",
    "ownerData.email": "owner_data.email",
    "ownerData.firstName": "owner_data.first_name",
    "ownerData.lastName": "owner_data.last_name"

};


internals.transformMapStats = {

    // a) properties to be maintained
    "schemaName": "schema_name",
    "tableName": "table_name",
    "columnName": "column_name",
    "columnType": "column_type",
    "min": "min",
    "max": "max"
};

internals.transformMapGeoTables = {

    // a) properties to be maintained
    "schemaName": "schema_name",
    "tableName": "table_name",
};


// action handlers for read, readAll, create, update and delete
// (and possibly others); this is the place where we actually fetch the data from the database;


internals.prepareDir = function(tempDir){

    var deferred = Q.defer();
    Rimraf(tempDir, function(err){

        if(err){
            return deferred.reject(Boom.badImplementation("Temporary directory can't be created"));
        }

        Fs.mkdirSync(tempDir);
        return deferred.resolve();
    });

    return deferred.promise;
};

internals.shapesReadAll = function(args, done){

    Utils.logCallsite(Hoek.callStack()[0]);

    Db.func('shapes_read')
        .then(function(data) {

            data = args.raw === true ? data : Hoek.transform(data, internals.transformMap);
            return done(null, data);
        })
        .catch(function(err) {

            err = err.isBoom ? err : Boom.badImplementation(err.msg, err);
            return done(err);
        });
};


internals.shapesRead = function(args, done){

    Utils.logCallsite(Hoek.callStack()[0]);

    Db.func('shapes_read', JSON.stringify(args.dbQuery))
        .then(function(data) {

            if (data.length === 0) {
                throw Boom.notFound("The resource does not exist.");
            }

            data = args.raw === true ? data : Hoek.transform(data, internals.transformMap);
            return done(null, data);
        })
        .catch(function(err) {

            err = err.isBoom ? err : Boom.badImplementation(err.msg, err);
            return done(err);
        });
};


internals.geoTablesReadAll = function(args, done){

    Utils.logCallsite(Hoek.callStack()[0]);

    Db.query('select * from geo_tables')
        .then(function(data) {

            data = args.raw === true ? data : Hoek.transform(data, internals.transformMapGeoTables);
            return done(null, data);
        })
        .catch(function(err) {

            err = err.isBoom ? err : Boom.badImplementation(err.msg, err);
            return done(err);
        });
};



internals.shapesCreate = function(args, done){

    Utils.logCallsite(Hoek.callStack()[0]);

    var shapesSchema = "geo";
    var zipId        = args.payload[0]["zipId"];
    var srid         = args.payload[0]["srid"];
    var description  = args.payload[0]["description"];

    console.log("description: ", description)
    console.log("args.payload[0]: ", args.payload[0])


    var zipFile = _.findWhere(args.pre.files, {id: zipId});

    if(!zipFile){
        return done(Boom.badRequest("The zip file with the shapes does not exist in the system (wrong id?)"));
    }

    var zipName     = zipFile.name;
    var zipExtname  = Path.extname(zipName);
    var zipBasename = Path.basename(zipName, zipExtname);
    var zipPhysicalPath = zipFile.physical_path;
    var rootDir = Config.get("rootDir");

    if(zipExtname !== ".zip"){
        return done(Boom.badRequest("The file must be a zip"));
    }

    var zipFullPath = Path.join(rootDir, zipPhysicalPath, zipName);
    var tempDir     = Path.join(rootDir, zipPhysicalPath, "_extract_" + zipBasename + "_" + Utils.getRandomString());


    var shpFile = "", shpBasename = "", tableName = "";


    // step 1: delete tempDir (where the contents of the zip will be placed); if tempDir does not exists,
    // it won't do anything (err will be null); then create the dir, which will be empty for sure
    /* Possible errors in this step:
        - the directory can't be created
    */

    internals.prepareDir(tempDir)

        // step 2: extract the zip into tempDir and verify that all the necessary files are present
        /* Possible errors in this step:
            - the zip is invalid (can't be extracted)
            - the zip has more than 1 .shp file (or no .shp files)
            - the zip doesn't have the necessary files: .shp, .prj, .shx and .dbf
        */

        .then(function(){

            var deferred = Q.defer();
            Fs.createReadStream(zipFullPath)
                .pipe(Unzip.Extract({ path: tempDir }))
                .on("close", function(){

                    // the zip has been successfully extracted; now get an array 
                    // with the names of files in tempDir that have the .shp extension
                    var extractedFiles = Fs.readdirSync(tempDir);

                    var shpFiles = extractedFiles.filter(function(filename){
                        return Path.extname(filename) === ".shp";
                    });

                    if(shpFiles.length!==1){
                        return deferred.reject(Boom.badRequest("The zip must contain one .shp file (and only one)"));
                    }

                    shpFile = shpFiles[0];
                    shpBasename = Path.basename(shpFile, Path.extname(shpFile));

                    // make sure the zip file also has the other mandatory files
                    var requiredFiles = [shpBasename + ".prj", shpBasename + ".shx", shpBasename + ".dbf"];

                    if(_.intersection(extractedFiles, requiredFiles).length < requiredFiles.length){
                        return deferred.reject(Boom.badRequest("The zip must contain files with the following extensions: .shp, .prj, .shx, .dbf"));
                    }

                    return deferred.resolve();
                })
                .on("error", function(err){
                    return deferred.reject(Boom.badRequest("The zip is invalid"));
                });

            return deferred.promise;
        })

        // step 3: execute shp2pgsql

        /* Possible errors in this step:
            - in the callback for child process' exec, the err argument is not undefined
            - in the callback for child process' exec, the stdout is not as expected
            - TODO: we might have to use "-W LATIN1" (default: "UTF-8")
        */
        .then(function(){

            var deferred = Q.defer();

            // define the table name (based on the shape file basename, after being slugified)
            tableName = _s(shpBasename).slugify().replaceAll("-", "_").value();

            if(
                _.findWhere(args.pre.shapes, {table_name: tableName}) || 
                _.findWhere(args.pre.geoTables, {table_name: tableName})
            ){
                tableName = tableName + "_" + Utils.getRandomString();
            }

            // the command is:  shp2pgsql -D -I -s <srid> <path-to-shp-file>  <name-of-schema>.<name-of-the-table>   |  psql --dbname=<name-of-the-database>
            var command1 = _.template('shp2pgsql -D -I -s <%= srid %> "<%= shapePath %>" <%= schema %>.<%= tableName %>');
            var command2 = _.template('psql --dbname=<%= dbName %>');

            var command = command1({srid: srid, shapePath: Path.join(tempDir, shpFile), schema: shapesSchema, tableName: tableName}) + 
                        " | " + 
                        command2({dbName: Config.get("db.postgres.database") });

            Utils.serverLog(["shp2pgsql"], command);

            // maxBuffer specifies the largest amount of data allowed on stdout or stderr (we set to 1mb)
            Exec(command, {maxBuffer: 1024 * 1000}, function(err, stdout, stderr){

                if(err){
                    return deferred.reject(Boom.badImplementation("ChildProcess.exec error: " + err.message));
                }

                if(_s.include(stdout.toLowerCase(), "create index") && 
                    _s.include(stdout.toLowerCase(), "commit")){
                    return deferred.resolve();
                }
                else{
                    // TODO: stderr might be big (if the shape if also big)?
                    return deferred.reject(Boom.badImplementation("shp2pgsql error: " + stderr));
                }

            });

            return deferred.promise;
        })

        // step 4: execute shp2pgsql again, now with a different enconding (case the previous execution has failed)
        .catch(function(err){

            // check if we had the "Unable to convert field name to UTF-8" error
            var encodingErr = /utf/i.test(err.message);
            if(!encodingErr){
                throw err;
            }
console.log("encodingErr: ", encodingErr);
            var deferred = Q.defer();


            // the command is now:  shp2pgsql -W LATIN1 -D -I -s <srid> <path-to-shp-file>  <name-of-schema>.<name-of-the-table>   |  psql --dbname=<name-of-the-database>
            var command1 = _.template('shp2pgsql -W LATIN1 -D -I -s <%= srid %> "<%= shapePath %>" <%= schema %>.<%= tableName %>');
            var command2 = _.template('psql --dbname=<%= dbName %>');

            var command = command1({srid: srid, shapePath: Path.join(tempDir, shpFile), schema: shapesSchema, tableName: tableName}) + 
                        " | " + 
                        command2({dbName: Config.get("db.postgres.database") });

            Utils.serverLog(["shp2pgsql"], command);

            // maxBuffer specifies the largest amount of data allowed on stdout or stderr (we set to 1mb)
            Exec(command, {maxBuffer: 1024 * 1000}, function(err, stdout, stderr){

                if(err){
                    return deferred.reject(Boom.badImplementation("ChildProcess.exec error: " + err.message));
                }

                if(_s.include(stdout.toLowerCase(), "create index") && 
                    _s.include(stdout.toLowerCase(), "commit")){
                    return deferred.resolve();
                }
                else{
                    // TODO: stderr might be big (if the shape if also big)?
                    return deferred.reject(Boom.badImplementation("shp2pgsql error: " + stderr));
                }

            });

            return deferred.promise;

        })

        // step 5-7: the usual
        .then(function(){

            var dbData = {
                
                schemaName: shapesSchema,
                tableName: tableName,
                srid: srid,
                description: description,
                fileId: zipId,
                ownerId: args.payload[0]["ownerId"]
            };
            ChangeCase(dbData, "underscored");

            var promise = Db.func("shapes_create", JSON.stringify(dbData));
            return promise;
        })

        .then(function(createdData) {

            if (createdData.length === 0) {
                throw Boom.badRequest("The resource could not be created.");
            }

            var createdIds = createdData.map(function(obj){ 
                return { id: obj.id }; 
            });

            var promise = Db.func("shapes_read", JSON.stringify(createdIds));
            return promise;
        })

        .then(function(data){

            if (data.length === 0) {
                throw Boom.notFound("The resource does not exist.");
            }

            data = args.raw === true ? data : Hoek.transform(data, internals.transformMap);
            return done(null, data);
        })

        .catch(function(err) {

            err = err.isBoom ? err : Boom.badImplementation(err.msg, err);
            return done(err);
        });

};


internals.shapesUpdate = function(args, done){

    Utils.logCallsite(Hoek.callStack()[0]);

    ChangeCase(args.dbQuery, "underscored");
    var ids = args.dbQuery.map(function(obj){ 
        return { id: obj.id };
    });

    // 1) read the resources to be updated (to verify that they exist)
    Db.func('shapes_read', JSON.stringify(ids))

        // 2) update the resources with the payload data
        .then(function(data) {

            if (data.length === 0) {
                throw Boom.notFound("The resource does not exist.");
            }

            // TODO: verify that data.length === args.ids.length

            return Db.func("shapes_update", JSON.stringify(args.dbQuery))
        })

        // 3) read again the updated resources (to obtain the joined data)
        .then(function(updatedData) {

            if (updatedData.length === 0) {
                throw Boom.badRequest("The resource could not be updated.");
            }

            var updatedIds = updatedData.map(function(obj){ 
                return { id: obj.id }; 
            });

            return Db.func("shapes_read", JSON.stringify(updatedIds));
        })

        // 4) apply the object transform and reply
        .then(function(data){

            if (data.length === 0) {
                throw Boom.notFound("The resource does not exist.");
            }

            data = args.raw === true ? data : Hoek.transform(data, internals.transformMap);
            return done(null, data);
        })
        .catch(function(err) {

            err = err.isBoom ? err : Boom.badImplementation(err.msg, err);
            return done(err);
        });
};


internals.shapesDelete = function(args, done){

    Utils.logCallsite(Hoek.callStack()[0]);

    Db.func('shapes_delete', JSON.stringify(args.dbQuery))
        .then(function(deletedData) {

            if (deletedData.length === 0) {
                throw Boom.notFound("The resource does not exist.");
            }

            return done(null, deletedData);
        })
        .catch(function(err) {

            err = err.isBoom ? err : Boom.badImplementation(err.msg, err);
            return done(err);
        });

};

