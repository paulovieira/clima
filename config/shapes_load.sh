# NOTE: the shapes in "Gerais" directory should be loaded first (so that they show up at the bottom in the list of shapes)
# note: we have to start temporaility the server in mode dev-no-auth


#export clima_host=clima.fc.ul.pt
#export clima_host=clima.dev
export base_dir="/home/pvieira/clima-madeira/Mapas 150630"

source_dir_rel=()
filename_base=()
from_srid=()


source_dir_rel+=("Gerais/infra-estruturas/wgs84")
filename_base+=("tribunais")
from_srid+=(4326)

source_dir_rel+=("Gerais/infra-estruturas/wgs84")
filename_base+=("tesourarias")
from_srid+=(4326)

source_dir_rel+=("Gerais/infra-estruturas/wgs84")
filename_base+=("museus")
from_srid+=(4326)

source_dir_rel+=("Gerais/infra-estruturas/wgs84")
filename_base+=("juntas_freguesia")
from_srid+=(4326)

source_dir_rel+=("Gerais/infra-estruturas/wgs84")
filename_base+=("igrejas")
from_srid+=(4326)

source_dir_rel+=("Gerais/infra-estruturas/wgs84")
filename_base+=("hospitais")
from_srid+=(4326)

source_dir_rel+=("Gerais/infra-estruturas/wgs84")
filename_base+=("governo_regional")
from_srid+=(4326)

source_dir_rel+=("Gerais/infra-estruturas/wgs84")
filename_base+=("forcas_seguranca")
from_srid+=(4326)

source_dir_rel+=("Gerais/infra-estruturas/wgs84")
filename_base+=("farmacias")
from_srid+=(4326)

source_dir_rel+=("Gerais/infra-estruturas/wgs84")
filename_base+=("escolas")
from_srid+=(4326)

source_dir_rel+=("Gerais/infra-estruturas/wgs84")
filename_base+=("empreendimentos_turisticos")
from_srid+=(4326)

source_dir_rel+=("Gerais/infra-estruturas/wgs84")
filename_base+=("desporto")
from_srid+=(4326)

source_dir_rel+=("Gerais/infra-estruturas/wgs84")
filename_base+=("conservatorias")
from_srid+=(4326)

source_dir_rel+=("Gerais/infra-estruturas/wgs84")
filename_base+=("centros_comerciais")
from_srid+=(4326)

source_dir_rel+=("Gerais/infra-estruturas/wgs84")
filename_base+=("centro_saude")
from_srid+=(4326)

source_dir_rel+=("Gerais/infra-estruturas/wgs84")
filename_base+=("camaras_municipais")
from_srid+=(4326)

source_dir_rel+=("Gerais/infra-estruturas/wgs84")
filename_base+=("bombeiros")
from_srid+=(4326)

source_dir_rel+=("Gerais/infra-estruturas/wgs84")
filename_base+=("bombas_gasolina")
from_srid+=(4326)

source_dir_rel+=("Gerais/infra-estruturas/wgs84")
filename_base+=("bibliotecas")
from_srid+=(4326)

source_dir_rel+=("Gerais/Freguesias_wgs84")
filename_base+=("freguesias")
from_srid+=(4326)

source_dir_rel+=("Gerais/COSRAM/wgs84")
filename_base+=("vegetacao_herbacia_natural")
from_srid+=(4326)

source_dir_rel+=("Gerais/COSRAM/wgs84")
filename_base+=("vegetacao_esparsa")
from_srid+=(4326)

source_dir_rel+=("Gerais/COSRAM/wgs84")
filename_base+=("terminais_portuarios_de_mar_e_de_rio")
from_srid+=(4326)

source_dir_rel+=("Gerais/COSRAM/wgs84")
filename_base+=("tecido_urbano_descontinuo")
from_srid+=(4326)

source_dir_rel+=("Gerais/COSRAM/wgs84")
filename_base+=("tecido_urbano_descontinuo_esparso")
from_srid+=(4326)

source_dir_rel+=("Gerais/COSRAM/wgs84")
filename_base+=("tecido_urbano_continuo_pred_vert")
from_srid+=(4326)

source_dir_rel+=("Gerais/COSRAM/wgs84")
filename_base+=("tecido_urbano_continuo_pred_horiz")
from_srid+=(4326)

source_dir_rel+=("Gerais/COSRAM/wgs84")
filename_base+=("sistemas_culturais_e_parcel_complexos")
from_srid+=(4326)

source_dir_rel+=("Gerais/COSRAM/wgs84")
filename_base+=("SAF_outras_esp_com_cult_temp_regadio")
from_srid+=(4326)

source_dir_rel+=("Gerais/COSRAM/wgs84")
filename_base+=("rocha_nua")
from_srid+=(4326)

source_dir_rel+=("Gerais/COSRAM/wgs84")
filename_base+=("reserv_de_represas_ou_de_acudes")
from_srid+=(4326)

source_dir_rel+=("Gerais/COSRAM/wgs84")
filename_base+=("rede_viaria_e_espacos_associados")
from_srid+=(4326)

source_dir_rel+=("Gerais/COSRAM/wgs84")
filename_base+=("praias_dunas_e_areais_interiores")
from_srid+=(4326)

source_dir_rel+=("Gerais/COSRAM/wgs84")
filename_base+=("praias_dunas_e_areais_costeiros")
from_srid+=(4326)

source_dir_rel+=("Gerais/COSRAM/wgs84")
filename_base+=("pedreiras")
from_srid+=(4326)

source_dir_rel+=("Gerais/COSRAM/wgs84")
filename_base+=("pauis")
from_srid+=(4326)

source_dir_rel+=("Gerais/COSRAM/wgs84")
filename_base+=("pastagens_permanentes")
from_srid+=(4326)

source_dir_rel+=("Gerais/COSRAM/wgs84")
filename_base+=("parques_e_jardins")
from_srid+=(4326)

source_dir_rel+=("Gerais/COSRAM/wgs84")
filename_base+=("parques_de_campismo")
from_srid+=(4326)

source_dir_rel+=("Gerais/COSRAM/wgs84")
filename_base+=("outros_pomares")
from_srid+=(4326)

source_dir_rel+=("Gerais/COSRAM/wgs84")
filename_base+=("outros_equipamentos_de_lazer")
from_srid+=(4326)

source_dir_rel+=("Gerais/COSRAM/wgs84")
filename_base+=("outras_instalacoes_desportivas")
from_srid+=(4326)

source_dir_rel+=("Gerais/COSRAM/wgs84")
filename_base+=("novas_plantacoes")
from_srid+=(4326)

source_dir_rel+=("Gerais/COSRAM/wgs84")
filename_base+=("marinas_e_docas_secas")
from_srid+=(4326)

source_dir_rel+=("Gerais/COSRAM/wgs84")
filename_base+=("lixeiras_e_sucatas")
from_srid+=(4326)

source_dir_rel+=("Gerais/COSRAM/wgs84")
filename_base+=("lagos_e_lagoas_interiores_naturais")
from_srid+=(4326)

source_dir_rel+=("Gerais/COSRAM/wgs84")
filename_base+=("lagos_e_lagoas_interiores_artificiais")
from_srid+=(4326)

source_dir_rel+=("Gerais/COSRAM/wgs84")
filename_base+=("lagoas_costeiras")
from_srid+=(4326)

source_dir_rel+=("Gerais/COSRAM/wgs84")
filename_base+=("infra_estrut_trat_residuos_e_aguas_residuais")
from_srid+=(4326)

source_dir_rel+=("Gerais/COSRAM/wgs84")
filename_base+=("infra_estrut_de_producao_de_energia_renov")
from_srid+=(4326)

source_dir_rel+=("Gerais/COSRAM/wgs84")
filename_base+=("infra_estrut_de_prod_de_energia_nao_renov")
from_srid+=(4326)

source_dir_rel+=("Gerais/COSRAM/wgs84")
filename_base+=("infra_estrut_capt_trat_abast_agua_consumo")
from_srid+=(4326)

source_dir_rel+=("Gerais/COSRAM/wgs84")
filename_base+=("industria")
from_srid+=(4326)

source_dir_rel+=("Gerais/COSRAM/wgs84")
filename_base+=("floricultura")
from_srid+=(4326)

source_dir_rel+=("Gerais/COSRAM/wgs84")
filename_base+=("flor_de_pinheiro_bravo_com_resinosas")
from_srid+=(4326)

source_dir_rel+=("Gerais/COSRAM/wgs84")
filename_base+=("flor_de_pinheiro_bravo_com_folhosas")
from_srid+=(4326)

source_dir_rel+=("Gerais/COSRAM/wgs84")
filename_base+=("flor_de_outras_resinosas")
from_srid+=(4326)

source_dir_rel+=("Gerais/COSRAM/wgs84")
filename_base+=("flor_de_outras_resinosas_com_resinosas")
from_srid+=(4326)

source_dir_rel+=("Gerais/COSRAM/wgs84")
filename_base+=("flor_de_outras_resinosas_com_folhosas")
from_srid+=(4326)

source_dir_rel+=("Gerais/COSRAM/wgs84")
filename_base+=("flor_de_outras_folhosas")
from_srid+=(4326)

source_dir_rel+=("Gerais/COSRAM/wgs84")
filename_base+=("flor_de_outra_folhosas_com_folhosas")
from_srid+=(4326)

source_dir_rel+=("Gerais/COSRAM/wgs84")
filename_base+=("flor_de_outra_folhosa_com_resinosas")
from_srid+=(4326)

source_dir_rel+=("Gerais/COSRAM/wgs84")
filename_base+=("flor_de_mistura_de_resin_com_folhosas")
from_srid+=(4326)

source_dir_rel+=("Gerais/COSRAM/wgs84")
filename_base+=("flor_de_mist_de_folhosas_com_resinosas")
from_srid+=(4326)

source_dir_rel+=("Gerais/COSRAM/wgs84")
filename_base+=("flor_de_eucalipto_com_resinosas")
from_srid+=(4326)

source_dir_rel+=("Gerais/COSRAM/wgs84")
filename_base+=("flor_de_eucalipto_com_folhosas")
from_srid+=(4326)

source_dir_rel+=("Gerais/COSRAM/wgs84")
filename_base+=("flor_de_especies_inva_com_folhosas")
from_srid+=(4326)

source_dir_rel+=("Gerais/COSRAM/wgs84")
filename_base+=("flor_de_castanheiro_com_resinosas")
from_srid+=(4326)

source_dir_rel+=("Gerais/COSRAM/wgs84")
filename_base+=("flor_de_castanheiro_com_folhosas")
from_srid+=(4326)

source_dir_rel+=("Gerais/COSRAM/wgs84")
filename_base+=("flor_abertas_especies_inv_c_folhosas")
from_srid+=(4326)

source_dir_rel+=("Gerais/COSRAM/wgs84")
filename_base+=("flor_abertas_de_pinh_bravo_c_folhosas")
from_srid+=(4326)

source_dir_rel+=("Gerais/COSRAM/wgs84")
filename_base+=("flor_abertas_de_outrras_folhosas")
from_srid+=(4326)

source_dir_rel+=("Gerais/COSRAM/wgs84")
filename_base+=("flor_abertas_de_outras_resinosas")
from_srid+=(4326)

source_dir_rel+=("Gerais/COSRAM/wgs84")
filename_base+=("flor_abertas_de_eucalipto_c_resinosas")
from_srid+=(4326)

source_dir_rel+=("Gerais/COSRAM/wgs84")
filename_base+=("flor_abertas_de_especies_inv_c_resin")
from_srid+=(4326)

source_dir_rel+=("Gerais/COSRAM/wgs84")
filename_base+=("flor_abertas_de_especies_invasoras")
from_srid+=(4326)

source_dir_rel+=("Gerais/COSRAM/wgs84")
filename_base+=("estaleiros_navais_e_docas_secas")
from_srid+=(4326)

source_dir_rel+=("Gerais/COSRAM/wgs84")
filename_base+=("equip_culturais_e_zonas_historicas")
from_srid+=(4326)

source_dir_rel+=("Gerais/COSRAM/wgs84")
filename_base+=("equipamentos_publicos_e_privados")
from_srid+=(4326)

source_dir_rel+=("Gerais/COSRAM/wgs84")
filename_base+=("cursos_de_agua_naturais")
from_srid+=(4326)

source_dir_rel+=("Gerais/COSRAM/wgs84")
filename_base+=("cortes_rasos")
from_srid+=(4326)

source_dir_rel+=("Gerais/COSRAM/wgs84")
filename_base+=("comercio")
from_srid+=(4326)

source_dir_rel+=("Gerais/COSRAM/wgs84")
filename_base+=("cemiterios")
from_srid+=(4326)

source_dir_rel+=("Gerais/COSRAM/wgs84")
filename_base+=("canais_artificiais")
from_srid+=(4326)

source_dir_rel+=("Gerais/COSRAM/wgs84")
filename_base+=("campos_de_golfe")
from_srid+=(4326)

source_dir_rel+=("Gerais/COSRAM/wgs84")
filename_base+=("aterros")
from_srid+=(4326)

source_dir_rel+=("Gerais/COSRAM/wgs84")
filename_base+=("areas_em_construcao")
from_srid+=(4326)

source_dir_rel+=("Gerais/COSRAM/wgs84")
filename_base+=("areas_de_estc_e_logradouros")
from_srid+=(4326)

source_dir_rel+=("Gerais/COSRAM/wgs84")
filename_base+=("aeroportos")
from_srid+=(4326)

source_dir_rel+=("Gerais/CAOP2014")
filename_base+=("municipios")
from_srid+=(4326)

source_dir_rel+=("Gerais/CAOP2014")
filename_base+=("funchal")
from_srid+=(4326)

source_dir_rel+=("Gerais/CAOP2014")
filename_base+=("CAOP2014")
from_srid+=(4326)

source_dir_rel+=("Gerais/CAOP2014")
filename_base+=("CAOP2014_limites")
from_srid+=(4326)

source_dir_rel+=("Saúde Humana")
filename_base+=("ondas_de_calor")
from_srid+=(4326)

source_dir_rel+=("Riscos Hidrogeomorfológicos")
filename_base+=("Cheias_suscetibilidade_wgs84")
from_srid+=(4326)

source_dir_rel+=("Riscos Hidrogeomorfológicos")
filename_base+=("aluvioes")
from_srid+=(4326)

source_dir_rel+=("Recursos Hídricos/PGRH10")
filename_base+=("linhas_agua")
from_srid+=(4326)

source_dir_rel+=("Recursos Hídricos/CLIMA_Maderia_Shapefiles_RecursosHidricos/wgs84")
filename_base+=("NiveisPiezometricos_Furos")
from_srid+=(4326)

source_dir_rel+=("Recursos Hídricos/CLIMA_Maderia_Shapefiles_RecursosHidricos/wgs84")
filename_base+=("Consumos_NecessidadesAgua")
from_srid+=(4326)

source_dir_rel+=("Recursos Hídricos/CLIMA_Maderia_Shapefiles_RecursosHidricos/wgs84")
filename_base+=("Cloretos_Furos")
from_srid+=(4326)

source_dir_rel+=("Recursos Hídricos/CLIMA_Maderia_Shapefiles_RecursosHidricos/wgs84")
filename_base+=("Caudais_Tuneis")
from_srid+=(4326)

source_dir_rel+=("Recursos Hídricos/CLIMA_Maderia_Shapefiles_RecursosHidricos/wgs84")
filename_base+=("Caudais_Nascentes")
from_srid+=(4326)

source_dir_rel+=("Recursos Hídricos/CLIMA_Maderia_Shapefiles_RecursosHidricos/wgs84")
filename_base+=("Caudais_Galerias")
from_srid+=(4326)

source_dir_rel+=("Florestas/COSRAM")
filename_base+=("matos_pouco_densos_exoticos")
from_srid+=(4326)

source_dir_rel+=("Florestas/COSRAM")
filename_base+=("matos_pouco_densos_autoctones")
from_srid+=(4326)

source_dir_rel+=("Florestas/COSRAM")
filename_base+=("matos_densos_exoticos")
from_srid+=(4326)

source_dir_rel+=("Florestas/COSRAM")
filename_base+=("matos_densos_autoctones")
from_srid+=(4326)

source_dir_rel+=("Florestas/COSRAM")
filename_base+=("flor_natural_da_madeira")
from_srid+=(4326)

source_dir_rel+=("Florestas/COSRAM")
filename_base+=("flor_de_pinheiro_bravo")
from_srid+=(4326)

source_dir_rel+=("Florestas/COSRAM")
filename_base+=("flor_de_outros_carvalhos")
from_srid+=(4326)

source_dir_rel+=("Florestas/COSRAM")
filename_base+=("flor_de_eucalipto")
from_srid+=(4326)

source_dir_rel+=("Florestas/COSRAM")
filename_base+=("flor_de_castanheiro")
from_srid+=(4326)

source_dir_rel+=("Florestas/COSRAM")
filename_base+=("flor_abertas_de_pinheiro_bravo")
from_srid+=(4326)

source_dir_rel+=("Florestas/COSRAM")
filename_base+=("flor_abertas_de_eucalipto")
from_srid+=(4326)

source_dir_rel+=("Florestas/COSRAM")
filename_base+=("flor_abertas_de_castanheiro")
from_srid+=(4326)

source_dir_rel+=("Florestas/COSRAM")
filename_base+=("areas_ardidas")
from_srid+=(4326)

source_dir_rel+=("Florestas/Cartografia Incêndios 2006 2013")
filename_base+=("Incendios_2006_2013_wgs84")
from_srid+=(4326)

source_dir_rel+=("Clima/SHP")
filename_base+=("Tref")
from_srid+=(4326)

source_dir_rel+=("Clima/SHP")
filename_base+=("Pref")
from_srid+=(4326)

source_dir_rel+=("Clima/SHP")
filename_base+=("DTA2L")
from_srid+=(4326)

source_dir_rel+=("Clima/SHP")
filename_base+=("DPA2L")
from_srid+=(4326)

source_dir_rel+=("Biodiversidade/IFRAM")
filename_base+=("IFRAM_wgs84")
from_srid+=(4326)

source_dir_rel+=("Biodiversidade/IFRAM")
filename_base+=("IFRAM_PortoSanto_wgs84")
from_srid+=(4326)

source_dir_rel+=("Biodiversidade/Aves-CLIMA-MADEIRA/WGS84")
filename_base+=("trocaz")
from_srid+=(4326)

source_dir_rel+=("Biodiversidade/Aves-CLIMA-MADEIRA/WGS84")
filename_base+=("Tentilhao")
from_srid+=(4326)

source_dir_rel+=("Biodiversidade/Aves-CLIMA-MADEIRA/WGS84")
filename_base+=("Pombo_trocaz_")
from_srid+=(4326)

source_dir_rel+=("Biodiversidade/Aves-CLIMA-MADEIRA/WGS84")
filename_base+=("Pintarroxo")
from_srid+=(4326)

source_dir_rel+=("Biodiversidade/Aves-CLIMA-MADEIRA/WGS84")
filename_base+=("M_TalbaAnalisedadosglob")
from_srid+=(4326)

source_dir_rel+=("Biodiversidade/Aves-CLIMA-MADEIRA/WGS84")
filename_base+=("madeirensis")
from_srid+=(4326)

source_dir_rel+=("Biodiversidade/Aves-CLIMA-MADEIRA/WGS84")
filename_base+=("madeirensis2013")
from_srid+=(4326)

source_dir_rel+=("Biodiversidade/Aves-CLIMA-MADEIRA/WGS84")
filename_base+=("Habitats")
from_srid+=(4326)

source_dir_rel+=("Biodiversidade/Aves-CLIMA-MADEIRA/WGS84")
filename_base+=("Freira_do_Bugio__2013AM")
from_srid+=(4326)

source_dir_rel+=("Biodiversidade/Aves-CLIMA-MADEIRA/WGS84")
filename_base+=("Freira_da_Madeira__2013AM")
from_srid+=(4326)

source_dir_rel+=("Biodiversidade/Aves-CLIMA-MADEIRA/WGS84")
filename_base+=("coelebs")
from_srid+=(4326)

source_dir_rel+=("Biodiversidade/Aves-CLIMA-MADEIRA/WGS84")
filename_base+=("cinerea")
from_srid+=(4326)

source_dir_rel+=("Biodiversidade/Aves-CLIMA-MADEIRA/WGS84")
filename_base+=("cinerea2013")
from_srid+=(4326)

source_dir_rel+=("Biodiversidade/Aves-CLIMA-MADEIRA/WGS84")
filename_base+=("cannabina1")
from_srid+=(4326)

source_dir_rel+=("Biodiversidade/Aves-CLIMA-MADEIRA/WGS84")
filename_base+=("buteo")
from_srid+=(4326)

source_dir_rel+=("Biodiversidade/Aves-CLIMA-MADEIRA/WGS84")
filename_base+=("bertheloti")
from_srid+=(4326)

source_dir_rel+=("Biodiversidade/Aves-CLIMA-MADEIRA/WGS84")
filename_base+=("alba")
from_srid+=(4326)

source_dir_rel+=("Biodiversidade/Aves-CLIMA-MADEIRA/WGS84")
filename_base+=("A_berthelotii2013")
from_srid+=(4326)

source_dir_rel+=("Biodiversidade/Areas Classificadas/wgs84")
filename_base+=("reserva_natural")
from_srid+=(4326)

source_dir_rel+=("Biodiversidade/Areas Classificadas/wgs84")
filename_base+=("rede_natura2000")
from_srid+=(4326)

source_dir_rel+=("Biodiversidade/Areas Classificadas/wgs84")
filename_base+=("rede_areas_marinhas")
from_srid+=(4326)

source_dir_rel+=("Biodiversidade/Areas Classificadas/wgs84")
filename_base+=("parque_natural")
from_srid+=(4326)

source_dir_rel+=("Agricultura/rega_exp/wgs84")
filename_base+=("vinhas_mask")
from_srid+=(4326)

source_dir_rel+=("Agricultura/rega_exp/wgs84")
filename_base+=("temps_b2_7099_banana")
from_srid+=(4326)

source_dir_rel+=("Agricultura/rega_exp/wgs84")
filename_base+=("temps_b2_4069_banana")
from_srid+=(4326)

source_dir_rel+=("Agricultura/rega_exp/wgs84")
filename_base+=("temps_a2_7099_banana")
from_srid+=(4326)

source_dir_rel+=("Agricultura/rega_exp/wgs84")
filename_base+=("temps_a2_4069_banana")
from_srid+=(4326)

source_dir_rel+=("Agricultura/rega_exp/wgs84")
filename_base+=("rega_vinha_500")
from_srid+=(4326)

source_dir_rel+=("Agricultura/rega_exp/wgs84")
filename_base+=("rega_batata_500")
from_srid+=(4326)

source_dir_rel+=("Agricultura/rega_exp/wgs84")
filename_base+=("rega_banana_500")
from_srid+=(4326)

source_dir_rel+=("Agricultura/rega_exp/wgs84")
filename_base+=("banana_mask")
from_srid+=(4326)

source_dir_rel+=("Agricultura/rega_exp/wgs84")
filename_base+=("agricultura_mask")
from_srid+=(4326)

source_dir_rel+=("Agricultura/produtividade_primaria_flor_natural/wgs84")
filename_base+=("npp_flor_nat_ctr")
from_srid+=(4326)

source_dir_rel+=("Agricultura/produtividade_primaria_flor_natural/wgs84")
filename_base+=("npp_flor_nat_b2_2070")
from_srid+=(4326)

source_dir_rel+=("Agricultura/produtividade_primaria_flor_natural/wgs84")
filename_base+=("npp_flor_nat_b2_2040")
from_srid+=(4326)

source_dir_rel+=("Agricultura/produtividade_primaria_flor_natural/wgs84")
filename_base+=("npp_flor_nat_a2_2070")
from_srid+=(4326)

source_dir_rel+=("Agricultura/produtividade_primaria_flor_natural/wgs84")
filename_base+=("npp_flor_nat_a1_2040")
from_srid+=(4326)

source_dir_rel+=("Agricultura/produtividade_primaria_flor_exotica/wgs84")
filename_base+=("npp_flor_exot_b2_ctr")
from_srid+=(4326)

source_dir_rel+=("Agricultura/produtividade_primaria_flor_exotica/wgs84")
filename_base+=("npp_flor_exot_b2_2070")
from_srid+=(4326)

source_dir_rel+=("Agricultura/produtividade_primaria_flor_exotica/wgs84")
filename_base+=("npp_flor_exot_b2_2040")
from_srid+=(4326)

source_dir_rel+=("Agricultura/produtividade_primaria_flor_exotica/wgs84")
filename_base+=("npp_flor_exot_a1_2070")
from_srid+=(4326)

source_dir_rel+=("Agricultura/produtividade_primaria_flor_exotica/wgs84")
filename_base+=("npp_flor_exot_a1_2040")
from_srid+=(4326)

source_dir_rel+=("Agricultura/COSRAM")
filename_base+=("viveiros_florestais")
from_srid+=(4326)

source_dir_rel+=("Agricultura/COSRAM")
filename_base+=("vinhas")
from_srid+=(4326)

source_dir_rel+=("Agricultura/COSRAM")
filename_base+=("vinhas_com_pomar")
from_srid+=(4326)

source_dir_rel+=("Agricultura/COSRAM")
filename_base+=("pomares_de_frutos_tropicais")
from_srid+=(4326)

source_dir_rel+=("Agricultura/COSRAM")
filename_base+=("pomares_de_frutos_frescos")
from_srid+=(4326)

source_dir_rel+=("Agricultura/COSRAM")
filename_base+=("pomares_de_citrinos")
from_srid+=(4326)

source_dir_rel+=("Agricultura/COSRAM")
filename_base+=("instalacoes_agricolas")
from_srid+=(4326)

source_dir_rel+=("Agricultura/COSRAM")
filename_base+=("flor_de_especies_invasoras")
from_srid+=(4326)

source_dir_rel+=("Agricultura/COSRAM")
filename_base+=("flor_de_especies_invasoras_c_resinosas")
from_srid+=(4326)

source_dir_rel+=("Agricultura/COSRAM")
filename_base+=("estufas_e_viveiros")
from_srid+=(4326)

source_dir_rel+=("Agricultura/COSRAM")
filename_base+=("culturas_temporarias_de_sequeiro")
from_srid+=(4326)

source_dir_rel+=("Agricultura/COSRAM")
filename_base+=("culturas_temporarias_de_regadio")
from_srid+=(4326)

source_dir_rel+=("Agricultura/COSRAM")
filename_base+=("cultura_de_cana_de_acucar")
from_srid+=(4326)

source_dir_rel+=("Agricultura/COSRAM")
filename_base+=("cult_temp_regadio_assoc_vinha")
from_srid+=(4326)

source_dir_rel+=("Agricultura/COSRAM")
filename_base+=("cult_temp_regadio_assoc_a_pomar")
from_srid+=(4326)

source_dir_rel+=("Agricultura/COSRAM")
filename_base+=("bananal")
from_srid+=(4326)

source_dir_rel+=("Agricultura/COSRAM")
filename_base+=("areas_aband_em_territ_artificializado")
from_srid+=(4326)

source_dir_rel+=("Agricultura/COSRAM")
filename_base+=("agricultura_litoral")
from_srid+=(4326)

source_dir_rel+=("Agricultura/COSRAM")
filename_base+=("agricultura_interior")
from_srid+=(4326)

source_dir_rel+=("Agricultura/COSRAM")
filename_base+=("agric_com_esp_nat_e_semi_nat")
from_srid+=(4326)

source_dir_rel+=("Agricultura/areas agricolas")
filename_base+=("paf_pop_percent")
from_srid+=(2942)



l=${#source_dir_rel[@]}

for (( i=0; i < $l; i++ )) do

	cd "$base_dir"/"${source_dir_rel[$i]}"
	rm -rf "${filename_base[$i]}".zip
	zip "${filename_base[$i]}".zip "${filename_base[$i]}".*

	eval $(echo http -v -f POST $clima_host/api/v1/files  \
	    filename=\'${filename_base[$i]}.zip\'  \
	    new_file@\'${filename_base[$i]}.zip\'  \
	    tags=\'shape\'  \
	    isShape=true  \
	    fromSrid=${from_srid[$i]}  \
	    shapeDescription=\'{ \"en\" : \"${source_dir_rel[$i]}/${filename_base[$i]}*\" }\')

done
