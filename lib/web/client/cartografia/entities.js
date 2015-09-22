var LayerM = Backbone.Model.extend({
    initialize: function(){

        // apply the backbone.select mixin (must also be done in the respective collection)
        Backbone.Select.Me.applyTo(this);

        this.on("change:opacity", this.changeOpacity);
        this.on("change:zindex", this.changeZIndex);

    },

    changeOpacity: function(model, newOpacity){

        this.get("tileLayer").setOpacity(newOpacity/100);
        //setTimeout(Cartografia.updateUrl, 1000);
        Cartografia.updateUrlDebounce();
        
    },

    changeZIndex: function(model, newZIndex){

        this.get("tileLayer").setZIndex(newZIndex);
        //setTimeout(Cartografia.updateUrl, 1000);
        Cartografia.updateUrlDebounce();
    }
});



var LayersC = Backbone.Collection.extend({
    model: LayerM,
    initialize: function(models) {

        // apply the backbone.select mixin (must also be done in the respective model)
        Backbone.Select.Many.applyTo(this, models);


        // listen for the events triggered by the select plugin

        // NOTE: we have to listen to select:all and select:none as well;
        // if there is only 2 models selected and we deselect 1, the event that fires
        // is "select:some";
        // but if there is only 1 model selected and we deselect it, the event that fires
        // is "select:none" ("select:some" is not fired in this case)
        this.on("select:some select:all select:none", this.updateLayers);

    },

    // update the layers in the underlying leaflet map (tileLayer, gridlayer, etc)
    updateLayers: function(diff){
//debugger;
        var selected = diff.selected;
        var deselected = diff.deselected;

        var layerM, leafletMap;

        // the selected array holds models which have been newly selected ;
        // likewise, models in the deselected array have changed their status from 
        // selected to deselected
        var i,l;
        for(i=0, l=selected.length; i<l; i++){

            layerM = selected[i];
            leafletMap = layerM.collection.parent.get("leafletMap");

            if(!leafletMap || leafletMap.hasLayer(layerM.get("tileLayer"))){
                continue;
            }

            // 1. add the tile layer

            leafletMap.addLayer(layerM.get("tileLayer"));

            // 2. add the grid layer (UTF tiles) + the respective grid control
            if(layerM.has("gridLayer")){
                leafletMap.addLayer(layerM.get("gridLayer"));
                leafletMap.addControl(layerM.get("gridControl"));                
            }


            // 3. add the legend (if defined in the project in tilemill)

            var legend = layerM.get("tileJson").legend;
            if(legend){
                leafletMap.legendControl.addLegend(legend);
            }
            
            // update the "active" property in the Clima.mapsMenu array
            _.each(Clima.mapsMenu, function(groupObj){
                _.each(groupObj.maps, function(mapObj){

                    if(mapObj.mapId === layerM.get("id")){
                        mapObj.active = true;
                    }

                }, this);
            }, this);
        }

        // repeat for models that have been deselected
        for(i=0, l=deselected.length; i<l; i++){

            layerM = deselected[i];
            leafletMap = layerM.collection.parent.get("leafletMap");

            if(!leafletMap || !leafletMap.hasLayer(layerM.get("tileLayer"))){
                continue;
            }

            // 1. remove the tile layer
            leafletMap.removeLayer(layerM.get("tileLayer"));

            // 2. remove the grid layer (UTF tiles) + the respective grid control
            if(layerM.has("gridLayer")){
                leafletMap.removeLayer(layerM.get("gridLayer"));
                leafletMap.removeControl(layerM.get("gridControl"));                
            }


            // 3. remove the legend (if defined in the project in tilemill)

            var legend = layerM.get("tileJson").legend;
            if(legend){
                leafletMap.legendControl.removeLegend(legend);
            }

            // update the "active" property in the Clima.mapsMenu array
            _.each(Clima.mapsMenu, function(groupObj){
                _.each(groupObj.maps, function(mapObj){

                    if(mapObj.mapId === layerM.get("id")){
                        mapObj.active = false;
                    }

                }, this);
            }, this);

        }
    }

});




var ExclusiveLayersC = Backbone.Collection.extend({
    model: LayerM,
    initialize: function(models) {

        // apply the backbone.select mixin (must also be done in the respective model)
        Backbone.Select.One.applyTo(this, models);


        // listen for the events triggered by the select plugin

        // NOTE: we have to listen to select:all and select:none as well;
        // if there is only 2 models selected and we deselect 1, the event that fires
        // is "select:some";
        // but if there is only 1 model selected and we deselect it, the event that fires
        // is "select:none" ("select:some" is not fired in this case)
        this.on("select:one", this.addLayer);
        this.on("deselect:one", this.removeLayer);

    },

    addLayer: function(selectedLayerM){
        //debugger;

        // the selected array holds models which have been newly selected ;
        // likewise, models in the deselected array have changed their status from 
        // selected to deselected

        var leafletMap = selectedLayerM.collection.parent.get("leafletMap");

        if(!leafletMap || leafletMap.hasLayer(selectedLayerM.get("tileLayer"))){
            return;
        }

        // 1. add the tile layer

        leafletMap.addLayer(selectedLayerM.get("tileLayer"));
        selectedLayerM.get("tileLayer").setZIndex(-1);

        // 2. add the grid layer (UTF tiles) + the respective grid control
        if(selectedLayerM.has("gridLayer")){
            leafletMap.addLayer(selectedLayerM.get("gridLayer"));
            leafletMap.addControl(selectedLayerM.get("gridControl"));                
        }


        // 3. add the legend (if defined in the project in tilemill)

        var legend = selectedLayerM.get("tileJson").legend;
        if(legend){
            leafletMap.legendControl.addLegend(legend);
        }
        
        // update the "active" property in the Clima.mapsMenu array
        _.each(Clima.mapsMenu, function(groupObj){
            _.each(groupObj.maps, function(mapObj){

                if(mapObj.mapId === selectedLayerM.get("id")){
                    mapObj.active = true;
                }

            }, this);
        }, this);

    },

    // update the layers in the underlying leaflet map (tileLayer, gridlayer, etc)
    removeLayer: function(deselectedLayerM){
//debugger;

        var leafletMap = deselectedLayerM.collection.parent.get("leafletMap");

        if(!leafletMap || !leafletMap.hasLayer(deselectedLayerM.get("tileLayer"))){
            return;
        }

        // 1. remove the tile layer
        leafletMap.removeLayer(deselectedLayerM.get("tileLayer"));

        // 2. remove the grid layer (UTF tiles) + the respective grid control
        if(deselectedLayerM.has("gridLayer")){
            leafletMap.removeLayer(deselectedLayerM.get("gridLayer"));
            leafletMap.removeControl(deselectedLayerM.get("gridControl"));                
        }


        // 3. remove the legend (if defined in the project in tilemill)

        var legend = deselectedLayerM.get("tileJson").legend;
        if(legend){
            leafletMap.legendControl.removeLegend(legend);
        }

        // update the "active" property in the Clima.mapsMenu array
        _.each(Clima.mapsMenu, function(groupObj){
            _.each(groupObj.maps, function(mapObj){

                if(mapObj.mapId === deselectedLayerM.get("id")){
                    mapObj.active = false;
                }

            }, this);
        }, this);

        
    }

});

var MapM = Backbone.Model.extend({
    initialize: function(){
    }
});

var map0M = new MapM({
    mapIndex: 0,
    active: false,
    menuOpen: false,
    layersC: new LayersC(),
    exclusiveLayersC: new ExclusiveLayersC(),
    center: { lat: 32.75, lng: -17.15 },
    initialZoom: 10,
    maxZoom: 13,
    minZoom: 7
});
map0M.get("layersC").parent = map0M;
map0M.get("exclusiveLayersC").parent = map0M;

var map1M = new MapM({
    mapIndex: 1,
    active: false,
    menuOpen: false,
    layersC: new LayersC(),
    exclusiveLayersC: new ExclusiveLayersC(),
    center: { lat: 32.75, lng: -17.15 },
    initialZoom: 10,
    maxZoom: 13,
    minZoom: 7
});
map1M.get("layersC").parent = map1M;
map1M.get("exclusiveLayersC").parent = map1M;





// remove the "not published" group from the mapsMenu array
Clima.mapsMenu = _.filter(Clima.mapsMenu, function(groupObj){ 
    return groupObj.groupName !== "not published" 
});


// add a new group to the menu (hard-coded)
Clima.mapsMenu.unshift({
    groupName: "Mapas base",
    maps: [
        { mapId: "mapa-base-freguesias", radio: true },
        { mapId: "mapquest", radio: true  },
        { mapId: "esri-world-imagery", radio: true  },
        { mapId: "esri-world-shaded-relief", radio: true  },
        { mapId: "esri-world-gray-canvas", radio: true  },        
        //{ mapId: "hydda-base", radio: true  },
        //{ mapId: "open-topo-map", radio: true  },


        //{ mapId: "esri-world-street-map", radio: true  },

        //{ mapId: "here-satellite-day", radio: true  },
        { mapId: "mapquest-places", radio: false  }
    ]
});

// add the hardcoded tileJson objects in Clima.mapsBase to the main Clima.maps array (before the ones that come from the server)
_.each(Clima.mapsBase, function(tileJson){

    Clima.maps.unshift(tileJson);
});

// populate the layersC1 collection

_.each(Clima.mapsMenu, function(groupObj){

    _.each(groupObj.maps, function(mapObj){
        
        var mapId = mapObj.mapId;
        var tileJson = _.findWhere(Clima.maps, {id: mapId});
        if(!tileJson){
            return;
        }

        // add some properties from the tileJson to the object in the mapsMenu (useful
        // to render the menu)
        mapObj.name = tileJson.name;
        mapObj.hasInfo = $.trim(tileJson.description).length > 0;
        

        // TO REVERT - we are hardcodng the maxzoom to be 13 (intended for the madeira
        // maps); this line should be removed later
        tileJson.maxzoom = 13;
        tileJson.moreinfo = "more info for the map " + tileJson.id;
//debugger;
        var layerM = new LayerM({
            id: mapId,
            zindex: tileJson.zIndex || 0,
            opacity: 100,
            tileJson: tileJson
        });

        layerM.set("tileJson", tileJson);

        // if(tileJson.id === "here-satellite-day" && false){
            
        //     var urlTemplate = 'http://1.aerial.maps.cit.api.here.com/maptile/2.1/maptile/newest/satellite.day/{z}/{x}/{y}/256/png8?app_id=Y8m9dK2brESDPGJPdrvs&app_code=dq2MYIvjAotR8tHvY8Q_Dg';
        //     //var urlTemplate = "http://{s}.tile.osm.org/{z}/{x}/{y}.png";
        //     layerM.set("tileLayer", L.tileLayer(urlTemplate));
        //     //console.log("add an osm this way, then change to t osatellite")
        // }
        // else{
            layerM.set("tileLayer", L.mapbox.tileLayer(tileJson));
        //}

        // the gridLayer + gridControl is only added if the teaser has been
        // defined in tilemill (otherwise it makes no sense to add )
        if(Cartografia.hasUTFGrid(tileJson)){
            layerM.set("gridLayer", L.mapbox.gridLayer(tileJson));
            layerM.set("gridControl", L.mapbox.gridControl(layerM.get("gridLayer")));               
        }
        

        // NOTE: the above calls to the L.mapbox method are syncronous because we are passing 
        // the actual tileJson object (it would be asyncronous if we passed a string with the
        // id of the map, in which case the respective tileJson would be fetched with an ajax call)

        if(tileJson.exclusive){
            map0M.get("exclusiveLayersC").push(layerM);    
        }
        else{
            map0M.get("layersC").push(layerM);    
        }
        


        // TODO: repeat for the 2nd collection
    });
});

// add the base layers(hardcoded for now)

Clima.mapsBase