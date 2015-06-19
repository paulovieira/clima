var Hoek = require("hoek");
var Boom = require("boom");
var Joi = require("joi");
var Config = require("config");
var Db = require("../../../database");
var Utils = require("../../common/utils");
var Validate = require("../../common/validate");

var internals = {
    // the object obtained with Config.get will have extra properties that are not allowed, so we serialize and deserialize
    // to remove them;
    auth: JSON.parse(JSON.stringify(Config.get("hapi.auth")))
}


internals.validatePayloadForUpdate = function(value, options, next){

    var schemaUpdate = Joi.object().keys({
        id: Joi.number().integer().min(0),

        name: Joi.string(),

        logicalPath: Joi.string(),

        // physicalPath: Joi.string(),

        tags: Joi.string().allow(""),

        description: Joi.object().keys({
            pt: Joi.string(),
            en: Joi.string()
        }),

        properties: Joi.object()

    });

    return Validate.payload(value, options, next, schemaUpdate);
};


internals.validatePayloadForCreate = function(value, options, next) {

    var schemaCreate = Joi.object().keys({
        // NONE! (because it messes with the readable stream)
    });

    return Validate.payload(value, options, next, schemaCreate);

};

internals.read = {

	handler: function(request, reply) {

        var query = request.params.ids;
        return reply.act({role:"files", cmd:"read", query: query});
	},

    validate: {
        params: Validate.ids
    },

    pre: [
        Utils.abortIfNotAuthenticated
    ],

    auth: internals.auth,
};


internals.readAll = {

	handler: function(request, reply) {

        return reply.act({role:"files", cmd:"readAll"});
	},

    pre: [
        Utils.abortIfNotAuthenticated
    ],

    auth: internals.auth
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

    auth: internals.auth
};
*/


internals.update = {

    handler: function(request, reply) {

        var query = request.payload;
        return reply.act({role:"files", cmd:"update", query: query});
    },

    validate: {
        params: Validate.ids,
        payload: internals.validatePayloadForUpdate
    },

    pre: [
        Utils.abortIfNotAuthenticated,
        Utils.extractTags
    ],

    auth: internals.auth
};


internals.delete = {

    handler: function(request, reply) {

        var query = request.params.ids;
        return reply.act({role:"files", cmd:"delete", query: query});
    },

    validate: {
        params: Validate.ids
    },

    pre: [
        Utils.abortIfNotAuthenticated
    ],

    auth: internals.auth
};



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


curl http://127.0.0.1:3000/api/v1/files  \
    --request GET


curl http://127.0.0.1:3000/api/v1/files/1  \
    --request GET


curl http://127.0.0.1:3000/api/v1/files/1,2  \
    --request GET


-------------------------------


curl http://127.0.0.1:3000/api/v1/files  \
    --request POST  \
    --header "Content-Type: application/json"  \
    --data '{ "first_name": "paulo" }' 


-------------------------------


curl http://127.0.0.1:3000/api/v1/files/42  \
    --request PUT  \
    --header "Content-Type: application/json"  \
    --data '{"id": 42, "name": "relatório2.pdf", "logicalPath": "/uploads/public", "tags": "tag5, tag6" }' 


curl http://127.0.0.1:3000/api/v1/files/11  \
    --request PUT  \
    --header "Content-Type: application/json"  \
    --data '{"id": 11, "name": "200x200.gif.xyz",  "tags": "tag5, tag6" }' 


curl http://127.0.0.1:3000/api/v1/files/4,2  \
    --request PUT  \
    --header "Content-Type: application/json"  \
    --data '[{"id": 4, "tags": "tag50, tag60" }, {"id": 2, "tags": "tag70, tag80" }]' 




curl http://127.0.0.1:3000/api/v1/files/12  \
    --request PUT  \
    --header "Content-Type: application/json"  \
    --data '{"id": 12, "name": "x200x200.gif.xyz",  "tags": "ytag5, tag6" }' 

-------------------------------


curl http://127.0.0.1:3000/api/v1/files/1  \
    --request DELETE





*/

