var LayerM = Backbone.Model.extend({
    initialize: function(){

        // apply the backbone.select mixin (must also be done in the respective collection)
        Backbone.Select.Me.applyTo(this);

        this.on("change:opacity", this.changeOpacity);
        this.on("change:zindex", this.changeZIndex);

    },

    changeOpacity: function(model, newOpacity){

        this.get("tileLayer").setOpacity(newOpacity/100);
        Cartografia.updateUrl();
    },

    changeZIndex: function(model, newZIndex){

        this.get("tileLayer").setZIndex(newZIndex);
        Cartografia.updateUrl();
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
            leafletMap.addLayer(layerM.get("gridLayer"));
            leafletMap.addControl(layerM.get("gridControl"));

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

            // 2. add the grid layer (UTF tiles) + the respective grid control
            leafletMap.removeLayer(layerM.get("gridLayer"));
            leafletMap.removeControl(layerM.get("gridControl"));

            // 3. add the legend (if defined in the project in tilemill)

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

var MapM = Backbone.Model.extend({
    initialize: function(){
    }
});

var map0M = new MapM({
    mapIndex: 0,
    active: false,
    menuOpen: false,
    layersC: new LayersC(),
    center: { lat: 32.75, lng: -17.15 },
    initialZoom: 10,
    maxZoom: 13,
    minZoom: 7
});
map0M.get("layersC").parent = map0M;

var map1M = new MapM({
    mapIndex: 1,
    active: false,
    menuOpen: false,
    layersC: new LayersC(),
    center: { lat: 32.75, lng: -17.15 },
    initialZoom: 10,
    maxZoom: 13,
    minZoom: 7
});
map1M.get("layersC").parent = map1M;





// remove the "not published" group from the mapsMenu array
Clima.mapsMenu = _.filter(Clima.mapsMenu, function(groupObj){ return groupObj.groupName !== "not published" });

// populate the layersC1 collection



_.each(Clima.mapsMenu, function(groupObj){

    _.each(groupObj.maps, function(mapObj){
        
        var mapId = mapObj.mapId;
        var tileJson = _.findWhere(Clima.maps, {id: mapId});
        if(!tileJson){
            return;
        }

        var layerM = new LayerM({
            id: mapId,
            zindex: 0,
            opacity: 100
        });

        layerM.set("tileJson", tileJson);
        layerM.set("tileLayer", L.mapbox.tileLayer(tileJson));
        layerM.set("gridLayer", L.mapbox.gridLayer(tileJson));
        layerM.set("gridControl", L.mapbox.gridControl(layerM.get("gridLayer")));

        // NOTE: the above calls to the L.mapbox method are syncronous because we are passing 
        // the actual tileJson object (it would be asyncronous if we passed a string with the
        // id of the map, in which case the respective tileJson would be fetched with an ajax call)

        map0M.get("layersC").push(layerM);


        // TODO: repeat for the 2nd collection
    });
});

