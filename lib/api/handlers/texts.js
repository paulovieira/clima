var Hoek = require("hoek");
var Boom = require("boom");
var Joi = require("joi");
var Config = require("config");
var Db = require("../../../database");
var Utils = require("../../common/utils");
var Validate = require("../../common/validate");

var internals = {}


internals.validatePayloadForUpdate = function(value, options, next){

    var schemaUpdate = Joi.object().keys({
        id: Joi.number().integer().min(0).required(),

        //tags: Joi.array().unique().min(0).includes(Joi.string()),
        //tags: Joi.string().regex(/^[-\w\s]+(?:,[-\w\s]+)*$/),
        tags: Joi.string().allow(""),

        contents: Joi.object().keys({
            pt: Joi.string().allow(""),
            en: Joi.string().allow("")
        }).required(),

        description: Joi.object().keys({
            pt: Joi.string().allow(""),
            en: Joi.string().allow("")
        }),

        properties: Joi.object(),

        active: Joi.boolean()
    });

    return Validate.payload(value, options, next, schemaUpdate);
};


internals.validatePayloadForCreate = function(value, options, next) {

    var schemaCreate = Joi.object().keys({

        id: Joi.number().integer().min(0),

        //tags: Joi.string().allow("").regex(/^[-\w\s]+(?:,[-\w\s]+)*$/),
        //tags: Joi.alternatives().try(Joi.string().allow("").regex(/^[-\w\s]+(?:,[-\w\s]+)*$/), Joi.string().allow("")),

        tags: Joi.string().allow(""),

        contents: Joi.object().keys({
            pt: Joi.string().allow(""),
            en: Joi.string().allow("")
        }).required(),

        description: Joi.object().keys({
            pt: Joi.string().allow(""),
            en: Joi.string().allow("")
        }),

        properties: Joi.object(),

        active: Joi.boolean()

    });

    return Validate.payload(value, options, next, schemaCreate);
};


internals.read = {

	handler: function(request, reply) {

        return reply.act({role:"texts", cmd:"read", ids: request.params.ids});
	},

    validate: {
        params: Validate.ids
    },

    pre: [
        Utils.abortIfNotAuthenticated
    ],

    auth: Config.get('hapi.auth')
};


internals.readAll = {

	handler: function(request, reply) {

        return reply.act({role:"texts", cmd:"readAll"});
	},

    pre: [
        Utils.abortIfNotAuthenticated
    ],

    auth: Config.get('hapi.auth')
};


internals.create = {

    handler: function(request, reply) {

		// at this point request.payload will always be an array of objects, even if the original payload 
        // was a json object (because the validation function has transformed the data); so it's safe to
        // use .forEach
        request.payload.forEach(function(obj) {
            obj["author_id"] = request.auth.credentials.id;
        });

        return reply.act({role:"texts", cmd:"create", payload: request.payload});
    },

    validate: {
        payload: internals.validatePayloadForCreate
    },

    pre: [
        Utils.abortIfNotAuthenticated,
        Utils.extractTags
    ],

    auth: Config.get('hapi.auth'),
};


internals.update = {

    handler: function(request, reply) {

        return reply.act({role:"texts", cmd:"update", ids: request.params.ids, payload: request.payload});
    },

    validate: {
        params: Validate.ids,
        payload: internals.validatePayloadForUpdate
    },

    pre: [
        Utils.abortIfNotAuthenticated,
        Utils.extractTags
    ],

    auth: Config.get('hapi.auth'),
};


internals.delete = {

    handler: function(request, reply) {

        return reply.act({role:"texts", cmd:"delete", ids: request.params.ids});
    },

    validate: {
        params: Validate.ids
    },

    pre: [
        Utils.abortIfNotAuthenticated
    ],

    auth: Config.get('hapi.auth'),
};


exports.config = {
    read: internals.read,
    readAll: internals.readAll,
    create: internals.create,
    update: internals.update,
    delete: internals.delete
};





/*

CURL TESTS
==============


curl http://127.0.0.1:3000/api/v1/texts  \
    --request GET

curl http://127.0.0.1:3000/api/v1/texts/1  \
    --request GET

curl http://127.0.0.1:3000/api/v1/texts/1,2  \
    --request GET


-------------------------------


curl  http://127.0.0.1:3000/api/v1/texts  \
    --request POST  \
    --header "Content-Type: application/json"  \
    --data '{ "tags": "aaa,ccc ggg", "contents": { "pt": "abc-pt", "en": "abc-en"} }' 


curl  http://127.0.0.1:3000/api/v1/texts  \
    --request POST  \
    --header "Content-Type: application/json"  \
    --data '[{ "tags": "aaa,ccc ggg", "contents": { "pt": "abc-pt", "en": "abc-en"} }, { "tags": "xx,yy", "contents": { "pt": "xyz-pt", "en": "xyz-en"} }]' 




curl  http://127.0.0.1:3000/api/v1/texts  \
    --request POST  \
    --header "Content-Type: application/json"  \
    --data '[{ "tags": "aaa,ccc ggg", "contents": { "pt": "abc-pt", "en": "abc-en"} }, { "tags": "aaa", "contents": { "pt": "xyz-pt", "en": "xyz-en"} }]' 


curl  http://127.0.0.1:3000/api/v1/texts  \
    --request POST  \
    --header "Content-Type: application/json"  \
    --data '[{ "tags": "aaa,ccc ggg", "contents": { "pt": "xyz-pt", "en": "xyz-en"} }]' 


-------------------------------


curl http://127.0.0.1:3000/api/v1/texts/1001   \
    --request PUT \
    --header "Content-Type: application/json"  \
    --data '{"id": 1001, "tags": "aaa,ccc xxx", "contents": { "pt": "xyz-pt", "en": "xyz-en"}, "description": { "pt": "desc-pt", "en": "desc-en"} }' 


curl http://127.0.0.1:3000/api/v1/texts/1   \
    --request PUT \
    --header "Content-Type: application/json"  \
    --data '{"id": 1, "tags": "aaa,ccc xxx", "contents": { "pt": "xyz-pt", "en": "xyz-en"}, "description": { "pt": "desc-pt", "en": "desc-en"} }' 


curl http://127.0.0.1:3000/api/v1/texts/1,2   \
    --request PUT \
    --header "Content-Type: application/json"  \
    --data '[{"id": 1, "tags": "waaa,ccc xxx", "contents": { "pt": "xyz-pt", "en": "xyz-en"}, "description": { "pt": "desc-pt", "en": "desc-en"} },{"id": 2, "tags": "xxxaaa,yyyccc xxx", "contents": { "pt": "aaaxyz-pt", "en": "bbbxyz-en"}, "description": { "pt": "desc-pt", "en": "desc-en"} }]' 





-------------------------------


curl http://127.0.0.1:3000/api/v1/texts/54  \
    --request DELETE

curl http://127.0.0.1:3000/api/v1/texts/4  \
    --request DELETE



*/

