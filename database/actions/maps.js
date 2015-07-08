// Prepare yourself, this is where the dirty stuff lives!
// access the database to interact with the data

var Path = require("path");
var Fs = require("fs-extra");
var Hoek = require("hoek");
var Boom = require("boom");
var ChangeCase = require("change-case-keys");
var Glob = require("glob");
var Config = require("config");
var Q = require("q");
var Wreck = require("wreck");
var ReadFiles = require('read-multiple-files');
var _ = require("underscore");
var _s = require("underscore.string");
// var Promise = require("bluebird");
// var ReadFiles = Promise.promisifyAll(require('read-multiple-files'));

var Db = require("..");
var Utils = require("../../lib/common/utils");



var internals = {};

module.exports = function(options){

    var seneca = this;

    seneca.add("role:maps, cmd:readAll", internals.mapsReadAll);
    seneca.add("role:maps, cmd:read",    internals.mapsRead);
    seneca.add("role:maps, cmd:create",  internals.mapsCreate);
    seneca.add("role:maps, cmd:delete",  internals.mapsDelete);

    seneca.add("role:maps, cmd:readMenu",   internals.mapsReadMenu);
    seneca.add("role:maps, cmd:updateMenu", internals.mapsUpdateMenu);
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
    "template": "template",
    "layer": "Layer"

    // d) deleted properties: "Stylesheet", "interactivity", "metatile"

};


internals.updateMenu = function(mapMenu, allMaps){

    if(!_.findWhere(mapMenu, {groupName: "published"})){
        mapMenu.push({groupName: "published", order: 0, mapElements: []});
    }

    if(!_.findWhere(mapMenu, {groupName: "not published"})){
        mapMenu.push({groupName: "not published", order: -1, mapElements: []});
    }

    var published = _.findWhere(mapMenu, {groupName: "published"})
    var notPublished = _.findWhere(mapMenu, {groupName: "not published"})

    console.log("currently published maps: ", _.pluck(published.mapElements, "id"));
    console.log("currently unpublished maps: ", _.pluck(notPublished.mapElements, "id"));


    // 1) get the ids all currently available maps
    var allMapsIds = _.pluck(allMaps, "id");
    //console.log("allMapsIds", allMapsIds);

    // 2) get all the ids of all maps in the menu (taking into account all groups)
    var mapMenuIds = [];
    mapMenu.forEach(function(groupObj){
        mapMenuIds = _.union(mapMenuIds, _.pluck(groupObj.mapElements, "id"));
    });
    //console.log("mapMenuIds: ", mapMenuIds);

    // 3) verify if there are maps in the menu that are not in allMaps (in principle there should none)
    var difference = _.difference(mapMenuIds, allMapsIds);
    if(difference.length > 0){

        // remove from the menu 
        difference.forEach(function(id){
            console.log("will remove map from the menu: ", id);
            mapMenu.forEach(function(groupObj){
                groupObj.mapElements = _.filter(groupObj.mapElements, function(obj){ 
                    return !_.contains(difference, obj.id)
                });
            });

        });
    }

    // 4) now verify if there are maps in allMaps that are not in the menu (should will happen for sure for new maps)
    var difference = _.difference(allMapsIds, mapMenuIds);
    if(difference.length > 0){
        difference.forEach(function(id){
            var mapObj = _.findWhere(allMaps, {id: id});

            // add to the menu (not published group)
            if(mapObj){
                console.log("will add a new map to the menu: ", id);
                notPublished.mapElements.push({id: id, name: mapObj.name});
            }
        });
    }
}


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

        // NOTE:  the order in the elements in contentsArray, projectFiles and mapsIds match
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


// NOTE: to update a map the user should use tilemill directly (only the name and description fields)

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

    var allMaps = [];

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

            var uri = "http://localhost:" + Config.get("port") + "/api/v1/maps";
            var options = {
                json: true,
                headers: {}
            }
            if(args.headers.cookie){
                options.headers.cookie = args.headers.cookie;
            }

            var deferred = Q.defer();
            Wreck.get(uri, options, function(err, response, payload){

                    if(err){
                        return deferred.reject(Boom.badImplementation("Wreck error in request to /api/maps: " + err.message));
                    }
                    else if(response.statusCode === 401){
                        return deferred.reject(Boom.unauthorized("API error in request to /api/maps: " + JSON.stringify(payload)));
                    }
                    else if(response.statusCode !== 200){
                        return deferred.reject(Boom.badImplementation("API error in request to /api/maps: " + JSON.stringify(payload)));
                    }

                    // TODO: closure hack! we should be using Q.all or something similar
                    allMaps = payload;
                   
                    return deferred.resolve();
            });

            return deferred.promise;
        })

        // read the map menu configuration
        .then(function(){

            return Db.func("config_read", JSON.stringify({ key: "mapMenu" }))
        })

        // update the menu (add new map, remove deleted maps)
        .then(function(configRow){

            // mapMenu is the actual array with the menu configuration
            var mapMenu = configRow[0]["value"];

            // changes will happen in place
            internals.updateMenu(mapMenu, allMaps);

            return Db.func("config_update", JSON.stringify({key: "mapMenu", value: mapMenu}));

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

    // console.log("projectDir: ", projectDir);
    // console.log("exportsFiles: ", exportsFiles);

    var allMaps;
    Fs.removeAsync(projectDir)
        .then(function(){

            return Fs.removeAsync(exportsFiles);
        })

        .then(function(){

            var uri = "http://localhost:" + Config.get("port") + "/api/v1/maps";
            var options = {
                json: true,
                headers: {}
            }
            if(args.headers.cookie){
                options.headers.cookie = args.headers.cookie;
            }

            var deferred = Q.defer();
            Wreck.get(uri, {json: true}, function(err, response, payload){

                    if(err){
                        return deferred.reject(Boom.badImplementation("Wreck error in request to /api/maps: " + err.message));
                    }

                    if(response.statusCode !== 200){
                        return deferred.reject(Boom.badImplementation("API error in request to /api/maps: " + err.message));
                    }

                    // TODO: closure hack! we should be using Q.all or something similar
                    allMaps = payload;
                   
                    return deferred.resolve();
            });

            return deferred.promise;
        })

        // read the map menu configuration
        .then(function(){

            return Db.func("config_read", JSON.stringify({ key: "mapMenu" }))
        })

        // update the menu (add new map, remove deleted maps)
        .then(function(configRow){

            // get the actual array with the menu configuration 
            var mapMenu = configRow[0]["value"];

            // changes will happen in place
            internals.updateMenu(mapMenu, allMaps);

            return Db.func("config_update", JSON.stringify({key: "mapMenu", value: mapMenu}));

        })

        .then(function(){

            return done(null, {deletedId: mapId});
        })

        .error(function(err){

            return done(Boom.badImplementation("OperationalError: " + err.message));
        });

};


internals.mapsReadMenu = function(args, done){

    Utils.logCallsite(Hoek.callStack()[0]);
  
    Db.func("config_read", JSON.stringify({ key: "mapMenu" }))
        .then(function(data) {

            return done(null, data[0]["value"]);
        })
        .catch(function(err) {

            err = err.isBoom ? err : Boom.badImplementation(err.msg, err);
            return done(err);
        });

};


internals.mapsUpdateMenu = function(args, done){

    Utils.logCallsite(Hoek.callStack()[0]);

// console.log(args.payload);
// done(null, args.payload);

    var dbData = {};
    Db.func("config_read", JSON.stringify({ key: "mapMenu" }))
        .then(function(data) {


/*
            var dummyPayload = [
                {
                    "groupName": "published", 
                    "mapElements": [
                        {
                            "id": "geography-class", 
                            "name": "Geography Class"
                        }
                    ], 
                    "order": 0
                }, 
                {
                    "groupName": "not published", 
                    "mapElements": [
                        {
                            "id": "control-room", 
                            "name": "Control Room"
                        }, 

                        {
                            "id": "new-map-100", 
                            "name": "new-map-100"
                        }, 
                        {
                            "id": "new-map-12", 
                            "name": "new-map-12"
                        }, 
                        {
                            "id": "new-map-20", 
                            "name": "new-map-20"
                        }, 
                        {
                            "id": "new-mapa-1-owe-gw", 
                            "name": "new mapa 1 owe gw"
                        }, 
                        {
                            "id": "open-streets-dc", 
                            "name": "Open Streets, DC"
                        }, 
                        {
                            "id": "road-trip", 
                            "name": "Road Trip"
                        }
                    ], 
                    "order": -1
                }
            ];

*/
            return Db.func("config_update", JSON.stringify({key: "mapMenu", value: args.payload}))
            done(null, dbData);

        })
        .then(function(data) {

            return done(null, dbData);
        })
        .catch(function(err) {

            err = err.isBoom ? err : Boom.badImplementation(err.msg, err);
            return done(err);
        });



    
};



// select * from config_update('{
//     "key": "...", 
//     "value": {"publicUrl": "http://yyy.com"}
// }');