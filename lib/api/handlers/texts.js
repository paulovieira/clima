var Db = require("../../../database");
var Hoek = require("hoek");
var Boom = require("boom");
var Joi = require("joi");
var Config = require("config");
var Utils = require("../../common/utils");
var Validate = require("../../common/validate");

var internals = {

    validatePayloadForCreate: function(value, options, next) {

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
    },

	validatePayloadForUpdate: function(value, options, next){

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
	},

    transformMap: {

        // a) properties to be maintained
        "id": "id",
        "tags": "tags",
        "contents": "contents",
        "lastUpdated": "last_updated",

        // b) new properties (move properties from the nested object to the top object)
        // NOTE: this is used to make the server-side templates lighter
        //          "pt": "contents.pt",
        //          "en": "contents.en",

        // c) changed properties (some fields from authorData, such as pwHash, will be deleted)

        // the changeCaseKeys is only changinf the 1st level keys
        "authorData.id": "author_data.id",
        "authorData.firstName": "author_data.first_name",
        "authorData.lastName": "author_data.last_name",
        "authorData.email": "author_data.email",

        // d) deleted properties: "contentsDesc", "authorId", "active"
    }
};

exports.read = {
	handler: function(request, reply) {

		//Utils.logCallsite(Hoek.callStack()[0]);
console.log("xyz");
        Db.func('texts_read', JSON.stringify(request.params.ids))
            .then(function(data) {

                if (data.length === 0) {
                    return reply(Boom.notFound("The resource does not exist."));
                }

                var response = Hoek.transform(data, internals.transformMap);
                return reply(response);
            })
            .catch(function(errMsg) {

                return reply(Boom.badImplementation(errMsg));
            });
	},

    validate: {
        params: Validate.ids
    },

    pre: [
        Utils.abortIfNotAuthenticated
    ],

    auth: Config.get('hapi.auth')
};

exports.readAll = {
	handler: function(request, reply) {

		Utils.logCallsite(Hoek.callStack()[0]);

        Db.func('texts_read')
            .then(function(data) {

                var response = Hoek.transform(data, internals.transformMap);
                return reply(response);
            })
            .catch(function(errMsg) {

                return reply(Boom.badImplementation(errMsg));
            });

		// should the promise be returned?
	},

    pre: [
        Utils.abortIfNotAuthenticated
    ],

    auth: Config.get('hapi.auth')
};

exports.create = {
    handler: function(request, reply) {

		Utils.logCallsite(Hoek.callStack()[0]);

		// at this point request.payload will always be an array of objects, even if the original payload was a json object
		// (because the validation function has transformed the data); so it's safe to use .forEach
        request.payload.forEach(function(obj) {
            obj["author_id"] = request.auth.credentials.id;
        });

		// 1) create the resources with the payload data
        Db.func('texts_create', JSON.stringify(request.payload))

			// 2) read again the created resources (to obtain the joined data)
            .then(function(createdData) {

                if (createdData.length === 0) {
                    return reply(Boom.badRequest("The resource could not be created."));
                }

                var createdIds = createdData.map(function(obj){ 
                	return { id: obj.id }; 
                });

                return Db.func("texts_read", JSON.stringify(createdIds));
            })

    		// 3) apply the object transform and reply
            .then(function(data){

                if (data.length === 0) {
                    return reply(Boom.notFound("The resource does not exist."));
                }

                var response = Hoek.transform(data, internals.transformMap);
                return reply(response);
            })
            .catch(function(errMsg) {

                return reply(Boom.badImplementation(errMsg));
            });
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

exports.update = {
    handler: function(request, reply) {

		Utils.logCallsite(Hoek.callStack()[0]);

		// 1) read the resources to be udpated (to verify that they exist)
        Db.func('texts_read', JSON.stringify(request.params.ids))

    		// 2) update the resources with the payload data
            .then(function(data) {

                if (data.length === 0) {
                    return reply(Boom.notFound("The resource does not exist."));
                }

                // TODO: verify that the ids match

                return Db.func("texts_update", JSON.stringify(request.payload))
            })

    		// 3) read again the updated resources (to obtain the joined data)
            .then(function(updatedData) {

                if (updatedData.length === 0) {
                    return reply(Boom.badRequest("The resource could not be updated."));
                }

                var updatedIds = updatedData.map(function(obj){ 
                	return { id: obj.id }; 
                });

                return Db.func("texts_read", JSON.stringify(updatedIds));
            })

    		// 4) apply the object transform and reply
            .then(function(data){

                if (data.length === 0) {
                    return reply(Boom.notFound("The resource does not exist."));
                }

                var response = Hoek.transform(data, internals.transformMap);

                return reply(response);
            })
            .catch(function(errMsg) {
            	
                return reply(Boom.badImplementation(errMsg));
            });

    },

    validate: {
        params: Validate.ids,
        payload: internals.validatePayloadForUpdate
    },

    pre: [
        Utils.abortIfNotAuthenticated
    ],

    auth: Config.get('hapi.auth'),

};

exports.delete = {
    handler: function(request, reply) {

		Utils.logCallsite(Hoek.callStack()[0]);

        Db.func('texts_delete', JSON.stringify(request.params.ids))
            .then(function(data) {

                if (data.length === 0) {
                    return reply(Boom.notFound("The resource does not exist."));
                }

                return reply(data);
            })
            .catch(function(errMsg) {

                return reply(Boom.badImplementation(errMsg));
            });
    },

    validate: {
        params: Validate.ids
    },

    pre: [
        Utils.abortIfNotAuthenticated
    ],

    auth: Config.get('hapi.auth'),

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
    --data '[{"id": 1, "tags": "aaa,ccc xxx", "contents": { "pt": "xyz-pt", "en": "xyz-en"}, "description": { "pt": "desc-pt", "en": "desc-en"} },{"id": 2, "tags": "xxxaaa,yyyccc xxx", "contents": { "pt": "aaaxyz-pt", "en": "bbbxyz-en"}, "description": { "pt": "desc-pt", "en": "desc-en"} }]' 

-------------------------------


curl http://127.0.0.1:3000/api/v1/texts/54  \
    --request DELETE

curl http://127.0.0.1:3000/api/v1/texts/4  \
    --request DELETE



*/
