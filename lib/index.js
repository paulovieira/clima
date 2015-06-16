var Path = require("path");
var Hapi = require("hapi");
var Hoek = require("hoek");
var Config = require("config");
var Chalk = require("chalk");
var Plugins = require("./common/external-plugins");

var Utils = require("./common/utils");
var Db = require("../database");

var internals = {
	externalPlugins: [],
	api: require("./api"),
	web: require("./web")

};



// TODO: dummy api and web plugins

internals.externalPlugins.push(Plugins.good);
internals.externalPlugins.push(Plugins.chairo);
internals.externalPlugins.push(Plugins.authCookie);



internals.init = function(){

	var server = new Hapi.Server({
        app: {
            viewsList: Utils.getViewsList()
        }
    });

//    console.log("server.app.settings", server.settings.app.viewsList);

	server.connection({
    	port: Config.get("port")
	});

    // 1) register the external plugins
	server.register(internals.externalPlugins, function(err) {

	    Hoek.assert(!err, 'Failed registration of external plugins: ' + err);

        // 2) execute plugin post-registration tasks

        // 2.1) register an authentication strategy (named "session") using the "cookie" authentication scheme; at this point 
        // the "cookie" scheme is available in the server because it was registered by the hapi-auth-cookie plugin
        Utils.registerAuthStrategy(server, "session", "cookie");


        // 3) register the internal plugins
		server.register([internals.api, internals.web], function(err){

	    	Hoek.assert(!err, 'Failed registration of internal plugins: ' + err);

            // 4) start the server and finish the initialization process (load seneca actions, etc)
	    	server.start(function(err) {

		    	Hoek.assert(!err, 'Failed start server: ' + err);

                Utils.registerActions(server.seneca, Config.get("actionsDir.db"));
		    	console.log('Server started at: ' + server.info.uri);
		    });
		});    
	});

    // make sure we always have a "credentials" object on request.auth
    server.ext("onPostAuth", function(request, reply) {
        request.auth.credentials = request.auth.credentials || {};
        return reply.continue();
    });

	Utils.registerServer(server);

};

internals.init();
