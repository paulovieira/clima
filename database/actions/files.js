// Prepare yourself, this is where the dirty stuff lives!
// access the database to interact with the data

var Path = require("path");
var Fs = require("fs");
var Hoek = require("hoek");
var Wreck = require('wreck');
var Boom = require("boom");
var Bcrypt = require("bcrypt");
var Q = require("q");
var Config = require("config");
var Rimraf = require("rimraf");
var _ = require("underscore");
var _s = require("underscore.string");
var ChangeCase = require("change-case-keys");

var Db = require("..");
var Utils = require("../../lib/common/utils");

var internals = {};

module.exports = function(options){

    var seneca = this;

    seneca.add("role:files, cmd:readAll", internals.filesReadAll);
    seneca.add("role:files, cmd:read",    internals.filesRead);
    seneca.add("role:files, cmd:create",  internals.filesCreate);
    seneca.add("role:files, cmd:update",  internals.filesUpdate);
    seneca.add("role:files, cmd:delete",  internals.filesDelete);
};

internals.transformMap = {

    // a) properties to be maintained
    "id": "id",
    "name": "name",
    "webPath": "web_path",
    "tags": "tags",
    "description": "description",
    "properties":"properties",
    "uploadedAt":"uploaded_at",

    // c) changed properties (some fields from ownerData, such as pwHash, will be deleted)
    "ownerData.id": "owner_data.id",
    "ownerData.email": "owner_data.email",
    "ownerData.firstName": "owner_data.first_name",
    "ownerData.lastName": "owner_data.last_name",

    // d) deleted properties: "physicalPath"
};

// action handlers for read, readAll, create, update and delete
// (and possibly others); this is the place where we actually fetch the data from the database;


internals.filesReadAll = function(args, done){

    Utils.logCallsite(Hoek.callStack()[0]);

    Db.func('files_read')
        .then(function(data) {

            data = args.raw === true ? data : Hoek.transform(data, internals.transformMap);
            return done(null, data);
        })
        .catch(function(err) {

            err = err.isBoom ? err : Boom.badImplementation(err.msg, err);
            return done(err);
        });
};



internals.filesRead = function(args, done){

    Utils.logCallsite(Hoek.callStack()[0]);

    Db.func('files_read', JSON.stringify(args.query))
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



internals.filesCreate = function(args, done){

    Utils.logCallsite(Hoek.callStack()[0]);

    // note: filename has already been slugified in the client, but we do it here as well (it is an idempotent function)
    var filename     = args.payload.filename;
    var extname      = Path.extname(filename);
    var basename     = _s(Path.basename(filename, extname)).slugify().replaceAll("-", "_").value();

    // replace the original filename (basename has been slugified)
    filename = basename + extname;

// console.log("args.payload.isShape: ", args.payload.isShape)
// console.log("args.payload.shapeDescription: ", args.payload.shapeDescription)


    // TODO: shapeCode should be a boolean flag instead
    var fileIsShape      = args.payload.isShape === true || args.payload.isShape === "true";
    var physicalPath = Config.get("uploadsDir.relative");
    var rootDir      = Config.get("rootDir");

    // check if we already have a file with this name
    if(_.findWhere(args.pre.files, {name: filename})){
        filename = basename + "_" + Utils.getRandomString() + extname;
    }

    if(typeof physicalPath!=="string" || typeof filename!=="string"){
        return done(Boom.badRequest("filename and physical path must be strings"));
    }
debugger;
    var ws = Fs.createWriteStream(Path.join(rootDir, physicalPath, filename));
    args.payload.new_file.pipe(ws);

    ws.on("finish", function(){

        // the upload data has been sucessfully saved in disk; now add the corersponding entry in the database;
        var dbData = {
            name: filename,
            webPath: Config.get("uploadsDir.webPath"),
            physicalPath: physicalPath,
            tags: args.payload.tags,
            ownerId: args.payload.ownerId
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
                if(!fileIsShape){ return; }

                var deferred = Q.defer();

                // echo '[{ "zipId": 1013, "srid": 4326  }]' \
                //     | http -v POST clima.dev/api/v1/shapes

                var uri = "http://localhost:" + Config.get("port") + "/api/v1/shapes";
                
                // TODO: the srid is currently hardcoded
                var options = {
                    payload: JSON.stringify({zipId: filesRead[0].id, srid: 4326}),
                    headers: {
                        "content-type": "application/json"
                    },
                    json: true
                };

                Wreck.post(uri, options, function(err, response, payload){
                    if(err){
                        return deferred.reject(Boom.badImplementation("Wreck error in request to /api/shapes: " + err.message));
                    }

                    if(response.statusCode === 400){
                        return deferred.reject(Boom.badRequest("Error creating the shape: " + payload.message || JSON.stringify(payload)));   
                    }

                    if(response.statusCode === 500){
                        return deferred.reject(Boom.badImplementation("Error creating the shape: " + JSON.stringify(payload)));   
                    }
                    //console.log("response: ", response);
                    //console.log("payload: ", payload);
                    return deferred.resolve(payload);
                })
/*
                Wreck.request("POST", uri, options, function (err, res){
                    if(err){
                        return deferred.reject(Boom.badImplementation("Error in request to /api/shapes: " + err.message));
                    }

                    Wreck.read(res, {json :true}, function (err, body) {
                        if(err){
                            return deferred.reject(Boom.badImplementation("Error in reading the reading the response: " + err.message));
                        }

                        console.log("body: ", body);
                        return deferred.resolve(body);
                    });
                });
*/

                return deferred.promise;
            })

            .then(function(data){
                // if the file is not a shape, return to the next fn in the chain
                if(!fileIsShape){ return; }

                console.log("fileIsShape: ", fileIsShape)
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
                err = err.isBoom ? err : Boom.badImplementation(err.msg, err);
                return done(err);
            });

    });

    ws.on("error", function(err){
        return done(Boom.badImplementation(err.message));
    });

};



internals.filesUpdate = function(args, done){

    Utils.logCallsite(Hoek.callStack()[0]);

    ChangeCase(args.query, "underscored");
    var ids = args.query.map(function(obj){ 
        return { id: obj.id };
    });

    // 1) read the resources to be updated (to verify that they exist)
    Db.func('files_read', JSON.stringify(ids))

        // 2) update the resources with the payload data
        .then(function(data) {

            if (data.length === 0) {
                throw Boom.notFound("The resource does not exist.");
            }

            // TODO: verify that data.length === args.query.lengthxxx

            return Db.func("files_update", JSON.stringify(args.query))
        })

        // 3) read again the updated resources (to obtain the joined data)
        .then(function(updatedData) {

            if (updatedData.length === 0) {
                throw Boom.badRequest("The resource could not be updated.");
            }

            var updatedIds = updatedData.map(function(obj){ 
                return { id: obj.id }; 
            });

            return Db.func("files_read", JSON.stringify(updatedIds));
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



internals.filesDelete = function(args, done){

    Utils.logCallsite(Hoek.callStack()[0]);

    // first read the data, because we need to know the file path
    Db.func("files_read", JSON.stringify(args.query))
        .then(function(data){

            if (data.length === 0) {
                throw Boom.notFound("The resource does not exist.");
            }

            // TODO: currently only the first file will be deleted by rimraf; if we make a DELETE request such as
            //  /api/v1/files/3,5, only the file with id 3 will be deleted
            
            var rootDir = Config.get("rootDir"), 
                physicalPath = data[0]["physical_path"],
                name = data[0]["name"];

            var fileFullPath = Path.join(rootDir, physicalPath, name);
            Utils.serverLog(["rimraf"], "rimraf will delete " + fileFullPath);

            var deferred = Q.defer();

            // note: if there if no file corresponding to the given fileFullPath, Rimraf will return successfully, 
            // ("err" will be null) since the desired outcome is already the case
            Rimraf(fileFullPath, function(err){

                if(err){
                    return deferred.reject(err);
                }

                return deferred.resolve();
            });

            return deferred.promise;
        })
        .then(function(){

            return Db.func("files_delete", JSON.stringify(args.query));
        })
        .then(function(deletedData){

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

