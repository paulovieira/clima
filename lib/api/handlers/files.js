var Hoek = require("hoek");
//var Boom = require("boom");
var Joi = require("joi");
var Config = require("config");
//var Db = require("../../../database");
var Utils = require("../../common/utils");
var Validate = require("../../common/validate");
var Pre = require("../../common/prerequisites");

var internals = {
    // the object obtained with Config.get will have extra properties that are not allowed, so we serialize and deserialize
    // to remove them;
    //auth: JSON.parse(JSON.stringify(Config.get("hapi.auth")))
};

// NOTE: we have configured Joi with "stripUnknown: true", so the keys not present in the 
// schema will be deleted
internals.validatePayloadForUpdate = function(value, options, next){
    var schemaUpdate = Joi.object().keys({
        id: Joi.number().integer().min(0),

        tags: Joi.string().allow(""),
    });

    return Validate.payload(value, options, next, schemaUpdate);
};

// NONE! (because it messes with the readable stream)
// internals.validatePayloadForCreate = function(value, options, next) {

//     var schemaCreate = Joi.object().keys({
//         // NONE! (because it messes with the readable stream)
//     });

//     return Validate.payload(value, options, next, schemaCreate);

// };

internals.read = {

	handler: function(request, reply) {

        var query = request.params.ids;
        return reply.act({role:"files", cmd:"read", query: query});
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

        return reply.act({role:"files", cmd:"readAll"});
	},

    pre: [
        [Utils.abortIfNotAuthenticated]
    ],

    //auth: internals.auth
};


internals.create = {

    handler: function(request, reply) {

        // NOTE: for this endpoint we are not executing the validation function, so request.payload will 
        // not be an array of objects, has happens in the other endpoints (so we don't use request.payload.forEach)
        request.payload.ownerId = request.auth.credentials.id;

        return reply.act({
                    role:"files",
                    cmd:"create",
                    payload: request.payload,
                    headers: request.headers,
                    files: request.pre.files 
                });
    },


    // TODO!
    // no validation here because it messes with the readable stream
    validate: {
//        payload: internals.validatePayloadForCreate
    },

    pre: [
        [Utils.abortIfNotAuthenticated],
        [Utils.extractTags, Pre.readAllFiles]
    ],

    payload: {
        output: "stream",
        parse: true,
        maxBytes: 1048576*50  // 50 megabytes - TODO get this setting from the default options
    },

    //auth: internals.auth
};



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
        [Utils.abortIfNotAuthenticated],
        [Utils.extractTags]
    ],

    //auth: internals.auth
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
        [Utils.abortIfNotAuthenticated]
    ],

    //auth: internals.auth
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

http -v GET clima.dev/api/v1/files

http -v GET clima.dev/api/v1/files/5


---




http -v -f POST clima.dev/api/v1/files  \
    filename='cirac_exposure.zip'  \
    new_file@/home/pvieira/CIRAC/outputs/mapas/vulnerabilidade/Exposicao/Map-SHP/CP4/cirac_exposure.zip  \
    tags='shape, cirac'  \
    isShape=true \
    fromSrid=4326  \
    shapeDescription='{"en":"cirac exposure"}'


http -v -f POST clima.dev/api/v1/files  \
    filename='meteo.zip'  \
    new_file@/home/pvieira/CIRAC/estacoes_meteo/meteo.zip  \
    tags='shape, stations'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription='{"en":"meteorological stations"}'

---


echo '[{"id": 1003, "tags": "tag5, tag7", "description": {"pt": "desc-pt"} }]' \
    | http -v PUT clima.dev/api/v1/files/1003


echo '[{"id": 1571, "tags": "tag5, tag7", "description": {"pt": "desc-pt"} }]' \
    | http -v PUT clima.dev/api/v1/files/1572


(will return a 400 error because "name" is a forbidden key)

echo '[{"id": 1003, "tags": "tag5, tag7", "name": "xcontrato.pdf" }]' \
    | http -v PUT clima.dev/api/v1/files/1003


echo '[{"id": 1577, "tags": "tag5, tag7" }]' \
    | http -v PUT clima.dev/api/v1/files/1003


echo '[{"id": 1577, "tags": "tag5, tag7" }]' \
    | http -v PUT localhost:3000/api/v1/files/1577
---


http -v DELETE clima.dev/api/v1/files/5


*/

