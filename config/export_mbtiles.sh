#!/bin/bash

# automatic generate mbtiles for a bunch of map projects 

export TILEMILL_FILES_DIR="/home/pvieira/tilemill-files"
export TILEMILL_COMMAND="/home/pvieira/clima-app/tilemill-clima/index.js"

project_name=()
#project_name+=("tilemill-project-a")
#project_name+=("tilemill-project-b")
project_name+=("agricultura-areas-potencial-vinha")
project_name+=("recursos-hidricos-vulnerabilidade-caudais-nascentes-atual")
project_name+=("recursos-hidricos-vulnerabilidade-caudais-nascentes-cenario-a2-2070-2099")
project_name+=("recursos-hidricos-vulnerabilidade-caudais-tuneis-atual")
project_name+=("recursos-hidricos-vulnerabilidade-atual")
project_name+=("recursos-hidricos-vulnerabilidade-cenario-a2-2070-2099-zfpd8b")
project_name+=("agricultura-area-potencial-banana")
project_name+=("agricultura-banana")
project_name+=("movimento-de-vertentes-suscetibilidade")
project_name+=("recursos-hidricos")
project_name+=("recursos-hidricos-caudais-galerias")
project_name+=("recursos-hidricos-vulnerabilidade-cloretos-atual")
project_name+=("recursos-hidricos-vulnerabilidade-caudais-galerias-atual")
project_name+=("recursos-hidricos-vulnerabilidade-cenario-a2-2070-2099")
project_name+=("florestas-de-pinheiro-bravo")
project_name+=("floresta-natural-da-madeira")
project_name+=("matos-densos-autoctones")
project_name+=("matos-densos-exoticos")
project_name+=("matos-pouco-densos-autoctones")
project_name+=("matos-pouco-densos-exoticos")
project_name+=("areas-ardidas")
project_name+=("anomalia-da-precipitacao-anual-a2-2070-2099")
project_name+=("ondas-de-calor")
project_name+=("empreendimentos-turisticos")
project_name+=("infraestruturas-energia")
project_name+=("cheias")
project_name+=("pombo-trocaz-columba-trocaz")
project_name+=("freira-da-madeira-pterodroma-madeira")
project_name+=("tentilhao-fringilla-coelebs")
project_name+=("freira-do-bugio-pterodroma-deserta")
project_name+=("bis-bis-regulus-madeirensis")
project_name+=("ifram")
project_name+=("florestas-abertas-de-castanheiro")
project_name+=("florestas-abertas-de-eucalipto")
project_name+=("florestas-abertas-de-pinheiro-bravo")
project_name+=("florestas-de-castanheiro")
project_name+=("florestas-de-eucalipto")
project_name+=("florestas-de-outros-carvalhos")
project_name+=("superficie-agricola-util-de-horticolas")
project_name+=("superficie-agricola-util-da-vinha")
project_name+=("superficie-agricola-util-da-bananeira")
project_name+=("necessidade-de-rega-do-bananeiro")
project_name+=("rega-bananeiro-b2-2040-2069")
project_name+=("rega-bananeiro-a2-2070-2099")
project_name+=("rega-bananeiro-a2-2040-2069")
project_name+=("areas-agriculas")
project_name+=("parque-natural")
project_name+=("rede-natura-2000")
project_name+=("rede-de-areas-marinhas")
project_name+=("reserva-natural")
project_name+=("corre-caminhos-anthus-bertheloti")
project_name+=("aguia-de-asa-redonda-buteo-buteo")
project_name+=("pintarroxo-comum-carduelis-cannabina")
project_name+=("alveola-cinzenta-motacilla-cinerea")





l=${#project_name[@]}

for (( i=0; i < $l; i++ )) do

    eval $(echo $TILEMILL_COMMAND \
        export \
        ${project_name[$i]} \
        $TILEMILL_FILES_DIR/export/${project_name[$i]}.mbtiles \
        --format=mbtiles \
        --minzoom=7 \
        --maxzoom=13 \
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