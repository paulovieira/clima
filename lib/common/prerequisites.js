var Hoek = require("hoek");
var Config = require("config");
var _ = require("underscore");
var Db = require("../../database/")
var Utils = require("./utils");


var internals = {};

exports.abortIfInvalidLang = function(request, reply) {

	console.log("    request.params.lang: ", request.params.lang);
	console.log("    TODO: if lang is undefined, the 404 page should be sent in the default lang");

	if(!request.params.lang){
		return reply.view('404').code(404).takeover();
	}

	return reply();
};

exports.readAllUsers = {
	method: function(request, reply){

		Utils.logCallsite(Hoek.callStack()[0]);

		request.server.seneca.act("role:users, cmd:readAll, raw: true, dummy: true", function(err, data){
			return reply(err || data);
		});
	},
	assign: "users"
};

exports.readAllUsersGroups = {
	method: function(request, reply){

		Utils.logCallsite(Hoek.callStack()[0]);

		request.server.seneca.act("role:usersGroups, cmd:readAll, raw: true", function(err, data){
			return reply(err || data);
		});
	},
	assign: "usersGroups"
};


exports.readAllTexts = {
	method: function(request, reply){

		Utils.logCallsite(Hoek.callStack()[0]);

		request.server.seneca.act("role: texts, cmd:readAll", function(err, data){
			return reply(err || data);
		});
	},
	assign: "texts"
};


exports.prepareTextsForView = {
	method: function(request, reply){

		Utils.logCallsite(Hoek.callStack()[0]);
		
		// this is the original array from the db
		var texts = request.pre.texts;
	


		// move the properties "contents.pt" and "contents.en" to the top-level of the object;

		// TODO: generalize for other languages
		for(var i=0, l=texts.length; i<l;  i++){


			texts[i].pt = texts[i].contents.pt;
			texts[i].en = texts[i].contents.en;

			// if the content is empty for one of the languages, use the corresponding default text
			// if(!texts[i].pt || !texts[i].en){
			// 	defaultText = _.findWhere(request.server.app.defaultTexts, {id: i});

			// 	if(!defaultText){
			// 		defaultText = {
			// 			contents: {
			// 				pt: "missing defaultText: " + i,
			// 				en: "missing defaultText: " + i						
			// 			}
			// 		};
			// 	}

			// 	texts[i].pt = texts[i].pt || defaultText.contents.pt;
			// 	texts[i].en = texts[i].en || defaultText.contents.en;
			// }
		}

		return reply(texts);
	},
	assign: "texts"
};


exports.readAllFiles = {
	method: function(request, reply){

		Utils.logCallsite(Hoek.callStack()[0]);

		request.server.seneca.act("role: files, cmd:readAll, raw: true", function(err, data){
			return reply(err || data);
		});
	},
	assign: "files"
};


exports.readAllShapes = {
	method: function(request, reply){

		Utils.logCallsite(Hoek.callStack()[0]);

		request.server.seneca.act("role: shapes, cmd:readAll, raw: true", function(err, data){
			return reply(err || data);
		});
	},
	assign: "shapes"
};


exports.readAllGeoTables = {
	method: function(request, reply){

		Utils.logCallsite(Hoek.callStack()[0]);

		request.server.seneca.act("role: geoTables, cmd:readAll, raw: true", function(err, data){
			return reply(err || data);
		});
	},
	assign: "geoTables"
};

exports.readAllMaps = {
	method: function(request, reply){

		Utils.logCallsite(Hoek.callStack()[0]);

		request.server.seneca.act({
				role: "maps", 
				cmd:"readAll", 
				pre: request.pre,
				raw: true,
			}, function(err, data){

			return reply(err || data);
		});
	},
	assign: "maps"
};

// IMPORTANT: this prerequisite must be executed always after the readAllMaps prerequisite
// (because we need to have all maps in request.pre.maps)
exports.readMapsMenu = {
	method: function(request, reply){

		Utils.logCallsite(Hoek.callStack()[0]);

		request.server.seneca.act({
				role: "maps", 
				cmd:"readMenu",
				pre: request.pre,
			}, function(err, data){

			return reply(err || data);
		});
	},
	assign: "mapsMenu"
};


exports.readShowEnglish = {
	method: function(request, reply){

		Utils.logCallsite(Hoek.callStack()[0]);

		Db.func("config_read", JSON.stringify({ key: "showEnglish" }))
		    .then(function(configRow) {
		        
		        var showEnglish = configRow[0]["value"];
		        return reply(showEnglish);
		    })
		    .catch(function(err) {

		        err = err.isBoom ? err : Boom.badImplementation(err.msg, err);
		        return reply(err);
		    });

	},
	assign: "showEnglish"
};


// exports.readAllSeqMaps = {
// 	method: function(request, reply){

// 		Utils.logCallsite(Hoek.callStack()[0]);

// 		request.server.seneca.act({
// 				role: "maps", 
// 				cmd:"readSequential",
// 			}, function(err, data){

// 			return reply(err || data);
// 		});
// 	},
// 	assign: "seqMaps"
// };


// exports.prepareTextsForDashboard = {
// 	method: function(request, reply){

// 		Utils.logCallsite(Hoek.callStack()[0]);
		
// 		var texts = request.pre.texts;

// 		// TODO: generalize for other languages
// 		for(var i=0, l=texts.length; i<l;  i++){
// 			(texts[i]).pt = (texts[i]).contents.pt;
// 			(texts[i]).en = (texts[i]).contents.en;
// 		}

// 		return reply(_.indexBy(texts, "id"));
// 	},
// 	assign: "texts"
// };



