var Hoek = require("hoek");
var Config = require("config");
//var _ = require("underscore");
var Utils = require("../common/utils");
var CommonConfig = require("./common-config");

var internals = {};
internals.config = {};



internals.config.tilemillHome = {

    handler: function(request, reply) {

    	Utils.logCallsite(Hoek.callStack()[0]);

        // when NODE_ENV is "dev-no-auth", the route's auth configuration is set to false
        if(Config.get('hapi.auth')!==false){
            if(!request.auth.isAuthenticated){
                Utils.log(["auth"], "requested " + request.path + " but authentication failed - will now redirect to /{lang}/login");
                return reply.redirect("/" + request.params.lang + "/login");
            }
        }
        else{
        	request.auth.credentials = Hoek.clone(Config.get("hapi.dummyCredentials"));
        }

        var context = {
            auth: request.auth,
            lang: request.params.lang
        }

        return reply.view('tilemill', {
            ctx: context
        });
    }

};

internals.getQueryString = function(queryObj){
    var qs = "";
    for(key in queryObj){
        qs += key + "=" + encodeURIComponent(queryObj[key]) + "&";
    }

    return qs.slice(0, -1);
}

internals.config.tilemillGeneralRequest20009 = {

    handler: {
        proxy: {
            mapUri: function(request, cb){

                var proxyUrl = "http://localhost:20009" + 
                                request.path + 
                                (Object.keys(request.query).length ? "?" + internals.getQueryString(request.query) : "");

                console.log("    proxy request: ", proxyUrl);
                console.log("    request.query: ", request.query);

                return cb(null, proxyUrl);
            },
            passThrough: true
        }
    },
    auth: false
};

internals.config.tilemillGeneralRequest20008 = {

    handler: {
        proxy: {
            mapUri: function(request, cb){

                var proxyUrl = "http://localhost:20008" + 
                                request.path + 
                                (Object.keys(request.query).length ? "?" + internals.getQueryString(request.query) : "");

                console.log("    proxy request: ", proxyUrl);
                console.log("    request.query: ", request.query);

                return cb(null, proxyUrl);
            },
            passThrough: true
        }
    },
    auth: false
};

exports.endpoints = [

    {
        path: "/{lang}/tilemill",
        method: "GET",
        config: internals.config.tilemillHome
    },

    {
        path: "/assets/{anyPath*}",
        method: "GET",
        config: internals.config.tilemillGeneralRequest20009
    },

    {
        path: "/status/{anyPath*}",
        method: "GET",
        config: internals.config.tilemillGeneralRequest20008
    },

    // {
    //     path: "/status/{anyPath"*"}",
    //     method: "GET",
    //     config: internals.config.tilemillGeneralRequest20009
    // },

    // TODO: this endpoint should be accessed only by admins
    {
        path: "/restart/{anyPath*}",
        method: "POST",
        config: internals.config.tilemillGeneralRequest20008
    },

    {
        path: "/manual/{anyPath*}",
        method: "GET",
        config: internals.config.tilemillGeneralRequest20009
    },

    {
        path: "/oauth/{anyPath*}",
        method: "GET",
        config: internals.config.tilemillGeneralRequest20009
    },

    {
        path: "/tile/{anyPath*}",
        method: "GET",
        config: internals.config.tilemillGeneralRequest20008
    },

    {
        path: "/datasource/{anyPath*}",
        method: ["GET", "OPTIONS"],
        config: internals.config.tilemillGeneralRequest20008
    },

    {
        path: "/clear-mapnik-cache/{anyPath*}",
        method: "GET",
        config: internals.config.tilemillGeneralRequest20008
    },

    {
        path: "/export/{anyPath*}",
        method: "GET",
        config: internals.config.tilemillGeneralRequest20009
    },

    {
        path: "/api/Project/{anyPath*}",
        method: ["GET", "PUT", "DELETE"],
        config: internals.config.tilemillGeneralRequest20009
    },

    {
        path: "/api/updatesVersion/{anyPath*}",
        method: "GET",
        config: internals.config.tilemillGeneralRequest20009
    },

    {
        path: "/api/Error/{anyPath*}",
        method: "GET",
        config: internals.config.tilemillGeneralRequest20009
    },

    {
        path: "/api/Export/{anyPath*}",
        method: ["GET", "PUT", "DELETE"],
        config: internals.config.tilemillGeneralRequest20009
    },

    {
        path: "/api/Preview/{anyPath*}",
        method: "GET",
        config: internals.config.tilemillGeneralRequest20009
    },

    {
        path: "/api/Config/{anyPath*}",
        method: "GET",
        config: internals.config.tilemillGeneralRequest20009
    },

    {
        path: "/api/Favorite/{anyPath*}",
        method: "GET",
        config: internals.config.tilemillGeneralRequest20009
    },

    {
        path: "/api/Library/{anyPath*}",
        method: "GET",
        config: internals.config.tilemillGeneralRequest20009
    },

    {
        path: "/api/Page/{anyPath*}",
        method: "GET",
        config: internals.config.tilemillGeneralRequest20009
    },

    {
        path: "/api/Plugin/{anyPath*}",
        method: "GET",
        config: internals.config.tilemillGeneralRequest20009
    },

    {
        path: "/api/Key/{anyPath*}",
        method: "GET",
        config: internals.config.tilemillGeneralRequest20009
    },



    // {
    //     path: ,
    //     method: "GET",
    //     config: internals.config.tilemillGeneralRequest20009
    // },




];