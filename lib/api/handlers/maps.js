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

    var schemaUpdate = Joi.object().keys({
        // id: Joi.number().integer().min(0).required(),

        // //tags: Joi.array().unique().min(0).includes(Joi.string()),
        // //tags: Joi.string().regex(/^[-\w\s]+(?:,[-\w\s]+)*$/),
        // tags: Joi.string().allow(""),

        // contents: Joi.object().keys({
        //     pt: Joi.string().allow(""),
        //     en: Joi.string().allow("")
        // }).required(),

        // description: Joi.object().keys({
        //     pt: Joi.string().allow(""),
        //     en: Joi.string().allow("")
        // }),

        // properties: Joi.object(),

        // active: Joi.boolean()
    });

    return Validate.payload(value, options, next, schemaUpdate);
};


internals.validatePayloadForCreate = function(value, options, next) {

    var schemaCreate = Joi.object().keys({

        name: Joi.string().min(1).required(),
        description: Joi.string().allow("").required(),
        center: Joi.string().required()
    });

    // make sure the payload only has the keys defined in the schema above
    // var allowedKeys = {
    //     "name"       : "name",
    //     "description": "description"
    // };
    // value = Utils.cleanPayload(value, allowedKeys);
console.log("value: ", value);
    return Validate.payload(value, options, next, schemaCreate);

};

internals.read = {

	handler: function(request, reply) {


//        console.log("maps read request.headers: ", request.headers);


        return reply.act({
                role: "maps", 
                cmd:  "read", 
                ids: request.params.ids,
                tilemillFilesDir: Config.get("tilemillFilesDir")
        });
	},

    validate: {
        params: Validate.mapsIds
    },

    pre: [
//        [Utils.abortIfNotAuthenticated]
    ],

    //auth: internals.auth,
};


internals.readAll = {

	handler: function(request, reply) {

        return reply.act({
                role: "maps",
                cmd:  "readAll", 
                tilemillFilesDir: Config.get("tilemillFilesDir")
        });
	},

    pre: [
//        [Utils.abortIfNotAuthenticated]
    ],

    //auth: internals.auth

};


internals.create = {

    handler: function(request, reply) {

		// at this point request.payload will always be an array of objects, even if the original payload 
        // was a json object (because the validation function has transformed the data); so it's safe to
        // use .forEach
        request.payload.forEach(function(obj) {
            obj["author_id"] = request.auth.credentials.id;
        });

        return reply.act({
                role: "maps", 
                cmd:  "create", 
                payload: request.payload,
                headers: request.headers,
                pre: request.pre,
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
                pre: request.pre,
                ids: request.params.ids,
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
                pre: request.pre,
        });

    },

    pre: [
//        [Utils.abortIfNotAuthenticated],
        [Pre.readAllMaps]
    ],

    //auth: internals.auth
}

internals.updateMenu = {
 
    handler: function(request, reply) {
        //console.log("rqquest.payload 1: ", request.payload);
        return reply.act({
                role: "maps", 
                cmd:  "updateMenu", 
                payload: request.payload,
                headers: request.headers
        });

    },

    pre: [
        [Utils.abortIfNotAuthenticated],
    ],

    //auth: internals.auth
}


exports.config = {
    read: internals.read,
    readAll: internals.readAll,
    create: internals.create,
    delete: internals.delete,
    readMenu: internals.readMenu,
    updateMenu: internals.updateMenu
};



/*


HTTPie tests
===============

http -v GET clima.dev/api/v1/maps

http -v GET clima.dev/api/v1/files/mapname-1,mapname-2

---



echo '{ "name": "q30", "description": "q30 desc", "center": "madeira" }' \
| http -v POST clima.dev/api/v1/maps



---


http -v DELETE clima.dev/api/v1/maps/mapname-1x


---


http -v GET clima.dev/api/v1/maps-menu

---


echo '[{}]' \
    | http -v PUT clima.dev/api/v1/maps-menu



*/

