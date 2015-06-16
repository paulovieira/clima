var Hoek = require("hoek");
var Config = require("config");
var Utils = require("../common/utils");
var Validate = require("../common/validate");
var Pre = require("../common/prerequisites");

var internals = {};

internals.notFound = function(request, reply) {

	Utils.logCallsite(Hoek.callStack()[0]);

    var context = {
    };

    return reply.view('404', {
        ctx: context
    }).code(404);
};

internals.generalPage = function(request, reply) {

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
};



internals.generalPageConfig = {
	handler: internals.generalPage,
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

    {
        path: "/{lang}",
        method: "GET",
        config: internals.generalPageConfig
    },

    {
        path: "/{lang}/{level1}",
        method: "GET",
        config: internals.generalPageConfig
    },

    {
        path: "/{lang}/{level1}/{level2}",
        method: "GET",
        config: internals.generalPageConfig
    },

    {
        path: "/{lang}/{level1}/{level2}/{level3}",
        method: "GET",
        config: internals.generalPageConfig
    },

    {
        path: "/{lang}/{level1}/{level2}/{level3}/{level4}",
        method: "GET",
        config: internals.generalPageConfig
    },

    {
        path: "/{lang}/{level1}/{level2}/{level3}/{level4}/{level5}",
        method: "GET",
        config: internals.generalPageConfig
    },


    // catch-all route

    {
        method: "GET",
        path: "/{lang}/{anyPath*}",
        config: {
        	handler: internals.notFound,
            validate: {
                params: Validate.lang
            },
            pre: [
            	[Pre.abortIfInvalidLang]
            ]
        }
    },
];