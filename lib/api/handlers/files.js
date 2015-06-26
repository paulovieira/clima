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
        id: Joi.number().integer().min(0),

        tags: Joi.string().allow(""),

        description: Joi.object().keys({
            pt: Joi.string(),
            en: Joi.string()
        }),

        properties: Joi.object(),

        // forbidden keys - is the payload had these keys they would be written to the database
        name: Joi.any().forbidden(),

        webPath: Joi.any().forbidden(),
        web_path: Joi.any().forbidden(),

        physicalPath: Joi.any().forbidden(),
        physical_path: Joi.any().forbidden(),

        ownerId: Joi.any().forbidden(),
        owner_id: Joi.any().forbidden(),

        uploadedAt: Joi.any().forbidden(),
        uploaded_at: Joi.any().forbidden()        
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
        [Utils.abortIfNotAuthenticated]
    ],

    auth: internals.auth,
};


internals.readAll = {

	handler: function(request, reply) {

        return reply.act({role:"files", cmd:"readAll"});
	},

    pre: [
        [Utils.abortIfNotAuthenticated]
    ],

    auth: internals.auth
};


internals.create = {

    handler: function(request, reply) {

        // NOTE: for this endpoint we are not executing the validation function, so request.payload will 
        // not be an array of objects, has happens in the other endpoints (so we don't use request.payload.forEach)
        request.payload.ownerId = request.auth.credentials.id;

        return reply.act({role:"files", cmd:"create", payload: request.payload, pre: request.pre });
    },

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
        maxBytes: 1048576*300  // 50 megabytes
    },

    auth: internals.auth
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

http -v GET localhost:3000/api/v1/files

http -v GET localhost:3000/api/v1/files/5


---


http -v -f POST localhost:3000/api/v1/files  \
    filename='rrrrtttt.txt'  \
    new_file@/home/pvieira/cirac/estacoes_meteo/meteo_wgs84.prj  \
    tags='tag100, tag200'  \
    shapeDescription=''  \
    shapeCode=''


---


echo '[{"id": 1003, "tags": "tag5, tag7", "description": {"pt": "desc-pt"} }]' \
    | http -v PUT localhost:3000/api/v1/files/1003



(will return a 400 error because "name" is a forbidden key)

echo '[{"id": 1003, "tags": "tag5, tag7", "name": "xcontrato.pdf" }]' \
    | http -v PUT localhost:3000/api/v1/files/1003


---


http -v DELETE localhost:3000/api/v1/files/5









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
    --data '{"id": 42, "name": "relatório2.pdf", "webPath": "/uploads/public", "tags": "tag5, tag6" }' 


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

