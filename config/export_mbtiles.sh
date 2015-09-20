#!/bin/bash

# automatic generate mbtiles for a bunch of map projects 

export TILEMILL_FILES_DIR="/home/pvieira/tilemill-files"
export TILEMILL_COMMAND="/home/pvieira/clima-app/tilemill-clima/index.js"

project_name=()
#project_name+=("tilemill-project-a")
#project_name+=("tilemill-project-b")
project_name+=("q53")
project_name+=("advanced-techniques-3-patterns-in-polygons")
project_name+=("kkkk")



l=${#project_name[@]}

for (( i=0; i < $l; i++ )) do

    eval $(echo $TILEMILL_COMMAND \
        export \
        ${project_name[$i]} \
        $TILEMILL_FILES_DIR/export/${project_name[$i]}.mbtiles \
        --format=mbtiles \
        --minzoom=7 \
        --maxzoom=11 \
        --bbox="-17.5479,32.3683,-16.0016,33.2364" \
        --metatile=1 \
        --scale=1 \
        --files=$TILEMILL_FILES_DIR \
        --verbose=on )

done



#        --bbox=[-9.5691,36.8928,-6.1194,42.2244] \
#       --bbox="-9.5691,36.8928,-6.1194,42.2244" \

# --format=mbtiles \
# --minzoom=7 \
# --maxzoom=11 \
# --metatile=1 \