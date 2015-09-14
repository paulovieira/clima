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

