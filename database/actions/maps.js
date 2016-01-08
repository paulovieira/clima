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
//var ReadFiles = require('read-multiple-files');
var _ = require("underscore");
var _s = require("underscore.string");
var Bluebird = require("bluebird");
var ReadFilesAsync = Bluebird.promisify(require('read-multiple-files'));

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

    // seneca.add("role:maps, cmd:readSequential",   internals.mapsReadSequential);
    // seneca.add("role:maps, cmd:createSequential", internals.mapsCreateSequential);    
    // seneca.add("role:maps, cmd:updateSequential", internals.mapsUpdateSequential);    
    // seneca.add("role:maps, cmd:deleteSequential", internals.mapsDeleteSequential);
};

internals.removeSensitiveData = function(data){

    data.forEach(function(mapObj){

        if(mapObj.Layer){
            mapObj.Layer.forEach(function(layerObj){

                if(layerObj.Datasource){
                    delete layerObj.Datasource.host;
                    delete layerObj.Datasource.port;
                    delete layerObj.Datasource.user;
                    delete layerObj.Datasource.password;
                    delete layerObj.Datasource.dbname;
                }
            });
        }
    });


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
    "createdAt": "createdAt",
    "_updated": "_updated",
    "owner": "owner",

    "sequence": "sequence",
    "hasPlayButton": "hasPlayButton",
    "autoPlay": "autoPlay",
    
    // tileJson properties added in internals.addMissingKeys
    "tilejson": "tilejson",
    "attribution": "attribution",
    "tiles": "tiles",
    "grids": "grids",
    "template": "template",
    "Layer": "Layer",
    "interactivity": "interactivity",
    "metatile": "metatile",
    "Stylesheet": "Stylesheet"

    // d) deleted properties: "Stylesheet", "interactivity", "metatile"

};


// make sure the mapIds in the sequence is actually a regular map (it might have been deleted meanwhile)
internals.verifySequences = function(allMaps){

    // var sequentialMapsIds = _.chain(allMaps)
    //                         .filter(function(obj){
    //                             return obj.sequence;
    //                         })
    //                         .pluck("id")
    //                         .value();

    // var regularMapsIds = _.chain(allMaps)
    //                     .pluck("id")
    //                     .difference(sequentialMapsIds)
    //                     .value();

    var regularMapsIds = _.chain(allMaps)
                            .filter(function(obj){
                                return !obj.sequence;
                            })
                            .pluck("id")
                            .value();

    allMaps.forEach(function(obj){

        if(obj.sequence && Array.isArray(obj.sequence)){

            obj.sequence = obj.sequence.filter(function(obj2){
                if(!_.contains(regularMapsIds, obj2.mapId)){
                    console.log("!!!!!!!! ", obj2.mapId)
                }
                return _.contains(regularMapsIds, obj2.mapId);
            });
        }
    });


    // console.log("sequentialMapsIds: ", sequentialMapsIds);
    // console.log("regularMapsIds: ", regularMapsIds);
    // console.log("regularMapsIds2: ", regularMapsIds2);
    // var regularMaps = allMaps.filter(function(obj){
    //     return !obj.sequence;
    // });
    // var validIds = _.pluck(regularMaps, "id");

    // seqMapObj.sequence = _.filter(seqMapObj.sequence, function(obj){
    //     return _.contains(validIds, obj.mapId);
    // });
};

internals.prepareMenu = function(mapMenu, allMaps){

    // we always have a group with the name "not published"
    if(!_.findWhere(mapMenu, {groupName: "not published"})){
        mapMenu.push({groupName: "not published", maps: []});
    }

    var notPublished = _.findWhere(mapMenu, {groupName: "not published"})

    //console.log("currently unpublished maps: ", _.pluck(notPublished.maps, "mapId"));


    // 1) get the ids all currently available maps (those that don't have an exported mbtiles are not considered available);
    // we also include the sequential maps;
    allMaps = allMaps
                .filter(function(obj){

                    return !!obj.tiles || obj.sequence;
                });

    var allMapsIds = _.pluck(allMaps, "id");
    //console.log("allMapsIds", allMapsIds);

    // 2) get all the ids of all maps in the menu (taking into account all groups)
    var mapMenuIds = [];
    mapMenu.forEach(function(groupObj){
        mapMenuIds = _.union(mapMenuIds, _.pluck(groupObj.maps, "mapId"));
    });
    //console.log("mapMenuIds: ", mapMenuIds);

    // 3) verify if there are maps in mapMenuIds that are not in allMaps (this happens if 
    // a map present in the menu has been deleted meanwhile)
    var difference = _.difference(mapMenuIds, allMapsIds);
    if(difference.length > 0){

        // remove from the menu 
        difference.forEach(function(id){

            console.log("map " + id + " doesn't exist - will remove from the menu");
            mapMenu.forEach(function(groupObj){
            
                groupObj.maps = _.filter(groupObj.maps, function(mapObj){ 
                    return !_.contains(difference, mapObj.mapId);
                });
            });

        });
    }

    // 4) now verify if there are maps in allMaps that are not in the menu (should 
    // happen for new maps); those maps will be placed in the "not published" group
    difference = _.difference(allMapsIds, mapMenuIds);
    if(difference.length > 0){
        difference.forEach(function(id){

            console.log("will add a new map to the menu (unpublished maps): ", id);
            notPublished.maps.push({mapId: id});
        });
    }
};



// adds the missing TileJSON keys (not present in project.mml); only in read (not in readAll)
internals.addMissingKeys = function(tilemillDir, obj){

    // get an array of all the mbtiles exports relative to this map,
    // and order them by date (the last one will be the most recent one)

    // TODO: cache the stat information
    var mbtiles = Glob.sync(tilemillDir + "/export/" + obj.id + "*.mbtiles")
                    .sort(function(a, b){
                        return Fs.statSync(a).mtime.getTime() - Fs.statSync(b).mtime.getTime();
                    })
                    .pop();

    // if there is no mbtiles for the given map, there's nothing left to do
    if(!mbtiles){
        return;
    }

    var tilesBaseAddress = "/api/v1/tiles/" + Path.basename(mbtiles, ".mbtiles");

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


internals.readProjectsFiles = function(tilemillDir, mapsIds, method){

    var projectsFiles = mapsIds.map(function(id){
        return tilemillDir + "/project/" + id + "/project.mml";
    });

    var infoFiles = mapsIds.map(function(id){
        return tilemillDir + "/project/" + id + "/info.json";
    });

    var allFiles = projectsFiles.concat(infoFiles);
    var output = [];

    // returns a promise (we used Bluebird's "promisify" above)
    return ReadFilesAsync(allFiles, "utf8")
        .then(function(allFilesContents){

            // NOTE:  the order in the elements in allFiles and allFilesContents match
            var l = mapsIds.length;
            for(var i=0; i<l; i++){
                try {
                    var project = JSON.parse(allFilesContents[i]);
                    var info    = JSON.parse(allFilesContents[i+l]);

                    // the map id is the name of the directory
                    project.id = mapsIds[i];

                    // add the properties in the auxiliary info file
                    project.createdAt = info.createdAt || 0;
                    project._updated  = info.createdAt || 0;
                    project.ownerName = info.ownerName || "unknown";

                    if(info.sequence){
                        project.sequence = info.sequence || [];
                        project.hasPlayButton = info.hasPlayButton || false;
                        project.autoPlay = info.autoPlay || false;
                    }

                    // TODO: when reading all maps should we also add missing keys?
                    //if(method==="read"){
                        internals.addMissingKeys(tilemillDir, project);
                    //}

                    output.push(project);    
                   
                }
                catch(e){

                    e.message = e.message + "(Invalid json in either " + allFiles[i] + " or " + allFiles[i+l] + ")";
                    throw e;
                }
            }

            // reorder array (most recent first)
            return output.sort(function(a, b){
                return b.createdAt - a.createdAt;
            });

        });


};


internals.extractMapId = function(path){

    var temp = path.split("/");
    return temp[temp.length-2];
};

// action handlers for read, readAll, create, update and delete
// (and possibly others); this is the place where we actually fetch the data from the database;

internals.mapsReadAll = function(args, done){

    Utils.logCallsite(Hoek.callStack()[0]);

    // if some project directory is missing the "project.mml", Glob will not match; so 
    // that directory will not be read

    var projectsFiles = Glob.sync(Path.join(Config.get("tilemill.files"), "project/*/project.mml"));
    var infoFiles     = Glob.sync(Path.join(Config.get("tilemill.files"), "project/*/info.json"));

    // it is required that the directory has both the project.mml and info.json files (because we will have to read
    // those 2 files)
    var mapsIds = _.intersection(projectsFiles.map(internals.extractMapId), 
                                    infoFiles.map(internals.extractMapId));

    internals.readProjectsFiles(Config.get("tilemill.files"), mapsIds /*, "readAll" */)
        .then(function(data){

            internals.verifySequences(data);
            return data;
        })
        .then(function(data){

            data = args.raw === true ? data : Hoek.transform(data, internals.transformMap);

            // remove sensitive data from the objects in the data.Layer array (this data
            // comes from the tilemill project files)
            internals.removeSensitiveData(data);

            return done(null, data);
        })
        .catch(function(err) {

            err = err.isBoom ? err : Boom.badImplementation(err.msg, err);
            return done(err);
        });

    
};

internals.mapsRead = function(args, done){

    Utils.logCallsite(Hoek.callStack()[0]);

    // the request to the API might be done in 2 forms: /api/maps/xyz or /api/maps/xyz.json
    // (that's how mapbox.js does it internally)
    var ids = args.params.ids.map(function(obj){

        var id = obj.id;

        if(id.slice(-5) === ".json"){
            return id.substr(0, id.length-5);
        }
        else{
            return id;
        }
    });

    // prettu much a copy-paste from the above mapsReadAll
    var projectsFiles = Glob.sync(Path.join(Config.get("tilemill.files"), "project/*/project.mml"));
    var infoFiles     = Glob.sync(Path.join(Config.get("tilemill.files"), "project/*/info.json"));

    var mapsIds = _.intersection(projectsFiles.map(internals.extractMapId), 
                                    infoFiles.map(internals.extractMapId));

    internals.readProjectsFiles(Config.get("tilemill.files"), mapsIds /*, "read" */)
        .then(function(data){

            internals.verifySequences(data);

            data = data.filter(function(mapObj){

                return _.contains(ids, mapObj.id);
            });

            return data;
        })
        .then(function(data){

            if(data.length === 0){
                throw Boom.notFound("The resource does not exist.");
            }

            data = args.raw === true ? data : Hoek.transform(data, internals.transformMap);

            // remove sensitive data from the objects in the data.Layer array (this data
            // comes from the tilemill project files)
            internals.removeSensitiveData(data);

            return done(null, data[0]);
        })
        .catch(function(err) {

            err = err.isBoom ? err : Boom.badImplementation(err.msg, err);
            return done(err);
        });

};


// NOTE: to update a map the user should use tilemill directly (only the name and description fields)

internals.mapsCreate = function(args, done){

    Utils.logCallsite(Hoek.callStack()[0]);

    var payload = _.isArray(args.payload) ? args.payload[0] : args.payload;
 // console.log("args.payload: ", args.payload);
 // console.log("payload: ", payload);

    var mapName        = payload.name;
    var mapDescription = payload.description;
    var mapCenter      = payload.center;
    
    var mapId = _s.slugify(mapName);


    if(_.findWhere(args.maps, {id: mapId})){
        mapId = mapId + "-" + Utils.getRandomString();
    }

    // copy the directory with the default project to the "projects" directory;
    // for TileMill this will efectively create a new project
    var defaultProjectDir = Path.join(Config.get("rootDir"), "data/tilemill-default-project");
    var newProjectDir     = Path.join(Config.get("tilemill.files"), "project", mapId);
    var newProjectOptions = Path.join(Config.get("tilemill.files"), "project", mapId, "project.mml");
    var newProjectInfo    = Path.join(Config.get("tilemill.files"), "project", mapId, "info.json");

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

            if(mapCenter==="madeira"){
                obj["bounds"] = [-17.5479, 32.3683, -16.0016, 33.2364];
                obj["center"] = [-16.8393, 32.7203, 9];
                obj["minzoom"] = 7;
                obj["maxzoom"] = 13;
            }
            else if(mapCenter === "azores"){
                obj["bounds"] = [-32.0279, 36.6563, -23.5904, 40.1673];
                obj["center"] = [-27.9355, 38.5019, 7];
                obj["minzoom"] = 5;
                obj["maxzoom"] = 12;
            }
            else if(mapCenter === "mainland"){
                obj["bounds"] = [-9.5691, 36.8928, -6.1194, 42.2244];
                obj["center"] = [-9.1338, 38.7546, 6];
                obj["minzoom"] = 5;
                obj["maxzoom"] = 14;
            }

            return Fs.writeJsonAsync(newProjectOptions, obj);
        })

        // step 4 - save the extra informations about the map (such as creation date, user, etc) in a separate file
        // (we have to do this because TileMill will delete the extra field everytime the project is saved)
        .then(function(){
            var obj = {
                createdAt: Date.now()
            };

            if(args.credentials){
                obj["ownerId"] = args.credentials.id;
                obj["ownerName"] = args.credentials.firstName + " " + args.credentials.lastName;
            }

            if(payload.sequence){
                obj["sequence"] = payload.sequence;
                obj["hasPlayButton"] = payload.hasPlayButton || false;
                obj["autoPlay"] = payload.autoPlay || false;
            }

            return Fs.writeJsonAsync(newProjectInfo, obj);
        })
        .then(function(){

            var response = {
                id: mapId, 
                name: mapName, 
                description: mapDescription
            };

            return done(null, response);
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

    // note: args.params.ids is an array of objects [{id: 'map1'}, {id: 'map2'}]
    var mapId = args.params.ids[0]["id"];
    if(!_.findWhere(args.maps, {id: mapId})){
        return done(Boom.notFound("The resource does not exist."));
    }

    // delete the directory and all related files in exports
    var projectDir = Path.join(Config.get("tilemill.files"), "project", mapId);
    //var exportsFiles = Path.join(Config.get("tilemill.files"), "export", mapId) + "*";
    var exportsFiles = Path.join(Config.get("tilemill.files"), "export", mapId, "*");

    // console.log("projectDir: ", projectDir);
    // console.log("exportsFiles: ", exportsFiles);

    var allMaps;

    // step 1: remove the project file
    Fs.removeAsync(projectDir)

        // step 2: remove all related exports
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


internals.mapsReadMenu = function(args, done){

    Utils.logCallsite(Hoek.callStack()[0]);
    Db.func("config_read", JSON.stringify({ key: "mapMenu" }))
        .then(function(configRow) {
            
            var mapMenu = configRow[0]["value"];
            internals.prepareMenu(mapMenu, args.pre.maps);

            return done(null, mapMenu);
        })
        .catch(function(err) {

            err = err.isBoom ? err : Boom.badImplementation(err.msg, err);
            return done(err);
        });

};


internals.mapsUpdateMenu = function(args, done){

    Utils.logCallsite(Hoek.callStack()[0]);

    Db.func("config_update", JSON.stringify({key: "mapMenu", value: args.payload}))
        .then(function(data) {

            return done(null, data);
        })
        .catch(function(err) {

            err = err.isBoom ? err : Boom.badImplementation(err.msg, err);
            return done(err);
        });

// example payload
// [
//     {
//         "groupName": "biodiversidade", 
//         "maps": [
//             {
//                 "mapId": "geography-class", 
//             },
//             {
//                 "mapId": "xyz", 
//             }
//         ], 
//     }, 
//     {
//         "groupName": "not published", 
//         "maps": [
//             {
//                 "mapId": "new-mapa-1-owe-gw", 
//             }, 
//             {
//                 "mapId": "open-streets-dc", 
//             }, 
//             {
//                 "mapId": "road-trip", 
//             }
//         ], 
//     }
// ]

};



// select * from config_update('{
//     "key": "...", 
//     "value": {"publicUrl": "http://yyy.com"}
// }');




// internals.mapsReadSequential = function(args, done){

//     Utils.logCallsite(Hoek.callStack()[0]);
//     Db.func("config_read", JSON.stringify({ key: "sequentialMaps" }))
//         .then(function(configRow) {
            
//             var sequentialMaps = configRow[0]["value"];
//             //internals.prepareMenu(mapMenu, args.maps)

//             return done(null, sequentialMaps);
//         })
//         .catch(function(err) {

//             err = err.isBoom ? err : Boom.badImplementation(err.msg, err);
//             return done(err);
//         });

// };


// NOTE: for the sequential maps there is yet no validation when creating, updating or deleting
internals.mapsCreateSequential = function(args, done){

    Utils.logCallsite(Hoek.callStack()[0]);

    var payload = args.payload || {};
    var seqMaps = args.pre.seqMaps || [];

    if(_.findWhere(seqMaps, {id: payload.id})){
        return done(Boom.conflict("There is already a sequential map with the given id. Try another one"));
    }

    seqMaps.push(payload);

    Db.func("config_update", JSON.stringify({key: "sequentialMaps", value: seqMaps}))
        .then(function(data) {

            return done(null,  _.findWhere(data[0].value, {id: payload.id}));
        })
        .catch(function(err) {

            err = err.isBoom ? err : Boom.badImplementation(err.msg, err);
            return done(err);
        });

};


internals.mapsUpdateSequential = function(args, done){

    Utils.logCallsite(Hoek.callStack()[0]);

    var payload = args.payload || {};
    var params = args.params || {};
    var seqMaps = args.pre.seqMaps || [];

    if(payload.id !== params.id){
        return done(Boom.conflict("The ids given in the payload and in the URI must match (including the order)."));
    }

    // extract the object from the array
    var seqMap = _.findWhere(seqMaps, {id: params.id});
    if(!seqMap){
        return done(Boom.notFound("There is no sequential map with the given id"));   
    }

    // update the extracted object with the given payload
    _.extend(seqMap, payload)

    Db.func("config_update", JSON.stringify({key: "sequentialMaps", value: seqMaps}))
        .then(function(data) {

            return done(null, _.findWhere(data[0].value, {id: params.id}));
        })
        .catch(function(err) {

            err = err.isBoom ? err : Boom.badImplementation(err.msg, err);
            return done(err);
        });

};

internals.mapsDeleteSequential = function(args, done){

    Utils.logCallsite(Hoek.callStack()[0]);

    var params = args.params || {};
    var seqMaps = args.pre.seqMaps || [];

    // extract the object from the array
    var seqMap = _.findWhere(seqMaps, {id: params.id});
    if(!seqMap){
        return done(Boom.notFound("There is no sequential map with the given id"));   
    }

    // find the index
    var index = _.findIndex(seqMaps, {id: params.id});
    console.log("index: ", index);

    // remove the object from the array
    seqMaps.splice(index, 1);

    Db.func("config_update", JSON.stringify({key: "sequentialMaps", value: seqMaps}))
        .then(function(data) {

            return done(null, {deletedId: params.id});
        })
        .catch(function(err) {

            err = err.isBoom ? err : Boom.badImplementation(err.msg, err);
            return done(err);
        });


};

