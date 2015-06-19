// Prepare yourself, this is where the dirty stuff lives!
// access the database to interact with the data

var Hoek = require("hoek");
var Boom = require("boom");
var Bcrypt = require("bcrypt");
var ChangeCase = require("change-case-keys");
var Db = require("..");
var Utils = require("../../lib/common/utils");

var internals = {};

module.exports = function(options){

    var seneca = this;

    seneca.add("role:users, cmd:readAll", internals.usersReadAll);
    seneca.add("role:users, cmd:read",    internals.usersRead);
    //seneca.add("role:users, cmd:create",  internals.usersCreate);
    seneca.add("role:users, cmd:update",  internals.usersUpdate);
    seneca.add("role:users, cmd:delete",  internals.usersDelete);
};

internals.transformMap = {
    // a) properties to be maintained
    "id": "id",
    "email": "email",
    "firstName": "first_name",
    "lastName": "last_name",
    "createdAt": "created_at",
    "userTexts": "user_texts",
    "userGroups": "user_groups",

    // d) deleted properties: "recover", "pwHash", "recoverValidUntil"
};

// action handlers for read, readAll, create, update and delete
// (and possibly others); this is the place where we actually fetch the data from the database;


internals.usersReadAll = function(args, done){

    Utils.logCallsite(Hoek.callStack()[0]);

    Db.func('users_read')
        .then(function(data) {

            data = args.raw === true ? data : Hoek.transform(data, internals.transformMap);
            return done(null, data);
        })
        .catch(function(err) {

            err = err.isBoom ? err : Boom.badImplementation(null, err);
            return done(err);
        });
};

internals.usersRead = function(args, done){

    Utils.logCallsite(Hoek.callStack()[0]);

    Db.func('users_read', JSON.stringify(args.query))
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

            err = err.isBoom ? err : Boom.badImplementation(null, err);
            return done(err);
        });
};
*/

internals.usersUpdate = function(args, done){

    Utils.logCallsite(Hoek.callStack()[0]);

    ChangeCase(args.query, "underscored");
    var ids = args.query.map(function(obj){ 
        return { id: obj.id };
    });
    
    // 1) read the resources to be updated (to verify that they exist)
    Db.func('users_read', JSON.stringify(ids))

        // 2) update the resources with the payload data
        .then(function(data) {

            if (data.length === 0) {
                throw Boom.notFound("The resource does not exist.");
            }

            // TODO: verify that data.length === args.query.length


            // if we are updating the password we must verify that the submitted current pw matches 
            // with the one in the database
            var currentPwSubmitted = args.query[0]["current_pw"],
                newPw              = args.query[0]["new_pw"];
            
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
                args.query[0]["pw_hash"] = Bcrypt.hashSync(newPw, 10);

            }
            return Db.func("users_update", JSON.stringify(args.query))
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

            data = args.raw === true ? data : Hoek.transform(data, internals.transformMap);
            return done(null, data);
        })
        .catch(function(err) {

            err = err.isBoom ? err : Boom.badImplementation(null, err);
            return done(err);
        });
};


internals.usersDelete = function(args, done){

    Utils.logCallsite(Hoek.callStack()[0]);

    Db.func('users_delete', JSON.stringify(args.query))
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

