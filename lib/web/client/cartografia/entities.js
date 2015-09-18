var WebMapM = Backbone.Model.extend({
    initialize: function(){
        this.on("change:active", function(){
            // this has been selected or unselcted; we must change the status in the Clima.mapsMenu array

            _.each(Clima.mapsMenu, function(groupObj){

                _.each(groupObj.maps, function(mapObj){
                    
                    if(this.get("id")===mapObj.mapId){
                        mapObj.active = this.get("active");
                    }
                    
                }, this);
            }, this);
        });
    }
});

var webMapsC = new Backbone.Collection();

// remove the "not published" group from the mapsMenu array
Clima.mapsMenu = _.filter(Clima.mapsMenu, function(groupObj){ return groupObj.groupName !== "not published" });

// populate the webMapsC collection

_.each(Clima.mapsMenu, function(groupObj){

    _.each(groupObj.maps, function(mapObj){
        
        var mapId = mapObj.mapId;
        var tileJson = _.findWhere(Clima.maps, {id: mapId});
        if(!tileJson){
            return;
        }

        var webMapM = new WebMapM({
            id: mapId
        });

        webMapM.set("tileJson", tileJson);
        webMapM.set("tileLayer", L.mapbox.tileLayer(tileJson));
        webMapM.set("gridLayer", L.mapbox.gridLayer(tileJson));
        webMapM.set("gridControl", L.mapbox.gridControl(webMapM.get("gridLayer")));

        // NOTE: the above calls to the L.mapbox method are syncronous because we are passing the actual
        // tileJson object (it would be asyncronous if we passed a string with the id of the map, in which case
        // the respective tileJson would be fetched with an ajax call)

        webMapsC.push(webMapM);
    });
});

// Clima.prepareMaps = function(){




//     var mapMenuIds = [];

//     _.each(Clima.mapsMenu, function(groupObj){
//         if(groupObj.groupName !== "not published"){
//             mapMenuIds = _.union(mapMenuIds, _.pluck(groupObj.maps, "mapId"));    
//         }
//     });

//     // make sure the allMaps array only has those that are also in the menu
//     Clima.maps = _.filter(Clima.maps, function(tileJsonObj){
//         return _.contains(mapMenuIds, tileJsonObj.id);
//     });

//     Clima.layers = {};

//     _.each(Clima.maps, function(map){

//         var mapId = map.id;
//         Clima.layers[mapId] = {};
//         Clima.layers[mapId]["tileLayer"] = L.mapbox.tileLayer(map);
//         Clima.layers[mapId]["gridLayer"] = L.mapbox.gridLayer(map);
//         Clima.layers[mapId]["gridControl"] = L.mapbox.gridControl(Clima.layers[mapId]["gridLayer"]);
//     });

// };

// Clima.prepareMaps();

// model with the state of the menu in map one
var mapOneM = new Backbone.Model({
    isOpen: false,
    mapOrder: 0
});

var mapTwoM = new Backbone.Model({
    isOpen: false,
    mapOrder: 1
});