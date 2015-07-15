
export clima_host=clima.dev

###################

export source_dir="Saúde Humana/"
export wildcard_base="ondas_de_calor"

cd "$source_dir"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir$wildcard_base*\"}\')

cd ..





###################

export source_dir="Riscos Hidrogeomorfológicos/"
export wildcard_base="aluvioes"

cd "$source_dir"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir$wildcard_base*\"}\')

cd ..


###################

export source_dir="Riscos Hidrogeomorfológicos/"
export wildcard_base="Cheias_suscetibilidade_wgs84"

cd "$source_dir"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir$wildcard_base*\"}\')

cd ..



###################

export source_dir="Recursos Hídricos/CLIMA_Maderia_Shapefiles_RecursosHidricos/wgs84/"
export wildcard_base="Caudais_Galerias"

cd "$source_dir"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir$wildcard_base*\"}\')

cd ../../..


###################

export source_dir="Recursos Hídricos/CLIMA_Maderia_Shapefiles_RecursosHidricos/wgs84/"
export wildcard_base="Caudais_Nascentes"

cd "$source_dir"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir$wildcard_base*\"}\')

cd ../../..



###################

export source_dir="Recursos Hídricos/CLIMA_Maderia_Shapefiles_RecursosHidricos/wgs84/"
export wildcard_base="Caudais_Tuneis"

cd "$source_dir"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir$wildcard_base*\"}\')

cd ../../..


###################

export source_dir="Recursos Hídricos/CLIMA_Maderia_Shapefiles_RecursosHidricos/wgs84/"
export wildcard_base="Cloretos_Furos"

cd "$source_dir"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir$wildcard_base*\"}\')

cd ../../..


###################

export source_dir="Recursos Hídricos/CLIMA_Maderia_Shapefiles_RecursosHidricos/wgs84/"
export wildcard_base="Consumos_NecessidadesAgua"

cd "$source_dir"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir$wildcard_base*\"}\')

cd ../../..


###################

export source_dir="Recursos Hídricos/CLIMA_Maderia_Shapefiles_RecursosHidricos/wgs84/"
export wildcard_base="NiveisPiezometricos_Furos"

cd "$source_dir"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir$wildcard_base*\"}\')

cd ../../..


###################

export source_dir="Recursos Hídricos/PGRH10/"
export wildcard_base="linhas_agua"

cd "$source_dir"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir$wildcard_base*\"}\')

cd ../..

###################

export source_dir="Florestas/Cartografia Incêndios 2006 2013/"
export wildcard_base="Incendios_2006_2013_wgs84"

cd "$source_dir"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir$wildcard_base*\"}\')

cd ../..


###################

export source_dir="Clima/SHP/"
export wildcard_base="DPA2L"

cd "$source_dir"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir$wildcard_base*\"}\')

cd ../..

###################

export source_dir="Clima/SHP/"
export wildcard_base="DTA2L"

cd "$source_dir"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir$wildcard_base*\"}\')

cd ../..

###################

export source_dir="Clima/SHP/"
export wildcard_base="Pref"

cd "$source_dir"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir$wildcard_base*\"}\')

cd ../..

###################

export source_dir="Clima/SHP/"
export wildcard_base="Tref"

cd "$source_dir"
rm -rf "$wildcard_base".zip
zip "$wildcard_base".zip "$wildcard_base"*

eval $(echo http -v -f POST $clima_host/api/v1/files  \
    filename=\'$wildcard_base.zip\'  \
    new_file@\'$wildcard_base.zip\'  \
    tags=\'shape\'  \
    isShape=true  \
    fromSrid=4326  \
    shapeDescription=\'{\"en\":\"$source_dir$wildcard_base*\"}\')

cd ../..




POR FAZER:

Gerais (perceber melhor quais sao para entrar)
Florestas (FEITO)
Clima (FEITO)
Biodiversidade
Agricultura
