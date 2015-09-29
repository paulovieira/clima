
var LayerM = Backbone.Model.extend({
    initialize: function(){

        // apply the backbone.select mixin (must also be done in the respective collection)
        Backbone.Select.Me.applyTo(this);

        this.on("change:opacity", this.changeOpacity);
        this.on("change:zindex", this.changeZIndex);

        // if this is a sequential map, construct the control
        var sequence = this.get("tileJson").sequence;
        if(sequence){

            // sequence.forEach(function(mapObj){

            //     //debugger;
            //     var tileJson = _.findWhere(Clima.maps, {id: mapObj.mapId});
            //     if(!tileJson){
            //         return;
            //     }

            //     //...
            // }, this);

            debugger;
            var sequenceIV = new SequenceIV({
                collection: new Backbone.Collection(sequence)
            });
            sequenceIV.render();
    
            // create the control instance and add to the map
            this.sequenceControl = new L.Control.BackboneView({
                view: sequenceIV,
                position: "topright"
            });



        }

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
    },

    addSequentialControl: function(){

        var leafletMap = this.collection.parent.get("leafletMap");
        leafletMap.addControl(this.sequenceControl);
    },

    removeSequentialControl: function(){

        var leafletMap = this.collection.parent.get("leafletMap");
        leafletMap.removeControl(this.sequenceControl);
    }
});


var LayersBaseC = Backbone.Collection.extend({

    addTileLayer: function(layerM){

        var leafletMap = layerM.collection.parent.get("leafletMap");

        if(!leafletMap || leafletMap.hasLayer(layerM.get("tileLayer"))){
            return;
        }

        // 1. add the tile layer

        leafletMap.addLayer(layerM.get("tileLayer"));
        if(layerM.get("tileJson").isExclusive){
            layerM.get("tileLayer").setZIndex(-1);    
        }
        

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
    },

    removeTileLayer: function(layerM){

        var leafletMap = layerM.collection.parent.get("leafletMap");

        if(!leafletMap || !leafletMap.hasLayer(layerM.get("tileLayer"))){
            return;
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
    },

    addLayer: function(layerM){
debugger;

        var tileLayer = layerM.get("tileLayer");

        // if it is a regular map, the tileLayer property will be an instance of L.TileLayer;
        // if it is a sequential map, it will be a Backbone collection
        if(tileLayer instanceof L.TileLayer){

            this.addTileLayer(layerM);
        }
        else if(tileLayer instanceof Backbone.Collection){

            tileLayer.at(0).select();
            layerM.addSequentialControl();
        }
        else{
            throw new Error("invalid Tilelayer");
        }
    },

    // update the layers in the underlying leaflet map (tileLayer, gridlayer, etc)
    removeLayer: function(layerM){
debugger;

        var tileLayer = layerM.get("tileLayer");

        // if it is a regular map, the tileLayer property will be an instance of L.TileLayer;
        // if it is a sequential map, it will be a Backbone collection
        if(tileLayer instanceof L.TileLayer){

            this.removeTileLayer(layerM);
        }
        else if(tileLayer instanceof Backbone.Collection){

            // calling .deselect() without a model argument means that the currently selected model, if any, will be deselected
            tileLayer.deselect();
            layerM.removeSequentialControl();
        }
        else{
            throw new Error("invalid Tilelayer");
        }
    }



});

var LayersC = LayersBaseC.extend({
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

        // the selected array holds models which have been newly selected ;
        // likewise, models in the deselected array have changed their status from 
        // selected to deselected
        var i,l;
        for(i=0, l=selected.length; i<l; i++){
            this.addLayer(selected[i]);
        }

        // repeat for models that have been deselected
        for(i=0, l=deselected.length; i<l; i++){
            this.removeLayer(deselected[i]);
        }
    }
});


var ExclusiveLayersC = LayersBaseC.extend({
    model: LayerM,
    initialize: function(models) {

        // apply the backbone.select mixin (must also be done in the respective model)
        Backbone.Select.One.applyTo(this, models);


        // listen for the events triggered by the select plugin
        this.on("select:one", this.addLayer);
        this.on("deselect:one", this.removeLayer);
    },
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
        { mapId: "mapquest-places", radio: false  }
        //{ mapId: "hydda-base", radio: true  },
        //{ mapId: "open-topo-map", radio: true  },
        //{ mapId: "esri-world-street-map", radio: true  },
        //{ mapId: "here-satellite-day", radio: true  },
    ]
});

// add the hardcoded tileJson objects in Clima.exclusiveLayers to the main Clima.maps array (before the ones that come from the server)
_.each(Clima.exclusiveLayers, function(tileJson){

    Clima.maps.unshift(tileJson);
});

// populate the layersC in map0M



_.each(Clima.mapsMenu, function(groupObj){

    _.each(groupObj.maps, function(mapObj){

        var tileJson = _.findWhere(Clima.maps, {id: mapObj.mapId});
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

        var layerM = new LayerM({
            id: tileJson.id,
            zindex: tileJson.zIndex || 0,
            opacity: 100,
            tileJson: tileJson
        });


        // these are the 3 required fields in the tileJson to create a L.mapbox.tileLayer object
        // NOTE: the sequential maps don't have these fields
        if(tileJson.tiles && tileJson.minzoom && tileJson.maxzoom){
            layerM.set("tileLayer", L.mapbox.tileLayer(tileJson));    
        }
        // else if(tileJson.sequence){
        //     layerM.set("tileLayer", new ExclusiveLayersC())
        // }
        

        // the gridLayer + gridControl is only added if the teaser has been
        // defined in tilemill (otherwise it makes no sense to add )
        if(Cartografia.hasUTFGrid(tileJson)){
            layerM.set("gridLayer", L.mapbox.gridLayer(tileJson));
            layerM.set("gridControl", L.mapbox.gridControl(layerM.get("gridLayer")));               
        }
        

        // NOTE: the above calls to the L.mapbox method are syncronous because we are passing 
        // the actual tileJson object (it would be asyncronous if we passed a string with the
        // id of the map, in which case the respective tileJson would be fetched with an ajax call)

        if(tileJson.isExclusive){
            map0M.get("exclusiveLayersC").push(layerM);    
        }
        else{
            map0M.get("layersC").push(layerM);    
        }

        // TODO: repeat for the 2nd collection
    });
});

// for sequential maps the tileLayer property will be a Backbone Collection (with exclusive selection) instead
// of an instance of L.mapbox.tileLayer; the models in this collection will be L.mapbox.tileLayer
// this function is very similar to what is done above
map0M.get("layersC").each(function(model){

    var sequence = model.get("tileJson").sequence;
    
    if(sequence){

        model.set("tileLayer", new ExclusiveLayersC());
        model.get("tileLayer").parent = map0M;

        sequence.forEach(function(mapObj){

            //debugger;
            var tileJson = _.findWhere(Clima.maps, {id: mapObj.mapId});
            if(!tileJson){
                return;
            }

            // TO REVERT - we are hardcodng the maxzoom to be 13 (intended for the madeira
            // maps); this line should be removed later
            tileJson.maxzoom = 13;

            var layerM = new LayerM({
                id: tileJson.id,
                zindex: tileJson.zIndex || 0,
                opacity: 100,
                tileJson: tileJson
            });

            // these are the 3 required fields in the tileJson to create a L.mapbox.tileLayer object
            // NOTE: the sequential maps don't have these fields
            if(tileJson.tiles && tileJson.minzoom && tileJson.maxzoom){
                layerM.set("tileLayer", L.mapbox.tileLayer(tileJson));    
            }
            else{
                throw new Error("invalid tileJson");
            }

            // the gridLayer + gridControl is only added if the teaser has been
            // defined in tilemill (otherwise it makes no sense to add )
            if(Cartografia.hasUTFGrid(tileJson)){
                layerM.set("gridLayer", L.mapbox.gridLayer(tileJson));
                layerM.set("gridControl", L.mapbox.gridControl(layerM.get("gridLayer")));               
            }

            model.get("tileLayer").push(layerM);
        });

    };
});



