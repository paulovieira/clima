
# total: 93
# note: start temporaility the server in mode dev-no-auth

#export clima_host=clima.fc.ul.pt
export clima_host=clima.dev
export base_dir="/home/pvieira/clima-madeira/Mapas 150630"

cd "$base_dir"



###################

export source_dir_rel="Gerais/CAOP2014/"
export wildcard_base="CAOP2014."

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


export wildcard_base="CAOP2014_limites."

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


export wildcard_base="funchal."

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


export wildcard_base="municipios."

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

export source_dir_rel="Gerais/COSRAM/wgs84/"
export wildcard_base="aeroportos."

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


export wildcard_base="areas_de_estc_e_logradouros."

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


export wildcard_base="areas_em_construcao."

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


export wildcard_base="aterros."

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


export wildcard_base="campos_de_golfe."

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


export wildcard_base="canais_artificiais."

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


export wildcard_base="cemiterios."

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


export wildcard_base="comercio."

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


export wildcard_base="cortes_rasos."

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


export wildcard_base="cursos_de_agua_naturais."

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


export wildcard_base="equipamentos_publicos_e_privados."

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


export wildcard_base="equip_culturais_e_zonas_historicas."

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


export wildcard_base="estaleiros_navais_e_docas_secas."

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


export wildcard_base="flor_abertas_de_especies_invasoras."

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


export wildcard_base="flor_abertas_de_especies_inv_c_resin."

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


export wildcard_base="flor_abertas_de_eucalipto_c_resinosas."

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


export wildcard_base="flor_abertas_de_outras_resinosas."

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


export wildcard_base="flor_abertas_de_outrras_folhosas."

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


export wildcard_base="flor_abertas_de_pinh_bravo_c_folhosas."

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


export wildcard_base="flor_abertas_especies_inv_c_folhosas."

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


export wildcard_base="flor_de_castanheiro_com_folhosas."

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


export wildcard_base="flor_de_castanheiro_com_resinosas."

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


export wildcard_base="flor_de_especies_inva_com_folhosas."

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


export wildcard_base="flor_de_eucalipto_com_folhosas."

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


export wildcard_base="flor_de_eucalipto_com_resinosas."

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


export wildcard_base="flor_de_mist_de_folhosas_com_resinosas."

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


export wildcard_base="flor_de_mistura_de_resin_com_folhosas."

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


export wildcard_base="flor_de_outra_folhosa_com_resinosas."

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


export wildcard_base="flor_de_outra_folhosas_com_folhosas."

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


export wildcard_base="flor_de_outras_folhosas."

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


export wildcard_base="flor_de_outras_resinosas_com_folhosas."

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


export wildcard_base="flor_de_outras_resinosas_com_resinosas."

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


export wildcard_base="flor_de_outras_resinosas."

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


export wildcard_base="flor_de_pinheiro_bravo_com_folhosas."

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


export wildcard_base="flor_de_pinheiro_bravo_com_resinosas."

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


export wildcard_base="floricultura."

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


export wildcard_base="industria."

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


export wildcard_base="infra_estrut_capt_trat_abast_agua_consumo."

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


export wildcard_base="infra_estrut_de_prod_de_energia_nao_renov."

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


export wildcard_base="infra_estrut_de_producao_de_energia_renov."

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


export wildcard_base="infra_estrut_trat_residuos_e_aguas_residuais."

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


export wildcard_base="lagoas_costeiras."

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


export wildcard_base="lagos_e_lagoas_interiores_artificiais."

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


export wildcard_base="lagos_e_lagoas_interiores_naturais."

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


export wildcard_base="lixeiras_e_sucatas."

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


export wildcard_base="marinas_e_docas_secas."

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


export wildcard_base="novas_plantacoes."

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


export wildcard_base="outras_instalacoes_desportivas."

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


export wildcard_base="outros_equipamentos_de_lazer."

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


export wildcard_base="outros_pomares."

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


export wildcard_base="parques_de_campismo."

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


export wildcard_base="parques_e_jardins."

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


export wildcard_base="pastagens_permanentes."

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


export wildcard_base="pauis."

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


export wildcard_base="pedreiras."

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


export wildcard_base="praias_dunas_e_areais_costeiros."

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


export wildcard_base="praias_dunas_e_areais_interiores."

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


export wildcard_base="rede_viaria_e_espacos_associados."

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


export wildcard_base="reserv_de_represas_ou_de_acudes."

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


export wildcard_base="rocha_nua."

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


export wildcard_base="SAF_outras_esp_com_cult_temp_regadio."

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


export wildcard_base="sistemas_culturais_e_parcel_complexos."

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


export wildcard_base="tecido_urbano_continuo_pred_horiz."

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


export wildcard_base="tecido_urbano_continuo_pred_vert."

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


export wildcard_base="tecido_urbano_descontinuo_esparso."

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


export wildcard_base="tecido_urbano_descontinuo."

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


export wildcard_base="terminais_portuarios_de_mar_e_de_rio."

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


export wildcard_base="vegetacao_esparsa."

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


export wildcard_base="vegetacao_herbacia_natural."

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

export source_dir_rel="Gerais/Freguesias_wgs84/"
export wildcard_base="freguesias."

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

export source_dir_rel="Gerais/infra-estruturas/wgs84/"
export wildcard_base="bibliotecas."

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


export wildcard_base="bombas_gasolina."

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


export wildcard_base="bombeiros."

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


export wildcard_base="camaras_municipais."

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


export wildcard_base="centro_saude."

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


export wildcard_base="centros_comerciais."

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


export wildcard_base="conservatorias."

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


export wildcard_base="desporto."

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


export wildcard_base="empreendimentos_turisticos."

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


export wildcard_base="escolas."

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


export wildcard_base="farmacias."

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


export wildcard_base="forcas_seguranca."

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


export wildcard_base="governo_regional."

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


export wildcard_base="hospitais."

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


export wildcard_base="igrejas."

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


export wildcard_base="juntas_freguesia."

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


export wildcard_base="museus."

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


export wildcard_base="tesourarias."

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


export wildcard_base="tribunais."

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

