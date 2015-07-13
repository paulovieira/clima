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
			behaviorClass: window.Behaviors.ShowModal,
			uiKey: "editModalBtn",  // will listen for clicks on @ui.editModalBtn
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
		saveBtn: "button.js-save"
	},

	events: {
		"click @ui.saveBtn": "createResource",
	},

	createResource: function(){
//debugger;
		var attrs = Backbone.Syphon.serialize(this);

		// the selected shapes are in the form: {"1": true, "3": false, "8": true}; we want an array of objects like
		// this: [{shapeId: 1}, {shapeId: 8}]



		this.ui.saveBtn.prop("disabled", true);

		var self = this;
		Q.delay(150)
			.then(function(){
				return self.model.save(attrs, {wait: true});  // returns a promise
			})
			.then(function(){
				alert("O mapa foi criado com sucesso.");

				// the handler for show:all:shapes will trigger a fake click on the correct
				// anchor elem, this showing the list of maps
				mapsChannel.trigger("show:all:maps");
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


var MapsMenuIV = Mn.ItemView.extend({
	template: "maps/templates/map-menu.html",
	events: {
		"click button#js-save-map-menu": "saveMapsMenu"
	},
	onAttach: function(){

		// activate the jquery-sortable plugin
		this.mapsMenu = $('ul.map-elems').sortable({
		    group: 'map-elems'
		});
	},

	onBeforeDestroy: function(){
		this.mapsMenu.sortable("destroy");
	},

	saveMapsMenu: function(){

		var updateCollection = [
			{
				groupName: "published", 
				order: 0,
				mapElements: (this.mapsMenu.sortable("serialize").get())[0]
			},
			{
				groupName: "not published", 
				order: -1,
				mapElements: (this.mapsMenu.sortable("serialize").get())[1]
			},
		]

		$.ajax({
			url: "/api/v1/maps-menu",
			method: "PUT",
			data: JSON.stringify(updateCollection),
			dataType: "json",
			contentType:"application/json; charset=utf-8",
			success: function(){
				alert("The menu has been saved");
			},
			error: function(jqxhr, status, s){
//		debugger;
				alert("ERROR: " + jqxhr.responseJSON.message);
			}
		})
		//this.collection.reset(updateCollection);
		//console.log(this.collection.toJSON());

/*
Note: the payload should be like this:

[
    {
        "groupName": "published", 
        "mapElements": [
            {
                "id": "geography-class", 
                "name": "Geography Class"
            }
        ], 
        "order": 0
    }, 
    {
        "groupName": "not published", 
        "mapElements": [
            {
                "id": "new-mapa-1-owe-gw", 
                "name": "new mapa 1 owe gw"
            }, 
            {
                "id": "open-streets-dc", 
                "name": "Open Streets, DC"
            }, 
            {
                "id": "road-trip", 
                "name": "Road Trip"
            }
        ], 
        "order": -1
    }
]
*/		
	}
})

var LegendColorsIV = Mn.ItemView.extend({
	template: "maps/templates/legends-colors.html",
	initialize: function(){
	},

});


// TODO: diverging colors (do colorbrew - no chroma ver a parte de extrair as cores)
var LegendChooseAttributeLV = Mn.LayoutView.extend({

	initialize: function(){
	},

	template: "maps/templates/legends-choose-attribute.html",

	ui: {
		availableAttributes: "select.js-available-attributes",
		numberOfClasses: "select.js-number-classes",
		colorScheme: "select.js-color-scheme",
		invertColorsChkbox: "input#js-invert-colors",
		lightCorrectionChkbox: "input#js-light-correction",
		darkenColorsBtn: "button#js-darken-colors",
		brightenColorsBtn: "button#js-brighten-colors",
		saturateColorsBtn: "button#js-saturate-colors",
		desaturateColorsBtn: "button#js-desaturate-colors"
	},

	events: {
		"change @ui.availableAttributes": "updateSelectedAttribute",
		"change @ui.numberOfClasses":     "updateSelectedClass",
		"change @ui.colorScheme":         "updateSelectedColorScheme",
		
		"change @ui.invertColorsChkbox":    "invertColors",
		"change @ui.lightCorrectionChkbox": "lightCorrection",
		

		"click @ui.darkenColorsBtn":      "darkenColors",
		"click @ui.brightenColorsBtn":    "brightenColors",
		"click @ui.saturateColorsBtn":    "saturateColors",
		"click @ui.desaturateColorsBtn":  "desaturateColors",
	},

	darkenColors: function(e){

		this.set("colorValue", this.get("colorValue") + 4);
		this.updateClasses();
	},

	brightenColors: function(e){

		this.set("colorValue", this.get("colorValue") - 4);
		this.updateClasses();
	},

	saturateColors: function(e){

		this.set("colorSaturation", this.get("colorSaturation") + 4);
		this.updateClasses();
	},

	desaturateColors: function(e){

		this.set("colorSaturation", this.get("colorSaturation") - 4);
		this.updateClasses();
	},

	invertColors: function(e){
//debugger;
		this.set("invertColors", this.ui.invertColorsChkbox.is(':checked'));
		this.updateClasses();
	},

	lightCorrection: function(e){
//debugger;
		this.set("lightCorrection", this.ui.lightCorrectionChkbox.is(':checked'));
		this.updateClasses();
	},

	invertColorsOrder: function(scale){

		var reversedScale = [];

		for(var i=0, l=scale.length; i<l; i++){
			var j = l-i;
			reversedScale.push({
				"valueClass": scale[i]["valueClass"],
				"colorHex": scale[j-1]["colorHex"]
			})
		}

		return reversedScale;
	},

	changeColors: function(scale, method, amount){

		var changedScale = [];
		for(var i=0, l=scale.length; i<l; i++){
			changedScale.push({
				"valueClass": scale[i]["valueClass"],
				"colorHex": chroma(scale[i]["colorHex"])[method](amount).hex()
			})
		}

		return changedScale;
	},

	regions: {
		colorsRegion: "#js-colors-region"
	},

	updateSelectedAttribute: function(e){
//debugger;
		this.set("selectedAttribute", $(e.target).val());

		// when the attribute changes, the selected options in "number of classes"
		// and "color scheme" will always be reset (because the number of classes 
		// depends on the max and min of the attribute)
		this.ui.numberOfClasses.val(0).prop("disabled", true);
		this.set("selectedClass", 0);

		this.ui.colorScheme.val("").prop("disabled", true);
		this.set("selectedColorScheme", "");

		// colorRegion will be updated by getAttributeStats
		//this.getAttributeStats();

		if(!this.get("selectedAttribute")){
			this.colorsRegion.empty();
			return;
		}

		var shapeM = shapesC.findWhere({ tableName: this.get("selectedShapeName") });
		var attributeInfo = _.findWhere(shapeM.get("attributesInfo"), {column_name: this.get("selectedAttribute")});

		var isInt = /int/.test(attributeInfo.data_type);
		this.set("selectedAttributeIsInt", isInt);
		if(isInt){
			this.set("selectedAttributeMin", parseInt(attributeInfo.min, 10));
			this.set("selectedAttributeMax", parseInt(attributeInfo.max, 10));
		}
		else{
			this.set("selectedAttributeMin", parseFloat(attributeInfo.min));
			this.set("selectedAttributeMax", parseFloat(attributeInfo.max));	
		}

		var attrs = {
			"min": this.get("selectedAttributeMin"),
			"max" : this.get("selectedAttributeMax"),
			"scale": false
		};

		// enable the other select elements
		this.ui.numberOfClasses.prop("disabled", false);
		this.ui.colorScheme.prop("disabled", false);

		this.showLegendColors(attrs);
	},


	updateSelectedClass: function(e){

		this.set("selectedClass", parseInt($(e.target).val(), 10));
		this.updateClasses();
	},

	updateSelectedColorScheme: function(e){
//debugger;
		this.set("selectedColorScheme", $(e.target).val());

		// reset saturation and color brightness
		this.set("colorSaturation", 0);
		this.set("colorValue", 0);

		this.updateClasses();
	},

	updateClasses: function(){
//debugger;
		var selectedAttribute = this.get("selectedAttribute");
		var selectedClass     = this.get("selectedClass");
		var selectedColorScheme = this.get("selectedColorScheme");

		if(!selectedAttribute){
			return;
		}

		var selectedShapeName = this.get("selectedShapeName");
		var min = this.get("selectedAttributeMin");
		var max = this.get("selectedAttributeMax");

		if(!_.isNumber(min) || !_.isNumber(max)){
			alert("ERROR: minimum and maximum of the selected attribute are not numbers");
			return;
		}

		var attrs = {
			"min": min,
			"max" : max,
			"invertColors": this.get("invertColors")
		};


		if(!selectedClass || !selectedColorScheme){
			// show the legend without the colors (will show only max and min)
			attrs["scale"] = false;
			this.showLegendColors(attrs);
			return;
		}

		if(this.get("selectedAttributeIsInt")){
			var intervalLength = max - min + 1;
			if(selectedClass > intervalLength){
				alert("The number of classes must be <= " + intervalLength);
				return;					
			}
		}


		var valueClasses = Dashboard.utils.valueClasses({
		    mode: this.get("selectedAttributeIsInt") ? "int": "real",
		    min: min,
		    max: max,
		    numClasses: selectedClass
		});


		if(valueClasses.length !== selectedClass){
			throw new Error("The valueClasses array has unexpected length");
		}

		// the correctLightness option gives better colors, but only works for sequential colors
		var lightCorrection = false
		var sequentialSchemes = ["Blues","Greens","Greys","Oranges","Purples","Reds","BuGn","BuPu","GnBu","OrRd","PuBu","PuBuGn","PuRd","RdPu","YlGn","YlGnBu","YlOrBr","YlOrRd"];

		if(_.contains(sequentialSchemes, selectedColorScheme) && this.get("lightCorrection")){
			lightCorrection = true;
		}

		attrs["lightCorrection"] = lightCorrection;
		this.set("lightCorrection", lightCorrection);

		// get the actual colors (from chroma.js library)
		//var chromaScale = chroma.scale(selectedColorScheme).correctLightness(lightCorrection).domain([0, selectedClass], selectedClass);
		var chromaColors = chroma
							.scale(selectedColorScheme)
							.correctLightness(lightCorrection)
							.domain([0, selectedClass], selectedClass)
							.colors();

		if(chromaColors.length !== selectedClass){
			throw new Error("The chromaColors array has unexpected length");
		}		

		// finally, create a new array of objects with the data ready to used in the template
		var scale = valueClasses.map(function(valueClass, i){
			var obj = { 
				"valueClass": valueClass,
				"colorHex": chromaColors[i]
			}
			return obj;
		});

		if(this.get("invertColors")){
			scale = this.invertColorsOrder(scale);
		}

		if(this.get("colorValue")){
			scale = this.changeColors(scale, "darken", this.get("colorValue"));
		}

		if(this.get("colorSaturation")){
			scale = this.changeColors(scale, "saturate", this.get("colorSaturation"));
		}

		attrs["scale"] = scale;
		this.set("scale", scale);

		this.showLegendColors(attrs);
	},

	showLegendColors: function(attrs){
		var legendColorsIV = new LegendColorsIV({
			model: new Backbone.Model(attrs)
		});

		this.colorsRegion.show(legendColorsIV);
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

	isNumeric: function(type){

		type = type.toLowerCase();
		return /int/.test(type) || 
				/decimal/.test(type) || 
				/numeric/.test(type) || 
				/real/.test(type) || 
				/double/.test(type);
	},

	updateChooseAttributes: function(e){

//debugger;
		var shapeName = $(e.target).val();
		var selectedShape = shapesC.findWhere({tableName: shapeName});

		// we only want the data attributes with numeric type; the "gid" attribute (added
		// by pgsql) is also excluded explicitely;
		var availableAttributes = selectedShape.get("attributesInfo").filter(function(obj){
			if(obj["column_name"]==="gid"){ return false; }

			return this.isNumeric(obj["data_type"]);
		}, this);

		if(availableAttributes.length === 0){
			this.chooseAttributeRegion.show(new LegendNoAvailableAttributesIV());
			return;
		}

		var legendChooseAttributeLV = new LegendChooseAttributeLV({
			collection: new Backbone.Collection(availableAttributes)
		});

		// give any object (in particular, views) the getter/setter methods from Backbone.Model
		_.defaults(legendChooseAttributeLV, Backbone.Attributes);

		legendChooseAttributeLV.set("selectedShapeName", selectedShape.get("tableName"));
		legendChooseAttributeLV.set("selectedShapeType", selectedShape.get("geometryType"));
		legendChooseAttributeLV.set("selectedAttribute", "");
		legendChooseAttributeLV.set("selectedAttributeMax", undefined);
		legendChooseAttributeLV.set("selectedAttributeMin", undefined);
		legendChooseAttributeLV.set("selectedClass", undefined);
		legendChooseAttributeLV.set("colorValue", 0);
		legendChooseAttributeLV.set("colorSaturation", 0);

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
		mapM.get("layer").forEach(function(mapObj){
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
			collection: new Backbone.Collection(availableShapes)
		})
		this.chooseShapeRegion.show(legendChooseShapeLV);

// TODO:
// 	-show a 3rd select with all the data atributes for the selected shape that are numeric
// 	-when the user selects one of the attributes, get the max and min and show a 4rd select with the nunmber of classes
// 	-from here we can proceed with the calculations
// 


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
		this.showAllMaps();
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


			case "maps-all":
				this.showAllMaps();
				break;
			case "maps-new":
				this.showNewMap();
				break;
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

	showNewMap: function(){
		var mapM = new MapM();
		var mapNewLV = new MapNewLV({
			model: mapM
		});

		this.tabContentRegion.show(mapNewLV); 


		var self = this;
	/*
		// textsC will be used to obtain the map categories (which will be shown in the template)
		Q.all([textsC.fetch(), shapesC.fetch()])
			.then(function(){ 

				// add the map categories to the model (to be available in the template)
				var mapCategories = _.filter(textsC.toJSON(), function(obj){
					return _.contains(obj.tags, "map_category");
				})
				mapM.set("mapCategories", mapCategories);

				// do the same with the the shapes collection
				mapM.set("allShapes", shapesC.toJSON());

				self.tabContentRegion.show(mapNewLV); 
			})
			.catch(function(err){
				var msg = err.responseJSON ? err.responseJSON.message : 
											( err.message ? err.message : "unknown error" );

				alert("ERROR: " + msg);
				throw new Error(msg);
			})
			.done();
*/
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

	showMapsMenu: function(){
		var mapsMenuIV = new MapsMenuIV({
			collection: mapsMenuC
		});

		var self = this;

		Q(mapsMenuC.fetch())
			.then(function(){ 
				self.tabContentRegion.show(mapsMenuIV);
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
