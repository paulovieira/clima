var Hoek = require("hoek");
var Config = require("config");
var Bcrypt = require("bcrypt");
var UUID = require('node-uuid');
var _ = require("underscore");
var Utils = require("../common/utils");
var CommonConfig = require("./common-config");



var internals = {};
internals.config = {};

internals.config.login = Hoek.applyToDefaults(CommonConfig.config, {

    handler: function(request, reply) {

        if (request.auth.isAuthenticated) {
            console.log("loginForm handler: valid cookie, will now redirect to /" + request.params.lang + "/dashboard");
            return reply.redirect("/" + request.params.lang + "/dashboard");
        }

        var context = {
            texts: _.indexBy(request.pre.texts, "id"),
            auth: request.auth,
            urlParam1: "login",
            lfr: request.query.lfr || "" // login fail reason
        }

        return reply.view('login', {
            ctx: context
        });
    }
});

internals.config.loginAuthenticate = Hoek.applyToDefaults(CommonConfig.config, {

    handler: function(request, reply) {

        //return reply.redirect("/" + request.params.lang + "/login?lfr=1");



        var email = request.payload.username,
            password = request.payload.password,
            statusCode;


        if (request.auth.isAuthenticated) {
            console.log("loginAuthenticate handler: is already authenticated, will now redirect to /lang/dashboard");
            return reply.redirect("/" + request.params.lang + "/dashboard");
        }

        /*
            Possible values for authentication status codes
            2 - "missing username or password" (won't even connect to the DB)
            3 - "username does not exist" 
            4 - "wrong password" (username exists but password doesn't match)
        */

        // status 2 - payload is missing username or password
        if (!email || !password) {
            statusCode = 2;  // "missing username or password"
            return reply.redirect("/" + request.params.lang + "/login?lfr=" + statusCode);
        }

        var query = [{email: email}];
        request.server.seneca.act({role: "users", cmd: "read", query: query, raw: true}, function(err, data){

            // status 3 - the provided username (email) does not exist in the "users" table
            if(err && err.isBoom && err.output.statusCode === 404){

                statusCode = 3;  // "username does not exist" 
                return reply.redirect("/" + request.params.lang + "/login?lfr=" + statusCode);
            }

            var passwordIsCorrect = Bcrypt.compareSync(password, data[0]["pw_hash"]);

            // status 4 - the provided password is incorrect (for the corresponding provided username)
            if(!passwordIsCorrect){
                statusCode = 4;  // "wrong password"
                return reply.redirect("/" + request.params.lang + "/login?lfr=" + statusCode);
            }

            // if we arrive here, the username and password match
            Utils.log(["auth"], "password is correct for user " + data[0]["email"]);
            
            //console.log("data[0]", data[0]);
            var usersGroups = data[0]["user_groups"];
            var credentials = {
                id:        data[0]["id"],
                firstName: data[0]["first_name"],
                lastName:  data[0]["last_name"],
                email:     data[0]["email"],

                // will be true if the user belongs to the group "admin"
                isAdmin:      !! _.findWhere(usersGroups, {code: 99}),  

                // will be true if the user belongs to some group that has the
                // canEditTexts permission
                canEditTexts: !! _.chain(usersGroups).pluck("permissions").findWhere({canEditTexts: true}).value()
            };

            // a user in the admin group can always edit texts (force the property to be always true)
            if(credentials.isAdmin){
                credentials.canEditTexts = true;
            }

            console.log("credentials: ", credentials);


            // set the session in the internal cache (Catbox with memory adapter)
            var uuid = UUID.v4();
            request.server.app.cache.set(
                uuid, 
                {
                    //account: credentials
                    sessionData: credentials
                }, 
                0, 
                function(err) {
                    debugger;
                    if (err) {
                        return reply(err);
                    }

                    request.auth.session.set({
                        sid: uuid
                    });

                    Utils.log(["auth"], "session data was set in catbox: \n  key: " + uuid + " \n  value: " + JSON.stringify(credentials));

                    return reply.redirect("/" + request.params.lang + "/dashboard");
                }
            );

        });

    }
});

internals.config.logout = Hoek.applyToDefaults(CommonConfig.config, {

    handler: function(request, reply) {

        if(!request.auth.isAuthenticated){
            return reply.redirect("/" + request.params.lang);
        }

        var sessionKey;
        if(request.auth.artifacts && request.auth.artifacts.sid){
            sessionKey = request.auth.artifacts.sid;
        }


        /// ??? - look better at this (calling clear with no arguments is working, but the session is not cleared in the server)
        // we must clear the session from catbox somehow

        // the example in https://github.com/hapijs/hapi-auth-cookie/blob/master/example/index.js
        // should be doing that as well

        // if(sessionKey){
        //     request.auth.session.clear(sessionKey);
        // }
        // else{
        //     request.auth.session.clear();
        // }

        request.auth.session.clear();

        request.server.app.cache.drop(sessionKey || "1234", function(err){
//            debugger;
            if(err){
                console.log("   session was cleared in the browser but not in the server, will now redirect to /lang");
            }
            else{
                console.log("   session was cleared in the browser and in the server, will now redirect to /lang");    
            }
            
            return reply.redirect("/" + request.params.lang);
        })
    }
});

internals.config.recover = Hoek.applyToDefaults(CommonConfig.config, {

    handler: function(request, reply) {


    }
});


exports.endpoints = [

    {
        path: "/{lang}/login",
        method: "GET",
        config: internals.config.login
    },


    {
        path: "/{lang}/loginAuthenticate",
        method: "POST",
        config: internals.config.loginAuthenticate
    },

    {
        path: "/{lang}/logout",
        method: "GET",
        config: internals.config.logout
    },

    {
        path: "/{lang}/recover",
        method: "GET",
        config: internals.config.recover
    }
];