// Prepare yourself, this is where the dirty stuff lives!
// access the database to interact with the data

var Hoek = require("hoek");
var Boom = require("boom");
var Bcrypt = require("bcrypt");

var Db = require("..");
var Utils = require("../../lib/common/utils");

var internals = {};

module.exports = function(options){

    var seneca = this;

    seneca.add("role:files, cmd:readAll", internals.filesReadAll);
    seneca.add("role:files, cmd:read",    internals.filesRead);
    //seneca.add("role:files, cmd:create",  internals.filesCreate);
    // seneca.add("role:files, cmd:update",  internals.filesUpdate);
    // seneca.add("role:files, cmd:delete",  internals.filesDelete);
};

internals.transformMap = {
    // a) properties to be maintained
    "id": "id",
    "name": "name",
    "logicalPath": "logicalPath",
    "tags": "tags",
    "description": "description",
    "properties":"properties",
    "uploadedAt":"uploadedAt",

    // c) changed properties (some fields from ownerData, such as pwHash, will be deleted)
    "ownerData.id": "ownerData.id",
    "ownerData.email": "ownerData.email",
    "ownerData.firstName": "ownerData.first_name",
    "ownerData.lastName": "ownerData.last_name",

    // d) deleted properties: "physicalPath"
};

// action handlers for read, readAll, create, update and delete
// (and possibly others); this is the place where we actually fetch the data from the database;


internals.filesReadAll = function(args, done){

    Utils.logCallsite(Hoek.callStack()[0]);

    Db.func('files_read')
        .then(function(data) {

            return done(null, Hoek.transform(data, internals.transformMap));
        })
        .catch(function(err) {

            return done(err.isBoom ? err : Boom.badImplementation(null, err));
        });
};

internals.filesRead = function(args, done){

    Utils.logCallsite(Hoek.callStack()[0]);

    Db.func('files_read', JSON.stringify(args.ids))
        .then(function(data) {

            if (data.length === 0) {
                throw Boom.notFound("The resource does not exist.");
            }

            return done(null, Hoek.transform(data, internals.transformMap));
        })
        .catch(function(err) {

            return done(err.isBoom ? err : Boom.badImplementation(null, err));
        });
};

/*
TO BE DONE 

internals.usersCreate = function(args, done){

    Utils.logCallsite(Hoek.callStack()[0]);

    // 1) create the resources with the payload data
    Db.func('users_create', JSON.stringify(args.payload))

        // 2) read the created resources (to obtain the joined data)
        .then(function(createdData) {

            if (createdData.length === 0) {
                throw Boom.badRequest("The resource could not be created.");
            }

            var createdIds = createdData.map(function(obj){ 
                return { id: obj.id }; 
            });

            return Db.func("texts_read", JSON.stringify(createdIds));
        })

        // 3) apply the object transform and reply
        .then(function(data){

            if (data.length === 0) {
                throw Boom.notFound("The resource does not exist.");
            }

            return done(null, Hoek.transform(data, internals.transformMap));
        })
        .catch(function(err) {

            return done(err.isBoom ? err : Boom.badImplementation(null, err));
        });
};


internals.usersUpdate = function(args, done){

    Utils.logCallsite(Hoek.callStack()[0]);


    // 1) read the resources to be updated (to verify that they exist)
    Db.func('users_read', JSON.stringify(args.ids))

        // 2) update the resources with the payload data
        .then(function(data) {

            if (data.length === 0) {
                throw Boom.notFound("The resource does not exist.");
            }

            // TODO: verify that data.length === args.ids.lengthxxx


            // if we are updating the password we must verify that the submitted current pw matches 
            // with the one in the database
            var currentPwSubmitted = args.payload[0]["current_pw"],
                newPw              = args.payload[0]["new_pw"];
            
            if(newPw){
                if(!currentPwSubmitted){
                    throw Boom.forbidden("To change the password you must submit the current one.");
                }

                var currentPwHash = data[0]["pw_hash"];   // the pw hash in the database
                var pwMatch = Bcrypt.compareSync(currentPwSubmitted, currentPwHash);

                if(!pwMatch){
                    throw Boom.forbidden("The submitted current password is wrong.");
                }

                // if the pw matches, hash the new password (blowfish) to be stored in the db
                args.payload[0]["pw_hash"] = Bcrypt.hashSync(newPw, 10);

            }
            return Db.func("users_update", JSON.stringify(args.payload))
        })

        // 3) read again the updated resources (to obtain the joined data)
        .then(function(updatedData) {

            if (updatedData.length === 0) {
                throw Boom.badRequest("The resource could not be updated.");
            }

            var updatedIds = updatedData.map(function(obj){ 
                return { id: obj.id }; 
            });

            return Db.func("users_read", JSON.stringify(updatedIds));
        })

        // 4) apply the object transform and reply
        .then(function(data){

            if (data.length === 0) {
                throw Boom.notFound("The resource does not exist.");
            }

            return done(null, Hoek.transform(data, internals.transformMap));
        })
        .catch(function(err) {

            return done(err.isBoom ? err : Boom.badImplementation(null, err));
        });
};


internals.usersDelete = function(args, done){

    Utils.logCallsite(Hoek.callStack()[0]);

    Db.func('users_delete', JSON.stringify(args.ids))
        .then(function(data) {

            if (data.length === 0) {
                throw Boom.notFound("The resource does not exist.");
            }

            return done(null, data);
        })
        .catch(function(err) {

            return done(err.isBoom ? err : Boom.badImplementation(null, err));
        });
};

*/
