var Hoek = require("hoek");
var Config = require("config");
var _ = require("underscore");
var Utils = require("../common/utils");
var CommonConfig = require("./common-config");

var internals = {};
internals.config = {};

internals.config.dashboard = Hoek.applyToDefaults(CommonConfig.config, {

    handler: function(request, reply) {

//console.log("dashboard request.headers: ", request.headers);

    	Utils.logCallsite(Hoek.callStack()[0]);

        // when NODE_ENV is "dev-no-auth", the route's auth configuration is set to false
        if(Config.get('hapi.auth')!==false){
            if(!request.auth.isAuthenticated){
                Utils.serverLog(["auth"], "requested " + request.path + " but authentication failed - will now redirect to /{lang}/login");
                return reply.redirect("/" + request.params.lang + "/login");
            }
        }
        else{
        	request.auth.credentials = Hoek.clone(Config.get("hapi.dummyCredentials"));
        }

//        console.log("request.auth.credentials", request.auth.credentials);


        var context = {
            texts:      _.indexBy(request.pre.texts, "id"),
            textsArray: request.pre.texts,
            // files:      request.pre.files,
            // filesArray: request.pre.filesArray,
            auth:       request.auth,
            urlParam1:  "dashboard",
        };

        return reply.view('dashboard', {
            ctx: context
        });

        // TODO: call reply
    }
});



exports.endpoints = [

    {
        path: "/{lang}/dashboard",
        method: "GET",
        config: internals.config.dashboard
    }


];