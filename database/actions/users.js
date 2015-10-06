// Prepare yourself, this is where the dirty stuff lives!
// access the database to interact with the data

var Hoek = require("hoek");
var Boom = require("boom");
var Bcrypt = require("bcrypt");
var ChangeCase = require("change-case-keys");
var _ = require("underscore");
var _s = require("underscore.string");
var Db = require("..");
var Utils = require("../../lib/common/utils");

var internals = {};

module.exports = function(options){

    var seneca = this;

    seneca.add("role:users, cmd:readAll", internals.usersReadAll);
    seneca.add("role:users, cmd:read",    internals.usersRead);
    seneca.add("role:usersGroups, cmd:readAll", internals.usersGroupsReadAll);
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

            err = err.isBoom ? err : Boom.badImplementation(err.msg, err);
            return done(err);
        });
};


internals.usersRead = function(args, done){

    Utils.logCallsite(Hoek.callStack()[0]);

    var emails = args.emails || [];
    var ids = [];
    if(args.params && args.params.ids){
        ids = args.params.ids;
    }



    var queryArray = _.union(emails, ids);
    Db.func('users_read', JSON.stringify(queryArray))
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

internals.usersGroupsReadAll = function(args, done){

    Utils.logCallsite(Hoek.callStack()[0]);

    Db.func('users_groups_read')
        .then(function(data) {

            // TODO: create a transform for this data (not needed so far)
            //data = args.raw === true ? data : data;
            return done(null, data);
        })
        .catch(function(err) {

            err = err.isBoom ? err : Boom.badImplementation(err.msg, err);
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

            err = err.isBoom ? err : Boom.badImplementation(err.msg, err);
            return done(err);
        });
};
*/

internals.usersUpdate = function(args, done){

    Utils.logCallsite(Hoek.callStack()[0]);

    ChangeCase(args.payload, "underscored");
    var ids = args.payload.map(function(obj){ 
        return { id: obj.id };
    });

    args.payload.forEach(function(obj){
        if(_s.trim(obj["new_pw"])===""){
            delete obj["new_pw"];
        }
    });


    //console.log("args.payload[0].showEnglish\n", args.payload[0].showEnglish)

//console.log(args.pre.usersGroups);

    // TODO: currently we are updating only the 1st user given in the 
    // payload (which can be an array of objects)   
    var user = _.findWhere(args.pre.users, ids[0]);
    if (!user) {
        throw Boom.notFound("The resource does not exist.");
    }    

    // if we are updating the password we must verify that the submitted current pw matches 
    // with the one in the database
    var currentPwSubmitted = _s.trim(args.payload[0]["current_pw"]),
        newPw              = _s.trim(args.payload[0]["new_pw"]);
    
    if(newPw){
        if(!currentPwSubmitted){
            throw Boom.forbidden("To change the password you must submit the current one.");
        }

        var pwMatch = Bcrypt.compareSync(currentPwSubmitted, user["pw_hash"]);
        if(!pwMatch){
            throw Boom.forbidden("The submitted current password is wrong.");
        }

        if(newPw.length<3){
            throw Boom.forbidden("The new password must have at least 3 characters.");   
        }

        // if the pw matches, hash the new password (blowfish) to be stored in the db
        args.payload[0]["pw_hash"] = Bcrypt.hashSync(newPw, 10);
    }

    // TODO: what is all permissions are disabled
    console.log("args.payload[0]\n", args.payload[0]);
    var usersGroupsData = [];
    var user_id = args.payload[0].id;

    if(args.payload[0]["is_admin"]){
        usersGroupsData.push({group_code: 99, user_id: user_id});
    }
    if(args.payload[0]["can_edit_texts"]){
        usersGroupsData.push({group_code: 100, user_id: user_id});
    }
    if(args.payload[0]["can_delete_texts"]){
        usersGroupsData.push({group_code: 101, user_id: user_id});
    }
    if(args.payload[0]["can_edit_maps"]){
        usersGroupsData.push({group_code: 102, user_id: user_id});
    }
    if(args.payload[0]["can_delete_maps"]){
        usersGroupsData.push({group_code: 103, user_id: user_id});
    }
    if(args.payload[0]["can_edit_files"]){
        usersGroupsData.push({group_code: 104, user_id: user_id});
    }
    if(args.payload[0]["can_delete_files"]){
        usersGroupsData.push({group_code: 105, user_id: user_id});
    }

    console.log("usersGroupsData\n", usersGroupsData);


    // 1) update the resources with the payload data
    Db.func("users_update", JSON.stringify(args.payload))

        // update the groups/permissions - first delete all the permissions
        // the current user
        .then(function(updatedData){

            if (updatedData.length === 0) {
                throw Boom.badRequest("The resource could not be updated.");
            }

            if(!!args.payload[0]["update_profile"]===false){
                console.log("user_id: ", user_id);
                return Db.func("users_groups_delete", JSON.stringify({user_id: user_id}));
            }

        })

        // then recreate the permissions
        .then(function(){
            if(!!args.payload[0]["update_profile"]===false){
                return Db.func("users_groups_create", JSON.stringify(usersGroupsData));
            }
        })

        // update the show english option inthe config table
        .then(function(){
            if(!!args.payload[0]["update_profile"]===true){
                return Db.func("config_update", JSON.stringify({key:"showEnglish", value: args.payload[0]["show_english"]}));
            }

        })

        // 2) read again the updated resources (to obtain the joined data)
        .then(function() {


            return Db.func("users_read", JSON.stringify({id: args.payload[0].id}));
        })


        // 3) apply the object transform and reply
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


internals.usersDelete = function(args, done){

    Utils.logCallsite(Hoek.callStack()[0]);

    Db.func('users_delete', JSON.stringify(args.params.ids))
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

