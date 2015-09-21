// tileJson for the base maps (hardcoded)

Clima.mapsBase = [
{
    id: "mapa-base-freguesias",
    name: "Mapa base da Madeira",
    description: "",
    format: "png8",
    minzoom: 5,
    maxzoom: 13,
    legend: "",
    tilejson: "2.0.0",
    attribution: "",
    tiles: [
        
        "http://otile1.mqcdn.com/tiles/1.0.0/hyb/{z}/{x}/{y}.png"
    ],
    grids: [
        "/api/v1/tiles/mapa-base-freguesias/{z}/{x}/{y}.grid.json"
    ],
    template: "{{#__location__}}{{/__location__}}{{#__teaser__}}Freguesia: {{{freguesia}}}{{/__teaser__}}{{#__full__}}{{/__full__}}",
    interactivity: {
        layer: "freguesias",
        template_teaser: "Freguesia: {{{freguesia}}}"
    },
},
{
    id: "mapquest",
    name: "Mapa geral (MapQuest)",
    description: "",
    //format: "png8",
    minzoom: 5,
    maxzoom: 13,
    legend: "",
    tilejson: "2.0.0",
    attribution: "",
    tiles: [
        "http://otile1.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpg"
    ]
},
{
    id: "mapquest-places",
    name: "Nomes das localidades (MapQuest)",
    description: "",
    //format: "png8",
    minzoom: 5,
    maxzoom: 13,
    legend: "",
    tilejson: "2.0.0",
    attribution: "",
    tiles: [
        "http://otile1.mqcdn.com/tiles/1.0.0/hyb/{z}/{x}/{y}.png"
    ]
},
{
    id: "open-topo-map",
    name: "Mapa topográfico (OSM)",
    description: "Mapa topográfico renderizado com dados do Open Street Map e do projecto SRTM. Mais informações: <a href='http://wiki.openstreetmap.org/wiki/OpenTopoMap' target='_blank'>Wiki do Open Street Map</a>",
    //format: "png8",
    minzoom: 5,
    maxzoom: 13,
    legend: "",
    tilejson: "2.0.0",
    attribution: "",
    tiles: [
        "//a.tile.opentopomap.org/{z}/{x}/{y}.png"
    ]
},
{
    id: "hydda-base",
    name: "hydda-base",
    description: "",
    //format: "png8",
    minzoom: 5,
    maxzoom: 13,
    legend: "",
    tilejson: "2.0.0",
    attribution: "",
    tiles: [
        "http://a.tile.openstreetmap.se/hydda/base/{z}/{x}/{y}.png"
    ]
},

{
    id: "esri-world-street-map",
    name: "esri-world-street-map",
    description: "",
    //format: "png8",
    minzoom: 5,
    maxzoom: 13,
    legend: "",
    tilejson: "2.0.0",
    attribution: "",
    tiles: [
        "//server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}.jpg"
    ]
},

{
    id: "esri-world-shaded-relief",
    name: "esri-world-shaded-relief",
    description: "",
    //format: "png8",
    minzoom: 5,
    maxzoom: 13,
    legend: "",
    tilejson: "2.0.0",
    attribution: "",
    tiles: [
        "//server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}.jpg"
    ]
},

{
    id: "esri-world-gray-canvas",
    name: "esri-world-gray-canvas",
    description: "",
    //format: "png8",
    minzoom: 5,
    maxzoom: 13,
    legend: "",
    tilejson: "2.0.0",
    attribution: "",
    tiles: [
        "//server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}.jpg"
    ]
},

{
    id: "here-satellite-day",
    name: "here-satellite-day",
    description: "",
    //format: "png8",
    minzoom: 5,
    maxzoom: 13,
    legend: "",
    tilejson: "2.0.0",
    attribution: "",
    format: "png8",
    tiles: [
        "http://a.aerial.maps.cit.api.here.com/maptile/2.1/maptile/newest/{variant}/{z}/{x}/{y}/256/png8?app_id=Y8m9dK2brESDPGJPdrvs&app_code=Y8m9dK2brESDPGJPdrvs&app_code=dq2MYIvjAotR8tHvY8Q_Dg"
    ]
}

]


// http://1.aerial.maps.cit.api.here.com/maptile/2.1/maptile/newest/{variant}/{z}/{x}/{y}/256/png8?app_id=Y8m9dK2brESDPGJPdrvs&app_code=Y8m9dK2brESDPGJPdrvs&app_code=dq2MYIvjAotR8tHvY8Q_Dg

//http://1.aerial.maps.cit.api.here.com/maptile/2.1/maptile/newest/satellite.day/5/13/11/256/png8?app_id=Y8m9dK2brESDPGJPdrvs&app_code=dq2MYIvjAotR8tHvY8Q_Dg