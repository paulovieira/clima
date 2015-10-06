var Config = require("config");
var Boom = require("boom");
var Texts = require("./handlers/texts");
var Users = require("./handlers/users");
var Files = require("./handlers/files");
var Shapes = require("./handlers/shapes");
var Maps = require("./handlers/maps");

var internals = {
	apiPrefix: Config.get("apiPrefix.v1")
};

exports.endpoints = internals.endpoints = [

	// texts
    { method: "GET",     path: "/texts/{ids}",   config: Texts.config.read    },
	{ method: "GET",     path: "/texts",         config: Texts.config.readAll },
	{ method: "GET",     path: "/texts-default", config: Texts.config.readAllDefault },
	{ method: "POST",    path: "/texts",         config: Texts.config.create  },
	{ method: "PUT",     path: "/texts/{ids}",   config: Texts.config.update  },
	{ method: "DELETE",  path: "/texts/{ids}",   config: Texts.config.delete  },

	// users
    { method: "GET",     path: "/users/{ids}",  config: Users.config.read    },
	{ method: "GET",     path: "/users",        config: Users.config.readAll },
	{ method: "POST",    path: "/users",        config: Users.config.create  },
	{ method: "PUT",     path: "/users/{ids}",  config: Users.config.update  },
	{ method: "DELETE",  path: "/users/{ids}",  config: Users.config.delete  },

	// files
    { method: "GET",     path: "/files/{ids}",  config: Files.config.read    },
	{ method: "GET",     path: "/files",        config: Files.config.readAll },
	{ method: "POST",    path: "/files",        config: Files.config.create  },
	{ method: "PUT",     path: "/files/{ids}",  config: Files.config.update  },
	{ method: "DELETE",  path: "/files/{ids}",  config: Files.config.delete  },

	// shapes
    { method: "GET",     path: "/shapes/{ids}",  config: Shapes.config.read    },
	{ method: "GET",     path: "/shapes",        config: Shapes.config.readAll },
	// even though the endpoint is PUT, it is used to fetch data only
//	{ method: "PUT",     path: "/shapes-stats",   config: Shapes.config.readStats },  
	{ method: "POST",    path: "/shapes",        config: Shapes.config.create  },
	{ method: "PUT",     path: "/shapes/{ids}",  config: Shapes.config.update  },
	{ method: "DELETE",  path: "/shapes/{ids}",  config: Shapes.config.delete  },

	// maps
	{ method: "GET",     path: "/maps/{ids}",    config: Maps.config.read    },
	{ method: "GET",     path: "/maps",          config: Maps.config.readAll },
	{ method: "POST",    path: "/maps",          config: Maps.config.create  },
	{ method: "DELETE",  path: "/maps/{ids}",    config: Maps.config.delete  },

	// map menu
	{ method: "GET",  path: "/maps-menu", 		 config: Maps.config.readMenu    },
	{ method: "PUT",  path: "/maps-menu",        config: Maps.config.updateMenu  },

	// sequential maps
	//{ method: "GET",  path: "/maps-sequential", config: Maps.config.readSequential    },
	//{ method: "POST", path: "/maps-sequential", config: Maps.config.createSequential  },
	//{ method: "PUT",  path: "/maps-sequential/{id}", config: Maps.config.updateSequential  },
	//{ method: "DELETE", path: "/maps-sequential/{id}", config: Maps.config.deleteSequential  },

	// remove: tilejson
	//{ method: "GET",     path: "/tilejson/{id}", config: Tilejson.config.read },

	// catch all for any other api endpoint, that is, any other request for "/api/v1" 
	// (regardless of the method)

	// note: we list explicitely all the http method (instead of using "*") to make sure this route
	// is more specific than the catch-all route for web pages
	{ 
		method: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
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
