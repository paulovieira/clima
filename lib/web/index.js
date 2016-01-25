var Path = require("path");
var Hapi = require("hapi");
var Nunjucks = require('hapi-nunjucks');
var Config = require('config');

var RoutesStatic = require("./routes-static");
var RoutesBase = require("./routes-base");
var RoutesLogin = require("./routes-login");
var RoutesDashboard = require("./routes-dashboard");
var RoutesCartografia = require("./routes-cartografia");
var RoutesTilemill = require("./routes-tilemill");

var internals = {};

exports.register = function(server, options, next){

	server.views({
            path: Config.get("viewsDir"),
            allowAbsolutePaths: true,
            engines: {
                "html": Nunjucks
            }
    });

	// static files (css, js, etc)
	server.route(RoutesStatic.endpoints);

	// base routes (any .html file in lib/wev/views gives rise to a route)
	server.route(RoutesBase.endpoints);

	// login routes (/login, /loginAuthenticate, /logout)
	server.route(RoutesLogin.endpoints);

	// dashboard route (/dashboard)
	server.route(RoutesDashboard.endpoints);

	// cartografia route (/cartografia)
	server.route(RoutesCartografia.endpoints);

	// tilemill routes (/tilemill/*)
	server.route(RoutesTilemill.endpoints);


	
	return next();
};

exports.register.attributes = {
    name: "clima-web",
    version: "0.0.1"
};