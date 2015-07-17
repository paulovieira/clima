# NOTE: the shapes in "Gerais" directory should be loaded first (so that they show up at the bottom in the list of shapes)
# note: start temporaility the server in mode dev-no-auth

# total: 93



###################

# template:

# export source_dir_rel=""
# export wildcard_base="."

# cd "$source_dir_rel"
# rm -rf "$wildcard_base".zip
# zip "$wildcard_base".zip "$wildcard_base"*

# eval $(echo http -v -f POST $clima_host/api/v1/files  \
#     filename=\'$wildcard_base.zip\'  \
#     new_file@\'$wildcard_base.zip\'  \
#     tags=\'shape\'  \
#     isShape=true  \
#     fromSrid=4326  \
#     shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

# cd "$base_dir"



#export clima_host=clima.fc.ul.pt
export clima_host=clima.dev
export base_dir="/home/pvieira/clima-madeira/Mapas 150630"

cd "$base_dir"

###################

export source_dir_rel="Saúde Humana/"
export wildcard_base="ondas_de_calor."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"





###################

export source_dir_rel="Riscos Hidrogeomorfológicos/"
export wildcard_base="aluvioes."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"


###################

export wildcard_base="Cheias_suscetibilidade_wgs84."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"



###################

export source_dir_rel="Recursos Hídricos/CLIMA_Maderia_Shapefiles_RecursosHidricos/wgs84/"
export wildcard_base="Caudais_Galerias."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"


###################

export wildcard_base="Caudais_Nascentes."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"



###################

export wildcard_base="Caudais_Tuneis."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"


###################

export wildcard_base="Cloretos_Furos."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"


###################

export wildcard_base="Consumos_NecessidadesAgua."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"


###################

export wildcard_base="NiveisPiezometricos_Furos."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"


###################

export source_dir_rel="Recursos Hídricos/PGRH10/"
export wildcard_base="linhas_agua."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"





###################  

export source_dir_rel="Florestas/Cartografia Incêndios 2006 2013/"
export wildcard_base="Incendios_2006_2013_wgs84."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"




###################

export source_dir_rel="Florestas/COSRAM/"
export wildcard_base="areas_ardidas."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"


###################

export wildcard_base="flor_abertas_de_castanheiro."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"


###################

export wildcard_base="flor_abertas_de_eucalipto."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"


###################

export wildcard_base="flor_abertas_de_pinheiro_bravo."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"


###################

export wildcard_base="flor_de_castanheiro."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"


###################

export wildcard_base="flor_de_eucalipto."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"


###################

export wildcard_base="flor_de_outros_carvalhos."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"


###################

export wildcard_base="flor_de_pinheiro_bravo."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"


###################

export wildcard_base="flor_natural_da_madeira."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"


###################

export wildcard_base="matos_densos_autoctones."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"


###################

export wildcard_base="matos_densos_exoticos."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"


###################

export wildcard_base="matos_pouco_densos_autoctones."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"


###################

export wildcard_base="matos_pouco_densos_exoticos."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"




################### 

export source_dir_rel="Clima/SHP/"
export wildcard_base="DPA2L."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"

###################


export wildcard_base="DTA2L."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"

###################


export wildcard_base="Pref."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"

###################


export wildcard_base="Tref."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"


###################

export source_dir_rel="Biodiversidade/Areas Classificadas/wgs84/"
export wildcard_base="parque_natural."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"


###################

export wildcard_base="rede_areas_marinhas."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"


###################

export wildcard_base="rede_natura2000."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"


###################

export wildcard_base="reserva_natural."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"



###################

export source_dir_rel="Biodiversidade/Aves-CLIMA-MADEIRA/WGS84/"
export wildcard_base="A_berthelotii2013."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"


###################

export wildcard_base="alba."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"


###################

export wildcard_base="bertheloti."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"


###################

export wildcard_base="buteo."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"


###################

export wildcard_base="cannabina1."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"


###################

export wildcard_base="cinerea2013."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"


###################

export wildcard_base="cinerea."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"


###################

export wildcard_base="coelebs."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"


###################

export wildcard_base="Freira_da_Madeira__2013AM."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"


###################

export wildcard_base="Freira_do_Bugio__2013AM."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"


###################

export wildcard_base="Habitats."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"


###################

export wildcard_base="madeirensis2013."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"


###################

export wildcard_base="madeirensis."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"


###################

export wildcard_base="M_TalbaAnalisedadosglob."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"


###################

export wildcard_base="Pintarroxo."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"


###################

export wildcard_base="Pombo_trocaz_."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"


###################

export wildcard_base="Tentilhao."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"


###################

export wildcard_base="trocaz."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"


###################

export source_dir_rel="Biodiversidade/IFRAM/"
export wildcard_base="IFRAM_PortoSanto_wgs84."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"


###################

export wildcard_base="IFRAM_wgs84."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"

###################

export source_dir_rel="Agricultura/areas agricolas/"
export wildcard_base="paf_pop_percent."
# NOTE: this is the only shape that has EPSG different from 4326

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=2942  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"


###################

export source_dir_rel="Agricultura/COSRAM/"
export wildcard_base="agric_com_esp_nat_e_semi_nat."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"

###################


export wildcard_base="agricultura_interior."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"

###################


export wildcard_base="agricultura_litoral."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"

###################


export wildcard_base="areas_aband_em_territ_artificializado."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"

###################


export wildcard_base="bananal."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"

###################


export wildcard_base="cult_temp_regadio_assoc_a_pomar."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"

###################


export wildcard_base="cult_temp_regadio_assoc_vinha."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"

###################


export wildcard_base="cultura_de_cana_de_acucar."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"

###################


export wildcard_base="culturas_temporarias_de_regadio."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"

###################


export wildcard_base="culturas_temporarias_de_sequeiro."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"

###################


export wildcard_base="estufas_e_viveiros."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"

###################


export wildcard_base="flor_de_especies_invasoras_c_resinosas."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"

###################


export wildcard_base="flor_de_especies_invasoras."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"

###################


export wildcard_base="instalacoes_agricolas."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"

###################


export wildcard_base="pomares_de_citrinos."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"

###################


export wildcard_base="pomares_de_frutos_frescos."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"

###################


export wildcard_base="pomares_de_frutos_tropicais."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"

###################


export wildcard_base="vinhas_com_pomar."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"

###################


export wildcard_base="vinhas."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"

###################


export wildcard_base="viveiros_florestais."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"


###################

export source_dir_rel="Agricultura/produtividade_primaria_flor_exotica/wgs84/"
export wildcard_base="npp_flor_exot_a1_2040."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"

###################


export wildcard_base="npp_flor_exot_a1_2070."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"

###################


export wildcard_base="npp_flor_exot_b2_2040."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"

###################


export wildcard_base="npp_flor_exot_b2_2070."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"

###################


export wildcard_base="npp_flor_exot_b2_ctr."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"


###################

export source_dir_rel="Agricultura/produtividade_primaria_flor_natural/wgs84/"
export wildcard_base="npp_flor_nat_a1_2040."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"

###################

export wildcard_base="npp_flor_nat_a2_2070."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"


###################

export wildcard_base="npp_flor_nat_b2_2040."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"

###################

export wildcard_base="npp_flor_nat_b2_2070."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"

###################

export wildcard_base="npp_flor_nat_ctr."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"



###################

export source_dir_rel="Agricultura/rega_exp/wgs84/"
export wildcard_base="agricultura_mask."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"



###################

export wildcard_base="banana_mask."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"



###################

export wildcard_base="rega_banana_500."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"



###################

export wildcard_base="rega_batata_500."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"



###################

export wildcard_base="rega_vinha_500."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"



###################

export wildcard_base="temps_a2_4069_banana."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"



###################

export wildcard_base="temps_a2_7099_banana."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"



###################

export wildcard_base="temps_b2_4069_banana."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"



###################

export wildcard_base="temps_b2_7099_banana."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"



###################

export wildcard_base="vinhas_mask."

cd "$source_dir_rel"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir_rel$wildcard_base*\"}\')

cd "$base_dir"



