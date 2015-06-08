var Config = require("config");
var Texts = require("./handlers/texts");

var internals = {
	apiPrefix: Config.get("apiPrefix.v1")
};

exports.endpoints = internals.endpoints = [

	// texts
	{ method: "GET",     path: "/texts",        config: Texts.readAll },
	{ method: "GET",     path: "/texts/{ids}",  config: Texts.read    },
	{ method: "POST",    path: "/texts",        config: Texts.create  },
	{ method: "PUT",     path: "/texts/{ids}",  config: Texts.update  },
	{ method: "DELETE",  path: "/texts/{ids}",  config: Texts.delete  }

	// users
];


// add the path prefix for all API route paths
internals.endpoints.forEach(function(routeObj){
	routeObj.path = internals.apiPrefix + routeObj.path
});
