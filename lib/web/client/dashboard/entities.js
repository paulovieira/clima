var menuLeftC = new Backbone.Collection([
{
	itemCode: "profile",
	itemTitle: {pt: "Personal data", en: "Personal data"},
	itemIcon: "fa-home"
},

{
	itemCode: "texts",
	//itemTitle: Clima.texts[12].contents,
	itemTitle: {pt: "Texts", en: "Texts"},
	itemIcon: "fa-file-text-o"
},

{
	itemCode: "users",
	itemTitle: {pt: "Users", en: "Users"},
	itemIcon: "fa-user"
},


// {
// 	itemCode: "groups",
// 	itemTitle: {pt: "Groups", en: "Groups"},
// 	itemIcon: "fa-group"
// },

{
	itemCode: "indicators",
	itemTitle: {pt: "Indicadores", en: "Indicadores"},
	itemIcon: "fa-line-chart"
},

{
	itemCode: "files",
	itemTitle: {pt: "Files", en: "Files"},
	itemIcon: "fa-folder-open-o"
},

{
	itemCode: "maps",
	itemTitle: {pt: "Map tools", en: "Map tools"},
	itemIcon: "fa-wrench"	
}



]);

menuLeftC.each(function(model){
	model.set("lang", Clima.lang);
});






var UserM = Backbone.Model.extend({
	urlRoot: "/api/v1/users",
	defaults: {
		"firstName": "",
		"lastName": "",
		"email": "",
		"createdAt": undefined
	},
	initialize: function(){

	},
	parse: function(resp){
		if(_.isArray(resp)){ resp = resp[0]; }

		resp.createdAt = fecha.format(new Date(resp.createdAt), "YYYY-MM-DD HH:mm:ss");
//		resp.createdAt = moment(resp.createdAt).format('YYYY-MM-DD HH:mm:ss');

		// for this view we won't need these properties
		delete resp.userGroups;
		delete resp.userTexts;

		return resp;
	},

});

var UsersC = Backbone.Collection.extend({
	model: UserM,
	url: "/api/v1/users"
});

var usersC = new UsersC();



var TextM = Backbone.Model.extend({
	urlRoot: "/api/v1/texts",
	defaults: {
		"tags": [],
		"contents": {pt: "", en: ""},
	},

	parse: function(resp){
		if(_.isArray(resp)){ resp = resp[0]; }

		resp.lastUpdated = fecha.format(new Date(resp.lastUpdated), "YYYY-MM-DD HH:mm:ss");
		//resp.lastUpdated = moment(resp.lastUpdated).format('YYYY-MM-DD HH:mm:ss');

		return resp;
	}
});

var TextsC = Backbone.Collection.extend({
	model: TextM,
	url: "/api/v1/texts",
});

var textsC = new TextsC();



var FileM = Backbone.Model.extend({
	urlRoot: "/api/v1/files",
	name: "",
	parse: function(resp){
		if(_.isArray(resp)){ resp = resp[0]; }
//debugger;

		resp.uploadedAt = fecha.format(new Date(resp.uploadedAt), "YYYY-MM-DD HH:mm:ss");
		//resp.uploadedAt = moment(resp.uploadedAt).format('YYYY-MM-DD HH:mm:ss');

		// delete the properties that might be null
		if(resp.description === null){ delete resp.description; }
		if(resp.properties === null){ delete resp.properties; }

		return resp;
	}
});

var FilesC = Backbone.Collection.extend({
	model: FileM,  
	url: "/api/v1/files",
});

var filesC = new FilesC();






var ShapeM = Backbone.Model.extend({
	urlRoot: "/api/v1/shapes",

	parse: function(resp){
		if(_.isArray(resp)){ resp = resp[0]; }

		resp.createdAt = fecha.format(new Date(resp.createdAt), "YYYY-MM-DD HH:mm:ss");
		//resp.createdAt = moment(resp.createdAt).format('YYYY-MM-DD HH:mm:ss');

		// sort the attributesInfo array in ascending order - not needed anymore
		//resp.attributesInfo = _.sortBy(resp.attributesInfo, "column_number");
		
		return resp;
	}
});

var ShapesC = Backbone.Collection.extend({
	model: ShapeM,
	url: "/api/v1/shapes"
});

var shapesC = new ShapesC();





var MapM = Backbone.Model.extend({
	urlRoot: "/api/v1/maps",

	parse: function(resp){
		if(_.isArray(resp)){ resp = resp[0]; }

		resp.createdAt = fecha.format(new Date(resp.createdAt), "YYYY-MM-DD HH:mm:ss");
		//resp.createdAt = moment(resp.createdAt).format('YYYY-MM-DD HH:mm:ss');
		
		return resp;
	}
});

var MapsC = Backbone.Collection.extend({
	model: MapM,
	url: "/api/v1/maps"
});

var mapsC = new MapsC();



var MapsMenuC = Backbone.Collection.extend({
	model: Backbone.Model,
	url: "/api/v1/maps-menu"
});

var mapsMenuC = new MapsMenuC();


var SequentialMapsC = Backbone.Collection.extend({
	model: Backbone.Model,
	url: "/api/v1/maps",
	parse: function(data){
		
		// here we want only the sequenctial maps (must have a "sequence" property)
		return _.filter(data, function(mapObj){ return !!mapObj.sequence; });
	}
});

var sequentialMapsC = new SequentialMapsC();





var indicatorsProcessoM = new Backbone.Model({
	faseUm: [
		{
			indicatorId:"1a",
			description: "Existe um organismo da administração regional responsável pela elaboração de políticas de adaptação e existem mecanismos de coordenação vertical e horizontal com outros órgãos governamentais."
		},
		{
			indicatorId:"1b",
			description: "Existe um organismo da administração regional responsável pela elaboração de políticas de adaptação e existem mecanismos de coordenação vertical e horizontal com outros órgãos governamentais."
		},
		{
		indicatorId: "1c",
		description: "Estão planeadas ações de cooperação com outras regiões ultraperiféricas da Macaronésia, para enfrentar os desafios comuns das alterações climáticas."
		},
		{
		indicatorId: "1d",
		description: "Existem sistemas de observação para monitorizar os impactes das alterações climáticas e de eventos extremos climáticos."
		},
		{
		indicatorId: "1e",
		description: "São utilizados cenários e projeções para avaliar os impactes económicos, sociais e ambientais das alterações climáticas."
		},
		{
		indicatorId: "1f",
		description: "Os agentes estão envolvidos na definição de prioridades de investigação e existem interfaces entre ciência e política, tais como workshops, para facilitar o diálogo entre investigadores e decisores políticos."
		},
		{
		indicatorId: "1g",
		description: "As lacunas de conhecimento identificadas são usadas para priorizar o financiamento público da investigação sobre impactes, vulnerabilidades e adaptação às alterações climáticas."
		},
		{
		indicatorId: "1h",
		description: "Os dados e informações relevantes sobre adaptação estão disponíveis para todos os agentes, por exemplo, através de um website dedicado."
		},
		{
		indicatorId: "1i",
		description: "Ocorrem atividades de capacitação e sensibilização, sendo disponibilizados e disseminados materiais de educação e de formação sobre adaptação às alterações climáticas."
		},
	],
	faseDois: [
		{
		indicatorId: "2a",
		description: "Para os setores prioritários, é considerada uma gama de opções de adaptação consistente, com os resultados de estudos de avaliação das vulnerabilidades setoriais às alterações climáticas e com medidas e boas práticas de adaptação."
		},
		{
		indicatorId: "2b",
		description: "Está disponível um orçamento específico para o financiamento de medidas de adaptação e para aumentar a resiliência ao clima nos setores vulneráveis."
		},
		{
		indicatorId: "2c",
		description: "Estão a ser mapeadas as medidas de adaptação autónomas."
		}
	],
	faseTres: [
		{
		indicatorId: "3a",
		description: "As atuais estratégias de gestão e prevenção de riscos consideram os extremos climáticos atuais e projetados."
		},
		{
		indicatorId: "3b",
		description: "As atuais políticas de planeamento e gestão do uso do solo têm em conta os impactes das alterações climáticas."
		},
		{
		indicatorId: "3c",
		description: "A adaptação já está integrada em instrumentos financeiros e de gestão de risco ou instrumentos políticos alternativos, para incentivar investimentos na prevenção de riscos."
		},
		{
		indicatorId: "3d",
		description: "Estão definidos planos de ação ou documentos de política setorial, para que a adaptação seja efetivamente implementada."
		},
		{
		indicatorId: "3e",
		description: "Existem mecanismos de cooperação para fomentar e apoiar a adaptação a diferentes escalas relevantes, por exemplo, municipal e local."
		},
		{
		indicatorId: "3f",
		description: "Existem processos para o envolvimento dos agentes na implementação das políticas, medidas e projetos de adaptação."
		},
		{
		indicatorId: "3g",
		description: "A integração da adaptação às alterações climáticas nas políticas setoriais é monitorizada, através de indicadores de conteúdo relevantes."
		},
		{
		indicatorId: "3h",
		description: "A informação sobre ações de adaptação é recolhida e divulgada, incluindo, por exemplo, os gastos relacionados com a adaptação."
		},
		{
		indicatorId: "3i",
		description: "Existe cooperação entre os vários organismos da administração regional ou local para recolher dados e informações sobre a adaptação nos diferentes níveis."
		},
		{
		indicatorId: "3j",
		description: "Está prevista a revisão periódica da Estratégia CLIMA-Madeira."
		},
		{
		indicatorId: "3k",
		description: "Os agentes estão envolvidos na avaliação e revisão da política regional de adaptação às alterações climáticas."
		}
	]
});
