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
    //auth: JSON.parse(JSON.stringify(Config.get("hapi.auth")))
}

// NOTE: we have configured Joi with "stripUnknown: true", so the keys not present in the 
// schema will be deleted
internals.validatePayloadForUpdate = function(value, options, next){

    var schemaUpdate = Joi.object({
        // id: Joi.number().integer().min(0).required(),

        // //tags: Joi.array().unique().min(0).includes(Joi.string()),
        // //tags: Joi.string().regex(/^[-\w\s]+(?:,[-\w\s]+)*$/),
        // tags: Joi.string().allow(""),

        // contents: Joi.object({
        //     pt: Joi.string().allow(""),
        //     en: Joi.string().allow("")
        // }).required(),

        // description: Joi.object({
        //     pt: Joi.string().allow(""),
        //     en: Joi.string().allow("")
        // }),

        // properties: Joi.object(),

        // active: Joi.boolean()
    });

    return Validate.payload(value, options, next, schemaUpdate);
};


internals.validatePayloadForCreate = function(value, options, next) {

    var schemaCreate = Joi.object({

        name: Joi.string().min(1).required(),
        description: Joi.string().allow("").required(),
        center: Joi.string(),
        hasPlayButton: Joi.boolean(),
        autoPlay: Joi.boolean(),
        sequence: Joi.array().items(Joi.object({
            mapId: Joi.string().required(),
            seqName: Joi.string()
        }))
    });

    return Validate.payload(value, options, next, schemaCreate);

};

internals.read = {

	handler: function(request, reply) {


//        console.log("maps read request.headers: ", request.headers);


        return reply.act({
                role: "maps", 
                cmd:  "read", 
                params: request.params,
                pre: request.pre,

                tilemillFilesDir: Config.get("tilemillFilesDir")
        });
	},

    validate: {
        params: Validate.mapsIds
    },

    // pre: [
    // ],

    //auth: internals.auth,
};


internals.readAll = {

	handler: function(request, reply) {

        return reply.act({
                role: "maps",
                cmd:  "readAll", 
                pre: request.pre,

                tilemillFilesDir: Config.get("tilemillFilesDir")
        });
	},

    // pre: [
    // ],

    //auth: internals.auth

};


internals.create = {

    handler: function(request, reply) {

		// at this point request.payload will always be an array of objects, even if the original payload 
        // was a json object (because the validation function has transformed the data); so it's safe to
        // use .forEach


// TODO: use this again
        // if(request.payload){
        //     request.payload.forEach(function(obj) {
        //         obj["author_id"] = request.auth.credentials.id;
        //     });

        // }

        return reply.act({
                role: "maps", 
                cmd:  "create", 
                payload: request.payload,
                headers: request.headers,
                maps: request.pre.maps,
                tilemillFilesDir: Config.get("tilemillFilesDir"),
                credentials: request.auth.credentials
        });
    },

    validate: {
        payload: internals.validatePayloadForCreate
    },

    pre: [
        [Utils.abortIfNotAuthenticated],
        [Pre.readAllMaps]
    ],

    //auth: internals.auth
};



internals.delete = {

    handler: function(request, reply) {

        return reply.act({
                role: "maps", 
                cmd:  "delete", 
                params: request.params,
                maps: request.pre.maps,
                tilemillFilesDir: Config.get("tilemillFilesDir"),
                headers: request.headers
        });

    },

    validate: {
        params: Validate.mapsIds
    },

    pre: [
        [Utils.abortIfNotAuthenticated],
        [Pre.readAllMaps]
    ],

    //auth: internals.auth
};


internals.readMenu = {

     handler: function(request, reply) {

        return reply.act({
                role: "maps", 
                cmd:  "readMenu", 
                params: request.params,
                pre: request.pre
        });

    },

    pre: [
        [Pre.readAllMaps]
    ],

};

internals.updateMenu = {
 
    handler: function(request, reply) {
        //console.log("rqquest.payload 1: ", request.payload);
        return reply.act({
                role: "maps", 
                cmd:  "updateMenu", 
                payload: request.payload,
                //headers: request.headers
        });

    },

    pre: [
        [Utils.abortIfNotAuthenticated],
    ],

    //auth: internals.auth
}

/*
The data for the menu is a simple array of objects stored in the config table (JSONB);
this way all the logic for creating, updating and deleting entries in the menu is done
dia the updateMenu action ("delete" means updating the array without that object; "create"
means updating the array with a new object; etc)
*/

// internals.readSequential = {

//      handler: function(request, reply) {

//         return reply.act({
//                 role: "maps", 
//                 cmd:  "readSequential", 
//         });

//     },
// };

internals.createSequential = {
 
    handler: function(request, reply) {

        return reply.act({
                role: "maps", 
                cmd:  "createSequential", 
                pre: request.pre,
                payload: request.payload,
        });

    },

    pre: [
        [Utils.abortIfNotAuthenticated],
    ],

};

internals.updateSequential = {
 
    handler: function(request, reply) {

        return reply.act({
                role: "maps", 
                cmd:  "updateSequential", 
                pre: request.pre,
                payload: request.payload,
                params: request.params
        });

    },

    pre: [
        [Utils.abortIfNotAuthenticated],
    ],

};

internals.deleteSequential = {
 
    handler: function(request, reply) {

        return reply.act({
                role: "maps", 
                cmd:  "deleteSequential",
                pre: request.pre,
                params: request.params,
        });

    },

    pre: [
        [Utils.abortIfNotAuthenticated],
    ],

};

exports.config = {
    read: internals.read,
    readAll: internals.readAll,
    create: internals.create,
    delete: internals.delete,

    readMenu: internals.readMenu,
    updateMenu: internals.updateMenu,

//    readSequential: internals.readSequential,
    createSequential: internals.createSequential,
    updateSequential: internals.updateSequential,
    deleteSequential: internals.deleteSequential
};



/*


HTTPie tests
===============

http -v GET clima.dev/api/v1/maps

http -v GET clima.dev/api/v1/files/mapname-1,mapname-2

---



echo '{ "name": "q30", "description": "q30 desc", "center": "madeira" }' \
| http -v POST clima.dev/api/v1/maps






echo '{ "name": "teste seq 1", "description": "teste seq 1 - desc", "hasPlayButton": true, "autoPlay": false, "sequence": [{"mapId": "seq-a", "seqName": "seq a name"}, {"mapId": "seq-b", "seqName": "seq b name"}, {"mapId": "seq-c", "seqName": "seq c name"}] }' | http -v POST http://clima.dev/api/v1/maps


echo '{ "name": "teste seq 2", "description": "teste seq 2 - desc", "hasPlayButton": true, "autoPlay": false, "sequence": [{"mapId": "seq-d", "seqName": "seq d name"}, {"mapId": "seq-e", "seqName": "seq e name"}] }' | http -v POST http://clima.dev/api/v1/maps

---


http -v DELETE clima.dev/api/v1/maps/mapname-1x


---


http -v GET clima.dev/api/v1/maps-menu

---


echo '[{}]' \
    | http -v PUT clima.dev/api/v1/maps-menu




SEQUENTIAL MAPS - to be deleted


http -v GET clima.dev/api/v1/maps-sequential


echo '{"id": "seq-b", "name": "seq-b name", "description": "seq-b description", "sequence": ["q12", "q13"]}' \
| http -v POST clima.dev/api/v1/maps-sequential


echo '{"id": "seq-a", "name": "xxxseq-a name", "sequence": ["q10", "q11"], "description": "seq-a description", "xyz": 123}' \
| http -v PUT clima.dev/api/v1/maps-sequential/seq-a

http -v DELETE clima.dev/api/v1/maps-sequential/seq-f

*/

