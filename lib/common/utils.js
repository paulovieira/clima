var Path = require("path");
var Config = require('config');
var Hoek = require('hoek');
var Boom = require('boom');
var _ = require('underscore');
var _s = require('underscore.string');
//var changeCase = require("change-case-keys");
//var Joi = require('joi');

var internals = {
    //  if the passed object has a "tags" property with a comma-separated tags (string value), it will replace 
    // that string with the corresponding array of strings (any special characters will be removed/replaced)
    // example: "abc, áóx" will become ["abc", "aox"]
    createTagsArray: function(payloadObj) {
        var tagsArray = [];
        if (typeof payloadObj.tags === "string") {
            tagsArray = payloadObj.tags.split(",");
            for (var i = 0, l = tagsArray.length; i < l; i++) {

                // slugify returns a cleaned version of the string:
                // Replaces whitespaces, accentuated, and special characters with a dash
                tagsArray[i] = _s.slugify(tagsArray[i]);
            }

            // if the original tags string is the empty string, we end up with an array with 1 element
            // (the empty string); we want the empty array instead
            if (tagsArray.length === 1 && tagsArray[0] === "") {
                tagsArray = [];
            }

            // update the tags property in the object
            payloadObj.tags = tagsArray;
        }
    },

    sgrColors: {
        "reset": "\x1b[0m",
        "black": "\x1b[30m",
        "red": "\x1b[31m",
        "green": "\x1b[32m",
        "yellow": "\x1b[33m",
        "blue": "\x1b[34m",
        "magenta": "\x1b[35m",
        "cyan": "\x1b[36m",
        "white": "\x1b[37m",

        bold: {
            "black": "\x1b[30;1m",
            "red": "\x1b[31;1m",
            "green": "\x1b[32;1m",
            "yellow": "\x1b[33;1m",
            "blue": "\x1b[34;1m",
            "magenta": "\x1b[35;1m",
            "cyan": "\x1b[36;1m",
            "white": "\x1b[37;1m",            
        }
    }

};

// to be called in lib/index.js (as soon as the server is created)
exports.registerServer = function(server){

    internals.server = server;
}

// methods to be used in pre-requisites
exports.abortIfNotAuthenticated = function(request, reply) {

    exports.logCallsite(Hoek.callStack()[0]);

    // with NODE_ENV=dev-no-auth, all routes have "config: false"
    //console.log("route settings: ", JSON.stringify(request.route.settings.auth));
    if (request.route.settings.auth !== false) {
        if (!request.auth.credentials.id) {
            return reply(Boom.unauthorized("To access this resource you must be authenticated."));
        }
    } else {
        // simulate the login using the first user
        request.auth.credentials.id = Config.get('hapi.dummyCredentials.id');
        request.auth.credentials.firstName = Config.get('hapi.dummyCredentials.firstName');
        request.auth.credentials.lastName = Config.get('hapi.dummyCredentials.lastName');
        request.auth.credentials.isAdmin = Config.get('hapi.dummyCredentials.isAdmin');
    }

    return reply();
};

exports.abortRequest = function(request, reply) {

    return reply(Boom.unauthorized("To access this resource you must be authenticated."));
};

exports.extractTagsOld = function(request, reply) {
        /*
                function createTagsArray(payloadObj, tags) {
                	var tagsArray = [];
                    if (typeof tags === "string") {
                        tagsArray = tags.split(",");
                        for (var i = 0, l = tagsArray.length; i < l; i++) {

                            // slugify returns a cleaned version of the string:
                            // Replaces whitespaces, accentuated, and special characters with a dash
                            tagsArray[i] = _s.slugify(tagsArray[i]);
                        }

                        // if the original tags string is the empty string, we end up with an array with 1 element
                        // (the empty string); we want the empty array instead
                        if (tagsArray.length === 1 && tagsArray[0] === "") {
                            tagsArray = [];
                        }

                        // update the tags property in request.payload
                        payloadObj.tags = tagsArray;
                    }
                };
        */
    var payloadObj, tagsArray = [];

    if (request.payload) {
        if (_.isArray(request.payload)) {
            payloadObj = request.payload[0];
        } else {
            payloadObj = request.payload;
        }

        if (typeof payloadObj.tags === "string") {
            tagsArray = payloadObj.tags.split(",");
            for (var i = 0, l = tagsArray.length; i < l; i++) {

                // slugify returns a cleaned version of the string:
                // Replaces whitespaces, accentuated, and special characters with a dash
                tagsArray[i] = _s.slugify(tagsArray[i]);
            }

            // if the original tags string is the empty string, we end up with an array with 1 element
            // (the empty string); we want the empty array instead
            if (tagsArray.length === 1 && tagsArray[0] === "") {
                tagsArray = [];
            }

            // update the tags property in request.payload
            payloadObj.tags = tagsArray;
        }
    }

    return reply();
};

exports.extractTags = function(request, reply) {

	// the payload can be an objecr or an array of objects
    if (request.payload) {
        if (_.isArray(request.payload)) {
            for (var i = 0, l = request.payload.length; i < l; i++) {
                internals.createTagsArray(request.payload[i]);
            }
        } else {
            internals.createTagsArray(request.payload);
        }
    }

    return reply();
};

exports.logCallsite = function(callsiteObj) {

    var colors = internals.sgrColors;

    // callsiteObj is an array of strings, prepared by Hoek (not the origin callsite obj, which has methods like .getLineNumber())
    var funcName = callsiteObj[3];
    var lineNumber = callsiteObj[1];
    var dirName = Path.dirname(callsiteObj[0]);
    var baseName = Path.basename(callsiteObj[0]);

    var output = colors.bold.cyan + (funcName || "anonymous") + "()" + colors.reset + 
                " (" + dirName + "/" + colors.bold.cyan + baseName + colors.reset +
                ":" +  colors.bold.green + lineNumber + colors.reset + ")";

    internals.server.log(["stack"], output);

    return output;
};

// exports.boomAssert = function(value, method, message){
    
// }