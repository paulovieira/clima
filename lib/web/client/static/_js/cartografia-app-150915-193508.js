
;
// concat new file 
 
;
// concat new file 
console.log("hello cartografia");




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
    template: "main-menu/templates/menu-body.html",
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

    onRender: function(){

        this.toggleMenu();
    },

    modelEvents: {
        "change:isOpen":"toggleMenu"
    },

    template: "main-menu/templates/main-menu.html",

    ui: {
        menuBtn: "i.menu-icon"
    },

    regions: {
        bodyRegion: "div.mn-r-menu-body"
    },

    events: {
        "click @ui.menuBtn": "toggleMenu"
    },

    toggleMenu: function(e){

        if(this.model.get("isOpen")===true){

            this.bodyRegion.show(new MenuBodyIV());
            this.$(".menu-container").css("height", "95%");

            // manually adjust the height of the menu body (we do this here so that the scroll only affect the body,
                // and not the header, which is where the menu button is)

            var menuBodyHeight = this.$(".menu-container").height() - this.$(".menu-header").height();
            this.bodyRegion.currentView.$el.css("height", menuBodyHeight);
            this.bodyRegion.currentView.$el.css("overflow-x", "auto");


        }
        else{
            //this.bodyRegion.empty();
            this.bodyRegion.reset();
            this.$(".menu-container").css("height", "");
        }
        
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

    onAttach: function(){

        // create the leafmap an
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

        // instantiate and render the menu view
        
        this.menuLV = new MenuLV({
            model: mapOneM
        });
        this.menuLV.render();

        // add a reference to the parent view
        this.menuLV.mapIV = this;

        // create the control instance and add to the map
        this.menuControl = new L.Control.BackboneView({
            view: this.menuLV,
            position: "topleft"
        });
//debugger;
        // map.addControl will add the html element of the menuLV view to the DOM
        this.map.addControl(this.menuControl);

        // we must have the parent with the correct height
        this.menuLV.$el.parent().css("height", "100%");
        this.menuLV.$el.parent().parent().css("height", "100%");

        // show the menu already open at the beggining
        mapOneM.set("isOpen", true);

    }
})


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

