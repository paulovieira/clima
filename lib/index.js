var Osenv = require("osenv");
var Path = require("path");

// the NODE_ENV and TILEMILL_FILES_DIR env variables should be defined before 
// the node process is started; if not defined we use the following defaults;
process.env.NODE_ENV = process.env.NODE_ENV || "production";
process.env.TILEMILL_FILES_DIR = process.env.TILEMILL_FILES_DIR || Path.join(Osenv.home(), "tilemill-files");

// the above env variables must be defined before the config module is first required
var Config = require("config");

var Hapi = require("hapi");
var Hoek = require("hoek");

// prepare Fs to work with promises (in the other modules we just require("fs-extra"))
var Promise = require("bluebird");
var Fs = Promise.promisifyAll(require("fs-extra"));

var Plugins = require("./common/external-plugins");
var Utils = require("./common/utils");
var Db = require("../database");

var internals = {
	externalPlugins: [],
	api: require("./api"),
	web: require("./web"),
};



// TODO: dummy api and web plugins

internals.externalPlugins.push(Plugins.good);
internals.externalPlugins.push(Plugins.chairo);
internals.externalPlugins.push(Plugins.authCookie);



internals.init = function(){
   

    var serverOptions = {
        app: {
            viewsList: Utils.getViewsList()
        }
    };
    var defaultServerOptions = JSON.parse(JSON.stringify(Config.get("hapi.server")));

    // add custom filters and globals to nunjucks
    Utils.configureNunjucks();

    var server = new Hapi.Server(Hoek.merge(serverOptions, defaultServerOptions));
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
                console.log('This is Hapi ' + server.version);
		    });
		});    
	});

    // server.ext('onRequest', function (request, reply) {

    //     // make pathname case insensitive (useful for static assets, which are always in lowercase)

    //     // NOTE: this will confict with the requests to the tilemill API, which uses uppercase letters
    //     request.setUrl(request.path.toLowerCase());
    //     return reply.continue();

    // });


    // make sure we always have a "credentials" object on request.auth
    server.ext("onPostAuth", function(request, reply) {
        request.auth.credentials = request.auth.credentials || {};
        return reply.continue();
    });

    if(process.env.NODE_ENV==="dev-no-auth"){

        server.after(function(s, next){

            var credentials = {
                id: Config.get('hapi.dummyCredentials.id'),
                firstName: Config.get('hapi.dummyCredentials.firstName'),
                lastName: Config.get('hapi.dummyCredentials.lastName'),
                email: Config.get('hapi.dummyCredentials.email'),

                isAdmin: Config.get("hapi.dummyCredentials.isAdmin"),
                canEditTexts: Config.get("hapi.dummyCredentials.canEditTexts"),
                canDeleteTexts: Config.get("hapi.dummyCredentials.canDeleteTexts"),
                canEditMaps: Config.get("hapi.dummyCredentials.canEditMaps"),
                canDeleteMaps: Config.get("hapi.dummyCredentials.canDeleteMaps"),
                canEditFiles: Config.get("hapi.dummyCredentials.canEditFiles"),
                canDeleteFiles: Config.get("hapi.dummyCredentials.canDeleteFiles")
            };

            // copy-paste from the validateFunc used in hapi-auth-cookie
            var uuid = "123456789";
            server.app.cache.set(
                uuid, 
                {
                    sessionData: credentials
                }, 
                0, 
                function(err) {

                    if (err) { throw new Error("fake auth") };
                    Utils.serverLog(["auth"], "Fake session data was set in catbox: \n  key: " + uuid + " \n  value: " + JSON.stringify(credentials));
                }
            );

            server.ext("onPreAuth", function(request, reply) {

                // fake parsed cookies (note that it might even happen that the browser 
                // isn't even sending any cookies)
                request.state = { sid: { sid: '123456789' } };                
                return reply.continue();
            });

            next();

        });

    }


    server.app.staticCache = server.cache({
        segment: "static",
        expiresIn: 5000
    });

	Utils.registerServer(server);

};

internals.init();
