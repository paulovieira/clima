var ApiRoutes = require("./routes");

var internals = {};

exports.register = function(server, options, next){
	server.route(ApiRoutes.endpoints)
	
	return next();
};

exports.register.attributes = {
    name: "clima-api",
    version: "0.0.1"
};