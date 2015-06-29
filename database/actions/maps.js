// Prepare yourself, this is where the dirty stuff lives!
// access the database to interact with the data

var Path = require("path");
var Fs = require("fs-extra");
var Hoek = require("hoek");
var Boom = require("boom");
var ChangeCase = require("change-case-keys");
var Glob = require("glob");
var Config = require("config");
var ReadFiles = require('read-multiple-files');
// var Promise = require("bluebird");
// var ReadFiles = Promise.promisifyAll(require('read-multiple-files'));

var _ = require("underscore");
var _s = require("underscore.string");
var Utils = require("../../lib/common/utils");



var internals = {};

module.exports = function(options){

    var seneca = this;

    seneca.add("role:maps, cmd:readAll", internals.mapsReadAll);
    seneca.add("role:maps, cmd:read",    internals.mapsRead);
    seneca.add("role:maps, cmd:create",  internals.mapsCreate);
    seneca.add("role:maps, cmd:delete",  internals.mapsDelete);
};

internals.transformMap = {

    // a) properties to be maintained 
    "id": "id",
    "name": "name",
    "description": "description",
    "bounds": "bounds",
    "center": "center",
    "format": "format",
    "minzoom": "minzoom",
    "maxzoom": "maxzoom",
    "srs": "srs",
    "scale": "scale",
    "legend": "legend",
    
    // tileJson properties added in internals.addMissingKeys
    "tilejson": "tilejson",
    "attribution": "attribution",
    "tiles": "tiles",
    "grids": "grids",
    "template": "template"

    // d) deleted properties: "Stylesheet", "Layer", "interactivity", "metatile"

};


// adds the missing TileJSON keys (not present in project.mml); only in read (not in readAll)
internals.addMissingKeys = function(args, obj){

    // get an array of all the mbtiles exports relative to this map,
    // and order them by data (the last one will be the most recent one)

    // TODO: cache the stat information
    var mbtiles = Glob.sync(args.tilemillFilesDir + "/export/" + obj.id + "*.mbtiles");
    mbtiles.sort(function(a, b){
        return Fs.statSync(a).mtime.getTime() - Fs.statSync(b).mtime.getTime()
    })

    var tilesBaseAddress = "/api/v1/tiles/" + Path.basename(mbtiles.pop(), ".mbtiles");

    obj.tilejson = "2.0.0";
    obj.attribution = "";
    obj.tiles = [ tilesBaseAddress + "/{z}/{x}/{y}.png" ];
    obj.grids = [ tilesBaseAddress + "/{z}/{x}/{y}.grid.json" ];
    
    // the template property required a bit of logic:
    var teaser   = "{{#__teaser__}}{{/__teaser__}}";
    var full     = "{{#__full__}}{{/__full__}}";
    var location = "{{#__location__}}{{/__location__}}";

    if(obj.interactivity){
        if(obj.interactivity.template_location){
            location = "{{#__location__}}" + obj.interactivity.template_location + " {{/__location__}}";
        }

        if(obj.interactivity.template_teaser){
            teaser = "{{#__teaser__}}" + obj.interactivity.template_teaser + "{{/__teaser__}}";
        }
        else if(obj.interactivity.template_full){
            full = "{{#__full__}}" + obj.interactivity.template_full + "{{/__full__}}";
        }
    }

    obj.template = location + teaser + full;

};


internals.readProjectFiles = function(projectFiles, mapsIds, method, args, done){

    // TODO: use ReadFilesAsync module using Bluebird promises

    var output = [];
    ReadFiles(projectFiles, 'utf8', function(err, contentsArray) {

        if (err) {
            return done(Boom.badImplementation(err.message, err));
        }

        // note:  the order in the elements in contentsArray, projectFiles and mapsIds match
        contentsArray.forEach(function(json, index){

            try {
                var obj = JSON.parse(json);

                // the map id is the name of the directory
                obj.id = mapsIds[index];

                if(method==="read"){
                    internals.addMissingKeys(args, obj);
                }
                output.push(obj);
            }
            catch(err){
                return done(Boom.badImplementation("Invalid json in some .mml file: " + err.message));
            }
        });

        if (output.length === 0) {
            throw Boom.notFound("The resource does not exist.");
        }

        output = args.raw === true ? output : Hoek.transform(output, internals.transformMap);

        // if we are fetching only 1 map (which is the common case), we actually want
        // a json object (that's what mapbox.js is expecting for tilejson)
        if(method==="read" && output.length === 1){
            return done(null, output[0]);
        }

        return done(null, output);
    });

};


// action handlers for read, readAll, create, update and delete
// (and possibly others); this is the place where we actually fetch the data from the database;

internals.mapsReadAll = function(args, done){

    Utils.logCallsite(Hoek.callStack()[0]);

    // Glob returns an array of paths; note the "/" at the end - it will match only directories
    var projectsDir  = Glob.sync(args.tilemillFilesDir + "/project/*/");

    var mapsIds = projectsDir
                    .map(function(path){
                        var temp = path.split("/");
                        return temp[temp.length-2];
                    });

    var projectFiles = projectsDir
                        .map(function(path){ 
                            return path + "project.mml"; 
                        });

    return internals.readProjectFiles(projectFiles, mapsIds, "readAll", args, done);
};

internals.mapsRead = function(args, done){

    Utils.logCallsite(Hoek.callStack()[0]);

    args.ids = args.ids.map(function(obj){

        var id = obj.id;
        if(id.slice(-5) === ".json"){
            return { id: id.substr(0, id.length-5)};
        }
        return obj;
    });

    // Glob returns an array of paths; note the "/" at the end - it will match only directories
    var projectsDir  = Glob
                        .sync(args.tilemillFilesDir + "/project/*/")
                        .filter(function(path){
                            var temp = path.split("/");
                            var mapId = temp[temp.length-2];
                            return _.findWhere(args.ids, {id: mapId});
                        });

    var mapsIds = projectsDir
                    .map(function(path){
                        var temp = path.split("/");
                        return temp[temp.length-2];
                    });

    var projectFiles = projectsDir
                        .map(function(path){ 
                            return path + "project.mml"; 
                        });

    return internals.readProjectFiles(projectFiles, mapsIds, "read", args, done);
};


internals.mapsCreate = function(args, done){

    Utils.logCallsite(Hoek.callStack()[0]);

    var mapName = args.payload[0].name;
    var mapDescription = args.payload[0].description;
    var mapId = _s.slugify(mapName);

    if(_.findWhere(args.pre.maps, {id: mapId})){
        mapId = mapId + "-" + Utils.getRandomString();
    }

    // copy the directory with the default project to the "projects" directory;
    // for TileMill this will efectively create a new project
    var defaultProjectDir = Path.join(Config.get("rootDir"), "data/tilemill-default-project");
    var newProjectDir     = Path.join(args.tilemillFilesDir, "project", mapId);
    var newProjectOptions = Path.join(args.tilemillFilesDir, "project", mapId, "project.mml");

    // step 1: copy the directory of the default project
    Fs.copyAsync(defaultProjectDir, newProjectDir)

        // step 2: read the json file "project.mml" (in the directory of the new project)
        .then(function(){

            return Fs.readJsonAsync(newProjectOptions);
        })

        // step 3: update the properties and update the json file (write)
        .then(function(obj){

            obj["id"] = mapId;
            obj["name"] = mapName;
            obj["description"] = mapDescription;
            return Fs.writeJsonAsync(newProjectOptions, obj);
        })
        .then(function(){

            return done(null, {id: mapId, name: mapName, description: mapDescription});
        })
        .catch(SyntaxError, function(err){

            return done(Boom.badImplementation("SyntaxError (invalid json?): " + err.message));
        })
        .error(function(err){

            return done(Boom.badImplementation("OperationalError: " + err.message));
        });

};


internals.mapsDelete = function(args, done){

    Utils.logCallsite(Hoek.callStack()[0]);

    // note: args.ids is an array of objects [{id: 'map1'}, {id: 'map2'}]
    var mapId = args.ids[0]["id"];
    if(!_.findWhere(args.pre.maps, {id: mapId})){
        return done(Boom.notFound("The resource does not exist."));
    }

    // delete the directory and all related files in exports
    var projectDir = Path.join(args.tilemillFilesDir, "project", mapId);
    var exportsFiles = Path.join(args.tilemillFilesDir, "export", mapId) + "*";

    console.log("projectDir: ", projectDir);
    console.log("exportsFiles: ", exportsFiles);

    Fs.removeAsync(projectDir)
        .then(function(){

            return Fs.removeAsync(exportsFiles);
        })
        .then(function(){

            return done(null, {deletedId: mapId});
        })
        .error(function(err){

            return done(Boom.badImplementation("OperationalError: " + err.message));
        });

};

