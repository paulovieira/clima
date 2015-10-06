var Hoek = require("hoek");
var Boom = require("boom");
var Joi = require("joi");
var Config = require("config");
var ChangeCase = require('change-case-keys');
var Db = require("../../../database");
var Utils = require("../../common/utils");
var Validate = require("../../common/validate");
var Pre = require("../../common/prerequisites");

var internals = {
    // the object obtained with Config.get will have extra properties that are not allowed, so we serialize and deserialize
    // to remove them;
    //auth: JSON.parse(JSON.stringify(Config.get("hapi.auth")))
}


// NOTE: we have configured Joi with "stripUnknown: true", so the keys not present in the 
// schema will be deleted
internals.validatePayloadForUpdate = function(value, options, next){

    var schemaUpdate = Joi.object({
        id: Joi.number().integer().min(0).required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        currentPw: Joi.string().allow(""),
        newPw: Joi.string().allow(""),
        showEnglish: Joi.boolean(),
        updateProfile: Joi.boolean(),

        isAdmin: Joi.boolean(),        
        canEditTexts: Joi.boolean(),
        canDeleteTexts: Joi.boolean(), 
        canEditMaps: Joi.boolean(),    
        canDeleteMaps: Joi.boolean(), 
        canEditFiles: Joi.boolean(),    
        canDeleteFiles: Joi.boolean(), 
    });

    // make sure the payload only has the keys defined in the schema above
    // var allowedKeys = {
    //     "id"       : "id",
    //     "firstName": "firstName",
    //     "lastName" : "lastName",
    //     "email"    : "email",
    //     "currentPw": "currentPw",
    //     "newPw"    : "newPw",
    //     "updateProfile": "updateProfile"
    // };
    // value = Utils.cleanPayload(value, allowedKeys);

    return Validate.payload(value, options, next, schemaUpdate);
};


internals.validatePayloadForCreate = function(value, options, next) {

    var schemaCreate = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        newPw: Joi.string().required(),

        isAdmin: Joi.boolean(),        
        canEditTexts: Joi.boolean(),
        canDeleteTexts: Joi.boolean(), 
        canEditMaps: Joi.boolean(),    
        canDeleteMaps: Joi.boolean(), 
        canEditFiles: Joi.boolean(),    
        canDeleteFiles: Joi.boolean(), 
        canEditFiles: Joi.boolean(),    
        canDeleteFiles: Joi.boolean()
    });



    // make sure the payload only has the keys defined in the schema above
    // var allowedKeys = {
    //     "firstName": "firstName",
    //     "lastName" : "lastName",
    //     "email"    : "email",
    //     "newPw"    : "newPw"
    // };
    // value = Utils.cleanPayload(value, allowedKeys);

    return Validate.payload(value, options, next, schemaCreate);

};

internals.read = {

	handler: function(request, reply) {

        //var query = request.params.ids;
        return reply.act({
            role:"users", 
            cmd:"read", 
            //query: query
            params: request.params,
            xyz: "abc"
        });
	},

    validate: {
        params: Validate.ids
    },

    pre: [
        [Utils.abortIfNotAuthenticated]
    ],

    //auth: internals.auth,
};


internals.readAll = {

	handler: function(request, reply) {

        return reply.act({
            role:"users", 
            cmd:"readAll"
        });
	},

    pre: [
        [Utils.abortIfNotAuthenticated]
    ],

    //auth: internals.auth
};

/*
internals.create = {

    handler: function(request, reply) {

		// at this point request.payload will always be an array of objects, even if the original payload 
        // was a json object (because the validation function has transformed the data); so it's safe to
        // use .forEach
        request.payload.forEach(function(obj) {
            obj["author_id"] = request.auth.credentials.id;
        });

        return reply.act({role:"users", cmd:"create", payload: request.payload});
    },

    validate: {
        payload: internals.validatePayloadForCreate
    },

    pre: [
        Utils.abortIfNotAuthenticated,
        Utils.extractTags
    ],

    //auth: internals.auth
};
*/

internals.update = {

    handler: function(request, reply) {

        // if the user is not admin, he/she can only update his own data
        if(!request.auth.credentials.isAdmin && request.auth.credentials.id !== request.params.ids[0].id){
            return reply(Boom.forbidden("To update the personal data of other users you must have the 'administrator' permission."));
        }

        return reply.act({
            role:"users", 
            cmd:"update", 
            pre: request.pre,
            payload: request.payload
        });
    },

    validate: {
        params: Validate.ids,
        payload: internals.validatePayloadForUpdate
    },

    pre: [
        [Utils.abortIfNotAuthenticated],
        [Pre.readAllUsersGroups, Pre.readAllUsers, Utils.extractTags]
    ],

    //auth: internals.auth
};


internals.delete = {

    handler: function(request, reply) {

        // if the user is not admin, he/she cannot delete users
        if(!request.auth.credentials.isAdmin){
            return reply(Boom.forbidden("To delete other users you must have the 'administrator' permission"));
        }

        var query = request.params.ids;
        return reply.act({
            role:"users", 
            cmd:"delete", 
            //query: query
            params: request.params
        });
    },

    validate: {
        params: Validate.ids
    },

    pre: [
        [Utils.abortIfNotAuthenticated]
    ],

    //auth: internals.auth
};

// TODO: get the recovery token (the token must be created on the fly; the recovery link will be sent by email) GET /recover/{email}

// TODO: update the password using the recovery token (update a user resource via PUT /recover/{token} )

exports.config = {
    read: internals.read,
    readAll: internals.readAll,
    // create: internals.create,
    update: internals.update,
    delete: internals.delete
};


/*

CURL TESTS
==============


curl http://127.0.0.1:3000/api/v1/users \
    --request GET

curl http://127.0.0.1:3000/api/v1/users/1 \
    --request GET

curl http://127.0.0.1:3000/api/v1/users/1,2 \
    --request GET

-------------------------------


curl http://127.0.0.1:3000/api/v1/users  \
    --request POST  \
    --header "Content-Type: application/json"  \
    --data '{ "first_name": "paulo" }' 


-------------------------------



curl http://127.0.0.1:3000/api/v1/users/1   \
    --request PUT  \
    --header "Content-Type: application/json"  \
    --data '{"id": 1, "firstName": "paulox", "lastName": "yvieira", "email": "paulovieira@gmail.com" }' 


curl http://127.0.0.1:3000/api/v1/users/3   \
    --request PUT  \
    --header "Content-Type: application/json"  \
    --data '{"id": 3, "firstName": "userx", "lastName": "yenergia", "email": "user_energia@gmail.com", "currentPw": "abc", "newPw": "xyz" }' 


curl http://127.0.0.1:3000/api/v1/users/1   \
    --request PUT  \
    --header "Content-Type: application/json"  \
    --data '{"id": 1, "firstName": "paulox", "lastName": "yvieira", "email": "paulovieira@gmail.com" }' 


-------------------------------


curl http://127.0.0.1:3000/api/v1/users/4 \
    --request DELETE



{"id": 3, "firstName": "user", "lastName": "energia", "email": "user_energia@gmail.com" }

*/

