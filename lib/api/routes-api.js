var Config = require("config");
var Boom = require("boom");
var Texts = require("./handlers/texts");
var Users = require("./handlers/users");
var Files = require("./handlers/files");

var internals = {
	apiPrefix: Config.get("apiPrefix.v1")
};

exports.endpoints = internals.endpoints = [

	// texts
    { method: "GET",     path: "/texts/{ids}",  config: Texts.config.read    },
	{ method: "GET",     path: "/texts",        config: Texts.config.readAll },
	{ method: "POST",    path: "/texts",        config: Texts.config.create  },
	{ method: "PUT",     path: "/texts/{ids}",  config: Texts.config.update  },
	{ method: "DELETE",  path: "/texts/{ids}",  config: Texts.config.delete  },

	// users
    { method: "GET",     path: "/users/{ids}",  config: Users.config.read    },
	{ method: "GET",     path: "/users",        config: Users.config.readAll },
	// { method: "POST",    path: "/users",        config: Users.config.create  },
	{ method: "PUT",     path: "/users/{ids}",  config: Users.config.update  },
	{ method: "DELETE",  path: "/users/{ids}",  config: Users.config.delete  },

	// files
    { method: "GET",     path: "/files/{ids}",  config: Files.config.read    },
	{ method: "GET",     path: "/files",        config: Files.config.readAll },
	// { method: "POST",    path: "/files",        config: Files.config.create  },
	{ method: "PUT",     path: "/files/{ids}",  config: Files.config.update  },
	{ method: "DELETE",  path: "/files/{ids}",  config: Files.config.delete  },


	// catch all for any other api endpoint, that is, any other request for "/api/v1" 
	// (regardless of the method)
	{ 
		method: "*",     
		path: "/{any*}",        
		config: {
			handler: function(request, reply){
				return reply(Boom.notFound("Invalid API endpoint."));
			}
		} 
	},
];


// add the path prefix for all API route paths
internals.endpoints.forEach(function(routeObj){
    
	routeObj.path = internals.apiPrefix + routeObj.path
});
