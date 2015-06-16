var Hoek = require("hoek");
var Config = require("config");
var Utils = require("../common/utils");
var Validate = require("../common/validate");
var Pre = require("../common/prerequisites");
var CommonConfig = require("./common-config");

var internals = {};
internals.config = {};

internals.config.generalPage = Hoek.applyToDefaults(CommonConfig.config, {

	handler: function(request, reply) {

		Utils.logCallsite(Hoek.callStack()[0]);

	    var viewFile = Utils.getView(request);

	    // if the lang does not exist, show the 404 template with the default language (english)
		if(!request.params.lang){
		    return reply.view('404', {
		    }).code(404);
		}


		 console.log("viewFile: ", viewFile)
		// console.log("texts: ", request.pre.texts)


	    var context = {
	        urlParam1: request.params.level1,
	        urlParam2: request.params.level2,
	        urlParam3: request.params.level3,
	        urlParam4: request.params.level4,
	        urlParam5: request.params.level5,
	        urlWithoutLang: Utils.getUrlWithoutLang(request.params),
	        auth: request.auth,
	    };

	    // add the data available in request.pre that has been treated and ready to be used
	    // in the nunjucks template: texts, textArray, files, etc
	    for(var key in request.pre){
	        if(request.pre.hasOwnProperty(key)){
	            context[key] = request.pre[key];
	        }
	    }

	    var response = reply.view(viewFile, {
	        ctx: context
	    });

	    if(viewFile === "404"){
	    	response.code(404)
	    }

		return response;
	}
});


internals.config.notFound = Hoek.applyToDefaults(CommonConfig.config, {

	handler: function(request, reply) {

		Utils.logCallsite(Hoek.callStack()[0]);

	    var context = {
	    };

	    return reply.view('404', {
	        ctx: context
	    }).code(404);
	}
});


exports.endpoints = [

    // if lang param is not given, redirect immediately to the default laguage

    {
        path: "/",
        method: "GET",
        config: {
	        handler: function(request, reply) {
		        return reply.redirect("/" + Config.get("allowedLanguages")[0]);
		    },
            auth: false,
        }
    },

    // ordinary routes

    {
        path: "/{lang}",
        method: "GET",
        config: internals.config.generalPage
    },

    {
        path: "/{lang}/{level1}",
        method: "GET",
        config: internals.config.generalPage
    },

    {
        path: "/{lang}/{level1}/{level2}",
        method: "GET",
        config: internals.config.generalPage
    },

    {
        path: "/{lang}/{level1}/{level2}/{level3}",
        method: "GET",
        config: internals.config.generalPage
    },

    {
        path: "/{lang}/{level1}/{level2}/{level3}/{level4}",
        method: "GET",
        config: internals.config.generalPage
    },

    {
        path: "/{lang}/{level1}/{level2}/{level3}/{level4}/{level5}",
        method: "GET",
        config: internals.config.generalPage
    },


    // catch-all route

    {
        method: "GET",
        path: "/{lang}/{anyPath*}",
        config: internals.config.notFound
    },
];