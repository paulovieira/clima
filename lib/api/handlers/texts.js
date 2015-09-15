/*
IMPORTANT NOTE ABOUT THE pageName and editableId fields
the combination (pageName, editableId) must unique, however the primary key in the 
database is still a serial integer; these fields are only accepted for creation of a new
text; once the text has been created, they cannot be updated (the validation will discard them)
*/

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
    //auth: JSON.parse(JSON.stringify(Config.get("hapi.auth")))

};

// NOTE: we have configured Joi with "stripUnknown: true", so the keys not present in the 
// schema will be deleted
internals.hasTextAuthorization = function(request){

    if(!request.auth.credentials.canEditTexts){
        return false;
    }

    // if we are trying to edit the pageName or editableId fields, make sure we are admin
    var payload = request.payload;
    if(payload && payload[0]){
        if(payload[0].pageName || payload[0].editableId){
            if(!request.auth.credentials.isAdmin){
                return false;
            }
        }
    }

    return true;
};

internals.missingAuthorizationMsg = "Sorry. You don't have authorization for this action (you must be in the 'canEditTexts' group or in the 'admin' group)."

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

        active: Joi.boolean(),

        pageName: Joi.string(),

        editableId: Joi.string()

    });

    // make sure the payload only has the keys defined in the schema above
    // var allowedKeys = {
    //     "id"         : "id",
    //     "tags"       : "tags",
    //     "contents"   : "contents",
    //     "description": "description",
    //     "properties" : "properties",
    //     "active"     : "active",
    //     "pageName"   : "pageName",
    //     "editableId" : "editableId"
    // };
    // value = Utils.cleanPayload(value, allowedKeys);

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

        active: Joi.boolean(),

        pageName: Joi.string(),

        editableId: Joi.string()

    });

    // make sure the payload only has the keys defined in the schema above
    // var allowedKeys = {
    //     "id"         : "id",
    //     "tags"       : "tags",
    //     "contents"   : "contents",
    //     "description": "description",
    //     "properties" : "properties",
    //     "active"     : "active",
    //     "pageName"   : "pageName",
    //     "editableId" : "editableId"
    // };
    // value = Utils.cleanPayload(value, allowedKeys);

    return Validate.payload(value, options, next, schemaCreate);
};

internals.read = {

	handler: function(request, reply) {

        var query = request.params.ids;
        return reply.act({role:"texts", cmd:"read", query: query});
	},

    validate: {
        params: Validate.ids
    },

    pre: [
        [Utils.abortIfNotAuthenticated]
    ],

//    auth: internals.auth,
};


internals.readAll = {

	handler: function(request, reply) {

        return reply.act({role:"texts", cmd:"readAll"});
	},

    pre: [
        [Utils.abortIfNotAuthenticated]
    ],

//    auth: internals.auth
};


internals.readAllDefault = {

    handler: function(request, reply) {

        return reply(request.server.app.defaultTexts);
    },

    pre: [
        [Utils.abortIfNotAuthenticated]
    ],

//    auth: internals.auth
};


internals.create = {

    handler: function(request, reply) {

		// at this point request.payload will always be an array of objects, even if the original payload 
        // was a json object (because the validation function has transformed the data); so it's safe to
        // use .forEach

        if(!internals.hasTextAuthorization(request)){
            return reply(Boom.forbidden(internals.missingAuthorizationMsg))
        }


        request.payload.forEach(function(obj) {
            obj["author_id"] = request.auth.credentials.id;
        });

        var query = request.payload;
        return reply.act({role:"texts", cmd:"create", query: query});
    },

    validate: {
        payload: internals.validatePayloadForCreate
    },

    pre: [
        [Utils.abortIfNotAuthenticated],
        [Utils.extractTags]
    ],

    payload: {
        maxBytes: 1048576*4  // 50 megabytes - TODO get this setting from the default options
    },

//    auth: internals.auth
};


internals.update = {

    handler: function(request, reply) {

        if(!internals.hasTextAuthorization(request)){
            return reply(Boom.forbidden(internals.missingAuthorizationMsg))
        }

        console.log("request.payload: ", request.payload);
        
        var query = request.payload;
        var auth = request.auth;
        return reply.act({role:"texts", cmd:"update", query: query, auth: auth});
    },

    validate: {
        params: Validate.ids,
        payload: internals.validatePayloadForUpdate
    },

    pre: [
        [Utils.abortIfNotAuthenticated],
        [Utils.extractTags]
    ],

    payload: {
        // maximum image size is around 1mb (the image is sent as a base64 encoded string, 
        // so the payload size is ~1.4 times bigger than the actual filesize)
        maxBytes: 100000*1.5  
    },

//    auth: internals.auth
};


internals.delete = {

    handler: function(request, reply) {

        if(!internals.hasTextAuthorization(request)){
            return reply(Boom.forbidden(internals.missingAuthorizationMsg))
        }

        var query = request.params.ids;
        return reply.act({role:"texts", cmd:"delete", query: query});
    },

    validate: {
        params: Validate.ids
    },

    pre: [
        [Utils.abortIfNotAuthenticated]
    ],

//    auth: internals.auth
};


exports.config = {
    read: internals.read,
    readAll: internals.readAll,
    readAllDefault: internals.readAllDefault,
    create: internals.create,
    update: internals.update,
    delete: internals.delete
};


/*

CURL TESTS
==============
curl clima.dev/api/v1/texts  \
    --request GET

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


curl  http://127.0.0.1:3000/api/v1/texts  \
    --request POST  \
    --header "Content-Type: application/json"  \
    --data '[{ "tags": "1aaa,ccc ggg", "contents": { "pt": "xyz-pt", "en": "xyz-en"}, "pageName": "page_xyz" }]' 

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



curl clima.dev/api/v1/texts/4626   \
    --request PUT \
    --header "Content-Type: application/json"  \
    --data '{"id": 4626, "tags": "aaa,ccc xxx", "contents": { "pt": "xyz-pt", "en": "xyz-en"}, "description": { "pt": "desc-pt", "en": "desc-en"} }' 



curl http://127.0.0.1:3000/api/v1/texts/1008   \
    --request PUT \
    --header "Content-Type: application/json"  \
    --data '{"id": 1008, "tags": "b,ccc xxx", "contents": { "pt": "xyz-pt", "en": "xyz-en"}, "description": { "pt": "desc-pt", "en": "desc-en"} }' 




curl http://127.0.0.1:3000/api/v1/texts/1340   \
    --request PUT \
    --header "Content-Type: application/json"  \
    --data '{"id": 1340, "tags": "yybbb,ccc xxx", "contents": { "pt": "xyz-pt", "en": "xyz-en"}, "description": { "pt": "desc-pt", "en": "desc-en"} , "pageName": "dummy_page_name_1222"}' 




-------------------------------




curl http://127.0.0.1:3000/api/v1/texts/54  \
    --request DELETE

curl http://127.0.0.1:3000/api/v1/texts/4  \
    --request DELETE


curl http://127.0.0.1:3000/api/v1/texts/1009, 1006  \
    --request DELETE



curl http://127.0.0.1:3000/api/v1/texts/1340  \
    --request DELETE

*/

