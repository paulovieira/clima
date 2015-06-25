// Prepare yourself, this is where the dirty stuff lives!
// access the database to interact with the data

var Path = require("path");
var Fs = require("fs");
var Hoek = require("hoek");
var Boom = require("boom");
var Bcrypt = require("bcrypt");
var Q = require("q");
var Config = require("config");
var Rimraf = require("rimraf");
var ChangeCase = require("change-case-keys");

var Db = require("..");
var Utils = require("../../lib/common/utils");

var internals = {};

module.exports = function(options){

    var seneca = this;

    seneca.add("role:shapes, cmd:readAll", internals.shapesReadAll);
    seneca.add("role:shapes, cmd:read",    internals.shapesRead);
    // seneca.add("role:shapes, cmd:create",  internals.shapesCreate);
     seneca.add("role:shapes, cmd:update",  internals.shapesUpdate);
    seneca.add("role:shapes, cmd:delete",  internals.shapesDelete);
};

internals.transformMap = {

    // a) properties to be maintained
    "id": "id",
    "code": "code",
    "srid": "srid",
    "description": "description",
    "fileId": "file_id",
    "schemaName": "schema_name",
    "ownerId": "owner_id",
    "createdAt": "created_at",

    // c) changed properties (some fields from ownerData, such as pwHash, will be deleted)
    "fileData.id": "file_data.id",
    "fileData.name": "file_data.name",
    "fileData.logical_path": "file_data.logical_path",

    "ownerData.id": "owner_data.id",
    "ownerData.email": "owner_data.email",
    "ownerData.firstName": "owner_data.first_name",
    "ownerData.lastName": "owner_data.last_name",

    "shapeColumnsData": "shape_columns_data"
};

// action handlers for read, readAll, create, update and delete
// (and possibly others); this is the place where we actually fetch the data from the database;


internals.shapesReadAll = function(args, done){

    Utils.logCallsite(Hoek.callStack()[0]);

    Db.func('shapes_read')
        .then(function(data) {

            data = args.raw === true ? data : Hoek.transform(data, internals.transformMap);
            return done(null, data);
        })
        .catch(function(err) {

            err = err.isBoom ? err : Boom.badImplementation(null, err);
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

            err = err.isBoom ? err : Boom.badImplementation(null, err);
            return done(err);
        });
};

/*
//TO BE DONE 

internals.filesCreate = function(args, done){

    Utils.logCallsite(Hoek.callStack()[0]);

    var filename     = args.payload.filename;
    var shapeCode    = args.payload.shapeCode;
    var logicalPath  = Config.get("uploads.logicalPath");
    var physicalPath = Config.get("uploads.physicalPath");
    var rootDir      = Config.get("rootDir");

    if(typeof physicalPath!=="string" || typeof filename!=="string"){
        return done(Boom.badRequest("filename and physical path must be strings"));
    }
debugger;
    var ws = Fs.createWriteStream(Path.join(rootDir, physicalPath, filename));
    args.payload.new_file.pipe(ws);

    ws.on("finish", function(){


        var dbData = {
            name: filename,
            logicalPath: logicalPath,
            physicalPath: physicalPath,
            tags: args.payload.tags,
            ownerId: args.auth.credentials.id
        };

        ChangeCase(dbData, "underscored");
        var filesRead = [];
debugger;
        // 1) create the resources with the payload data
        Db.func('files_create', JSON.stringify(dbData))

            // 2) read the created resources (to obtain the joined data)
            .then(function(createdData) {
debugger;
                if (createdData.length === 0) {
                    throw Boom.badRequest("The resource could not be created.");
                }

                var createdIds = createdData.map(function(obj){ 
                    return { id: obj.id }; 
                });

                return Db.func("files_read", JSON.stringify(createdIds));
            })

            .then(function(data){

                filesRead = data;

                // if the file is not a shape, return to the next fn in the chain
                if(shapeCode===""){ return; }
            })

            .then(function(){
                // if the file is not a shape, return to the next fn in the chain
                if(shapeCode===""){ return; }
            })

            // 3) apply the object transform and reply
            .then(function(){
debugger;
                if (filesRead.length === 0) {
                    throw Boom.notFound("The resource does not exist.");
                }

                filesRead = args.raw === true ? filesRead : Hoek.transform(filesRead, internals.transformMap);
                return done(null, filesRead);
            })
            .catch(function(err) {
debugger;
                err = err.isBoom ? err : Boom.badImplementation(null, err);
                return done(err);
            });

    });

    ws.on("error", function(err){
        return done(Boom.badImplementation(err.message));
    });


//    return done(null, {"ok": 0})

};


*/

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

            err = err.isBoom ? err : Boom.badImplementation(null, err);
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

            err = err.isBoom ? err : Boom.badImplementation(null, err);
            return done(err);
        });

};

