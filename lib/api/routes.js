var Config = require("config");
var Texts = require("./handlers/texts");

var internals = {
	apiPrefix: Config.get("apiPrefix.v1")
};

exports.endpoints = internals.endpoints = [

	// texts
    { method: "GET",     path: "/texts",        config: Texts.config.readAll },
    { method: "GET",     path: "/texts/{ids}",  config: Texts.config.read    },
	{ method: "POST",    path: "/texts",        config: Texts.config.create  },
	{ method: "PUT",     path: "/texts/{ids}",  config: Texts.config.update  },
	{ method: "DELETE",  path: "/texts/{ids}",  config: Texts.config.delete  }

	// users
];


// add the path prefix for all API route paths
internals.endpoints.forEach(function(routeObj){
    
	routeObj.path = internals.apiPrefix + routeObj.path
});
