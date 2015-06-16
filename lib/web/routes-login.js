var Hoek = require("hoek");
var Config = require("config");
var Utils = require("../common/utils");
var Validate = require("../common/validate");
var Pre = require("../common/prerequisites");
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
            texts: request.pre.texts,
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

        return reply.redirect("/" + request.params.lang + "/login?lfr=1");



        var email = request.payload.username,
            password = request.payload.password,
            status_code;


        if (request.auth.isAuthenticated) {
            console.log("loginAuthenticate handler: is already authenticated, will now redirect to /lang/dashboard");
            return reply.redirect("/" + request.params.lang + "/dashboard");
        }

        /*
            Possible values for status_code/status_message:
            1 - "ok" (the provided username and password match)
            2 - "missing username or password" (won't even connect to the DB)
            3 - "username does not exist" 
            4 - "wrong password" (username exists but password doesn't match)
        */

        if (!email || !password) {
            status_code = 2;  // "missing username or password"
            return reply.redirect("/" + request.params.lang + "/login?lfr=" + status_code);
        }

/*
        var usersC = new BaseC();
        usersC
            .execute({
                query: {
                    command: "select * from users_read($1)",
                    arguments: JSON.stringify([{email: email}])
                }
            })
            .done(
                function() {

                    if (usersC.length === 0) {
                        status_code = 3;  // "username does not exist" 
                        return reply.redirect("/" + request.params.lang + "/login?lfr=" + status_code);
                    }

                    var res = Bcrypt.compareSync(password, usersC.at(0).get("pwHash"));

                    if (res === false) {
                        status_code = 4;  // "wrong password"
                        return reply.redirect("/" + request.params.lang + "/login?lfr=" + status_code);
                    }

                    // if we get here, the username and password match
                    console.log( Chalk.bgGreen("    ") + Chalk.bgYellow(" authentication succeeded for " + usersC.at(0).get("email") ) + Chalk.bgGreen("    "));
debugger;
                    var usersGroups = usersC.at(0).get("userGroups");
console.log("usersC.at(0)", usersC.at(0).toJSON());
console.log("usersGroups", usersGroups);
                    var credentials = {
                        id:           usersC.at(0).get("id"),
                        firstName:    usersC.at(0).get("firstName"),
                        lastName:     usersC.at(0).get("lastName"),
                        email:        usersC.at(0).get("email"),

                        // will be true if the user belongs to the group "admin"
                        isAdmin:      !! _.findWhere(usersGroups, {code: 99}),  

                        // will be true if the user belongs to some group that has the
                        // canEditTexts permission
                        canEditTexts: !! _.chain(usersGroups).pluck("permissions").findWhere({canEditTexts: true}).value()
                    };

                    // a user in the admin group can always edit texts
                    if(credentials.isAdmin){
                        credentials.canEditTexts = true;
                    }

                    // set the session in the internal cache (Catbox with memory adapter)
                    var uuid = UUID.v4();
                    request.server.app.cache.set(
                        uuid, 
                        {
                            account: credentials
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

                            console.log(Chalk.bgGreen("    ") + Chalk.bgYellow(" session was set in catbox ") + Chalk.bgGreen("    "));
                            console.log("    credentials:\n", credentials);
                            console.log("    will now redirect to /lang/dashboard");

                            return reply.redirect("/" + request.params.lang + "/dashboard");
                        }
                    );

                },
                function() {
                    return reply(Boom.badImplementation());
                }
            );
*/
    }
});

internals.config.logout = Hoek.applyToDefaults(CommonConfig.config, {

    handler: function(request, reply) {


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