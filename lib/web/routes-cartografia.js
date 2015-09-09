var Path = require("path");
var Hoek = require("hoek");
var Config = require("config");
var _ = require("underscore");
var Utils = require("../common/utils");
//var CommonConfig = require("./common-config");
var Validate = require("../common/validate");
var Pre = require("../common/prerequisites");

var internals = {};
internals.config = {};

//internals.config.cartografia = Hoek.applyToDefaults(CommonConfig.config, {
internals.config.cartografia = {

    handler: function(request, reply) {

    	Utils.logCallsite(Hoek.callStack()[0]);

        var context = {
            texts:      _.indexBy(request.pre.texts, "id"),
            textsArray: request.pre.texts,
            // files:      request.pre.files,
            // filesArray: request.pre.filesArray,
            auth:       request.auth,
            urlParam1:  "cartografia",
        };

        return reply.view('cartografia', {
            ctx: context
        });

        // TODO: call reply
    },

    validate: {
        params: Validate.lang
    },
    
    pre: [
        [Pre.abortIfInvalidLang],
        [Pre.readAllTexts],
        [Pre.prepareTextsForView]

    ]
};



exports.endpoints = [

    {
        path: "/{lang}/cartografia",
        method: "GET",
        config: internals.config.cartografia
    },

    {
        path: '/visualizador/{anyPath*}',
        method: 'GET',
        handler: {
            directory: { path: Path.join(Config.get("rootDir"), "lib/web/client/visualizador") }
        },
        config: {
            auth: false,
        }
    },

];