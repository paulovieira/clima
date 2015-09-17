


L.mapbox.config.HTTP_URL = "http://clima.dev/api/v1/maps";
L.mapbox.accessToken = 'dummyAccessToken';

var tileProviders = {

    // base
    "Hydda.Base": L.tileLayer.provider('Hydda.Base'), // maxZoom: 18
    "Esri.WorldShadedRelief": L.tileLayer.provider('Esri.WorldShadedRelief'), // maxZoom: 13
    "OpenMapSurfer.Grayscale": L.tileLayer.provider('OpenMapSurfer.Grayscale'),

    // rivers
    "Esri.WorldGrayCanvas": L.tileLayer.provider('Esri.WorldGrayCanvas'), // maxZoom: 16
    "Esri.WorldTopoMap": L.tileLayer.provider('Esri.WorldTopoMap'),

    // streets
    "Esri.WorldStreetMap": L.tileLayer.provider('Esri.WorldStreetMap'),
    "MapQuestOpen.OSM": L.tileLayer.provider('MapQuestOpen.OSM', {
        maxZoom: 19
    }),
    "HERE.normalDayGrey": L.tileLayer.provider('HERE.normalDayGrey', {
        'app_id': 'Y8m9dK2brESDPGJPdrvs',
        'app_code': 'dq2MYIvjAotR8tHvY8Q_Dg',
        maxZoom: 19
    }),

    // terrain
    // "Mapbox.Emerald": L.tileLayer('https://{s}.tiles.mapbox.com/v4/examples.map-i87786ca/{z}/{x}/{y}.png?access_token=' + mapboxAccessToken, {
    //     maxZoom: 18,
    //     id: 'paulosantosvieira.l4h4omm9'
    // }),
    "Esri.DeLorme": L.tileLayer.provider('Esri.DeLorme'), // maxZoom: 11
    "Acetate.hillshading": L.tileLayer.provider('Acetate.hillshading'),
    "Thunderforest.Outdoors": L.tileLayer.provider('Thunderforest.Outdoors'),
    "HERE.terrainDay": L.tileLayer.provider('HERE.terrainDay', {
        'app_id': 'Y8m9dK2brESDPGJPdrvs',
        'app_code': 'dq2MYIvjAotR8tHvY8Q_Dg'
    }),

    // satellite
    "MapQuestOpen.Aerial": L.tileLayer.provider('MapQuestOpen.Aerial'), // maxZoom: 11
    "Esri.WorldImagery": L.tileLayer.provider('Esri.WorldImagery'), // maxZoom: 13
    "HERE.satelliteDay": L.tileLayer.provider('HERE.satelliteDay', {
        'app_id': 'Y8m9dK2brESDPGJPdrvs',
        'app_code': 'dq2MYIvjAotR8tHvY8Q_Dg',
        maxZoom: 19
    }), // maxZoom: 19


    // names of places
    "MapQuestOpen_HybridOverlay": L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/{type}/{z}/{x}/{y}.{ext}', {
        type: 'hyb',
        ext: 'png',
        //attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        subdomains: '1234',
        opacity: 0.9
    }),

};


// var map = L.mapbox.map('map', undefined, {
//     center: [38.75, -9.15],
//     zoomControl: false,
//     attributionControl: false,
//     zoom: 8,
//     //maxZoom: 16,
//     minZoom: 6,
// });

// map.addLayer(tileProviders["MapQuestOpen.OSM"]);


var Cartografia = new Mn.Application();
Cartografia.addRegions({
    mapOneRegion: "#mn-r-map-1",
    mapTwoRegion: "#mn-r-map-2"
});

// model with the state of the menu in map one
var mapOneM = new Backbone.Model({
    isOpen: false
});

var MenuBodyIV = Mn.ItemView.extend({
    template: "menu/templates/menu-body.html",
    onAttach: function(){
        //debugger;
        //this.$el.css("height", "400px");

        // the grandparent is the div.menu-container

        // console.log(this.$el.parent().parent().height());
        // console.log(this.$el.parent().prev().height());
    }
});

/*
 this view will be always present; when we "open" and "close" the menu, this is what really happens:
  - add/remove the "height: 95%" to style
  - show a new instance of the menuBody view in the region / close the region
 */
var MenuLV = Mn.LayoutView.extend({

    // NOTE: leaflet will add the "leaflet-control" class to the top div of this view
    attributes: {
        style: "height: 100%;"
    },

    template: "menu/templates/menu.html",

    modelEvents: {
        "change:isOpen":"toggleRegion"
    },

    ui: {
        menuBtn: "i.menu-icon"
    },

    events: {
        "click @ui.menuBtn": "toggleIsOpen"
    },

    regions: {
        bodyRegion: "div.mn-r-menu-body"
    },

    toggleIsOpen: function(){

        var isOpen = this.model.get("isOpen");
        this.model.set("isOpen", !isOpen);
    },

    onRender: function(){

        this.disableMouseInteractions();
        console.log("TODO: make sure the mousewheel is working as expected, in all the browsers")
    },

    // all mouse related actions in the menu (such as dblclick) should not propagate
    // to the map; example: a double click on the map gives rise to a zoom in, but
    // we don't want that; 
    disableMouseInteractions: function(){
        // NOTE: to work in firefox we must add "DOMMouseScroll MozMousePixelScroll" (!???)
        // http://stackoverflow.com/questions/13274326/firefoxjquery-mousewheel-scroll-event-bug
        
        $(this.el).on("mousewheel DOMMouseScroll MozMousePixelScroll dblclick", function(e){
            e.stopPropagation();
        });

        // check the correct event name (from modernizr)
        var eventName = "mousedown";
        if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
          eventName = "touchstart";
        }

        $(this.el).on(eventName, function(e){
          console.log(eventName)
          e.stopPropagation();
        });

        // NOTE: for non-touch browsers, "click" and "dblclick" are not necessary ("mousedown" is sufficient); but they are for
        // touch devices (where "touchstart" will be used insteadof "mousedown")
        $(this.el).on("dblclick", function(e){
           e.stopPropagation();
        });

        $(this.el).on("click", function(e){
           e.stopPropagation();
        });

    },

    toggleRegion: function(e){

        if(this.model.get("isOpen")===true){
            this.show();
        }
        else{
            this.reset();
        }
    },

    show: function(){

        this.$(".menu-container").css("height", "95%");
        this.$(".menu-container").css("min-width", "400px");
        this.bodyRegion.show(new MenuBodyIV());

        // manually adjust the height of the menu body; we do this manually so that the scroll
        // only affects the menu body and not the header (which is where the menu button is);
        // we want the menu button always visible;

        var menuBodyHeight = this.$(".menu-container").height() - this.$(".menu-header").height();
        this.bodyRegion.currentView.$el.css("height", menuBodyHeight);
        this.bodyRegion.currentView.$el.css("overflow-x", "auto");
    },

    reset: function(){

        this.bodyRegion.reset();
        this.$(".menu-container").css("height", "");
        this.$(".menu-container").css("min-width", "");
    }
});

var MapIV = Mn.ItemView.extend({
    attributes: {
        style: "height: 100%; xborder: solid green 1px; "
    },
    template: "map/templates/map-container.html",

    initialize: function(){
        //this.leaflet = {}
    },

    initializeMap: function(){

        // create the leafmap map
        var div = this.$("div.mn-leaflet-map").get(0);
        this.map = L.mapbox.map(div, undefined, {
            center: [38.75, -9.15],
            zoomControl: false,
            attributionControl: false,
            zoom: 8,
            maxZoom: 16,
            minZoom: 6,
        });

        // add the initial tilelayer
        this.map.addLayer(tileProviders["MapQuestOpen.OSM"]);

    },

    initializeMapMenu: function(){

        // instantiate and render the menu view
        this.menuLV = new MenuLV({
            model: mapOneM
        });
        this.menuLV.render();

        // add a reference to the parent view
        //this.menuLV.mapIV = this;

        // create the control instance and add to the map
        this.menuControl = new L.Control.BackboneView({
            view: this.menuLV,
            position: "topleft"
        });
//debugger;
        // map.addControl will add the html element of the menuLV view to the DOM
        // in the right place
        this.map.addControl(this.menuControl);

        // note:the following assertion is true
        //this.map === this.menuLV._map;

        // we must have the parent with the correct height
        this.menuLV.$el.parent().css("height", "100%");
        this.menuLV.$el.parent().parent().css("height", "100%");

    },

    // add the zoom control
    initializeZoom: function(options) {

        var defaultOptions = {
            position: "topright"
        };

        var zoomControl = L.control.zoom(_.extend(defaultOptions, options));
        this.map.addControl(zoomControl);
    },

    // add the scale control
    initializeScale: function(options) {

        var defaultOptions = {
            position: "bottomright",
            imperial: false,
            maxWidth: 130
        };

        var scaleControl = L.control.scale(_.extend(defaultOptions, options));
        this.map.addControl(scaleControl);
    },

    initializeMiniMap: function(options) {

        var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        var osm2 = new L.TileLayer(osmUrl, {minZoom: 0, maxZoom: 13});
        //var osm2 = tileProviders["MapQuestOpen.OSM"];
        var miniMap = new L.Control.MiniMap(osm2, { toggleDisplay: true }).addTo(this.map);
//debugger;
        miniMap._toggleDisplayButtonClicked();

        // var layler = tileProviders["MapQuestOpen.OSM"];
        // var miniMapControl = new L.Control.MiniMap(layler);
        // this.map.addControl(miniMapControl);
    },

    onAttach: function(){

        this.initializeMap();
        this.initializeMapMenu();
        this.initializeZoom();
        this.initializeScale();
        //this.initializeMiniMap();

        // show the menu already open at the beggining
        mapOneM.set("isOpen", false); 
    }
});


    
Cartografia.mapOneRegion.show(new MapIV());


// var elem = $("div#mn-leaflet-map").get(0)
// var map = L.mapbox.map(elem, undefined, {
//             center: [38.75, -9.15],
//             zoomControl: false,
//             attributionControl: false,
//             zoom: 8,
//             //maxZoom: 16,
//             minZoom: 6,
//         });

// map.addLayer(tileProviders["MapQuestOpen.OSM"]);

