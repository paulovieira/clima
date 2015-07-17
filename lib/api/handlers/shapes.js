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

    // make sure the payload only has the keys defined in the schema above
    // var allowedKeys = {
    //     "id"         : "id",
    //     "description": "description"
    // };
    // value = Utils.cleanPayload(value, allowedKeys);


    return Validate.payload(value, options, next, schemaUpdate);
};


internals.validatePayloadForCreate = function(value, options, next) {

    var schemaCreate = Joi.object().keys({

        zipId: Joi.number().integer().required(),

        fromSrid: Joi.number().integer().required(),

        description: Joi.object().keys({
            pt: Joi.string().allow(""),
            en: Joi.string().allow("")
        }),
    });

    // make sure the payload only has the keys defined in the schema above
    // var allowedKeys = {
    //     "zipId"      : "zipId",
    //     "fromSrid"   : "fromSrid",
    //     "description": "description"
    // };
    // value = Utils.cleanPayload(value, allowedKeys);

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

    auth: internals.auth
    
};


// internals.readStats = {

//     handler: function(request, reply) {

//         return reply.act({role:"shapes", cmd:"readStats", payload: request.payload});
//     },


//     validate: {
// //        payload: internals.validatePayloadForCreate
//     },

//     pre: [
//         [Utils.abortIfNotAuthenticated]
//     ],

//     auth: internals.auth
    
// };


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
        [Utils.extractTags, Pre.readAllShapes, Pre.readAllFiles, Pre.readAllGeoTables]
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
        return reply.act({
                    role:"shapes",
                    cmd:"delete",
                    dbQuery: dbQuery,
                    pre: request.pre,
                    headers: request.headers
                });
    },

    validate: {
        params: Validate.ids
    },

    pre: [
        [Utils.abortIfNotAuthenticated],
        [Pre.readAllShapes]
    ],

    auth: internals.auth
    
};



exports.config = {
    read: internals.read,
    readAll: internals.readAll,
    //readStats: internals.readStats,
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




echo '{"schema_name": "geo",  "table_name": "meteo_wgs84", "column_name": "gid"}' \
    | http -v PUT clima.dev/api/v1/shapes-stats


echo '[{"schema_name": "geo",  "table_name": "meteo_wgs84", "column_name": "gid"}, {"schema_name": "geo",  "table_name": "meteo_wgs84", "column_name": "id"}]' \
    | http -v PUT clima.dev/api/v1/shapes-stats


---

echo '[{ "zipId": 1013, "fromSrid": 4326  }]' \
    | http -v POST clima.dev/api/v1/shapes

    

---

echo '[{ "id": 6, "description": { "pt": "c", "en": "c"} }]' \
    | http -v PUT clima.dev/api/v1/shapes/6


---

http -v DELETE clima.dev/api/v1/shapes/5








*/

