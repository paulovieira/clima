var Path = require("path");
var Nunjucks = require('hapi-nunjucks');
var Config = require('config');

var RoutesStatic = require("./routes-static");
//var RoutesBase = require("./routes-base");
var RoutesLogin = require("./routes-login");
var RoutesDashboard = require("./routes-dashboard");
var RoutesCartografia = require("./routes-cartografia");
var RoutesTilemill = require("./routes-tilemill");

var internals = {};

exports.register = function(server, options, next){

    var pluginName = exports.register.attributes.name;

    // configure nunjucks
    var env = Nunjucks.configure(Config.get("viewsDir"), { 
        autoescape: false,
        watch: false,
        noCache: process.env.NODE_ENV === "production" ? true : false,
        pluginName: pluginName,
        // throwOnUndefined: false,
    });

    internals.addNunjucksFilters(env);
    internals.addNunjucksGlobals(env);

    // expose the Environment object to the outside
    server.expose("env", env);

	server.views({
        path: Config.get("viewsDir"),
        allowAbsolutePaths: true,
        engines: {
            html: Nunjucks
        },
        compileOptions: {
            pluginName: pluginName
        }
    });

	// static files (css, js, etc)
	server.route(RoutesStatic.endpoints);

	// base routes (any .html file in lib/wev/views gives rise to a route)
	//server.route(RoutesBase.endpoints);

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

internals.addNunjucksFilters = function(env){

    env.addFilter('stringify', function(str) {
        return JSON.stringify(str);
    });

    env.addFilter('lorem', function(str, size) {

        var lorem = "";
        if(!str){
            size = size || "small";

            if(size==="small"){
                lorem = "Lorem ipsum dolor sit amet, mnesarchum reprehendunt ut usu. ";
            }
            else if(size==="medium"){
                lorem = "Velit veniam munere his an, pri cu fuisset ponderum, nominavi appellantur ne mea. Vim eu malorum accumsan dissentiet. ";
            }
            else if(size==="big"){
                lorem = "Vim te altera facete conclusionemque, est stet evertitur ad. Possit periculis ocurreret sit te, pri iracundia deseruisse ad. Eum at graecis liberavisse, pro natum novum movet at. Cu mucius aliquip adversarium pro, vidisse fuisset ei mel. Causae meliore necessitatibus cu eos, doming verterem vulputate ut sed, libris commodo laoreet nam at.";
            }
            else {
                lorem = size;
            }
            
            return lorem;
        }

        return str;
    });

};

internals.addNunjucksGlobals = function(env){

    // default lang
    env.addGlobal("lang", "pt");
    env.addGlobal("NODE_ENV", process.env.NODE_ENV);
    env.addGlobal("bundles", Config.get("bundles"));
    env.addGlobal("publicUri", Config.get("publicUri"));
    env.addGlobal("publicPort", Config.get("publicPort"));
};

exports.register.attributes = {
    name: "clima-web",
    //dependencies: ["vision"]
    dependencies: []
};
