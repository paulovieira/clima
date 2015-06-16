var Hapi = require("hapi");
var Nunjucks = require('hapi-nunjucks');
var Config = require('config');

var RoutesStatic = require("./routes-static");
var RoutesBase = require("./routes-base");

var internals = {};

exports.register = function(server, options, next){

	server.views(Config.get("hapi.views"));

	// static files (css, js, etc)
	server.route(RoutesStatic.endpoints);

	// base routes (Authenticate, Dashboard, etc)
	server.route(RoutesBase.endpoints);


	
	return next();
};

exports.register.attributes = {
    name: "clima-web",
    version: "0.0.1"
};