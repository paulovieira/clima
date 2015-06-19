// Prepare yourself, this is where the dirty stuff lives!
// access the database to interact with the data

var Path = require("path");
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

    seneca.add("role:files, cmd:readAll", internals.filesReadAll);
    seneca.add("role:files, cmd:read",    internals.filesRead);
    //seneca.add("role:files, cmd:create",  internals.filesCreate);
    seneca.add("role:files, cmd:update",  internals.filesUpdate);
    seneca.add("role:files, cmd:delete",  internals.filesDelete);
};

internals.transformMap = {
    // a) properties to be maintained
    "id": "id",
    "name": "name",
    "logicalPath": "logical_path",
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

            err = err.isBoom ? err : Boom.badImplementation(null, err);
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

            err = err.isBoom ? err : Boom.badImplementation(null, err);
            return done(err);
        });
};

/*
TO BE DONE 

internals.filesCreate = function(args, done){

    Utils.logCallsite(Hoek.callStack()[0]);

};

*/

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

            err = err.isBoom ? err : Boom.badImplementation(null, err);
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
            Utils.log(["rimraf"], "rimraf will delete " + fileFullPath);

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

            err = err.isBoom ? err : Boom.badImplementation(null, err);
            return done(err);
        });

};

