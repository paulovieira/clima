var Hoek = require("hoek");
var Config = require("config");
var Utils = require("./utils");
var _ = require("underscore");

var internals = {};

exports.abortIfInvalidLang = function(request, reply) {

	console.log("    request.params.lang: ", request.params.lang);
	console.log("    TODO: if lang is undefined, the 404 page should be sent in the default lang");

	if(!request.params.lang){
		return reply.view('404').code(404).takeover();
	}

	return reply();
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
		
		var texts = request.pre.texts;

		// TODO: generalize for other languages
		for(var i=0, l=texts.length; i<l;  i++){
			(texts[i]).pt = (texts[i]).contents.pt;
			(texts[i]).en = (texts[i]).contents.en;
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


exports.readAllMaps = {
	method: function(request, reply){

		Utils.logCallsite(Hoek.callStack()[0]);

		request.server.seneca.act({
				role: "maps", 
				cmd:"readAll", 
				raw: true,
				tilemillDir: Config.get("tilemillDir")
			}, function(err, data){

			return reply(err || data);
		});
	},
	assign: "maps"
};

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
