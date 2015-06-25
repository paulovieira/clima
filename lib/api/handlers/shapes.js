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
        id: Joi.number().integer().min(0).required(),

        description: Joi.object().keys({
            pt: Joi.string().allow("").required(),
            en: Joi.string().allow("").required()
        })
    });

    return Validate.payload(value, options, next, schemaUpdate);
};


internals.validatePayloadForCreate = function(value, options, next) {

    var schemaCreate = Joi.object().keys({
        //tableName: Joi.string().required(),

        srid: Joi.number().integer().required(),

        description: Joi.object().keys({
            pt: Joi.string().allow(""),
            en: Joi.string().allow("")
        }),

        //fileId: Joi.number().integer().required()
    });

    return Validate.payload(value, options, next, schemaCreate);

};

internals.read = {

	handler: function(request, reply) {

        var dbQuery = request.params.ids;
        return reply.act({role:"shapes", cmd:"read", dbQuery: dbQuery});
	},

    validate: {
        params: Validate.ids
    },

    pre: [
        [Utils.abortIfNotAuthenticated]
    ],

    auth: internals.auth,
};


internals.readAll = {

	handler: function(request, reply) {

        return reply.act({role:"shapes", cmd:"readAll"});
	},

    pre: [
        [Utils.abortIfNotAuthenticated]
    ],

    auth: internals.auth
};

/*
internals.create = {

    handler: function(request, reply) {

		// at this point request.payload will always be an array of objects, even if the original payload 
        // was a json object (because the validation function has transformed the data); so it's safe to
        // use .forEach
        // request.payload.forEach(function(obj) {
        //     obj["author_id"] = request.auth.credentials.id;
        // });

        return reply.act({role:"files", cmd:"create", payload: request.payload, auth: request.auth });
    },

    validate: {
//        payload: internals.validatePayloadForCreate
    },

    pre: [
        Utils.abortIfNotAuthenticated,
        Utils.extractTags
    ],

    payload: {
        output: "stream",
        parse: true,
        maxBytes: 1048576*50  // 50 megabytes
    },

    auth: internals.auth
};

*/

internals.update = {

    handler: function(request, reply) {

        var dbQuery = request.payload;
        return reply.act({role:"shapes", cmd:"update", dbQuery: dbQuery});
    },

    validate: {
        params: Validate.ids,
        payload: internals.validatePayloadForUpdate
    },

    pre: [
        [Utils.abortIfNotAuthenticated],
        [Utils.extractTags]
    ],

    auth: internals.auth
};



internals.delete = {

    handler: function(request, reply) {

        var dbQuery = request.params.ids;
        return reply.act({role:"shapes", cmd:"delete", dbQuery: dbQuery});
    },

    validate: {
        params: Validate.ids
    },

    pre: [
        [Utils.abortIfNotAuthenticated]
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



HTTPie tests
===============

http -v GET localhost:3000/api/v1/shapes

http -v GET localhost:3000/api/v1/shapes/5

---



---

echo '[{ "id": 6, "description": { "pt": "c", "en": "c"} }]' \
    | http -v PUT localhost:3000/api/v1/shapes/6


---

http -v DELETE localhost:3000/api/v1/shapes/5






CURL TESTS
==============


curl http://127.0.0.1:3000/api/v1/shapes  \
    --request GET

curl http://127.0.0.1:3000/api/v1/shapes/1  \
    --request GET

curl http://127.0.0.1:3000/api/v1/shapes/1,2  \
    --request GET


-------------------------------


curl http://127.0.0.1:3000/api/v1/shapes  \
    --request POST  \
    --header "Content-Type: application/json"  \
    --data '{ "code": "fwefwefwefweyyxx", "description": { "pt": "uuu", "en": "ttt"}, "fileId": 48, "srid": 4326 }' 


-------------------------------


curl http://127.0.0.1:3000/api/v1/shapes/1021  \
    --request PUT  \
    --header "Content-Type: application/json"  \
    --data '{ "id": 1021, "description": { "pt": "yabcx", "en": "zdefy"} }'


curl http://127.0.0.1:3000/api/v1/shapes/6  \
    --request PUT  \
    --header "Content-Type: application/json"  \
    --data '{ "id": 6, "description": { "pt": "yabcx", "en": "zdefy"} }'


-------------------------------


curl http://127.0.0.1:3000/api/v1/shapes/1  \
    --request DELETE





*/

