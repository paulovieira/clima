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
    mapsRegion: "#map-container",
});




var MenuLV = Mn.LayoutView.extend({
	template: "main-menu/templates/main-menu.html",
    ui: {
        changeBtn: "button#move",
        checkBtn: "button#check"
    },
    events: {
        "click li":"doSomething",
        "click @ui.checkBtn":"doCheck"
    },
    doSomething: function(e){
        debugger;

        var $this = $(e.target);
        $this.insertAfter($this.siblings(':eq(0)'));

        //$("#two").remove();
        // var x = this.$el;
        // console.log(this.el === this.$el[0])
    },
    doCheck: function(){
        this.$("li").each(function(){
            console.log($(this).data("name"))
        });
    }
});

var menuLV = new MenuLV({
	model: new Backbone.Model()
});

Cartografia.mapsRegion.show(menuLV)



// var menuControl = new L.Control.BackboneView({
// 	view: menuLV,
// 	position: "topleft"
// });

//map.addControl(menuControl);