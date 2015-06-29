var Hoek = require("hoek");
var Boom = require("boom");
var Joi = require("joi");
var Config = require("config");
var Db = require("../../../database");
var Utils = require("../../common/utils");
var Validate = require("../../common/validate");
var Pre = require("../../common/prerequisites");

var internals = {
    // the object obtained with Config.get will have extra properties that are not allowed, so we serialize and deserialize
    // to remove them;
    auth: JSON.parse(JSON.stringify(Config.get("hapi.auth")))
}


internals.validatePayloadForUpdate = function(value, options, next){


    var schemaUpdate = Joi.object().keys({
        id: Joi.number().integer().min(0).required(),

        description: Joi.object().keys({
            pt: Joi.string().allow(""),
            en: Joi.string().allow("")
        })
    });

    return Validate.payload(value, options, next, schemaUpdate);
};


internals.validatePayloadForCreate = function(value, options, next) {

    var schemaCreate = Joi.object().keys({

        zipId: Joi.number().integer().required(),

        //srid: Joi.number().integer().required(),
        srid: Joi.any().equal([4326, "4326"]).required(),

        description: Joi.object().keys({
            pt: Joi.string().allow(""),
            en: Joi.string().allow("")
        }),
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


internals.create = {

    handler: function(request, reply) {

        // at this point request.payload will always be an array of objects, even if the original payload 
        // was a json object (because the validation function has transformed the data); so it's safe to
        // use .forEach
        request.payload.forEach(function(obj) {
            obj["ownerId"] = request.auth.credentials.id;
        });

        return reply.act({role:"shapes", cmd:"create", payload: request.payload, pre: request.pre });
    },

    validate: {
        payload: internals.validatePayloadForCreate
    },

    pre: [
        [Utils.abortIfNotAuthenticated],
        [Utils.extractTags, Pre.readAllShapes, Pre.readAllFiles]
    ],

    auth: internals.auth
};


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
    create: internals.create,
    update: internals.update,
    delete: internals.delete
};


/*



HTTPie tests
===============

http -v GET clima.dev/api/v1/shapes

http -v GET clima.dev/api/v1/shapes/5

---

echo '[{ "zipId": 1013, "srid": 4326  }]' \
    | http -v POST clima.dev/api/v1/shapes

    

---

echo '[{ "id": 6, "description": { "pt": "c", "en": "c"} }]' \
    | http -v PUT clima.dev/api/v1/shapes/6


---

http -v DELETE clima.dev/api/v1/shapes/5








*/

