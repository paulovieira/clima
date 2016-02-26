process.env.NODE_ENV = process.env.NODE_ENV || "production";

if(!process.env.NODE_CONFIG_DIR){
    console.log("NODE_CONFIG_DIR must be set");
    process.exit(1);
}

// the NODE_ENV env variable must be defined before the config module is first required
var Path = require("path");
var Config = require("config");
var Hoek = require("hoek");
var Glue = require("glue");
var Argv = require('minimist')(process.argv.slice(2));


// prepare Fs to work with promises (in the other modules we just require("fs-extra"))
var Promise = require("bluebird");
var Fs = Promise.promisifyAll(require("fs-extra"));

//var Plugins = require("./common/external-plugins");
var Utils = require("./common/utils");
//var Db = require("../database");

// var internals = {
// //	externalPlugins: [],
// 	api: require("./api"),
// 	web: require("./web"),
// };



// TODO: dummy api and web plugins

// internals.externalPlugins.push(Plugins.good);
// internals.externalPlugins.push(Plugins.chairo);
// internals.externalPlugins.push(Plugins.authCookie);


/*
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
*/
//internals.init();




// COMPOSE

var manifest = {

    server: {
        app: {
            viewsList: Utils.getViewsList()
        },

        //  default connections configuration
        connections: {

            // controls how incoming request URIs are matched against the routing table
            router: {
                isCaseSensitive: false,
                stripTrailingSlash: true
            },

            // default configuration for every route.
            routes: {
                state: {
                    // determines how to handle cookie parsing errors ("ignore" = take no action)
                    failAction: "ignore"
                },

                // disable node socket timeouts (useful for debugging)
                timeout: {
                    server: false,
                    socket: false
                }
            }
        },

    },

    connections: [
        {
            host: "localhost",
            port: Config.get("port")
        }
    ],

    plugins: [

        {
            "good": {
                reporters: [{
                    reporter: require("good-console"),
                    events: {
                        //ops: "*",
                        log: "*", // maps to the "log" event 
                        response: "*", // maps to either the "response" or "tail" event
                        error: "*", // maps to the "request-error" event
                        request: "*" // maps to the hapi "request" event (generated by request.log())
                    }
                }]
            }
        },
/*
        {
            "blipp": {
                showAuth: true
            }
        },

        {
            "inert": {

            }
        },

        // dependencies:
        {
            "./routes-static": {

            }
        },

        {
            "vision": {

            }
        },
*/
        {
            "chairo": {
                log: "silent"
            }
        },

        {
            "hapi-auth-cookie": {

            }
        },
/*
        // dependencies:
        {
            "./hapi-auth-session-memory": {
                loginPath: "/login",
                logoutPath: "/logout",
                successRedirectTo: "/dashboard",
                validateLoginData: function(request, next){
debugger;
                    var authFailed;
                    var user = request.payload.user, password = request.payload.password;

                    //    Possible reasons for a failed authentication
                    //     - "missing username or password" (won't even connect to the DB)
                    //     - "username does not exist" 
                    //     - "wrong password" (username exists but password doesn't match)
                    
                    if (!user || !password) {
                        authFailed = "missing";
                    }
                    else if(user.toLowerCase() !== internals.validUser.toLowerCase()){
                        authFailed = "unknown-user";
                    }
                    else if(password.toLowerCase() !== internals.validPassword.toLowerCase()){
                        authFailed = "wrong-password";
                    }

                    if(authFailed){
                        return next(Boom.unauthorized("/login?auth-fail-reason=" + authFailed));
                    }

                    // if we arrive here, the username and password match
                    var loginData = {
                        user: user
                    };

                    return next(undefined, loginData);
                },

                // strategy options - see hapi-auth-cookie and the options to server.auth.strategy
                // in the main docs; if some option is not given, the defaults will be used
                ironPassword: Config.get("ironPassword"),
                isSecure: false,
                clearInvalid: true,
                appendNext: true,
                redirectOnTry: true,
                //ttl: internals["3 hours"],
            }
        },
*/

        {
            "hapi-tilelive": {
            //"/home/pvieira/github/hapi-tilelive": {
                source: Path.join(Config.get("tilemill.files"), "export"),
                routePath: "/api/v1/tiles/{mapId}/{z}/{x}/{y}",

                // options for Chokidar.watch
                watch: {
                    cwd: Path.join(Config.get("tilemill.files"), "export"),
                    ignoreInitial: true,
                    ignored: "*.export*",
                    awaitWriteFinish: {
                        stabilityThreshold: 1000,
                        pollInterval: 500
                    }
                }
            }
        },


        {
            "hapi-tilemill": {
            // "/home/pvieira/clima-app/hapi-tilemill": {
                files: Config.get("tilemill.files"),
                port: Config.get("tilemill.port"),
                tilePort: Config.get("tilemill.tilePort"),
                coreUrl: Config.get("tilemill.coreUrl"),
                tileUrl: Config.get("tilemill.tileUrl"),
                updates: Config.get("tilemill.updates"),
                delay: Config.get("tilemill.delay"),

                db: {
                    host: Config.get("db.postgres.host"),
                    port: Config.get("db.postgres.port"),
                    user: Config.get("db.postgres.username"),
                    password: Config.get("db.postgres.password"),
                    database: Config.get("db.postgres.database"),
                }
            }
        },
        /*
*/
        // dependencies:
  
        {   
            "./web": {

            }
        },

/*
        // dependencies:
        {
            "./routes-login": {

            }
        },

        {   
            "./web-routes": {
            }
        },
*/
        {   
            "./api": {
            }
        }

    ]
};

// dinamically load the views plugin
manifest.plugins.push({});
manifest.plugins[manifest.plugins.length-1][Config.get("baseViewsPlugin")] = {};



var options = {
    relativeTo: __dirname,
    prePlugins: function(server, next){
        next();
    }
};

Glue.compose(manifest, options, function (err, server) {

    Hoek.assert(!err, 'Failed registration of one or more plugins: ' + err);

    // add custom filters and globals to nunjucks
    //Utils.configureNunjucks();

    // 2.1) register an authentication strategy (named "session") using the "cookie" authentication scheme; at this point 
    // the "cookie" scheme is available in the server because it was registered by the hapi-auth-cookie plugin
    Utils.registerAuthStrategy(server, "session", "cookie");

    // make sure we always have a "credentials" object on request.auth
    server.ext("onPostAuth", function(request, reply) {
        request.auth.credentials = request.auth.credentials || {};
        return reply.continue();
    });

    if(Argv["dev-no-auth"]==="true"){
        Utils.addFakeAuth(server);
    }

    server.app.staticCache = server.cache({
        segment: "static",
        expiresIn: 5000
    });

    Utils.registerServer(server);

    // start the server and finish the initialization process
    server.start(function(err) {

        Hoek.assert(!err, 'Failed start server: ' + err);

        Utils.registerActions(server.seneca, Config.get("actionsDir.db"));
        console.log('Server started at: ' + server.info.uri);
        console.log("Hapi version: " + server.version);
        console.log("NODE_ENV: ", process.env.NODE_ENV);
    });
});
