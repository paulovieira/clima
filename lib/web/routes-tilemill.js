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

internals.config.tilemillGeneralRequest = {

    handler: {
        proxy: {
            mapUri: function(request, cb){
                console.log("proxy: tilemill general request: http://localhost:20009" + request.path );
                return cb(null, "http://localhost:20009" + request.path);
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
        config: internals.config.tilemillGeneralRequest
    },

    {
        path: "/status/{anyPath*}",
        method: "GET",
        config: internals.config.tilemillGeneralRequest
    },

    {
        path: "/restart/{anyPath*}",
        method: "GET",
        config: internals.config.tilemillGeneralRequest
    },

    {
        path: "/manual/{anyPath*}",
        method: "GET",
        config: internals.config.tilemillGeneralRequest
    },

    {
        path: "/oauth/{anyPath*}",
        method: "GET",
        config: internals.config.tilemillGeneralRequest
    },

    {
        path: "/tile/{anyPath*}",
        method: "GET",
        config: internals.config.tilemillGeneralRequest
    },

    {
        path: "/datasource/{anyPath*}",
        method: "GET",
        config: internals.config.tilemillGeneralRequest
    },

    {
        path: "/clear-mapnik-cache/{anyPath*}",
        method: "GET",
        config: internals.config.tilemillGeneralRequest
    },

    {
        path: "/export/{anyPath*}",
        method: "GET",
        config: internals.config.tilemillGeneralRequest
    },

    {
        path: "/api/Project/{anyPath*}",
        method: "GET",
        config: internals.config.tilemillGeneralRequest
    },

    {
        path: "/api/Project/{anyPath*}",
        method: "PUT",
        config: internals.config.tilemillGeneralRequest
    },

    {
        path: "/api/updatesVersion/{anyPath*}",
        method: "GET",
        config: internals.config.tilemillGeneralRequest
    },

    {
        path: "/api/Error/{anyPath*}",
        method: "GET",
        config: internals.config.tilemillGeneralRequest
    },

    {
        path: "/api/Export/{anyPath*}",
        method: "GET",
        config: internals.config.tilemillGeneralRequest
    },

    {
        path: "/api/Export/{anyPath*}",
        method: "PUT",
        config: internals.config.tilemillGeneralRequest
    },

    {
        path: "/api/Preview/{anyPath*}",
        method: "GET",
        config: internals.config.tilemillGeneralRequest
    },

    {
        path: "/api/Config/{anyPath*}",
        method: "GET",
        config: internals.config.tilemillGeneralRequest
    },

    {
        path: "/api/Favorite/{anyPath*}",
        method: "GET",
        config: internals.config.tilemillGeneralRequest
    },

    {
        path: "/api/Library/{anyPath*}",
        method: "GET",
        config: internals.config.tilemillGeneralRequest
    },

    {
        path: "/api/Page/{anyPath*}",
        method: "GET",
        config: internals.config.tilemillGeneralRequest
    },

    {
        path: "/api/Plugin/{anyPath*}",
        method: "GET",
        config: internals.config.tilemillGeneralRequest
    },

    {
        path: "/api/Key/{anyPath*}",
        method: "GET",
        config: internals.config.tilemillGeneralRequest
    },



    // {
    //     path: ,
    //     method: "GET",
    //     config: internals.config.tilemillGeneralRequest
    // },




];