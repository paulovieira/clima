/*
var TileLayersC = Backbone.Collection.extend({
    initialize: function(){

        _.each(Clima.allMaps, function(map){

            this.push(L.mapbox.tileLayer(map))
        }, this);
    }
});

var GridLayersC = Backbone.Collection.extend({
    initialize: function(){

        _.each(Clima.allMaps, function(map){

            this.push(L.mapbox.gridLayer(map))
        }, this);
    }
});

// this collection must be always initialized after gridLayersC
var GridControlsC = Backbone.Collection.extend({
    initialize: function(){

        Clima.gridLayersC.each(function(model){
debugger;
            var gc = L.mapbox.gridControl(model.attributes)
            this.push(gc);
        }, this);

    }
});
*/
Clima.mapMenuOpt = {
    method: "GET",
    url: "/api/v1/maps-menu"
};

Clima.allMapsOpt = {
    method: "GET",
    url: "/api/v1/maps"
};


Clima.allMaps = [];
Q.all([$.ajax(Clima.mapMenuOpt), $.ajax(Clima.allMapsOpt)])
.then(function(array){

    // get an array of strings with all the ids of maps in the menu (excluding maps 
    // in the not published group)
    var mapMenuIds = [];
    _.each(array[0], function(groupObj){
        if(groupObj.groupName !== "not published"){
            mapMenuIds = _.union(mapMenuIds, _.pluck(groupObj.maps, "mapId"));    
        }
    });

    // make sure the allMaps array only has those that are also in the menu
    Clima.allMaps = _.filter(array[1], function(tileJson){
        return _.contains(mapMenuIds, tileJson.id);
    });
})
.then(function(){

    Clima.maps = {};
    _.each(Clima.allMaps, function(map){

        var mapId = map.id;
        Clima.maps[mapId] = {};
        Clima.maps[mapId]["tileLayer"] = L.mapbox.tileLayer(map);
        Clima.maps[mapId]["gridLayer"] = L.mapbox.gridLayer(map);
        Clima.maps[mapId]["gridControl"] = L.mapbox.gridControl(Clima.maps[mapId]["gridLayer"]);
    });

    // Clima.tileLayersC = new TileLayersC();
    // Clima.gridLayersC = new GridLayersC();
    // Clima.gridControlC = new GridControlsC();
})




// var MenuC = Backbone.Collection.extend({
//     url: Clima.publicUri + "/api/v1/maps-menu"
// });

// var menuC = new MenuC();

// var TileJsonC = Backbone.Collection.extend({
//     url: Clima.publicUri + "/api/v1/maps"
// });

// var tileJsonC = new TileJsonC();

// Q.all([menuC.fetch(), tileJsonC.fetch()])
//     .then(function(){


//         var allMapsIds = [];
//         menuC.each(function(model){

//             // ignore the maps in "not published"
//             if(model.get("groupName")!=="not published"){
//                 var groupMaps = model.get("maps");
//                 allMapsIds = _.union(allMapsIds, _.pluck(groupMaps, "mapId"));    
//             }
//         });

//         var x = tileJsonC.filter(function(model){

//         })
//     })
