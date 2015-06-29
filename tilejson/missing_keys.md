#### Missing keys

Below are the keys in the tilejson spec that are missing in project.mml (produced with TileMill)

    tilejson: "2.0.0"

    attribution: ""

    tiles: [ base address + "/{z}/{x}/{y}.png"]

    grids: [ base address + "/{z}/{x}/{y}.grid.json"] 
    
    template: "{{#__location__}}{{/__location__}}{{#__teaser__}}" +
                interactivity.template_teaser +
                "{{/__teaser__}}{{#__full__}}{{/__full__}}",

NOTE: if interactivity.template_teaser is undefined or the empty string, check interactivity.template_full
    
Other optional keys that we won't use (for now). The default values are ok.

    data
    scheme
    version

Other keys present in the Mapbox examples and that are not in the spec (are they important?)

    autoscale
    dataset
    download
    filesize
    private
    webpage



### More info

#### TileJSON 2.1.0 Spec

https://github.com/mapbox/tilejson-spec/tree/master/2.1.0


#### Example: UTFGrid interactivity from multiple layers
    
https://www.mapbox.com/mapbox.js/example/v1.0.0/multilayer-utfgrid/

    1) https://api.tiles.mapbox.com/v4/examples.map-8ced9urs.json?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IlhHVkZmaW8ifQ.hAMX5hSW-QnTeRCMAy9A8Q&secure

    2) https://api.tiles.mapbox.com/v4/examples.map-i86nkdio.json?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IlhHVkZmaW8ifQ.hAMX5hSW-QnTeRCMAy9A8Q&secure

    3) https://api.tiles.mapbox.com/v4/examples.npr-stations.json?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IlhHVkZmaW8ifQ.hAMX5hSW-QnTeRCMAy9A8Q&secure
