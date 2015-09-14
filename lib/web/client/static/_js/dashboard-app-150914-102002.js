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


;
// concat new file 
window.Behaviors = window.Behaviors || {};

// NOTE: this is the view where the behavior is defined
window.Behaviors.ShowModal = Marionette.Behavior.extend({

    events: function(){
    	var eventsHash = {};
    	eventsHash["click @ui." + this.options.uiKey] = "showModal";

    	return eventsHash;
    },

    showModal: function(x,y,z){

        var modalEl = "$modal1",
        	regionKey = "modal1Region";

        if(this.options.stackLevel === 2){
			modalEl = "$modal2";
			regionKey = "modal2Region";
        }

        // add the model or collection from the view subjacent to this modal view
        var modalView = new this.options.viewClass({
            model: this.view[this.options.modelKey || "model"],
        });

        if(!modalView.model){
            modalView.collection = this.view[this.options.collectionKey || "collection"];
        }

        // first set the content of the modal
        Dashboard[regionKey].show(modalView);

        // then show the modal 
        Dashboard[modalEl].modal("show");
    },
});




// close the modal and destroy the view
window.Behaviors.CloseModal = Marionette.Behavior.extend({

    // behaviors have events that are bound to the views DOM
    events: {
        "click @ui.modalCloseBtn": "closeModal",
    },

    closeModal: function(){
        var modalEl = (this.options.stackLevel === 2 ? "$modal2" : "$modal1");

		Dashboard[modalEl].modal("hide");
		this.view.destroy();
    },

});




// deletes the resource, close the modal and destroy the view
window.Behaviors.DeleteResourceAndCloseModal = Marionette.Behavior.extend({

    // behaviors have events that are bound to the views DOM
    events: {
        "click @ui.modalDeleteBtn": "deleteResource"
    },

	deleteResource: function(){

		// NOTE: we should always use model.destroy({wait: true}) instead of simply model.destroy();  
		// this way the model will be destroyed (in the client) only after we get a 200 response
		// from the server (meaning the row has actually been deleted)

		this.ui.modalDeleteBtn.prop("disabled", true);

		var self = this;
		Q.delay(150)
			.then(function(){
				return self.view.model.destroy({ wait: true });  // returns a promise
			})
			.catch(function(err){
debugger;
				var msg = err.responseJSON ? err.responseJSON.message : 
											( err.message ? err.message : "unknown error" );

				// if the model has been deleted in the server in the meantime we get a 404; 
				// the destroy() method in the above handler will not delete the model from the 
				// collection (because of the wait:true option);
				// the collection in the client will then be outdated so we call destroy again to remove 
				// the deleted model from the collection; we also abort the ajax request immediately 
				// because we are not interested in the response

				if(err.responseJSON && err.responseJSON.statusCode === 404){
					self.view.model.destroy().abort();
				}

				alert("ERROR: " + msg);
				throw new Error(msg);
			})
			.finally(function(){
		        var modalEl = (self.options.stackLevel === 2 ? "$modal2" : "$modal1");
				
				Dashboard[modalEl].modal("hide");
				self.view.destroy();
			})
			.done();
	}

});

var ModalMixins = {
	ui: {
		"modalCloseBtn":  "button.js-modal-cancel",
		"modalDeleteBtn": "button.js-modal-delete",
		"modalSaveBtn":   "button.js-modal-save"
	}	
};

var ModalIV = Mn.ItemView.extend({
	ui: {
		"modalCloseBtn":  "button.js-modal-cancel",
		"modalDeleteBtn": "button.js-modal-delete",
		"modalSaveBtn":   "button.js-modal-save"
	},
});

;
// concat new file 

var ProfileLV = Mn.LayoutView.extend({
	template: "profile/templates/profile.html",

	ui: {
		saveBtn: "button.js-save",
		changePwBtn: "button.js-change-pw"
	},

	events: {
		"click @ui.saveBtn": "updateProfile",
		"click @ui.changePwBtn": "changePw"
	},

	updateProfile: function(){
		debugger;
		var data = Backbone.Syphon.serialize(this);
		data["updateProfile"] = true;  // flag to be used in the server

		this.ui.saveBtn.prop("disabled", true);

		var self = this;
		Q.delay(150)
			.then(function(){
				return self.model.save(data, {wait: true});  // returns a promise
			})
			.then(
				function(data){
					alert("Os dados foram actualizados com sucesso.");
				},
				function(jqXHR){
					var msg = jqXHR.responseJSON.message;
					alert("ERROR: " + msg);
					throw new Error(msg);
				}
			)
			.finally(function(){
				self.ui.saveBtn.prop("disabled", false);
			})
			.done();

	},

	changePw: function(){
		// NOTE: we cannot use Syphon here because it is another form)
		var newPw     = $.trim(this.$("#js-personal-new-pw").val()    ),
			newPw2    = $.trim(this.$("#js-personal-new-pw-2").val()  ),
			currentPw = $.trim(this.$("#js-personal-current-pw").val());

		if(!currentPw){
			alert("Por favor insira a sua password actual.");
			return;			
		}
		if(newPw !== newPw2){
			alert("A nova password não é igual nos dois campos. Por favor tente novamente.");
			return;
		}

		var data = {
			currentPw: currentPw,
			newPw: newPw,
			updateProfile: true
		};

		this.ui.changePwBtn.prop("disabled", true);
		var self = this;
		Q.delay(150)
			.then(function(){
				return self.model.save(data, {wait: true});  // returns a promise
			})
			.then(
				function(data){
					alert("Os dados foram actualizados com sucesso.");
				},
				function(jqXHR){
					var msg = jqXHR.responseJSON.message;
					alert("ERROR: " + msg);
					throw new Error(msg);
				}
			)
			.finally(function(){
				self.ui.changePwBtn.prop("disabled", false);
			})
			.done();


		// remove the attriubutes from the client model
		this.model.unset("currentPw", {silent: true});
		this.model.unset("newPw", {silent: true});
	}
});

;
// concat new file 
var textsChannel = Backbone.Radio.channel('texts');
Backbone.Radio.DEBUG = true;

var TextEditModalIV = Mn.ItemView.extend({
	template: "texts/templates/texts-edit-modal.html",

	ui: {
		"modalCloseBtn":  "button.js-modal-cancel",
		"modalSaveBtn":   "button.js-modal-save"
	},

	events: {
		"click @ui.modalSaveBtn": "updateResource"
	},

	behaviors: {
		CloseModal: {
			behaviorClass: window.Behaviors.CloseModal,  // will listen for clicks on @ui.modalCloseBtn
		},
	},

	updateResource: function(){

		var data = Backbone.Syphon.serialize(this);

		var attrs = {
			"contents": {
				"pt": $.trim(data["edit-text-pt"]),
				"en": $.trim(data["edit-text-en"])
			},
			"tags": data["edit-text-tags"]
		};

		if(attrs.contents.pt + attrs.contents.pt===""){
			alert("Please fill the missing fields");
			return;
		}

		// NOTE: we should always use model.save(attrs, {wait: true}) instead of 
		// model.set(attrs) + model.save(); this way the model will be updated (in the client) only 
		// after we get a 200 response from the server (meaning the row has actually been updated)

		this.ui.modalSaveBtn.prop("disabled", true);

		var self = this;
		Q.delay(150)
			.then(function(){
				
				return self.model.save(attrs, {wait: true});  // returns a promise
			})
			.then(function(){
				var msg = "Text #" +  self.model.get("id") + " was saved"
				Clima.notify("success", msg);
			})
			.catch(function(err){
				debugger;
				var errMsg = Clima.getErrorMessage(err);
				var msg = "Text #" +  self.model.get("id") + " was not saved (ERROR: " + errMsg + ")"

				// if the model has been deleted in the server in the meantime we get a 404; 
				// the collection in the client is then outdated so we call destroy to remove 
				// the deleted model from the collection; we also abort the ajax request immediately 
				// because we are not interested in the response
				if(err.responseJSON && err.responseJSON.statusCode === 404){
					self.model.destroy().abort();
				}
				
				Clima.notify("danger", msg);
				throw new Error(msg);
			})
			.finally(function(){
				Dashboard.$modal1.modal("hide");
				self.destroy();
			})
			.done();

	},

});


var TextDeleteModalIV = Mn.ItemView.extend({
	template: "texts/templates/texts-delete-modal.html",

	ui: {
		"modalCloseBtn":  "button.js-modal-cancel",
		"modalDeleteBtn": "button.js-modal-delete",
	},

	behaviors: {
		CloseModal: {
			// will listen for clicks on @ui.modalCloseBtn
			behaviorClass: window.Behaviors.CloseModal,  
		},

		DeleteResourceAndCloseModal: {
			// will listen for clicks on @ui.modalDeleteBtn
			behaviorClass: window.Behaviors.DeleteResourceAndCloseModal,  
		},
	},

});


var TextRowLV = Mn.LayoutView.extend({
	template: "texts/templates/texts-row.html",
	tagName: "tr",
	ui: {
		"editModalBtn": "button.js-edit",
		"deleteModalBtn": "button.js-delete"
	},
	modelEvents: {
		"change": "render"
	},

	behaviors: {

		ShowEditModal: {
			behaviorClass: window.Behaviors.ShowModal,
			uiKey: "editModalBtn",  // will listen for clicks on @ui.editModalBtn
			viewClass: TextEditModalIV  // and will show this view
		},

		ShowDeleteModal: {
			behaviorClass: window.Behaviors.ShowModal,
			uiKey: "deleteModalBtn",
			viewClass: TextDeleteModalIV 
		},
	},

});

var TextsTableCV = Mn.CompositeView.extend({
	template: "texts/templates/texts-table.html",
	childView: TextRowLV,
	childViewContainer: "tbody",
});


var TextNewLV = Mn.LayoutView.extend({
	template: "texts/templates/texts-new.html",

	ui: {
		saveBtn: "button.js-save"
	},

	events: {
		"click @ui.saveBtn": "createResource"
	},

	createResource: function(){

		var data = Backbone.Syphon.serialize(this);

		var attrs = {
			"contents": {
				"pt": $.trim(data["new-text-pt"]),
				"en": $.trim(data["new-text-en"])
			},
			"tags": data["new-text-tags"]
		};

		if(attrs.contents.pt + attrs.contents.pt === ""){
			alert("Please fill the missing fields");
			return;
		}

		this.ui.saveBtn.prop("disabled", true);

		var self = this;
		Q.delay(150)
			.then(function(){

				return self.model.save(attrs, {wait: true});  // returns a promise
			})
			.then(function(){

				var msg = "The new text was successfuly created with id " + self.model.get("id");
				Clima.notify("success", msg);
				textsChannel.request("show:all:texts");
			})
			.catch(function(err){

				var errMsg = Clima.getErrorMessage(err);
				var msg = "The new next could not be created (ERROR: " + errMsg + ")";
				Clima.notify("danger", msg);

				throw new Error(msg);
			})
			.finally(function(){
				self.ui.saveBtn.prop("disabled", false);
			})
//			.done();

	}
});


var TextsTabLV = Mn.LayoutView.extend({

	initialize: function(){

		textsChannel.reply("show:all:texts", function(){

			this.$("li").removeClass("active");
			this.$("a[data-tab-separator='texts-all']").parent().addClass("active");
			this.showAll();
		}, this);

		textsChannel.reply("show:new:text", function(){

			this.$("li").removeClass("active");
			this.$("a[data-tab-separator='texts-new']").parent().addClass("active");
			this.showNew();
		}, this);

	},

	onBeforeDestroy: function(){
		textsChannel.reset();
	},

	template: "texts/templates/texts-tab.html",

	regions: {
		tabContentRegion: "#texts-region"
	},

	events: {
		"click a.js-dashboard-sep": "updateTabView"
	},

	// the initial view will be the list of all texts
	onBeforeShow: function(){
		textsChannel.request("show:all:texts");
	},

	updateTabView: function(e){

		e.preventDefault();

		switch($(e.target).data("tab-separator")){
			case "texts-all":
				textsChannel.request("show:all:texts");
				break;
			case "texts-new":
				textsChannel.request("show:new:text");
				break;
			default:
				throw new Error("unknown tab separator");
		}
	},

	showNew: function(){
		var textNewLV = new TextNewLV({
			model: new TextM()
		});
		this.tabContentRegion.show(textNewLV); 
	},

	showAll: function(){
		var textsTableCV = new TextsTableCV({
			collection: textsC
		});

		var self = this;

		Q(textsC.fetch())
			.then(function(){ 

				self.tabContentRegion.show(textsTableCV); 
			})
			.catch(function(err){

				var errMsg = Clima.getErrorMessage(err);
				alert("ERROR: " + msg);
				throw new Error(msg);
			})
			.done();
	},


});



;
// concat new file 

var UserEditModalIV = Mn.ItemView.extend({
	template: "users/templates/users-edit-modal.html",

	ui: {
		"modalCloseBtn":  "button.js-modal-cancel",
		"modalSaveBtn":   "button.js-modal-save"
	},

	events: {
		"click @ui.modalSaveBtn": "updateResource"
	},

	behaviors: {
		CloseModal: {
			behaviorClass: window.Behaviors.CloseModal,  // will listen for clicks on @ui.modalCloseBtn
		},
	},

	updateResource: function(){

		var data = Backbone.Syphon.serialize(this);

		var attrs = {
			"firstName": $.trim(data["edit-user-first-name"]),
			"lastName":  $.trim(data["edit-user-last-name"]),
			"email":     $.trim(data["edit-user-email"])
		};

		// all the fields must be filled (otherwise the validation in the server will reject)
		if(attrs.firstName==="" || attrs.lastName==="" || attrs.email===""){
			alert("Please fill the missing fields");
			return;
		}

		this.ui.modalSaveBtn.prop("disabled", true);

		var self = this;
		Q.delay(150)
			.then(function(){
				return self.model.save(attrs, {wait: true});  // returns a promise
			})
			.catch(function(err){
				var msg = err.responseJSON ? err.responseJSON.message : 
											( err.message ? err.message : "unknown error" );

				// if the model has been deleted in the server in the meantime we get a 404; 
				// the collection in the client is then outdated so we call destroy to remove 
				// the deleted model from the collection; we also abort the ajax request immediately 
				// because we are not interested in the response
				if(err.responseJSON && err.responseJSON.statusCode === 404){
					self.model.destroy().abort();
				}
				
				alert("ERROR: " + msg);
				throw new Error(msg);
			})
			.finally(function(){
				Dashboard.$modal1.modal("hide");
				self.destroy();
			})
			.done();

	},

});


var UserDeleteModalIV = Mn.ItemView.extend({
	template: "users/templates/users-delete-modal.html",

	ui: {
		"modalCloseBtn":  "button.js-modal-cancel",
		"modalDeleteBtn": "button.js-modal-delete",
	},

	behaviors: {
		CloseModal: {
			// will listen for clicks on @ui.modalCloseBtn
			behaviorClass: window.Behaviors.CloseModal,  
		},

		DeleteResourceAndCloseModal: {
			// will listen for clicks on @ui.modalDeleteBtn
			behaviorClass: window.Behaviors.DeleteResourceAndCloseModal,  
		},
	},

});



var UserRowLV = Mn.LayoutView.extend({
	template: "users/templates/users-row.html",
	tagName: "tr",
	ui: {
		"editModalBtn": "button.js-edit",
		"deleteModalBtn": "button.js-delete"
	},
	modelEvents: {
		"change": "render"
	},

	behaviors: {

		ShowEditModal: {
			behaviorClass: window.Behaviors.ShowModal,
			uiKey: "editModalBtn",  // will listen for clicks on @ui.editModalBtn
			viewClass: UserEditModalIV  // and will show this view
		},

		ShowDeleteModal: {
			behaviorClass: window.Behaviors.ShowModal,
			uiKey: "deleteModalBtn",
			viewClass: UserDeleteModalIV 
		},
	},

});

var UsersTableCV = Mn.CompositeView.extend({
	template: "users/templates/users-table.html",
	childView: UserRowLV,
	childViewContainer: "tbody",
});


var UsersTabLV = Mn.LayoutView.extend({
	template: "users/templates/users-tab.html",

	regions: {
		tabContentRegion: "#users-region"
	},

	events: {
		"click a.js-dashboard-sep": "updateView"
	},

	// the initial view will be the list of all users
	onBeforeShow: function(){
		this.showAll();
	},

	updateView: function(e){
		e.preventDefault();

		var $target = $(e.target);
		$target.parent().siblings().removeClass("active");
		$target.parent().addClass("active");

		switch($target.data("tab-separator")){
			case "users-all":
				this.showAll();
				break;
			case "users-new":
				this.showNew();
				break;
			default:
				throw new Error("unknown tab separator");
		}
	},

	showNew: function(){
		alert("To be done");
		// var userNewLV = new UserNewLV({
		// 	model: new UserM()
		// });
		// this.tabContentRegion.show(userNewLV); 
	},

	showAll: function(){
		var usersTableCV = new UsersTableCV({
			collection: usersC
		});

		var self = this;

		Q(usersC.fetch())
			.then(function(){ 
				self.tabContentRegion.show(usersTableCV); 
			})
			.catch(function(err){
				var msg = err.responseJSON ? err.responseJSON.message : 
											( err.message ? err.message : "unknown error" );

				alert("ERROR: " + msg);
				throw new Error(msg);
			})
			.done();
	},


});
;
// concat new file 

var FileEditModalIV = Mn.ItemView.extend({
	template: "files/templates/files-edit-modal.html",

	ui: {
		"modalCloseBtn":  "button.js-modal-cancel",
		"modalSaveBtn":   "button.js-modal-save"
	},

	events: {
		"click @ui.modalSaveBtn": "updateResource"
	},

	behaviors: {
		CloseModal: {
			behaviorClass: window.Behaviors.CloseModal,  // will listen for clicks on @ui.modalCloseBtn
		},
	},

	updateResource: function(){

		var data = Backbone.Syphon.serialize(this);

		var attrs = {
			"tags":  $.trim(data["edit-files-tags"])
		};

		// all the fields must be filled (otherwise the validation in the server will reject)
		// if(attrs.name===""){
		// 	alert("Please fill the name field");
		// 	return;
		// }

		this.ui.modalSaveBtn.prop("disabled", true);

		var self = this;
		Q.delay(150)
			.then(function(){
				return self.model.save(attrs, { wait: true });  // returns a promise
			})
			.catch(function(err){
				var msg = err.responseJSON ? err.responseJSON.message : 
											( err.message ? err.message : "unknown error" );

				// if the model has been deleted in the server in the meantime we get a 404; 
				// the collection in the client is then outdated so we call destroy to remove 
				// the deleted model from the collection; we also abort the ajax request immediately 
				// because we are not interested in the response
				if(err.responseJSON && err.responseJSON.statusCode === 404){
					self.model.destroy().abort();
				}
				
				alert("ERROR: " + msg);
				throw new Error(msg);
			})
			.finally(function(){
				Dashboard.$modal1.modal("hide");
				self.destroy();
			})
			.done();

	},

});


var FileDeleteModalIV = Mn.ItemView.extend({
	template: "files/templates/files-delete-modal.html",

	ui: {
		"modalCloseBtn":  "button.js-modal-cancel",
		"modalDeleteBtn": "button.js-modal-delete",
	},

	behaviors: {
		CloseModal: {
			// will listen for clicks on @ui.modalCloseBtn
			behaviorClass: window.Behaviors.CloseModal,  
		},

		DeleteResourceAndCloseModal: {
			// will listen for clicks on @ui.modalDeleteBtn
			behaviorClass: window.Behaviors.DeleteResourceAndCloseModal,  
		},
	},

});

var FileRowLV = Mn.LayoutView.extend({
	template: "files/templates/files-row.html",
	tagName: "tr",
	ui: {
		"editModalBtn": "button.js-edit",
		"deleteModalBtn": "button.js-delete"
	},
	modelEvents: {
		"change": "render"
	},

	behaviors: {

		ShowEditModal: {
			behaviorClass: window.Behaviors.ShowModal,
			uiKey: "editModalBtn",  // will listen for clicks on @ui.editModalBtn
			viewClass: FileEditModalIV  // and will show this view
		},

		ShowDeleteModal: {
			behaviorClass: window.Behaviors.ShowModal,
			uiKey: "deleteModalBtn",
			viewClass: FileDeleteModalIV 
		},
	},

});

var FilesTableCV = Mn.CompositeView.extend({
	template: "files/templates/files-table.html",
	childView: FileRowLV,
	childViewContainer: "tbody",

});



var FileNewLV = Mn.LayoutView.extend({
	template: "files/templates/files-new.html",


    // use underscore.string to generate the slugged name (the native slug method is not good)
	slugFilename: function(filename) {
    	var array = filename.split(".");
    	if(array.length===1){
    		return s.slugify(array[0]);
    	}

    	var extension = array.pop();
    	filename = s(array).toSentence("-", "-").slugify().replaceAll("-", "_").value() + "." + extension;

    	return filename;
	},

	onAttach: function(){

		// self is the view
		var self = this;

		$("#new_file").fileinput({
		    uploadUrl: '/api/v1/files',
		    maxFileSize: 1000*200,  // in Kb
		    showUpload: true,
		    initialCaption: "",
		    dropZoneTitle: "Drag & drop files here, or click the browse button below&hellip;",
		    showRemove: false,
		    maxFileCount: 1,

		    slugCallback: self.slugFilename,

		    ajaxSettings: {
		    	error: function(jqxhr, status, err){
		    		var msg = jqxhr.responseJSON.message;

					alert("ERROR: " + jqxhr.responseJSON.message);
					throw new Error(msg);
		    	}
		    },

		    uploadExtraData: function(){
		    	//debugger;

				return { 
					tags: self.$("input[name='new-file-tags']").val(),
					filename:  self.model.get("filename"),
					isShape:   self.model.get("isShape"),
					fromSrid:  self.$("input[name='from-srid']").val(),
					shapeDescription: JSON.stringify({
									"en": self.$("textarea[name='shape-description']").val()
								})
				};
		    }
		});


		// this callback will execute after the file is selected (and before the upload button is clicked)
		$('#new_file').on('fileloaded', function(e, file, previewId, index, reader) {
			//debugger;

			// NOTE: slugFilename replaces any extra dots by dashes, so we know that 
			// the returned string is of the form "abc_xyz.ext"; when we call .split,
			// it is garanteed that the array will have either lenght 1 or 2

			var filename = self.slugFilename(file.name);
			self.model.set("filename", filename);
			
		});

		// $('#new_file').on('fileuploaded', function(event, data, previewId, index) {
		// 	debugger;
		// });


		// $('#new_file').on('fileuploaderror', function(event, data, previewId, index) {
		// 	debugger;
		// });

		// // $('#new_file').on('filebatchuploadcomplete', function(event, files, extra) {
		// //     debugger;
		// // });

		// $('#new_file').on('filelock', function(event, filestack, extraData) {
		// 	debugger;
		// });

		// $('#new_file').on('fileunlock', function(event, filestack, extraData) {
		// 	debugger;
		// });



	},

});


var ShapeNewLV = Mn.LayoutView.extend({
	template: "files/templates/shapes-new.html",

	ui: {
		shapeRadio: "input[type='radio'][name='new-shape-or-raster']",
	},

	events: {
		"change @ui.shapeRadio": "changeType"
	},

	changeType: function(e){
		var val = $(e.target).val();
		this.model.set("isShape",  val==="shape");
		this.model.set("isRaster", val==="raster");
	},


    // use underscore.string to generate the slugged name (the native slug method is not good)
	slugFilename: function(filename) {
    	var array = filename.split(".");
    	if(array.length===1){
    		return s.slugify(array[0]);
    	}

    	var extension = array.pop();
    	filename = s(array).toSentence("-", "-").slugify().replaceAll("-", "_").value() + "." + extension;

    	return filename;
	},

	onAttach: function(){

		this.model.set("isShape", this.ui.shapeRadio.val()==="shape");
		// self is the view
		var self = this;

		$("#new_file").fileinput({
		    uploadUrl: '/api/v1/files',
		    maxFileSize: 1000*200,  // in Kb
		    showUpload: true,
		    initialCaption: "",
		    dropZoneTitle: "Drag & drop the zip file here, or click the browse button below&hellip;",
		    showRemove: false,
		    maxFileCount: 1,

		    slugCallback: self.slugFilename,

		    ajaxSettings: {
		    	error: function(jqxhr, status, err){
		    		var msg = jqxhr.responseJSON.message;

					alert("ERROR: " + jqxhr.responseJSON.message);
					throw new Error(msg);
		    	}
		    },

		    uploadExtraData: function(){

		    	var extraData = { 
					tags: self.$("input[name='new-file-tags']").val(),
					filename:  self.model.get("filename"),
					isShape:   self.model.get("isShape"),
					fromSrid:  self.$("input[name='from-srid']").val(),
					shapeDescription: JSON.stringify({
									"en": self.$("textarea[name='shape-description']").val()
								})
				};

				return extraData;
		    }
		});


		// this callback will execute after the file is selected (and before the upload button is clicked)
		$('#new_file').on('fileloaded', function(e, file, previewId, index, reader) {
			//debugger;

			// NOTE: slugFilename replaces any extra dots by dashes, so we know that 
			// the returned string is of the form "abc_xyz.ext"; when we call .split,
			// it is garanteed that the array will have either lenght 1 or 2

			var filename = self.slugFilename(file.name);
			self.model.set("filename", filename);

		});


	},

});

var FilesTabLV = Mn.LayoutView.extend({
	template: "files/templates/files-tab.html",

	regions: {
		tabContentRegion: "#files-region"
	},

	events: {
		"click a.js-dashboard-sep": "updateView"
	},

	// the initial view will be the list of all files
	onBeforeShow: function(){
		this.showAll();
	},

	updateView: function(e){

		e.preventDefault();

		var $target = $(e.target);
		$target.parent().siblings().removeClass("active");
		$target.parent().addClass("active");

		switch($target.data("tab-separator")){
			case "files-all":
				this.showAll();
				break;
			case "new-file":
				this.showNewFile();
				break;
			case "new-shape":
				this.showNewShape();
				break;
			default:
				throw new Error("unknown tab separator");
		}
	},

	showNewFile: function(){
		var fileM = new FileM();
		var fileNewLV = new FileNewLV({
			model: fileM
		});
		this.tabContentRegion.show(fileNewLV); 
	},

	showNewShape: function(){
		var fileM = new FileM();
		var shapeNewLV = new ShapeNewLV({
			model: fileM
		});
		this.tabContentRegion.show(shapeNewLV); 
	},

	showAll: function(){

		var filesTableCV = new FilesTableCV({
			collection: filesC
		});

		var self = this;

		Q(filesC.fetch())
			.then(function(){ 
				self.tabContentRegion.show(filesTableCV); 
			})
			.catch(function(err){
				var msg = err.responseJSON ? err.responseJSON.message : 
											( err.message ? err.message : "unknown error" );

				alert("ERROR: " + msg);
				throw new Error(msg);
			})
			.done();
	},


});

;
// concat new file 
var mapsChannel = Backbone.Radio.channel('maps');
/*
var ShapeNewIV = Mn.ItemView.extend({
	template: "maps/templates/shapes-new.html",

	ui: {
		saveBtn: "button.js-save"
	},

	events: {
		"click @ui.saveBtn": "createResource",
		"click tr.js-shape-row": "shapeRowClicked"
	},

	shapeRowClicked: function(e){
		var $el = $(e.target);

		// if the click was directly in the radio, return early (there's nothing to do)
		if($el.is("input")){
			return;
		}

		// if the click was in some children of <tr>, we have to select the corresponding radio
		$el.closest("tr").find("input:radio").prop("checked", true);
	},

	createResource: function(){

		var attrs = Backbone.Syphon.serialize(this);

		if(attrs.code===""){
			alert("To load a new shape file you must submit a code for the shape");
			return;
		}			

		if(attrs.fileId===undefined){
			alert("To load a new shape file you must selected a file from the list");
			return;
		}

		this.ui.saveBtn.prop("disabled", true);

		var self = this;
		Q.delay(150)
			.then(function(){
				return self.model.save(attrs, {wait: true});  // returns a promise
			})
			.then(function(){
				alert("O shape foi carregado com sucesso.");

				// the handler for show:all:shapes will trigger a fake click on the correct
				// anchor elem, this showing the list of shapes
				mapsChannel.trigger("show:all:shapes");
			})
			.catch(function(err){
				var msg = err.responseJSON ? err.responseJSON.message : 
											( err.message ? err.message : "unknown error" );
				
				alert("ERROR: " + msg);
				throw new Error(msg);
			})
			.finally(function(){
				self.ui.saveBtn.prop("disabled", false);
			})
			.done();

	}
});
*/

var ShapeEditModalIV = Mn.ItemView.extend({
	template: "maps/templates/shapes-edit-modal.html",

	ui: {
		"modalCloseBtn":  "button.js-modal-cancel",
		"modalSaveBtn":   "button.js-modal-save"
	},

	events: {
		"click @ui.modalSaveBtn": "updateResource"
	},

	behaviors: {
		CloseModal: {
			behaviorClass: window.Behaviors.CloseModal,  // will listen for clicks on @ui.modalCloseBtn
		},
	},

	updateResource: function(){

		var data = Backbone.Syphon.serialize(this);

		var attrs = {
			"description": {
				//"pt": $.trim(data["edit-desc-pt"]),
				"en": $.trim(data["edit-desc-en"])
			},
		};

		// if(attrs.description.pt + attrs.description.pt===""){
		// 	alert("Please fill the missing fields");
		// 	return;
		// }

		// NOTE: we should always use model.save(attrs, {wait: true}) instead of 
		// model.set(attrs) + model.save(); this way the model will be updated (in the client) only 
		// after we get a 200 response from the server (meaning the row has actually been updated)

		this.ui.modalSaveBtn.prop("disabled", true);

		var self = this;
		Q.delay(150)
			.then(function(){
				return self.model.save(attrs, {wait: true});  // returns a promise
			})
			.catch(function(err){
				var msg = err.responseJSON ? err.responseJSON.message : 
											( err.message ? err.message : "unknown error" );

				// if the model has been deleted in the server in the meantime we get a 404; 
				// the collection in the client is then outdated so we call destroy to remove 
				// the deleted model from the collection; we also abort the ajax request immediately 
				// because we are not interested in the response
				if(err.responseJSON && err.responseJSON.statusCode === 404){
					self.model.destroy().abort();
				}
				
				alert("ERROR: " + msg);
				throw new Error(msg);
			})
			.finally(function(){
				Dashboard.$modal1.modal("hide");
				self.destroy();
			})
			.done();
	},

});


var ShapeDeleteModalIV = Mn.ItemView.extend({
	template: "maps/templates/shapes-delete-modal.html",

	ui: {
		"modalCloseBtn":  "button.js-modal-cancel",
		"modalDeleteBtn": "button.js-modal-delete",
	},

	behaviors: {
		CloseModal: {
			// will listen for clicks on @ui.modalCloseBtn
			behaviorClass: window.Behaviors.CloseModal,  
		},

		DeleteResourceAndCloseModal: {
			// will listen for clicks on @ui.modalDeleteBtn
			behaviorClass: window.Behaviors.DeleteResourceAndCloseModal,  
		},
	},

});

var ShapeRowLV = Mn.LayoutView.extend({
	template: "maps/templates/shapes-row.html",
	tagName: "tr",
	ui: {
		"editModalBtn": "button.js-edit",
		"deleteModalBtn": "button.js-delete"
	},

	modelEvents: {
		"change": "render"
	},

	behaviors: {

		ShowEditModal: {
			uiKey: "editModalBtn",  // will listen for clicks on @ui.editModalBtn
			behaviorClass: window.Behaviors.ShowModal,
			viewClass: ShapeEditModalIV  // and will show this view
		},

		ShowDeleteModal: {
			behaviorClass: window.Behaviors.ShowModal,
			uiKey: "deleteModalBtn",
			viewClass: ShapeDeleteModalIV 
		},
	}

});

var ShapesTableCV = Mn.CompositeView.extend({
	template: "maps/templates/shapes-table.html",
	childView: ShapeRowLV,
	childViewContainer: "tbody",

	// ui: {
	// 	"addModalBtn": "button.js-add-control",
	// },

	behaviors: {

		// ShowEditModal: {
		// 	behaviorClass: window.Behaviors.ShowModal,
		// 	uiKey: "addModalBtn",  // will listen for clicks on @ui.addModalBtn
		// 	viewClass: ShapeEditModalIV  // and will show this view
		// },

		// ShowDeleteModal: {
		// 	behaviorClass: window.Behaviors.ShowModal,
		// 	uiKey: "deleteModalBtn",
		// 	viewClass: ShapeDeleteModalIV 
		// },
	}
});



/*
The interaction in controls edit modal is:
1) the user updates the data and clicks the apply button
2) the current control model is updated (updateResource method) and the modal (2nd level) is closed
3) the parent collectionView for controls is listening for changes on any model, and when that happens it will execute the "update:controls" command
4) the handler for that command will update the controls property on the underlying map model (using controlsCollection's toJSON); it will also remove the extra "availableShapes" property from the controls model
*/

/*
var ControlEditModalIV = Mn.ItemView.extend({
	template: "maps/templates/controls-edit-modal.html",

	ui: {
		"modalApplyBtn":  "button.js-modal-apply",
		"modalCloseBtn":  "button.js-modal-close"
	},

	events: {
		"click @ui.modalApplyBtn": "updateResource"
	},

	behaviors: {
		CloseModal: {
			behaviorClass: window.Behaviors.CloseModal,  // will listen for clicks on @ui.modalCloseBtn
			stackLevel: 2
		},
	},

	updateResource: function(){
		var tempObj = Backbone.Syphon.serialize(this);

		var selectedColumns = [];

		// the key of the outermost object is the shapeId
		_.each(tempObj, function(columns, shapeId){

			// the key of the inner object is the column number
			_.each(columns, function(props, columnNumber){

				if(props.isSelected){
					selectedColumns.push({
						shapeId: shapeId,
						columnNumber: columnNumber,
						publicName: props.publicName
					});
				}
			});
		});

		attrs = {
			selectedColumns: selectedColumns,
			showPlayButton: tempObj.showPlayButton,
			period: tempObj.period
		}
debugger;
		this.model.set(attrs);

		Dashboard.$modal2.modal("hide");
		this.destroy();

	}
});

var ControlDeleteModalIV = Mn.ItemView.extend({
	template: "maps/templates/controls-delete-modal.html",

	ui: {
		"modalCloseBtn":  "button.js-modal-cancel",
		"modalDeleteBtn": "button.js-modal-delete",
	},

    events: {
        "click @ui.modalDeleteBtn": "deleteResource"
    },

	behaviors: {
		CloseModal: {
			// will listen for clicks on @ui.modalCloseBtn
			behaviorClass: window.Behaviors.CloseModal,  
			stackLevel: 2
		},

		// DeleteResourceAndCloseModal: {
		// 	// will listen for clicks on @ui.modalDeleteBtn
		// 	behaviorClass: window.Behaviors.DeleteResourceAndCloseModal,  
		// },
	},

	deleteResource: function(){
		debugger;
		this.model.destroy().abort();
		Dashboard.$modal2.modal("hide");
		this.destroy();
	}

});

var ControlRowIV = Mn.ItemView.extend({
	template: "maps/templates/controls-row.html",
	tagName: "tr",
	ui: {
		"editModalBtn": "button.js-edit",
		"deleteModalBtn": "button.js-delete"
	},


	behaviors: {

		ShowEditModal: {
			behaviorClass: window.Behaviors.ShowModal,
			uiKey: "editModalBtn",  // will listen for clicks on @ui.editModalBtn
			viewClass: ControlEditModalIV,  // and will show this view
			stackLevel: 2
		},

		ShowDeleteModal: {
			behaviorClass: window.Behaviors.ShowModal,
			uiKey: "deleteModalBtn",
			viewClass: ControlDeleteModalIV,
			stackLevel: 2
		},
	}

});

var ControlsTableCV = Mn.CompositeView.extend({
	template: "maps/templates/controls-table.html",
	childView: ControlRowIV,
	childViewContainer: "tbody",

	collectionEvents: {
		"remove change": function(){
//			debugger;
			var controlsArray = this.collection.toJSON();

			_.each(controlsArray, function(obj){
				delete obj.selectedShapes;
			});

			mapsChannel.command("update:controls", controlsArray);
		},

	},
});


var MapEditModalIV = Mn.LayoutView.extend({
	template: "maps/templates/maps-edit-modal.html",

	initialize: function(){

		this.controlsC = new Backbone.Collection(this.model.get("controls"));

		mapsChannel.comply("update:controls", function(controlsArray){
//			debugger;
			this.model.set("controls", controlsArray);
		}, this);

	},

	onDestroy: function(){
		mapsChannel.stopComplying("update:controls");
	},

	regions: {
		controlsRegion: "#controls-region"
	},

	ui: {
		"modalCloseBtn":  "button.js-modal-cancel",
		"modalSaveBtn":   "button.js-modal-save",
		"modalAddControlBtn":    "button.js-add-control",
	},

	events: {
		"click @ui.modalSaveBtn": "updateResource",
		"click tr.js-shape-row": "shapeRowClicked",
		"click @ui.modalAddControlBtn": "addControl"
	},

	shapeRowClicked: function(e){
		var $el = $(e.target);

		// if the click was directly in the checkbox, return early (there's nothing to do)
		if($el.is("input")){
			return;
		}

		// if the click was in some children of <tr>, we have to select the corresponding checkbox
		var $checkbox = $el.closest("tr").find("input:checkbox"),
			isChecked = $checkbox.prop("checked");

		// finally, toggle the checkbox
		$checkbox.prop("checked", !isChecked);
	},

	behaviors: {
		CloseModal: {
			behaviorClass: window.Behaviors.CloseModal,  // will listen for clicks on @ui.modalCloseBtn
		},

	},

	onBeforeShow: function(){
		var shapesData = this.model.get("shapesData");
//			controlsArray = this.model.get("controls"),
//			controlsC = new Backbone.Collection(controlsArray);


		// TODO: improve this pre-processing
		var controlId = 0;
		this.controlsC.each(function(controlM){
//debugger;
			controlM.set("id", ++controlId);
			controlM.url = "/api/maps/controls";  // fake url!

			// make a new deep clone of shapesC.toJSON()
			var shapesArray = $.extend(true, {}, shapesC.toJSON());

			// NOTE: selectedShapes will be a new (distinct) array for each control model (because
			//	shapesArray is also a new object for each model)
			var selectedShapes = _.filter(shapesArray, function(shapeObj){
				return _.findWhere(shapesData, {id: shapeObj.id});
			});

			var selectedColumns = controlM.get("selectedColumns");

			_.each(selectedColumns, function(columnObj){
				var shapeObj = _.findWhere(selectedShapes, {id: Number(columnObj.shapeId)});
//				debugger;
				if(shapeObj){
					for(var i=0, l=shapeObj.shapeColumnsData.length; i<l; i++){

						if(shapeObj.shapeColumnsData[i].column_number === Number(columnObj.columnNumber)){

							shapeObj.shapeColumnsData[i].isSelected = true;
							shapeObj.shapeColumnsData[i].publicName = columnObj.publicName;
						}
					}
				}
			})
//debugger;
			controlM.set("selectedShapes", selectedShapes);
//			debugger;
		});

		var controlsTableCV = new ControlsTableCV({
			collection: this.controlsC
		})

		this.controlsRegion.show(controlsTableCV);
	},

	addControl: function(){
		// make a new deep clone of shapesC.toJSON()
		var shapesArray = $.extend(true, {}, shapesC.toJSON()),
			shapesData = this.model.get("shapesData");

		// NOTE: selectedShapes will be a new (distinct) array for each control model (because
		//	shapesArray is also a new object for each model)
		var selectedShapes = _.filter(shapesArray, function(shapeObj){
			return _.findWhere(shapesData, {id: shapeObj.id});
		});


		// TODO: prepara de controlM
		var controlM = new Backbone.Model({
			id: _.max(this.controlsC.pluck("id")) + 1,
			selectedShapes: selectedShapes
		});

		this.controlsC.push(controlM);

		// var view = new ControlEditModalIV({
		// 	model: controlM
		// });

        // first set the content of the modal
        // Dashboard["modal2Region"].show(view);

        // // then show the modal 
        // Dashboard["$modal2"].modal("show");
	},

	updateResource: function(){

		var attrs = Backbone.Syphon.serialize(this);

		if(attrs.code===""){
			alert("To create a new map you must submit a code for the map");
			return;
		}			

		// the selected shapes are in the form: {"1": true, "3": false, "8": true}; we want an array of objects like
		// this: [{shapeId: 1}, {shapeId: 8}]
		var temp = [];
		_.forEach(attrs.selectedShapes, function(value, key){
			if(value === true){
				temp.push({"shapeId": key})
			}
		})
		attrs.selectedShapes = temp;

		this.ui.modalSaveBtn.prop("disabled", true);

		var self = this;
		Q.delay(150)
			.then(function(){
				return self.model.save(attrs, {wait: true});  // returns a promise
			})
			.catch(function(err){
				var msg = err.responseJSON ? err.responseJSON.message : 
											( err.message ? err.message : "unknown error" );

				// if the model has been deleted in the server in the meantime we get a 404; 
				// the collection in the client is then outdated so we call destroy to remove 
				// the deleted model from the collection; we also abort the ajax request immediately 
				// because we are not interested in the response
				if(err.responseJSON && err.responseJSON.statusCode === 404){
					self.model.destroy().abort();
				}
				
				alert("ERROR: " + msg);
				throw new Error(msg);
			})
			.finally(function(){
				Dashboard.$modal1.modal("hide");
				self.destroy();
			})
			.done();
//TODO: after we update the associated shape, it doesn't show immediately
	},

});


var MapDeleteModalIV = Mn.ItemView.extend({
	template: "maps/templates/maps-delete-modal.html",

	ui: {
		"modalCloseBtn":  "button.js-modal-cancel",
		"modalDeleteBtn": "button.js-modal-delete",
	},

	behaviors: {
		CloseModal: {
			// will listen for clicks on @ui.modalCloseBtn
			behaviorClass: window.Behaviors.CloseModal,  
		},

		DeleteResourceAndCloseModal: {
			// will listen for clicks on @ui.modalDeleteBtn
			behaviorClass: window.Behaviors.DeleteResourceAndCloseModal,  
		},
	},

});

var MapNewLV = Mn.LayoutView.extend({
	template: "maps/templates/maps-new.html",

	ui: {
		saveMapBtn: "button.js-save-map",
		editMapBtn: "a.js-edit-map",
		centerRadio: "input[type='radio'][name='center']",
		newMapContainer: "div#new-map-container"
	},

	events: {
		"click  @ui.saveMapBtn": "createResource",
		"change @ui.centerRadio": "updateCenter",
		"click  @ui.editMapBtn": "showAllMaps",
	},

	showAllMaps: function(){
		mapsChannel.trigger("show:all:maps");
	},

	updateCenter: function(e){
		this.model.set("center", $(e.target).val());
	},

	createResource: function(){

		var attrs = Backbone.Syphon.serialize(this);

		// the selected shapes are in the form: {"1": true, "3": false, "8": true}; we want an array of objects like
		// this: [{shapeId: 1}, {shapeId: 8}]



		this.ui.saveMapBtn.prop("disabled", true);

		var self = this;
		Q.delay(150)
			.then(function(){
				return self.model.save(attrs, {wait: true});  // returns a promise
			})
			.then(function(){
				//debugger;
				self.ui.newMapContainer.css("display", "block")
				self.ui.newMapContainer.find(".js-edit-map").attr("href", "/pt/tilemill#/project/" + self.model.get("id"));

				//self.editMap
				//alert("O mapa foi criado com sucesso.");

				// the handler for show:all:shapes will trigger a fake click on the correct
				// anchor elem, this showing the list of maps
				//var x = self.model;
				//debugger;
				//mapsChannel.trigger("show:all:maps");
				//window.open("/pt/tilemill#/project/" + self.model.get("id"));
			})
			.catch(function(err){
				var msg = err.responseJSON ? err.responseJSON.message : 
											( err.message ? err.message : "unknown error" );
				
				alert("ERROR: " + msg);
				throw new Error(msg);
			})
			// .finally(function(){
			// 	self.ui.saveMapBtn.prop("disabled", false);
			// })
			.done();

	}
});


var MapRowLV = Mn.LayoutView.extend({
	template: "maps/templates/maps-row.html",
	tagName: "tr",
	ui: {
		"editModalBtn": "button.js-edit",
		"deleteModalBtn": "button.js-delete"
	},

	modelEvents: {
		"change": "render"
	},

	events: {
		"click @ui.editModalBtn": "showEditModal"
	},

	showEditModal: function(){

        var mapEditModalIV = new MapEditModalIV({
            model: this.model
        });


        var self = this;
		Q.all([shapesC.fetch(), textsC.fetch()])
			.then(function(){ 

				// add the map categories to the current map models (to be available in the template)
				var mapCategories = _.filter(textsC.toJSON(), function(obj){
					return _.contains(obj.tags, "map_category");
				});

				self.model.set("mapCategories", mapCategories);

				// do the same with with the shapes collection; however we also want to 
				// add a "isSelected" property, indicating if the shape has been
				// selected or not (for the current model)

				// get the shape data (seleted shapes for the current model)
				var shapesData = self.model.get("shapesData");

				// get a new copy of all the shapes (array)
				var allShapes = shapesC.toJSON();

				_.each(allShapes, function(shapeObj){
					shapeObj.isSelected = _.findWhere(shapesData, {id: shapeObj.id}) ? true : false;
				});

				self.model.set("allShapes", allShapes);

		        // first set the content of the modal
		        Dashboard.modal1Region.show(mapEditModalIV);

		        // then show the modal 
		        Dashboard.$modal1.modal("show");
			})
			.catch(function(err){
				var msg = err.responseJSON ? err.responseJSON.message : 
											( err.message ? err.message : "unknown error" );

				alert("ERROR: " + msg);
				throw new Error(msg);
			})
			.done();
	},

	behaviors: {

		// ShowEditModal: {
		// 	behaviorClass: window.Behaviors.ShowModal,
		// 	uiKey: "editModalBtn",  // will listen for clicks on @ui.editModalBtn
		// 	viewClass: MapEditModalIV,  // and will show this view
		// },

		ShowDeleteModal: {
			behaviorClass: window.Behaviors.ShowModal,
			uiKey: "deleteModalBtn",
			viewClass: MapDeleteModalIV 
		},
	}

});

var MapsTableCV = Mn.CompositeView.extend({
	template: "maps/templates/maps-table.html",
	childView: MapRowLV,
	childViewContainer: "tbody"
});
*/

/*

TODO: 
 - add a button or checkbox to select the state: order groups / order web maps;
 - when the checkbox changes we must restart the sortable plugin
 - save
*/


var MapsMenuSortableIV = Mn.ItemView.extend({
	template: "maps/templates/map-menu-sortable.html",

	// the object returned by templateHelpers will be mixed into the 
	// context object returned from serializeData, which is the context
	// object given to nunjucks
	templateHelpers: function(){
		return {
			mode: this.mode 
		};
	},

	onAttach: function(){

		var self = this;

		var sortableOptions = {
			onDrag: function($item, position, _super, event) {

			    // default code from the plugin
			    $item.css(position);

			    // custom code from here below
			    self.adjustScroll($item);
			},

			onDrop: function ($item, container, _super, event) {

			  // default code from the plugin
			  $item.removeClass(container.group.options.draggedClass).removeAttr("style");
			  $("body").removeClass(container.group.options.bodyClass);

			  // custom code from here below (update the collection)
			  self.resetCollection();
			}
		};

		if(this.mode==="maps"){

			sortableOptions = _.extend(sortableOptions, {
				group: 'ul[data-items-type="map-item"]'
			});

			this.mapsMenu = $('ul[data-items-type="map-item"]').sortable(sortableOptions);

			// window.mapsMenu = this.mapsMenu = $('ul[data-items-type="map-item"]').sortable({
			// 	group: 'ul[data-items-type="map-item"]',
			// 	onDrag: function($item, position, _super, event) {
			// 	    // default code from the plugin
			// 	    $item.css(position);

			// 	    // custom code from here below
			// 	    self.adjustScroll($item);
			// 	},
			// });

		}
		else if(this.mode === "groups"){

			sortableOptions = _.extend(sortableOptions, {
			    exclude: "ul[data-items-type='map-item'] > li",
			    nested: false,
			    distance: 10,
				onDrag: function($item, position, _super, event) {
				    // default code
				    $item.css(position);

				    // custom code from here below
				    self.adjustScroll($item);
				},
			});

			this.mapsMenu = $('ul[data-items-type="map-group"]').sortable(sortableOptions);

			// window.mapsMenu = this.mapsMenu = $('ul[data-items-type="map-group"]').sortable({
			//     exclude: "ul[data-items-type='map-item'] > li",
			//     nested: false,
			//     distance: 10,
			// 	onDrag: function($item, position, _super, event) {
			// 	    // default code
			// 	    $item.css(position);

			// 	    // custom code from here below
			// 	    self.adjustScroll($item);
			// 	},
			// });

		}
		else{
			// this should never happen
			throw new Error("MapsMenuOrderLV - unknown mode");
		}
	},

	adjustScroll: function($item){

	    var distanceToTop = $item.offset().top - $(window).scrollTop();
	    var distanceToBottom = $(window).height() + $(window).scrollTop() - $item.offset().top;
	    var currentScrollTop = $(window).scrollTop();

	    // console.log(distanceToTop);
	    // console.log(distanceToBottom);
	    // console.log(currentScrollTop)
	    // console.log("-----");

	    var limit = 100, scrollDelta = 15;
	    if (distanceToTop < limit) {
	        $(window).scrollTop(currentScrollTop - scrollDelta);
	    }
	    else if (distanceToBottom < limit && currentScrollTop < $("body").height() - $(window).height()) {
	        $(window).scrollTop(currentScrollTop + scrollDelta);
	    }
	},

	resetCollection: function(){
//debugger;
		var array = [];

		var $groups = $('ul[data-items-type="map-group"] > li');
		$groups.each(function(i, elem){
			
			//console.log($(this).data("groupName"));
			var obj = {
				groupName: $(elem).data("groupName"),
				maps: []
			};
			
			var $maps = $(elem).find('ul[data-items-type="map-item"] > li');
//			debugger;
			$maps.each(function(i, elem2){

				obj.maps.push({
					mapId: $(elem2).data("mapId")
				});
			});

			array.push(obj);
		});

		this.collection.reset(array);

	},

	onBeforeDestroy: function(){

		this.mapsMenu.sortable("destroy");
	},



});

var MapsMenuAddGroupModalIV = Mn.ItemView.extend({

	template: "maps/templates/map-menu-add-group-modal.html",

	ui: {
		"modalCloseBtn":  "button.js-modal-cancel",
		"modalAddBtn":   "button.js-modal-add"
	},

	events: {
		"click @ui.modalAddBtn": "addGroup"
	},

	behaviors: {
		CloseModal: {
			// will listen for clicks on @ui.modalCloseBtn
			behaviorClass: window.Behaviors.CloseModal,  
		},
	},

	addGroup: function(){

		var data = Backbone.Syphon.serialize(this);
		var groupName = $.trim(data["add-group-name"]);

		if(!groupName){
			alert("The group name is empty.");
			return;
		}			

		this.collection.add({
			groupName: groupName, 
			maps: []
		});

		Dashboard.$modal1.modal("hide");
		this.destroy();
	}
});

var MapsMenuOrderLV = Mn.LayoutView.extend({

	initialize: function(){
		this.listenTo(this.collection, "add remove", function(){

			this.resetSortableList();
		});
	},

	template: "maps/templates/map-menu.html",
	
	ui: {
		chooseModeRadio: "input[type='radio'][name='menu-order-mode']",
		addGroupBtn: "button#js-menu-add-group",
		removeGroupBtn: "i.fa-trash"
	},

	events: {
		"click button#js-save-map-menu": "saveMapsMenu",
		"change @ui.chooseModeRadio": "resetSortableList",
		"click @ui.removeGroupBtn": "removeGroup"
		//"click @ui.addGroupBtn": "addGroup",
	},

	// collectionEvents: {
	// 	"add": "resetSortableList"
	// },

	regions: {
		sortableRegion: "#mn-r-sortable-list"
	},

	behaviors: {

		ShowAddGroupModal: {
			behaviorClass: window.Behaviors.ShowModal,
			uiKey: "addGroupBtn",  // will listen for clicks on @ui.editModalBtn
			viewClass: MapsMenuAddGroupModalIV  // and will show this view
		},
	},


	removeGroup: function(e){

		var groupName = $(e.target).parent().data("groupName");
		var model = this.collection.findWhere({groupName: groupName});
		this.collection.remove(model);
	},

	resetSortableList: function(e){
		
		if(!this.onAttachHasExecuted){
			return;
		}
		
		//var m = new Backbone.Model({ groupName: "xyz", maps: []});
		//this.collection.add(m);

		var mapsMenuSortableIV = new MapsMenuSortableIV({
			collection: this.collection
		});

		// if the method is being executed as the click event handler,
		// get the updated mode
		if(e && e.target){
			mapsMenuSortableIV.mode = $(e.target).val();
		}
		else{
			mapsMenuSortableIV.mode  = this.sortableRegion.currentView.mode;
		}

		this.sortableRegion.show(mapsMenuSortableIV);
	},

	onAttach: function(){

		this.onAttachHasExecuted = true;

		// the default mode is the one in the 1st radio (order maps)
		this.ui.chooseModeRadio.first().trigger("click");
		
	},

	saveMapsMenu: function(){

		var ajaxOptions = {
			url: "/api/v1/maps-menu",
			method: "PUT",
			data: JSON.stringify(this.collection.toJSON()),
			dataType: "json",
			contentType:"application/json; charset=utf-8",
		};

		Q.delay(250)
			.then(function(){
				return $.ajax(ajaxOptions);
			})
			.then(function(){

				Clima.notify("success", "The menu has been saved");
			})
			.catch(function(err){

				var errMsg = Clima.getErrorMessage(err);
				var msg = "The menu has not been saved (ERROR: " + errMsg + ")"
				
				Clima.notify("danger", msg);
			});



/*
Note: the payload should be like this:

[
    {
        "groupName": "published", 
        "maps": [
            { "mapId": "geography-class" }
        ], 
    }, 
    {
        "groupName": "not published", 
        "maps": [
            { "mapId": "new-mapa-1-owe-gw" }, 
            { "mapId": "open-streets-dc" }, 
            { "mapId": "road-trip" }
        ], 
    }
]

*/		
	}
});

var LegendPreviewModalIV = Mn.ItemView.extend({
	template: "maps/templates/legends-preview-modal.html",

	ui: {
		"modalCloseBtn":  "button.js-modal-cancel",
	},

	behaviors: {
		CloseModal: {
			behaviorClass: window.Behaviors.CloseModal,  // will listen for clicks on @ui.modalCloseBtn
		},
	},
});

var LegendsCodeIV = Mn.ItemView.extend({
	template: "maps/templates/legends-code.html",

	ui: {
		selectCodeBtn: "button.js-select-code",
		legendPreviewBtn: "button#code-html-preview"
	},

	events: {
		"click @ui.selectCodeBtn":   "selectCodeBlock",
	},
	
	behaviors: {

		ShowLegendPreviewModal: {
			uiKey: "legendPreviewBtn",  // listen for clicks on @ui.editModalBtn (the "click" event is hardcoded in the behaviour)...
			behaviorClass: window.Behaviors.ShowModal,  // will execute the ShowModal behaviour...
			viewClass: LegendPreviewModalIV,  // creating an instance of this view...
			modelKey: "model"  // and using the model referenced in this key
		},
	},

	onAttach: function(){

		// execute the prism plugin

		// trim any remaining space in the begin and end
		this.$("code").text(function(i, oldText){
			return $.trim(oldText);
		});

		Prism.highlightAll();
	},

	selectCodeBlock: function(e){

		var id = $(e.target).prop("id");
		if(id==="code-carto-0"){
			this.$("#js-carto-0.language-css").selectText();
		}
		else if(id==="code-carto-1"){
			this.$("#js-carto-1.language-css").selectText();
		}
		else if(id==="code-html"){
			this.$(".language-markup").selectText();
		}
	},
})

var LegendColorsLV = Mn.LayoutView.extend({
	template: "maps/templates/legends-colors.html",
	events: {
		"change         input.js-classes-left-extreme": "showCodeAgain",
		"propertychange input.js-classes-left-extreme": "showCodeAgain",
		"input          input.js-classes-left-extreme": "showCodeAgain",

		"change         input.js-classes-right-extreme": "showCodeAgain",
		"propertychange input.js-classes-right-extreme": "showCodeAgain",
		"input          input.js-classes-right-extreme": "showCodeAgain"
	},
	regions: {
		codeRegion: "#code-region"
	},

	updateClassValues: function(){
		var dataType = this.model.get("dataType");

		var currentLeftExtremes  = this.getInputValues('input.js-classes-left-extreme',  dataType);
		var currentRightExtremes = this.getInputValues('input.js-classes-right-extreme', dataType);
		var currentColors        = this.getInputValues('input.my-color-picker');
//debugger;

		// update the objects in the "scale" array
		var scale = this.model.get("scale");

		if(currentLeftExtremes.length !== scale.length ||
				currentRightExtremes.length !== scale.length ||
				currentColors.length !== scale.length){
			throw new Error("Unexpected array length");
		}
		
		for(var i=0; i<scale.length; i++){
			scale[i].valueClass[0] = currentLeftExtremes[i];
			scale[i].valueClass[1] = currentRightExtremes[i];
			scale[i].colorHex      = currentColors[i];
		}

		this.model.set("scale", scale);
	},

	showCodeAgain: function(e){

// TODO: if dataType is int or real, check all the values are actually numbers

		this.updateClassValues();
		var legendsCodeIV = new LegendsCodeIV({
			model: this.model
		});
		this.codeRegion.show(legendsCodeIV);			

		// destroys the colorpicker plugin and unbind all .colorpicker events
		//this.$('.my-color-picker').colorpicker('destroy');

		// re-render the view (the plugin will be initialized again in the new elements)
		//this.render();

		// make sure focus is in the right place (this implies the scroll will be in the right place too)
		//this.$("#" + currentId).caretToEnd();
		//this.$("#" + currentId).focus();
	},

	getInputValues: function(classSelector, dataType){
		return this.$(classSelector)
						.map(function(){ 

							var value = $(this).val();

							if(dataType==="int"){
								value = parseInt(value, 10);
							}
							else if(dataType==="real"){
								value = parseFloat(value);
							}

							return value;
						})
						.get();
	},

	onRender: function(){

		// bootstrap color-picker plugin

		this.$(".my-color-picker").colorpicker({
            customClass: 'colorpicker-2x',
            sliders: {
                saturation: {
                    maxLeft: 150,
                    maxTop: 150
                },
                hue: {
                    maxTop: 150
                },
                alpha: {
                    maxTop: 150
                }
            }
        });

		//this.model.set("colorPickerHasInitialized", true);

		var self = this;
		this.$('.my-color-picker').colorpicker().on('hidePicker.colorpicker', function(e){
debugger;
			// make sure the color is in hex code (if the user used a transparency, it will in rgba)
			$(e.target).val(e.color.toHex());

			self.updateClassValues();
			self.render();

		});


		if(this.model.get("scale")){
			var legendsCodeIV = new LegendsCodeIV({
				model: this.model
			});
			this.codeRegion.show(legendsCodeIV);			
		}


	},

	onBeforeDestroy: function(){
		//this.$('.my-color-picker').colorpicker('destroy');
	}

});




var LegendChooseAttributeLV = Mn.LayoutView.extend({

	initialize: function(){
	},

	template: "maps/templates/legends-choose-attribute.html",

	ui: {
		availableAttributes: "select.js-available-attributes",
		numberOfClasses: "select.js-number-classes",
		colorSchemeSelect: "select.js-color-scheme",
		invertColorsChkbox: "input#js-invert-colors",
		lightCorrectionChkbox: "input#js-light-correction",
		darkenColorsBtn: "button#js-darken-colors",
		brightenColorsBtn: "button#js-brighten-colors",
		saturateColorsBtn: "button#js-saturate-colors",
		desaturateColorsBtn: "button#js-desaturate-colors",

		legendStyleRadio: "input:radio[name='legend-style']",

	},

	events: {
		"change @ui.availableAttributes": "updateSelectedAttribute",
		"change @ui.numberOfClasses":     "updateSelectedClass",
		"change @ui.colorSchemeSelect":         "updateSelectedColorScheme",
		
		"change @ui.invertColorsChkbox":    "invertColors",
		"change @ui.lightCorrectionChkbox": "lightCorrection",
		

		"click @ui.darkenColorsBtn":      "darkenColors",
		"click @ui.brightenColorsBtn":    "brightenColors",
		"click @ui.saturateColorsBtn":    "saturateColors",
		"click @ui.desaturateColorsBtn":  "desaturateColors",

		"click @ui.legendStyleRadio": "updateLegendStyle"
		
	},


	updateLegendStyle: function(e){

		this.aux.set("legendStyle", $(e.target).val());
		this.updateClasses();
	},


	darkenColors: function(e){

		//this.aux.set("colorValue", this.aux.get("colorValue") + 4);
		this.aux.set("colorValue", 4);
		this.updateClasses();
		this.aux.set("colorValue", 0);
	},

	brightenColors: function(e){

		//this.aux.set("colorValue", this.aux.get("colorValue") - 4);
		this.aux.set("colorValue", -4);
		this.updateClasses();
		this.aux.set("colorValue", 0);
	},

	saturateColors: function(e){

		//this.aux.set("colorSaturation", this.aux.get("colorSaturation") + 4);
		this.aux.set("colorSaturation", 4);
		this.updateClasses();
		this.aux.set("colorSaturation", 0);
	},

	desaturateColors: function(e){

		//this.aux.set("colorSaturation", this.aux.get("colorSaturation") - 4);
		this.aux.set("colorSaturation", -4);
		this.updateClasses();
		this.aux.set("colorSaturation", 0);
	},

	invertColors: function(e){
//debugger;
		//this.aux.set("invertColors", this.ui.invertColorsChkbox.is(':checked'));
		this.aux.set("invertColors", true);
		this.updateClasses();
		this.aux.set("invertColors", false);
	},

	lightCorrection: function(e){
//debugger;
		this.aux.set("lightCorrection", this.ui.lightCorrectionChkbox.is(':checked'));
		this.updateClasses();
	},

	invertColorsOrder: function(scale){

		var reversedScale = [];

		for(var i=0, l=scale.length; i<l; i++){
			var j = l-i;
			reversedScale.push({
				"valueClass": scale[i]["valueClass"],
				"colorHex": scale[j-1]["colorHex"]
			});
		}

		return reversedScale;
	},

	changeColors: function(scale, method, amount){

		var changedScale = [];
		for(var i=0, l=scale.length; i<l; i++){
			changedScale.push({
				"valueClass": scale[i]["valueClass"],
				"colorHex": chroma(scale[i]["colorHex"])[method](amount).hex()
			});
		}

		return changedScale;
	},

	regions: {
		colorsRegion: "#js-colors-region"
	},

	updateSelectedAttribute: function(e){
//debugger;
		this.aux.set("columnName", $(e.target).val());

		// when the attribute changes, the selected options in "number of classes"
		// and "color scheme" will always be reset (because the number of classes 
		// depends on the max and min of the attribute)
		this.ui.numberOfClasses.val(0).prop("disabled", true);
		this.aux.set("selectedClass", 0);

		this.ui.colorSchemeSelect.val("").prop("disabled", true);
		this.aux.set("colorScheme", "");

		this.aux.set("legendStyle", "vertical");

		if(!this.aux.get("columnName")){
			this.colorsRegion.empty();
			return;
		}

		var shapeM = shapesC.findWhere({ tableName: this.aux.get("tableName") });

		var attributeInfo = _.findWhere(shapeM.get("attributesInfo"), 
										{column_name: this.aux.get("columnName")});

		var gidAttributeInfo = _.findWhere(shapeM.get("attributesInfo"), 
										{column_name: "gid"});

		var pgDataType = attributeInfo.data_type;
		var isInt  = /int/.test(pgDataType);
		var isReal = /numeric/.test(pgDataType) ||  /double/.test(pgDataType) || /decimal/.test(pgDataType) || /real/.test(pgDataType);
		var isChar = /char/.test(pgDataType) || /text/.test(pgDataType);

		var dataType = isInt ? "int" : (isReal ? "real": "char");
		this.aux.set("isInt", isInt);
		this.aux.set("dataType", dataType);

		this.aux.set("count", parseInt(attributeInfo.count, 10) );
		this.aux.set("countGeometries", parseInt(gidAttributeInfo.count, 10));

		if(this.aux.get("dataType")==="int"){
			this.aux.set("min", parseInt(attributeInfo.min, 10));
			this.aux.set("max", parseInt(attributeInfo.max, 10));
		}
		else if(this.aux.get("dataType")==="real"){
			this.aux.set("min", parseFloat(attributeInfo.min));
			this.aux.set("max", parseFloat(attributeInfo.max));	
		}
		else if(this.aux.get("dataType")==="char"){

			// even if dataType is char, we might have attributeInfo.distinct_words equal to null (that happens when
			// the number of distinct word is >= 12)
			var numDistinctWords = 0;
			if(attributeInfo.distinct_words){
				numDistinctWords = attributeInfo.distinct_words.length;
			}

			this.aux.set("selectedClass", numDistinctWords);

			for(var i=0; i<numDistinctWords; i++){
				if(attributeInfo.distinct_words[i] == null){
					attributeInfo.distinct_words[i] = undefined;
				}
			}

			this.aux.set("distinctWords", attributeInfo.distinct_words);
		}
		else{
			throw new Error("Unknown data type");
		}

		this.aux.set("scale", false);
		

		// enable the the color select
		this.ui.colorSchemeSelect.prop("disabled", false);

		// enable the the number of classes select (only if the attribute is numeric)
		if(this.aux.get("dataType")==="int" || this.aux.get("dataType")==="real"){
			this.ui.numberOfClasses.prop("disabled", false);
		}
		else{
			this.ui.numberOfClasses.prop("disabled", true);
			this.ui.numberOfClasses.val(this.aux.get("selectedClass"));
		}
	

		this.showLegendColors();
	},

	updateSelectedClass: function(e){

		this.aux.set("selectedClass", parseInt($(e.target).val(), 10));
		this.aux.set("scale", false);
		
		this.updateClasses();
	},

	updateSelectedColorScheme: function(e){
//debugger;
		this.aux.set("colorScheme", $(e.target).val());

		// reset saturation and color brightness
		this.aux.set("colorSaturation", 0);
		this.aux.set("colorValue", 0);
		this.aux.set("scale", false);

		this.updateClasses();
	},

	updateClasses: function(){
//debugger;
		var selectedAttribute = this.aux.get("columnName");
		var selectedClass     = this.aux.get("selectedClass");
		var colorScheme = this.aux.get("colorScheme");

		if(!selectedAttribute){
			return;
		}

		var tableName = this.aux.get("tableName");
		var dataType = this.aux.get("dataType");
		var min = this.aux.get("min");
		var max = this.aux.get("max");
		var distinctWords = this.aux.get("distinctWords");


		if(dataType === "int" || dataType === "real"){
			if(!_.isNumber(min) || !_.isNumber(max)){
				alert("ERROR: minimum and maximum of the selected attribute are not numbers");
				return;				
			}
		}


		if(!selectedClass || !colorScheme){
			// show the legend without the colors (will show only max and min)
			this.aux.set("scale", false);
			this.showLegendColors();
			return;
		}

		if(dataType === "int"){
			var intervalLength = max - min + 1;
			if(selectedClass > intervalLength){
				alert("The number of classes must be <= " + intervalLength);
				return;					
			}
		}

		var valueClasses = Dashboard.utils.valueClasses({
		    mode: dataType,
		    min: min,
		    max: max,
		    distinctWords: distinctWords,
		    numClasses: selectedClass
		});


		if(dataType === "int" || dataType === "real"){
			if(valueClasses.length !== selectedClass){
				throw new Error("The valueClasses array has unexpected length");
			}			
		}


		// the correctLightness option gives better colors, but only works for sequential colors
		var lightCorrection = false
		var sequentialSchemes = ["Blues","Greens","Greys","Oranges","Purples","Reds","BuGn","BuPu","GnBu","OrRd","PuBu","PuBuGn","PuRd","RdPu","YlGn","YlGnBu","YlOrBr","YlOrRd"];

		if(_.contains(sequentialSchemes, colorScheme) && this.aux.get("lightCorrection")){
			lightCorrection = true;
		}

		this.aux.set("lightCorrection", lightCorrection);

		// get the actual colors (from chroma.js library)
		//var chromaScale = chroma.scale(colorScheme).correctLightness(lightCorrection).domain([0, selectedClass], selectedClass);
		// var chromaColors = chroma
		// 					.scale(colorScheme)
		// 					.correctLightness(lightCorrection)
		// 					.domain([0, selectedClass], selectedClass)
		// 					.colors();
		// 					debugger;

		var chromaColors = Clima.utils.colorBrew[colorScheme][selectedClass];
		if(chromaColors===undefined){
			var keys = _.keys(Clima.utils.colorBrew[colorScheme]);
			alert("This color schema is valid only from " + _.min(keys) + " to " + _.max(keys) + " classes.");
			return;
		}

		if(chromaColors.length !== selectedClass){
			throw new Error("The chromaColors array has unexpected length");
		}		

		// finally, create a new array of objects with the data ready to used in the template

		var scale = this.aux.get("scale");

		if(!scale){
			scale = valueClasses.map(function(valueClass, i){
				var obj = { 
					"valueClass": valueClass,
					"colorHex": chromaColors[i]
				};
				return obj;
			});
		}

		if(this.aux.get("invertColors")){
			scale = this.invertColorsOrder(scale);
		}

		if(this.aux.get("colorValue")){
			//console.log("colorValue: disabled temporarily")
			scale = this.changeColors(scale, "darken", this.aux.get("colorValue"));
		}

		if(this.aux.get("colorSaturation")){
			//console.log("colorSaturation: disabled temporarily")
			scale = this.changeColors(scale, "saturate", this.aux.get("colorSaturation"));
		}

		this.aux.set("scale", scale);

		this.showLegendColors();
	},

	showLegendColors: function(){
		var legendColorsLV = new LegendColorsLV({
			model: new Backbone.Model(this.aux.toJSON())
			
		});

		this.colorsRegion.show(legendColorsLV);
		this.bindUIElements();
	}
});

var LegendNoAvailableAttributesIV = Mn.ItemView.extend({
	template: "maps/templates/legends-no-available-attributes.html",
});

var LegendChooseShapeLV = Mn.LayoutView.extend({
	template: "maps/templates/legends-choose-shape.html",
	events: {
		"change select.js-available-shapes": "updateChooseAttributes"
	},
	regions: {
		chooseAttributeRegion: "#choose-attribute-region"
	},


	// isNumeric: function(type){

	// 	type = type.toLowerCase();
	// 	return /int/.test(type) || 
	// 			/decimal/.test(type) || 
	// 			/numeric/.test(type) || 
	// 			/real/.test(type) || 
	// 			/double/.test(type);
	// },

	updateChooseAttributes: function(e){

//debugger;
		var shapeName = $(e.target).val();
		var selectedShape = shapesC.findWhere({tableName: shapeName});

		// we only want the data attributes with numeric type; the "gid" attribute (added
		// by pgsql) is also excluded explicitely;
		var availableAttributes = selectedShape.get("attributesInfo").filter(function(obj){
			if(obj["column_name"]==="gid"){ return false; }

			// returns true except for the geometry columns
			return !(/geometry/.test(obj["data_type"].toLowerCase()));
		}, this);

		if(availableAttributes.length === 0){
			this.chooseAttributeRegion.show(new LegendNoAvailableAttributesIV());
			return;
		}

		var legendChooseAttributeLV = new LegendChooseAttributeLV({
			collection: new Backbone.Collection(availableAttributes)
		});

		var geometryTypePrimitive, geometryType = selectedShape.get("geometryType");

		// WKT can represent 18 distinct geometric objects; here we consider only the basic types;
		// https://en.wikipedia.org/wiki/Well-known_text
		// http://postgis.net/docs/using_postgis_dbmanagement.html#EWKB_EWKT
		if(/point/.test(geometryType)){
			geometryTypePrimitive = "point";
		}
		else if(/linestring/.test(geometryType)){
			geometryTypePrimitive = "linestring";
		}
		else if(/polygon/.test(geometryType)){
			geometryTypePrimitive = "polygon";
		}

		legendChooseAttributeLV.aux = new Backbone.Model({
			tableName: selectedShape.get("tableName"),
			geometryTypePrimitive: geometryTypePrimitive,
			mapName: this.get("mapName"),
			mapId: this.get("mapId")
		});

		this.chooseAttributeRegion.show(legendChooseAttributeLV);
	}
});

var LegendNoAvailableShapeIV = Mn.ItemView.extend({
	template: "maps/templates/legends-no-available-shapes.html",
});

var LegendChooseMapLV = Mn.LayoutView.extend({
	template: "maps/templates/legends-choose-map.html",
	events: {
		"change select.js-all-maps": "updateChooseShapes",
		//"change select.js-available-shapes": "updateChooseAttributes"
	},
	regions: {
		chooseShapeRegion: "#choose-shape-region",
//		ChooseAttributesRegion: "#available-attributes-region"
	},
	updateChooseShapes: function(e){
		var mapId = $(e.target).val();
		var mapM = mapsC.get(mapId);

		var availableShapesNames = [];
		mapM.get("Layer").forEach(function(mapObj){
			if(mapObj.Datasource && mapObj.Datasource.type === "postgis"){
				availableShapesNames.push(mapObj.id);
			}
		});

		var availableShapes = shapesC.filter(function(model){
			return _.contains(availableShapesNames, model.get("tableName"));
		});

		if(availableShapes.length === 0){
			this.chooseShapeRegion.show(new LegendNoAvailableShapeIV());
			return;
		}

		var legendChooseShapeLV = new LegendChooseShapeLV({
			collection: new Backbone.Collection(availableShapes),
		});
		_.defaults(legendChooseShapeLV, Backbone.Attributes);
		legendChooseShapeLV.set("mapName", mapM.get("name"));
		legendChooseShapeLV.set("mapId", mapM.get("id"));

		this.chooseShapeRegion.show(legendChooseShapeLV);

	},

});

var MapsTabLV = Mn.LayoutView.extend({

	initialize: function(){
		mapsChannel.on("show:all:shapes", function(){
			this.$("a[data-tab-separator='shapes-all']").trigger("click");
		}, this);

		mapsChannel.on("show:all:maps", function(){
			this.$("a[data-tab-separator='maps-all']").trigger("click");
		}, this);
	},

	template: "maps/templates/maps-tab.html",

	regions: {
		tabContentRegion: "#maps-region"
	},

	events: {
		"click a.js-dashboard-sep": "updateView"
	},

	// the initial view will be the list of all files
	onBeforeShow: function(){
		//this.showAllMaps();
		this.showAllShapes();
	},

	onDestroy: function(){
		mapsChannel.reset();
	},

	updateView: function(e){

		e.preventDefault();

		var $target = $(e.target);
		$target.parent().siblings().removeClass("active");
		$target.parent().addClass("active");

		switch($target.data("tab-separator")){


			// case "maps-all":
			// 	this.showAllMaps();
			// 	break;
			// case "maps-new":
			// 	this.showNewMap();
			// 	break;
			case "shapes-all":
				this.showAllShapes();
				break;
				// case "shapes-new":
				// 	this.showNewShape();
				// 	break;
			case "map-menu":
				this.showMapsMenu();
				break;
			case "map-legends":
				this.showMapsLegends();
				break;
			default:
				throw new Error("unknown tab separator");
		}
	},

	// showNewShape: function(){
	// 	var shapeM = new ShapeM();
	// 	var shapeNewIV = new ShapeNewIV({
	// 		model: shapeM
	// 	});

	// 	var self = this;

	// 	// filesC will be filtered
	// 	Q(filesC.fetch())
	// 		.then(function(){ 

	// 			var zipFilesWithShapes = _.filter(filesC.toJSON(), function(obj){
	// 				return _.contains(obj.tags, "map") || 
	// 						_.contains(obj.tags, "maps") ||
	// 						_.contains(obj.tags, "mapa") ||
	// 						_.contains(obj.tags, "mapas") ||
	// 						_.contains(obj.tags, "shape") ||
	// 						_.contains(obj.tags, "shapes");
	// 			});
	// 			shapeM.set("zipFilesWithShapes", zipFilesWithShapes)

	// 			self.tabContentRegion.show(shapeNewIV); 
	// 		})
	// 		.catch(function(err){
	// 			var msg = err.responseJSON ? err.responseJSON.message : 
	// 										( err.message ? err.message : "unknown error" );

	// 			alert("ERROR: " + msg);
	// 			throw new Error(msg);
	// 		})
	// 		.done();


	// },

	showAllShapes: function(){

		var shapesTableCV = new ShapesTableCV({
			collection: shapesC
		});

		var self = this;

		Q(shapesC.fetch())
			.then(function(){ 
				self.tabContentRegion.show(shapesTableCV); 
			})
			.catch(function(err){
				var msg = err.responseJSON ? err.responseJSON.message : 
											( err.message ? err.message : "unknown error" );

				alert("ERROR: " + msg);
				throw new Error(msg);
			})
			.done();
	},

/*
	showNewMap: function(){
		var mapM = new MapM();
		var mapNewLV = new MapNewLV({
			model: mapM
		});

		this.tabContentRegion.show(mapNewLV); 


		var self = this;

		// // textsC will be used to obtain the map categories (which will be shown in the template)
		// Q.all([textsC.fetch(), shapesC.fetch()])
		// 	.then(function(){ 

		// 		// add the map categories to the model (to be available in the template)
		// 		var mapCategories = _.filter(textsC.toJSON(), function(obj){
		// 			return _.contains(obj.tags, "map_category");
		// 		})
		// 		mapM.set("mapCategories", mapCategories);

		// 		// do the same with the the shapes collection
		// 		mapM.set("allShapes", shapesC.toJSON());

		// 		self.tabContentRegion.show(mapNewLV); 
		// 	})
		// 	.catch(function(err){
		// 		var msg = err.responseJSON ? err.responseJSON.message : 
		// 									( err.message ? err.message : "unknown error" );

		// 		alert("ERROR: " + msg);
		// 		throw new Error(msg);
		// 	})
		// 	.done();

	},

	showAllMaps: function(){

		var mapsTableCV = new MapsTableCV({
			collection: mapsC
		});

		var self = this;

		Q(mapsC.fetch())
			.then(function(){ 

				self.tabContentRegion.show(mapsTableCV); 
			})
			.catch(function(err){
				var msg = err.responseJSON ? err.responseJSON.message : 
											( err.message ? err.message : "unknown error" );

				alert("ERROR: " + msg);
				throw new Error(msg);
			})
			.done();
	},
*/
	showMapsMenu: function(){
		var mapsMenuOrderLV = new MapsMenuOrderLV({
			collection: mapsMenuC
		});

		var self = this;

		Q(mapsMenuC.fetch())
			.then(function(){ 
				self.tabContentRegion.show(mapsMenuOrderLV);
			})
			.catch(function(err){
				var msg = err.responseJSON ? err.responseJSON.message : 
											( err.message ? err.message : "unknown error" );

				alert("ERROR: " + msg);
				throw new Error(msg);
			})
			.done();
	},

	showMapsLegends: function(){
		var legendChooseMapLV = new LegendChooseMapLV({
			collection: mapsC
		});

		var self = this;

		Q.all([mapsC.fetch(), shapesC.fetch()])
			.then(function(){ 
				self.tabContentRegion.show(legendChooseMapLV);
			})
			.catch(function(err){
				var msg = err.responseJSON ? err.responseJSON.message : 
											( err.message ? err.message : "unknown error" );

				alert("ERROR: " + msg);
				throw new Error(msg);
			})
			.done();
	}


});

;
// concat new file 
Clima.utils = Clima.utils || {};

Clima.utils.colorBrew = 

{YlGn: {
1: ["#f7fcb9"],
2: ["#f7fcb9","#addd8e"],
3: ["#f7fcb9","#addd8e","#31a354"],
4: ["#ffffcc","#c2e699","#78c679","#238443"],
5: ["#ffffcc","#c2e699","#78c679","#31a354","#006837"],
6: ["#ffffcc","#d9f0a3","#addd8e","#78c679","#31a354","#006837"],
7: ["#ffffcc","#d9f0a3","#addd8e","#78c679","#41ab5d","#238443","#005a32"],
8: ["#ffffe5","#f7fcb9","#d9f0a3","#addd8e","#78c679","#41ab5d","#238443","#005a32"],
9: ["#ffffe5","#f7fcb9","#d9f0a3","#addd8e","#78c679","#41ab5d","#238443","#006837","#004529"]
},YlGnBu: {
1: ["#edf8b1"],
2: ["#edf8b1","#7fcdbb"],
3: ["#edf8b1","#7fcdbb","#2c7fb8"],
4: ["#ffffcc","#a1dab4","#41b6c4","#225ea8"],
5: ["#ffffcc","#a1dab4","#41b6c4","#2c7fb8","#253494"],
6: ["#ffffcc","#c7e9b4","#7fcdbb","#41b6c4","#2c7fb8","#253494"],
7: ["#ffffcc","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#0c2c84"],
8: ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#0c2c84"],
9: ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"]
},GnBu: {
1: ["#e0f3db"],
2: ["#e0f3db","#a8ddb5"],
3: ["#e0f3db","#a8ddb5","#43a2ca"],
4: ["#f0f9e8","#bae4bc","#7bccc4","#2b8cbe"],
5: ["#f0f9e8","#bae4bc","#7bccc4","#43a2ca","#0868ac"],
6: ["#f0f9e8","#ccebc5","#a8ddb5","#7bccc4","#43a2ca","#0868ac"],
7: ["#f0f9e8","#ccebc5","#a8ddb5","#7bccc4","#4eb3d3","#2b8cbe","#08589e"],
8: ["#f7fcf0","#e0f3db","#ccebc5","#a8ddb5","#7bccc4","#4eb3d3","#2b8cbe","#08589e"],
9: ["#f7fcf0","#e0f3db","#ccebc5","#a8ddb5","#7bccc4","#4eb3d3","#2b8cbe","#0868ac","#084081"]
},BuGn: {
1: ["#e5f5f9"],
2: ["#e5f5f9","#99d8c9"],
3: ["#e5f5f9","#99d8c9","#2ca25f"],
4: ["#edf8fb","#b2e2e2","#66c2a4","#238b45"],
5: ["#edf8fb","#b2e2e2","#66c2a4","#2ca25f","#006d2c"],
6: ["#edf8fb","#ccece6","#99d8c9","#66c2a4","#2ca25f","#006d2c"],
7: ["#edf8fb","#ccece6","#99d8c9","#66c2a4","#41ae76","#238b45","#005824"],
8: ["#f7fcfd","#e5f5f9","#ccece6","#99d8c9","#66c2a4","#41ae76","#238b45","#005824"],
9: ["#f7fcfd","#e5f5f9","#ccece6","#99d8c9","#66c2a4","#41ae76","#238b45","#006d2c","#00441b"]
},PuBuGn: {
1: ["#ece2f0"],
2: ["#ece2f0","#a6bddb"],
3: ["#ece2f0","#a6bddb","#1c9099"],
4: ["#f6eff7","#bdc9e1","#67a9cf","#02818a"],
5: ["#f6eff7","#bdc9e1","#67a9cf","#1c9099","#016c59"],
6: ["#f6eff7","#d0d1e6","#a6bddb","#67a9cf","#1c9099","#016c59"],
7: ["#f6eff7","#d0d1e6","#a6bddb","#67a9cf","#3690c0","#02818a","#016450"],
8: ["#fff7fb","#ece2f0","#d0d1e6","#a6bddb","#67a9cf","#3690c0","#02818a","#016450"],
9: ["#fff7fb","#ece2f0","#d0d1e6","#a6bddb","#67a9cf","#3690c0","#02818a","#016c59","#014636"]
},PuBu: {
1: ["#ece7f2"],
2: ["#ece7f2","#a6bddb"],
3: ["#ece7f2","#a6bddb","#2b8cbe"],
4: ["#f1eef6","#bdc9e1","#74a9cf","#0570b0"],
5: ["#f1eef6","#bdc9e1","#74a9cf","#2b8cbe","#045a8d"],
6: ["#f1eef6","#d0d1e6","#a6bddb","#74a9cf","#2b8cbe","#045a8d"],
7: ["#f1eef6","#d0d1e6","#a6bddb","#74a9cf","#3690c0","#0570b0","#034e7b"],
8: ["#fff7fb","#ece7f2","#d0d1e6","#a6bddb","#74a9cf","#3690c0","#0570b0","#034e7b"],
9: ["#fff7fb","#ece7f2","#d0d1e6","#a6bddb","#74a9cf","#3690c0","#0570b0","#045a8d","#023858"]
},BuPu: {
1: ["#e0ecf4"],
2: ["#e0ecf4","#9ebcda"],
3: ["#e0ecf4","#9ebcda","#8856a7"],
4: ["#edf8fb","#b3cde3","#8c96c6","#88419d"],
5: ["#edf8fb","#b3cde3","#8c96c6","#8856a7","#810f7c"],
6: ["#edf8fb","#bfd3e6","#9ebcda","#8c96c6","#8856a7","#810f7c"],
7: ["#edf8fb","#bfd3e6","#9ebcda","#8c96c6","#8c6bb1","#88419d","#6e016b"],
8: ["#f7fcfd","#e0ecf4","#bfd3e6","#9ebcda","#8c96c6","#8c6bb1","#88419d","#6e016b"],
9: ["#f7fcfd","#e0ecf4","#bfd3e6","#9ebcda","#8c96c6","#8c6bb1","#88419d","#810f7c","#4d004b"]
},RdPu: {
1: ["#fde0dd"],
2: ["#fde0dd","#fa9fb5"],
3: ["#fde0dd","#fa9fb5","#c51b8a"],
4: ["#feebe2","#fbb4b9","#f768a1","#ae017e"],
5: ["#feebe2","#fbb4b9","#f768a1","#c51b8a","#7a0177"],
6: ["#feebe2","#fcc5c0","#fa9fb5","#f768a1","#c51b8a","#7a0177"],
7: ["#feebe2","#fcc5c0","#fa9fb5","#f768a1","#dd3497","#ae017e","#7a0177"],
8: ["#fff7f3","#fde0dd","#fcc5c0","#fa9fb5","#f768a1","#dd3497","#ae017e","#7a0177"],
9: ["#fff7f3","#fde0dd","#fcc5c0","#fa9fb5","#f768a1","#dd3497","#ae017e","#7a0177","#49006a"]
},PuRd: {
1: ["#e7e1ef"],
2: ["#e7e1ef","#c994c7"],
3: ["#e7e1ef","#c994c7","#dd1c77"],
4: ["#f1eef6","#d7b5d8","#df65b0","#ce1256"],
5: ["#f1eef6","#d7b5d8","#df65b0","#dd1c77","#980043"],
6: ["#f1eef6","#d4b9da","#c994c7","#df65b0","#dd1c77","#980043"],
7: ["#f1eef6","#d4b9da","#c994c7","#df65b0","#e7298a","#ce1256","#91003f"],
8: ["#f7f4f9","#e7e1ef","#d4b9da","#c994c7","#df65b0","#e7298a","#ce1256","#91003f"],
9: ["#f7f4f9","#e7e1ef","#d4b9da","#c994c7","#df65b0","#e7298a","#ce1256","#980043","#67001f"]
},OrRd: {
1: ["#fee8c8"],
2: ["#fee8c8","#fdbb84"],
3: ["#fee8c8","#fdbb84","#e34a33"],
4: ["#fef0d9","#fdcc8a","#fc8d59","#d7301f"],
5: ["#fef0d9","#fdcc8a","#fc8d59","#e34a33","#b30000"],
6: ["#fef0d9","#fdd49e","#fdbb84","#fc8d59","#e34a33","#b30000"],
7: ["#fef0d9","#fdd49e","#fdbb84","#fc8d59","#ef6548","#d7301f","#990000"],
8: ["#fff7ec","#fee8c8","#fdd49e","#fdbb84","#fc8d59","#ef6548","#d7301f","#990000"],
9: ["#fff7ec","#fee8c8","#fdd49e","#fdbb84","#fc8d59","#ef6548","#d7301f","#b30000","#7f0000"]
},YlOrRd: {
1: ["#ffeda0"],
2: ["#ffeda0","#feb24c"],
3: ["#ffeda0","#feb24c","#f03b20"],
4: ["#ffffb2","#fecc5c","#fd8d3c","#e31a1c"],
5: ["#ffffb2","#fecc5c","#fd8d3c","#f03b20","#bd0026"],
6: ["#ffffb2","#fed976","#feb24c","#fd8d3c","#f03b20","#bd0026"],
7: ["#ffffb2","#fed976","#feb24c","#fd8d3c","#fc4e2a","#e31a1c","#b10026"],
8: ["#ffffcc","#ffeda0","#fed976","#feb24c","#fd8d3c","#fc4e2a","#e31a1c","#b10026"],
9: ["#ffffcc","#ffeda0","#fed976","#feb24c","#fd8d3c","#fc4e2a","#e31a1c","#bd0026","#800026"]
},YlOrBr: {
1: ["#fff7bc"],
2: ["#fff7bc","#fec44f"],
3: ["#fff7bc","#fec44f","#d95f0e"],
4: ["#ffffd4","#fed98e","#fe9929","#cc4c02"],
5: ["#ffffd4","#fed98e","#fe9929","#d95f0e","#993404"],
6: ["#ffffd4","#fee391","#fec44f","#fe9929","#d95f0e","#993404"],
7: ["#ffffd4","#fee391","#fec44f","#fe9929","#ec7014","#cc4c02","#8c2d04"],
8: ["#ffffe5","#fff7bc","#fee391","#fec44f","#fe9929","#ec7014","#cc4c02","#8c2d04"],
9: ["#ffffe5","#fff7bc","#fee391","#fec44f","#fe9929","#ec7014","#cc4c02","#993404","#662506"]
},Purples: {
1: ["#efedf5"],
2: ["#efedf5","#bcbddc"],
3: ["#efedf5","#bcbddc","#756bb1"],
4: ["#f2f0f7","#cbc9e2","#9e9ac8","#6a51a3"],
5: ["#f2f0f7","#cbc9e2","#9e9ac8","#756bb1","#54278f"],
6: ["#f2f0f7","#dadaeb","#bcbddc","#9e9ac8","#756bb1","#54278f"],
7: ["#f2f0f7","#dadaeb","#bcbddc","#9e9ac8","#807dba","#6a51a3","#4a1486"],
8: ["#fcfbfd","#efedf5","#dadaeb","#bcbddc","#9e9ac8","#807dba","#6a51a3","#4a1486"],
9: ["#fcfbfd","#efedf5","#dadaeb","#bcbddc","#9e9ac8","#807dba","#6a51a3","#54278f","#3f007d"]
},Blues: {
1: ["#deebf7"],
2: ["#deebf7","#9ecae1"],
3: ["#deebf7","#9ecae1","#3182bd"],
4: ["#eff3ff","#bdd7e7","#6baed6","#2171b5"],
5: ["#eff3ff","#bdd7e7","#6baed6","#3182bd","#08519c"],
6: ["#eff3ff","#c6dbef","#9ecae1","#6baed6","#3182bd","#08519c"],
7: ["#eff3ff","#c6dbef","#9ecae1","#6baed6","#4292c6","#2171b5","#084594"],
8: ["#f7fbff","#deebf7","#c6dbef","#9ecae1","#6baed6","#4292c6","#2171b5","#084594"],
9: ["#f7fbff","#deebf7","#c6dbef","#9ecae1","#6baed6","#4292c6","#2171b5","#08519c","#08306b"]
},Greens: {
1: ["#e5f5e0"],
2: ["#e5f5e0","#a1d99b"],
3: ["#e5f5e0","#a1d99b","#31a354"],
4: ["#edf8e9","#bae4b3","#74c476","#238b45"],
5: ["#edf8e9","#bae4b3","#74c476","#31a354","#006d2c"],
6: ["#edf8e9","#c7e9c0","#a1d99b","#74c476","#31a354","#006d2c"],
7: ["#edf8e9","#c7e9c0","#a1d99b","#74c476","#41ab5d","#238b45","#005a32"],
8: ["#f7fcf5","#e5f5e0","#c7e9c0","#a1d99b","#74c476","#41ab5d","#238b45","#005a32"],
9: ["#f7fcf5","#e5f5e0","#c7e9c0","#a1d99b","#74c476","#41ab5d","#238b45","#006d2c","#00441b"]
},Oranges: {
1: ["#fee6ce"],
2: ["#fee6ce","#fdae6b"],
3: ["#fee6ce","#fdae6b","#e6550d"],
4: ["#feedde","#fdbe85","#fd8d3c","#d94701"],
5: ["#feedde","#fdbe85","#fd8d3c","#e6550d","#a63603"],
6: ["#feedde","#fdd0a2","#fdae6b","#fd8d3c","#e6550d","#a63603"],
7: ["#feedde","#fdd0a2","#fdae6b","#fd8d3c","#f16913","#d94801","#8c2d04"],
8: ["#fff5eb","#fee6ce","#fdd0a2","#fdae6b","#fd8d3c","#f16913","#d94801","#8c2d04"],
9: ["#fff5eb","#fee6ce","#fdd0a2","#fdae6b","#fd8d3c","#f16913","#d94801","#a63603","#7f2704"]
},Reds: {
1: ["#fee0d2"],
2: ["#fee0d2","#fc9272"],
3: ["#fee0d2","#fc9272","#de2d26"],
4: ["#fee5d9","#fcae91","#fb6a4a","#cb181d"],
5: ["#fee5d9","#fcae91","#fb6a4a","#de2d26","#a50f15"],
6: ["#fee5d9","#fcbba1","#fc9272","#fb6a4a","#de2d26","#a50f15"],
7: ["#fee5d9","#fcbba1","#fc9272","#fb6a4a","#ef3b2c","#cb181d","#99000d"],
8: ["#fff5f0","#fee0d2","#fcbba1","#fc9272","#fb6a4a","#ef3b2c","#cb181d","#99000d"],
9: ["#fff5f0","#fee0d2","#fcbba1","#fc9272","#fb6a4a","#ef3b2c","#cb181d","#a50f15","#67000d"]
},Greys: {
1: ["#f0f0f0"],
2: ["#f0f0f0","#bdbdbd"],
3: ["#f0f0f0","#bdbdbd","#636363"],
4: ["#f7f7f7","#cccccc","#969696","#525252"],
5: ["#f7f7f7","#cccccc","#969696","#636363","#252525"],
6: ["#f7f7f7","#d9d9d9","#bdbdbd","#969696","#636363","#252525"],
7: ["#f7f7f7","#d9d9d9","#bdbdbd","#969696","#737373","#525252","#252525"],
8: ["#ffffff","#f0f0f0","#d9d9d9","#bdbdbd","#969696","#737373","#525252","#252525"],
9: ["#ffffff","#f0f0f0","#d9d9d9","#bdbdbd","#969696","#737373","#525252","#252525","#000000"]
},PuOr: {
1: ["#f1a340"],
2: ["#f1a340","#f7f7f7"],
3: ["#f1a340","#f7f7f7","#998ec3"],
4: ["#e66101","#fdb863","#b2abd2","#5e3c99"],
5: ["#e66101","#fdb863","#f7f7f7","#b2abd2","#5e3c99"],
6: ["#b35806","#f1a340","#fee0b6","#d8daeb","#998ec3","#542788"],
7: ["#b35806","#f1a340","#fee0b6","#f7f7f7","#d8daeb","#998ec3","#542788"],
8: ["#b35806","#e08214","#fdb863","#fee0b6","#d8daeb","#b2abd2","#8073ac","#542788"],
9: ["#b35806","#e08214","#fdb863","#fee0b6","#f7f7f7","#d8daeb","#b2abd2","#8073ac","#542788"],
10: ["#7f3b08","#b35806","#e08214","#fdb863","#fee0b6","#d8daeb","#b2abd2","#8073ac","#542788","#2d004b"],
11: ["#7f3b08","#b35806","#e08214","#fdb863","#fee0b6","#f7f7f7","#d8daeb","#b2abd2","#8073ac","#542788","#2d004b"]
},BrBG: {
1: ["#d8b365"],
2: ["#d8b365","#f5f5f5"],
3: ["#d8b365","#f5f5f5","#5ab4ac"],
4: ["#a6611a","#dfc27d","#80cdc1","#018571"],
5: ["#a6611a","#dfc27d","#f5f5f5","#80cdc1","#018571"],
6: ["#8c510a","#d8b365","#f6e8c3","#c7eae5","#5ab4ac","#01665e"],
7: ["#8c510a","#d8b365","#f6e8c3","#f5f5f5","#c7eae5","#5ab4ac","#01665e"],
8: ["#8c510a","#bf812d","#dfc27d","#f6e8c3","#c7eae5","#80cdc1","#35978f","#01665e"],
9: ["#8c510a","#bf812d","#dfc27d","#f6e8c3","#f5f5f5","#c7eae5","#80cdc1","#35978f","#01665e"],
10: ["#543005","#8c510a","#bf812d","#dfc27d","#f6e8c3","#c7eae5","#80cdc1","#35978f","#01665e","#003c30"],
11: ["#543005","#8c510a","#bf812d","#dfc27d","#f6e8c3","#f5f5f5","#c7eae5","#80cdc1","#35978f","#01665e","#003c30"]
},PRGn: {
1: ["#af8dc3"],
2: ["#af8dc3","#f7f7f7"],
3: ["#af8dc3","#f7f7f7","#7fbf7b"],
4: ["#7b3294","#c2a5cf","#a6dba0","#008837"],
5: ["#7b3294","#c2a5cf","#f7f7f7","#a6dba0","#008837"],
6: ["#762a83","#af8dc3","#e7d4e8","#d9f0d3","#7fbf7b","#1b7837"],
7: ["#762a83","#af8dc3","#e7d4e8","#f7f7f7","#d9f0d3","#7fbf7b","#1b7837"],
8: ["#762a83","#9970ab","#c2a5cf","#e7d4e8","#d9f0d3","#a6dba0","#5aae61","#1b7837"],
9: ["#762a83","#9970ab","#c2a5cf","#e7d4e8","#f7f7f7","#d9f0d3","#a6dba0","#5aae61","#1b7837"],
10: ["#40004b","#762a83","#9970ab","#c2a5cf","#e7d4e8","#d9f0d3","#a6dba0","#5aae61","#1b7837","#00441b"],
11: ["#40004b","#762a83","#9970ab","#c2a5cf","#e7d4e8","#f7f7f7","#d9f0d3","#a6dba0","#5aae61","#1b7837","#00441b"]
},PiYG: {
1: ["#e9a3c9"],
2: ["#e9a3c9","#f7f7f7"],
3: ["#e9a3c9","#f7f7f7","#a1d76a"],
4: ["#d01c8b","#f1b6da","#b8e186","#4dac26"],
5: ["#d01c8b","#f1b6da","#f7f7f7","#b8e186","#4dac26"],
6: ["#c51b7d","#e9a3c9","#fde0ef","#e6f5d0","#a1d76a","#4d9221"],
7: ["#c51b7d","#e9a3c9","#fde0ef","#f7f7f7","#e6f5d0","#a1d76a","#4d9221"],
8: ["#c51b7d","#de77ae","#f1b6da","#fde0ef","#e6f5d0","#b8e186","#7fbc41","#4d9221"],
9: ["#c51b7d","#de77ae","#f1b6da","#fde0ef","#f7f7f7","#e6f5d0","#b8e186","#7fbc41","#4d9221"],
10: ["#8e0152","#c51b7d","#de77ae","#f1b6da","#fde0ef","#e6f5d0","#b8e186","#7fbc41","#4d9221","#276419"],
11: ["#8e0152","#c51b7d","#de77ae","#f1b6da","#fde0ef","#f7f7f7","#e6f5d0","#b8e186","#7fbc41","#4d9221","#276419"]
},RdBu: {
1: ["#ef8a62"],
2: ["#ef8a62","#f7f7f7"],
3: ["#ef8a62","#f7f7f7","#67a9cf"],
4: ["#ca0020","#f4a582","#92c5de","#0571b0"],
5: ["#ca0020","#f4a582","#f7f7f7","#92c5de","#0571b0"],
6: ["#b2182b","#ef8a62","#fddbc7","#d1e5f0","#67a9cf","#2166ac"],
7: ["#b2182b","#ef8a62","#fddbc7","#f7f7f7","#d1e5f0","#67a9cf","#2166ac"],
8: ["#b2182b","#d6604d","#f4a582","#fddbc7","#d1e5f0","#92c5de","#4393c3","#2166ac"],
9: ["#b2182b","#d6604d","#f4a582","#fddbc7","#f7f7f7","#d1e5f0","#92c5de","#4393c3","#2166ac"],
10: ["#67001f","#b2182b","#d6604d","#f4a582","#fddbc7","#d1e5f0","#92c5de","#4393c3","#2166ac","#053061"],
11: ["#67001f","#b2182b","#d6604d","#f4a582","#fddbc7","#f7f7f7","#d1e5f0","#92c5de","#4393c3","#2166ac","#053061"]
},RdGy: {
1: ["#ef8a62"],
2: ["#ef8a62","#ffffff"],
3: ["#ef8a62","#ffffff","#999999"],
4: ["#ca0020","#f4a582","#bababa","#404040"],
5: ["#ca0020","#f4a582","#ffffff","#bababa","#404040"],
6: ["#b2182b","#ef8a62","#fddbc7","#e0e0e0","#999999","#4d4d4d"],
7: ["#b2182b","#ef8a62","#fddbc7","#ffffff","#e0e0e0","#999999","#4d4d4d"],
8: ["#b2182b","#d6604d","#f4a582","#fddbc7","#e0e0e0","#bababa","#878787","#4d4d4d"],
9: ["#b2182b","#d6604d","#f4a582","#fddbc7","#ffffff","#e0e0e0","#bababa","#878787","#4d4d4d"],
10: ["#67001f","#b2182b","#d6604d","#f4a582","#fddbc7","#e0e0e0","#bababa","#878787","#4d4d4d","#1a1a1a"],
11: ["#67001f","#b2182b","#d6604d","#f4a582","#fddbc7","#ffffff","#e0e0e0","#bababa","#878787","#4d4d4d","#1a1a1a"]
},RdYlBu: {
1: ["#fc8d59"],
2: ["#fc8d59","#ffffbf"],
3: ["#fc8d59","#ffffbf","#91bfdb"],
4: ["#d7191c","#fdae61","#abd9e9","#2c7bb6"],
5: ["#d7191c","#fdae61","#ffffbf","#abd9e9","#2c7bb6"],
6: ["#d73027","#fc8d59","#fee090","#e0f3f8","#91bfdb","#4575b4"],
7: ["#d73027","#fc8d59","#fee090","#ffffbf","#e0f3f8","#91bfdb","#4575b4"],
8: ["#d73027","#f46d43","#fdae61","#fee090","#e0f3f8","#abd9e9","#74add1","#4575b4"],
9: ["#d73027","#f46d43","#fdae61","#fee090","#ffffbf","#e0f3f8","#abd9e9","#74add1","#4575b4"],
10: ["#a50026","#d73027","#f46d43","#fdae61","#fee090","#e0f3f8","#abd9e9","#74add1","#4575b4","#313695"],
11: ["#a50026","#d73027","#f46d43","#fdae61","#fee090","#ffffbf","#e0f3f8","#abd9e9","#74add1","#4575b4","#313695"]
},Spectral: {
1: ["#fc8d59"],
2: ["#fc8d59","#ffffbf"],
3: ["#fc8d59","#ffffbf","#99d594"],
4: ["#d7191c","#fdae61","#abdda4","#2b83ba"],
5: ["#d7191c","#fdae61","#ffffbf","#abdda4","#2b83ba"],
6: ["#d53e4f","#fc8d59","#fee08b","#e6f598","#99d594","#3288bd"],
7: ["#d53e4f","#fc8d59","#fee08b","#ffffbf","#e6f598","#99d594","#3288bd"],
8: ["#d53e4f","#f46d43","#fdae61","#fee08b","#e6f598","#abdda4","#66c2a5","#3288bd"],
9: ["#d53e4f","#f46d43","#fdae61","#fee08b","#ffffbf","#e6f598","#abdda4","#66c2a5","#3288bd"],
10: ["#9e0142","#d53e4f","#f46d43","#fdae61","#fee08b","#e6f598","#abdda4","#66c2a5","#3288bd","#5e4fa2"],
11: ["#9e0142","#d53e4f","#f46d43","#fdae61","#fee08b","#ffffbf","#e6f598","#abdda4","#66c2a5","#3288bd","#5e4fa2"]
},RdYlGn: {
1: ["#fc8d59"],
2: ["#fc8d59","#ffffbf"],
3: ["#fc8d59","#ffffbf","#91cf60"],
4: ["#d7191c","#fdae61","#a6d96a","#1a9641"],
5: ["#d7191c","#fdae61","#ffffbf","#a6d96a","#1a9641"],
6: ["#d73027","#fc8d59","#fee08b","#d9ef8b","#91cf60","#1a9850"],
7: ["#d73027","#fc8d59","#fee08b","#ffffbf","#d9ef8b","#91cf60","#1a9850"],
8: ["#d73027","#f46d43","#fdae61","#fee08b","#d9ef8b","#a6d96a","#66bd63","#1a9850"],
9: ["#d73027","#f46d43","#fdae61","#fee08b","#ffffbf","#d9ef8b","#a6d96a","#66bd63","#1a9850"],
10: ["#a50026","#d73027","#f46d43","#fdae61","#fee08b","#d9ef8b","#a6d96a","#66bd63","#1a9850","#006837"],
11: ["#a50026","#d73027","#f46d43","#fdae61","#fee08b","#ffffbf","#d9ef8b","#a6d96a","#66bd63","#1a9850","#006837"]
},Accent: {
1: ["#7fc97f"],
2: ["#7fc97f","#beaed4"],
3: ["#7fc97f","#beaed4","#fdc086"],
4: ["#7fc97f","#beaed4","#fdc086","#ffff99"],
5: ["#7fc97f","#beaed4","#fdc086","#ffff99","#386cb0"],
6: ["#7fc97f","#beaed4","#fdc086","#ffff99","#386cb0","#f0027f"],
7: ["#7fc97f","#beaed4","#fdc086","#ffff99","#386cb0","#f0027f","#bf5b17"],
8: ["#7fc97f","#beaed4","#fdc086","#ffff99","#386cb0","#f0027f","#bf5b17","#666666"]
},Dark2: {
1: ["#1b9e77"],
2: ["#1b9e77","#d95f02"],
3: ["#1b9e77","#d95f02","#7570b3"],
4: ["#1b9e77","#d95f02","#7570b3","#e7298a"],
5: ["#1b9e77","#d95f02","#7570b3","#e7298a","#66a61e"],
6: ["#1b9e77","#d95f02","#7570b3","#e7298a","#66a61e","#e6ab02"],
7: ["#1b9e77","#d95f02","#7570b3","#e7298a","#66a61e","#e6ab02","#a6761d"],
8: ["#1b9e77","#d95f02","#7570b3","#e7298a","#66a61e","#e6ab02","#a6761d","#666666"]
},Paired: {
1: ["#a6cee3"],
2: ["#a6cee3","#1f78b4"],
3: ["#a6cee3","#1f78b4","#b2df8a"],
4: ["#a6cee3","#1f78b4","#b2df8a","#33a02c"],
5: ["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99"],
6: ["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c"],
7: ["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f"],
8: ["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00"],
9: ["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6"],
10: ["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6","#6a3d9a"],
11: ["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6","#6a3d9a","#ffff99"],
12: ["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6","#6a3d9a","#ffff99","#b15928"]
},Pastel1: {
1: ["#fbb4ae"],
2: ["#fbb4ae","#b3cde3"],
3: ["#fbb4ae","#b3cde3","#ccebc5"],
4: ["#fbb4ae","#b3cde3","#ccebc5","#decbe4"],
5: ["#fbb4ae","#b3cde3","#ccebc5","#decbe4","#fed9a6"],
6: ["#fbb4ae","#b3cde3","#ccebc5","#decbe4","#fed9a6","#ffffcc"],
7: ["#fbb4ae","#b3cde3","#ccebc5","#decbe4","#fed9a6","#ffffcc","#e5d8bd"],
8: ["#fbb4ae","#b3cde3","#ccebc5","#decbe4","#fed9a6","#ffffcc","#e5d8bd","#fddaec"],
9: ["#fbb4ae","#b3cde3","#ccebc5","#decbe4","#fed9a6","#ffffcc","#e5d8bd","#fddaec","#f2f2f2"]
},Pastel2: {
1: ["#b3e2cd"],
2: ["#b3e2cd","#fdcdac"],
3: ["#b3e2cd","#fdcdac","#cbd5e8"],
4: ["#b3e2cd","#fdcdac","#cbd5e8","#f4cae4"],
5: ["#b3e2cd","#fdcdac","#cbd5e8","#f4cae4","#e6f5c9"],
6: ["#b3e2cd","#fdcdac","#cbd5e8","#f4cae4","#e6f5c9","#fff2ae"],
7: ["#b3e2cd","#fdcdac","#cbd5e8","#f4cae4","#e6f5c9","#fff2ae","#f1e2cc"],
8: ["#b3e2cd","#fdcdac","#cbd5e8","#f4cae4","#e6f5c9","#fff2ae","#f1e2cc","#cccccc"]
},Set1: {
1: ["#e41a1c"],
2: ["#e41a1c","#377eb8"],
3: ["#e41a1c","#377eb8","#4daf4a"],
4: ["#e41a1c","#377eb8","#4daf4a","#984ea3"],
5: ["#e41a1c","#377eb8","#4daf4a","#984ea3","#ff7f00"],
6: ["#e41a1c","#377eb8","#4daf4a","#984ea3","#ff7f00","#ffff33"],
7: ["#e41a1c","#377eb8","#4daf4a","#984ea3","#ff7f00","#ffff33","#a65628"],
8: ["#e41a1c","#377eb8","#4daf4a","#984ea3","#ff7f00","#ffff33","#a65628","#f781bf"],
9: ["#e41a1c","#377eb8","#4daf4a","#984ea3","#ff7f00","#ffff33","#a65628","#f781bf","#999999"]
},Set2: {
1: ["#66c2a5"],
2: ["#66c2a5","#fc8d62"],
3: ["#66c2a5","#fc8d62","#8da0cb"],
4: ["#66c2a5","#fc8d62","#8da0cb","#e78ac3"],
5: ["#66c2a5","#fc8d62","#8da0cb","#e78ac3","#a6d854"],
6: ["#66c2a5","#fc8d62","#8da0cb","#e78ac3","#a6d854","#ffd92f"],
7: ["#66c2a5","#fc8d62","#8da0cb","#e78ac3","#a6d854","#ffd92f","#e5c494"],
8: ["#66c2a5","#fc8d62","#8da0cb","#e78ac3","#a6d854","#ffd92f","#e5c494","#b3b3b3"]
},Set3: {
1: ["#8dd3c7"],
2: ["#8dd3c7","#ffffb3"],
3: ["#8dd3c7","#ffffb3","#bebada"],
4: ["#8dd3c7","#ffffb3","#bebada","#fb8072"],
5: ["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3"],
6: ["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462"],
7: ["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69"],
8: ["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5"],
9: ["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5","#d9d9d9"],
10: ["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5","#d9d9d9","#bc80bd"],
11: ["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5","#d9d9d9","#bc80bd","#ccebc5"],
12: ["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5","#d9d9d9","#bc80bd","#ccebc5","#ffed6f"]
}};

;
// concat new file 

var MenuLeftIV = Mn.ItemView.extend({
	template: "menu-left/templates/menu-left.html",

	events: {
		"click .list-group-item": "onLeftSectionClicked"
	},

	// handler to be executed when the user clicks in a section on the
	// left menu (Texts, Users, etc)
	onLeftSectionClicked: function(e){
		var $target   = $(e.target),
			$anchorEl = $target.is("span") ? $target.parent() : $target;

		var href = $anchorEl.prop("href");
		if(href.indexOf("tilemill") >= 0){
			return;
		}

		// for all the siblings, remove the classes that give the active look; then
		// add those classes to the selected anchor element

		$anchorEl.siblings().removeClass("active");
		$anchorEl.addClass("active");

		$anchorEl.siblings().find(".arrow-container").removeClass("glyphicon glyphicon-chevron-right");
		$anchorEl.find(".arrow-container").addClass("glyphicon glyphicon-chevron-right");

		leftMenuChannel.trigger("show:main:right", $anchorEl.attr("href"));
	},

	onAttach: function(){
		// execute the onLeftSectionClicked handler (relative to the 1st section in the left menu)
		this.$(".list-group-item").first().trigger("click");
	}
});
s
;
// concat new file 
var MainLayout = Mn.LayoutView.extend({

	template: "main-layout/templates/main-layout.html",

	initialize: function(){
		leftMenuChannel.on("show:main:right", this.showViewRight, this);
	},

	regions: {
		mainLeftRegion: "#main-left-region",
		mainRightRegion: "#main-right-region"
	},

	onBeforeShow: function(view, region){
		var menuLeftIV = new MenuLeftIV({
			collection: menuLeftC
		});
		this.mainLeftRegion.show(menuLeftIV);
	},

	showViewRight: function(code){

		switch(code){
			case "#profile":
				this.showProfile();
				break;
			case "#texts":
				this.showTexts();
				break;
			case "#users":
				this.showUsers();
				break;
			case "#files":
				this.showFiles();
				break;
			case "#maps":
				this.showMaps();
				break;
			// case "#tilemill":
			// 	window.open("http://localhost:3000/pt/tilemill")
			// 	break;
			default:
				throw new Error("showViewRight: unknown code");
				break;
		}
	},


	showProfile: function(){
		var userM = new UserM();
		userM.set("id", Clima.userId);

		var profileLV = new ProfileLV({
			model: userM
		});

		var self = this;

		Q(userM.fetch())
			.then(
				function(){ 
					self.mainRightRegion.show(profileLV); 
				}, 
				function(jqXHR){
					var msg = jqXHR.responseJSON.message;
					alert("ERROR: " + msg);
					throw new Error(msg);
				}
			)
			.done();
	},

	showTexts: function(){
		var textsTabLV = new TextsTabLV();
		this.mainRightRegion.show(textsTabLV);
	},

	showUsers: function(){
		var usersTabLV = new UsersTabLV();
		this.mainRightRegion.show(usersTabLV);
	},

	showFiles: function(){
		var filesTabLV = new FilesTabLV();
		this.mainRightRegion.show(filesTabLV);
	},

	showMaps: function(){
		var mapsTabLV = new MapsTabLV();
		this.mainRightRegion.show(mapsTabLV);
	},



});

;
// concat new file 

var leftMenuChannel = Backbone.Radio.channel('leftMenu');

var Dashboard = new Mn.Application();
Dashboard.$modal1 = $("#modal-1");
Dashboard.$modal2 = $("#modal-2");

Dashboard.addRegions({
	mainRegion: "#main-region",
	modal1Region: "#modal1-content-region",
	modal2Region: "#modal2-content-region"
});

var mainLayout = new MainLayout();

Dashboard.mainRegion.show(mainLayout);



Dashboard.utils = Dashboard.utils || {};


Dashboard.utils.valueClasses = function(options){

    _.defaults(options || (options = {}), {
        mode: "real",
        min: 0,
        max: 100,
        numClasses: 4,
        toFixed: 2
    });

    var internals = {};

    internals.getClassesChar = function(options){
        var classes = [];
        var i, word;
        for(i=0; i<options.distinctWords.length; i++){
            word = options.distinctWords[i];
            classes.push([word, word]);
        }

        return classes;
    };

    internals.getClassesReal = function(options){

        var classes = [];
        var iLen = (options.max - options.min) / options.numClasses;
        var toFixed = options.toFixed;

        var left, right;
        for(var k=0; k<options.numClasses; k++){
            left = options.min + k*iLen;
            right = options.min + (k+1)*iLen;
            if(toFixed > 0){
                left  = left.toFixed(toFixed);
                right = right.toFixed(toFixed);
            }

            classes.push([left, right])
        }

        return classes;
    };

    internals.getClassesInt = function(options){

        var classes = [];

        // shift to value to 1 - ... (example: instead of 11 - 18, we work with 1 - 8)
        var max = options.max - (options.min - 1);

        if(options.numClasses > max){
            throw new Error("numClasses must be <= " + max);
        }

        var iLen = Math.floor(max/options.numClasses);
        var remainder = max % options.numClasses;
        var k, j;

        // basic intervals (assume there is no remainder)
        for(k=0; k<options.numClasses; k++){
            classes.push([k*iLen + 1, (k+1)*iLen])
        }

        // correct the intervals according to the remainder
        if(remainder){

            for(j=0; j<options.numClasses; j++){
                if(j<remainder){
                    classes[j][1] = classes[j][1] + (j + 1);
                }
                else{
                    classes[j][1] = classes[j][0] + (iLen - 1);
                 }

                if(j<options.numClasses-1){
                    classes[j+1][0] = classes[j][1] + 1;
                }
            }
        }

        // shift back to the original
        for(j=0; j<options.numClasses; j++){
            classes[j][0] = classes[j][0] + options.min - 1;
            classes[j][1] = classes[j][1] + options.min - 1;
        }

        return classes;
    };


    if(options.mode === "char"){
        return internals.getClassesChar(options);
    }

    if(options.max < options.min){
        throw new Error("max should be >= min");
    }

    if(options.numClasses < 2){
        throw new Error("numClasses should be >= 2");   
    }

    return options.mode === "real" ? internals.getClassesReal(options) : internals.getClassesInt(options);
};


// select text in a div; taken from
// http://stackoverflow.com/questions/9975707/use-jquery-select-to-select-contents-of-a-div
jQuery.fn.selectText = function(){
    this.find('input').each(function() {
        if($(this).prev().length == 0 || !$(this).prev().hasClass('p_copy')) { 
            $('<p class="p_copy" style="position: absolute; z-index: -1;"></p>').insertBefore($(this));
        }
        $(this).prev().html($(this).val());
    });
    var doc = document;
    var element = this[0];
    //console.log(this, element);
    if (doc.body.createTextRange) {
        var range = document.body.createTextRange();
        range.moveToElementText(element);
        range.select();
    } else if (window.getSelection) {
        var selection = window.getSelection();        
        var range = document.createRange();
        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);
    }
};





// Set caret position easily in jQuery
// https://github.com/DrPheltRight/jquery-caret

(function ($) {
    // Behind the scenes method deals with browser
    // idiosyncrasies and such
    $.caretTo = function (el, index) {
        if (el.createTextRange) { 
            var range = el.createTextRange(); 
            range.move("character", index); 
            range.select(); 
        } else if (el.selectionStart != null) { 
            el.focus(); 
            el.setSelectionRange(index, index); 
        }
    };
    
    // Another behind the scenes that collects the
    // current caret position for an element
    
    // TODO: Get working with Opera
    $.caretPos = function (el) {
        if ("selection" in document) {
            var range = el.createTextRange();
            try {
                range.setEndPoint("EndToStart", document.selection.createRange());
            } catch (e) {
                // Catch IE failure here, return 0 like
                // other browsers
                return 0;
            }
            return range.text.length;
        } else if (el.selectionStart != null) {
            return el.selectionStart;
        }
    };

    // The following methods are queued under fx for more
    // flexibility when combining with $.fn.delay() and
    // jQuery effects.

    // Set caret to a particular index
    $.fn.caret = function (index, offset) {
        if (typeof(index) === "undefined") {
            return $.caretPos(this.get(0));
        }
        
        return this.queue(function (next) {
            if (isNaN(index)) {
                var i = $(this).val().indexOf(index);
                
                if (offset === true) {
                    i += index.length;
                } else if (typeof(offset) !== "undefined") {
                    i += offset;
                }
                
                $.caretTo(this, i);
            } else {
                $.caretTo(this, index);
            }
            
            next();
        });
    };

    // Set caret to beginning of an element
    $.fn.caretToStart = function () {
        return this.caret(0);
    };

    // Set caret to the end of an element
    $.fn.caretToEnd = function () {
        return this.queue(function (next) {
            $.caretTo(this, $(this).val().length);
            next();
        });
    };
}(jQuery));