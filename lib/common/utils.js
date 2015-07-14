var Path = require("path");
var Fs = require("fs");
var Hoek = require('hoek');
var Boom = require('boom');
var Config = require('config');
var Glob = require("glob");
var _ = require('underscore');
var _s = require('underscore.string');

//var changeCase = require("change-case-keys");
//var Joi = require('joi');

var internals = {
    "12hours": 12 * 60 * 60 * 1000,

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
exports.registerServer = function(server) {

    internals.server = server;
}

// methods to be used in pre-requisites
exports.abortIfNotAuthenticated = function(request, reply) {

    exports.logCallsite(Hoek.callStack()[0]);

// console.log("----------------------------------\n");
// console.log("request: " + request.method + " " + request.path);
// console.log("request headers: ", request.headers);
// console.log("\n----------------------------------")

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
        ":" + colors.bold.green + lineNumber + colors.reset + ")";

    internals.server.log(["stack"], output);

    return output;
};

exports.serverLog = function(tags, data) {

    internals.server.log(tags, data);
};

exports.registerActions = function(senecaInstance, actionsDir) {

    var filenames = Fs.readdirSync(actionsDir);

    filenames.forEach(function(name) {
        senecaInstance.use(Path.join(actionsDir, name));
    });

};

exports.registerAuthStrategy = function(server, strategy, scheme) {
    if (strategy === "session" && scheme === "cookie") {

        server.app.cache = server.cache({
            segment: "sessions",
            expiresIn: internals["12hours"]
        });

        server.auth.strategy(strategy, scheme, 'try', {
            password: Config.get("ironPassword"),
            cookie: 'sid',
            isSecure: false,
            clearInvalid: true, // if the session is expired, will delete the cookie in the browser (but if the cookie has expired, it will remain)
            validateFunc: function(request, session, callback) {
                debugger;
                server.app.cache.get(session.sid, function(err, cached) {
                    debugger;
                    if (err) {
                        internals.server.log(["auth"], "validateFunc: could not get session data from catbox - authentication failed!");
                        return callback(err);
                    }

                    if (!cached) {
                        internals.server.log(["auth"], "validateFunc: session data in catbox is invalid - authentication failed!");
                        return callback(null, false);
                    }

                    internals.server.log(["auth"], "validateFunc: session data is valid - authentication succeeded!");
                    //return callback(null, true, cached.account)
                    return callback(null, true, cached.sessionData)
                })
            },
            // redirectTo: '/xyz',  // if authentication fails, redirect; if not set, will simply return a forbidden message
            // redirectOnTry: false,
        });
    }
};


exports.getViewsList = function() {

    var viewsList = Glob.sync(Config.get("viewsDir") + "/**/*.html");

    viewsList.forEach(function(filename, i) {

        // remove the extension
        var dirname = Path.dirname(filename),
            basename = Path.basename(filename, ".html");

        viewsList[i] = Path.join(dirname, basename);
    });

    return viewsList;
};

exports.getView = function(request) {

    // TODO: currently we have 5 levels route (hard-coded)

    // make sure the objects in availableRoutes have the levelN keys
    // function normalizeLevel(obj){
    //     for(var i=1; i<=5; i++){
    //         obj["level" + i] = obj["level" + i] || "";
    //     }        
    // }

    // normalizeLevel(request.params);

    request.params.level1 = request.params.level1 || "";
    request.params.level2 = request.params.level2 || "";
    request.params.level3 = request.params.level3 || "";
    request.params.level4 = request.params.level4 || "";
    request.params.level5 = request.params.level5 || "";

    var notFoundTemplate = "404",
        homeTemplate = "home",
        viewsDir = Config.get("viewsDir");

    var fullPath = Path.join(viewsDir,
        request.params.level1,
        request.params.level2,
        request.params.level3,
        request.params.level4,
        request.params.level5);

    // if all levelN properties are empty the request url was something like "/pt/"
    if (fullPath === viewsDir) {
        return homeTemplate;
    }

    // is there a template file associated to the request?
    var index = _.indexOf(request.server.settings.app.viewsList, fullPath);

    // console.log("request.server.settings.app.viewsList\n", request.server.settings.app.viewsList)
    // console.log("fullPath: ", fullPath);
    // console.log("index: ", index)

    return index !== -1 ? fullPath : notFoundTemplate;

};

exports.getUrlWithoutLang = function(params) {
    var urlWithoutLang = "/";

    for (var i = 1; i <= 5; i++) {
        if (params["level" + i] !== "") {
            urlWithoutLang = urlWithoutLang + params["level" + i] + "/"
        }
    }

    // if(params.level1!==""){
    //     urlWithoutLang = urlWithoutLang + params.level1 + "/"
    // }
    // if(params.level2!==""){
    //     urlWithoutLang = urlWithoutLang + params.level2 + "/"
    // }
    // if(params.level3!==""){
    //     urlWithoutLang = urlWithoutLang + params.level3 + "/"
    // }

    // remove the "/" in the end
    return urlWithoutLang.slice(0, -1);
};

exports.getRandomString = function(length) {

    var charsNumbers = '23456789';
    var charsLower = 'abcdefghkmnpqrstuxyz';

    var chars = charsNumbers + charsLower;

    if (!length) {
        length = 6;
    }

    var string = '';

    for (var i = 0; i < length; i++) {
        var randomNumber = Math.floor(Math.random() * chars.length);
        string += chars.substring(randomNumber, randomNumber + 1);
    }

    return string;
};


// same as console.log, but with colors and better formatting
exports.log = function(){

    var inspect = require('util').inspect;
    var map = Array.prototype.map;

    return (console.log).apply(this, map.call(arguments, function (arg) {
        if (typeof arg === 'string') return arg;
        return inspect(arg, { depth: 2, colors: true });
    }) );
};

exports.cleanPayload = function(obj, allowedKeys){
    // note: obj might also be an array of objects (but it doesn't matter
    // because Hoek.transform handles both cases)
    obj = Hoek.transform(obj, allowedKeys);
    for(var key in obj){
        if(obj[key] === undefined){ delete obj[key]; }
    }

    return obj;
};





// exports.boomAssert = function(value, method, message){

// }
