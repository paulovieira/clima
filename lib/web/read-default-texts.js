var Fs = require("fs");
var Path = require("path");
var Config = require('config');
var JSON5 = require('json5');
// var Hapi = require("hapi");
// var Nunjucks = require('hapi-nunjucks');


// var RoutesStatic = require("./routes-static");
// var RoutesBase = require("./routes-base");
// var RoutesLogin = require("./routes-login");
// var RoutesDashboard = require("./routes-dashboard");
// var RoutesCartografia = require("./routes-cartografia");
// var RoutesTilemill = require("./routes-tilemill");

var internals = {};

exports.register = function(server, options, next){

    var path = Path.join(Config.get("rootDir"), "database", "populate-initial-data", "texts.json");
    
    try{
        server.app.defaultTexts = 
            JSON5.parse(Fs.readFileSync(path, "utf8"))
                .map(function(obj){

                    if(obj.readFromInclude){

                        var path = Path.join(Config.get("rootDir"), "lib", "web", "views", "includes", obj.contents);
                        var incContents = Fs.readFileSync(path, "utf8");

                        obj.contents = {
                            pt: incContents,
                            en: incContents
                        };
                    }

                    return obj;
                });

        return next();
    }
    catch(e){

        // if there was an error reading/parsing the json files, abort the server initialization
        return next(e);
    }

};

exports.register.attributes = {
    name: "clima-read-default-texts",
    version: "0.0.1"
};