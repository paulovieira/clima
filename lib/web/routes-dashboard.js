var Hoek = require("hoek");
var Config = require("config");
var Utils = require("../common/utils");
var Validate = require("../common/validate");
var Pre = require("../common/prerequisites");
var CommonConfig = require("./common-config");

var internals = {};
internals.config = {};

internals.config.dashboard = Hoek.applyToDefaults(CommonConfig.config, {

    handler: function(request, reply) {


    }
});



exports.endpoints = [

    {
        path: "/{lang}/dashboard",
        method: "GET",
        config: internals.config.dashboard
    }


];