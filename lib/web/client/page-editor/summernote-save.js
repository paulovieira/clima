
Clima.summernoteOptions = {
    focus: true,
    airMode: false,
    // note: the div for each group of buttons will have the "note-toolbar-group" class (besides "btn-group")
    toolbar: [
        ['toolbar-group', ['style']],
        ['toolbar-group', ['bold', 'italic', 'underline', 'clear']],
        ['toolbar-group', ['fontname']],
        ['toolbar-group', ['color']],
        ['toolbar-group', ['ul', 'ol', 'paragraph']],
        ['toolbar-group', ['height']],
        ['toolbar-group', ['link', 'picture', 'hr']],
        ['toolbar-group', ['undo', 'redo',  'codeview']],
        ['toolbar-group', ['save']],
        ['toolbar-group', ['close']],
//        ['toolbar-group', ['originalText']]
    ]
};


var isEditableHandler = function(e){

    // if(!!Clima.$currentOpenEditor){
    //     Clima.$currentOpenEditor.destroy();
    //     Clima.$currentOpenEditor = null;
    // }

    var $target = $(e.target);
    //var h = $target.closest(".is-editable").html();
    //console.log("html: ", h);

    $target.closest("[data-editable-id]").summernote(Clima.summernoteOptions);
    e.preventDefault();
//    Clima.$currentOpenEditor = $target;
};

$('*[data-editable-id]').on("click", isEditableHandler);

$("body").on("click", ".note-editor", function(e){
//debugger;

	$target = $(e.target);

	if(!$target.hasClass("note-image-input")){
		e.preventDefault();
     }
//        return;

	// // if we click an editable element that is an anchor (or a children of an anchor), we must stop the default action
 //    if($(e.target).hasClass("is-editable")){
 //    	e.preventDefault();
 //        return;
 //    }

    

 //    // similar: if we have the editor already open and click inside it, and the editable text is an anchor (or a children of an anchor),
 //    // we must prevent the default action; but if the click is in the modal, it should propagate normally;
 //    //var $editable = $(e.target).parents(".note-editor");

 //    //if($editable.length > 0){
	// if($(e.target).hasClass("note-editable") || $(e.target).hasClass("btn-close-editor")){

 //        	e.preventDefault();

 //    }
 //    // otherwise, if we click outside the editor, close it!
	// // else{
	// // 	if(!!Clima.$currentOpenEditor){
	// //         Clima.$currentOpenEditor.destroy();
	// //         Clima.$currentOpenEditor = null;
	// // 	}
 // //    }
  	//e.stopPropagation();
});



$.summernote.addPlugin({

    buttons: { 
        save: function() {
        	var buttonHtml = "";

			buttonHtml += '<button type="button" style="padding-top: 5px; padding-bottom: 4px;" class="btn btn-default btn-sm btn-save" title="Save changes in the database" data-event="save-data" data-hide="true" tabindex="-1">';
			buttonHtml += '<i class="fa fa-floppy-o"></i>';
			buttonHtml += '<span style="font-size: 110%; padding: 0; margin-left: 7px;" class="btn-save-text">Save</span>';
			buttonHtml += '</button>';
		 	
		 	return buttonHtml;
        },

        close: function() {
        	var buttonHtml = "";

			buttonHtml += '<button type="button" style="padding-top: 5px; padding-bottom: 4px;" class="btn btn-default btn-sm btn-close" title="Close editor" data-event="close-editor" data-hide="true" tabindex="-1">';
			buttonHtml += '<i class="fa fa-times"></i>';
			buttonHtml += '<span style="font-size: 110%; padding: 0; margin-left: 7px;" class="btn-close-editor">Close</span>';
			buttonHtml += '</button>';
		 	
		 	return buttonHtml;
        },

        // originalText: function() {
        //     var buttonHtml = "";

        //     buttonHtml += '<button type="button" style="padding-top: 5px; padding-bottom: 4px;" class="btn btn-default btn-sm btn-close" title="Get the original text (WARNING: will remove any saved changes)" data-event="get-original-text" data-hide="true" tabindex="-1">';
        //     buttonHtml += '<i class="fa fa-eraser"></i>';
        //     buttonHtml += '<span style="font-size: 110%; padding: 0; margin-left: 7px;" class="xbtn-close-editor">Original</span>';
        //     buttonHtml += '</button>';
            
        //     return buttonHtml;
        // }
    },

    events: { 
        "save-data": function(event, editor, layoutInfo) {

			var $editorElem = $(event.target).closest(".note-editor");
            var $editableElem = $editorElem.prev();



            //var pageName = "";
            var editableId = $editableElem.data("editableId");

            // var textObj = _.findWhere(Clima.texts, {
            //     pageName: pageName,
            //     editableId: editableId
            // });

            var textObj = Clima.editableTexts[editableId];

            var ajaxOptions, dataObj;

            // the text that is shown is a default lorem; we have to create a 
            // a new text in the database
            if (!textObj) {

                var pathname = window.location.pathname.split("/")

                // in some browsers location.pathname will not have a slash at the beggining
                if(pathname[0] === ""){ pathname.shift(); }

                // remove the 1st component of the path (should be "pt", "en", etc)
                pathname.shift();

                // finally we have the pagename
                var pageName = pathname.join("/");

                var contents = {pt: "", en: ""};
                contents[Clima.lang] = $.trim($editableElem.code());

                dataObj = {
                    contents: contents,
                    tags: [],
                    pageName: pageName,
                    editableId: editableId
                };

                ajaxOptions = {
                    url: "/api/v1/texts",
                    type: "POST",
                    data: dataObj
                };
            }
            else{

                var textId = textObj.id;
                var newContents = {};
                newContents[Clima.lang] = $.trim($editableElem.code());

                dataObj = {
                    id: textId,
                    contents: _.extend(textObj.contents, newContents),
                    tags: []
                };

                ajaxOptions = {
                    url: "/api/v1/texts/" + textId,
                    type: "PUT",
                    data: dataObj
                };
            }

            //var pageName = textObj.pageName;


            // var textId = $editableElem.data("textId");
            // var textObj = _.findWhere(Clima.texts, {
            //     id: textId
            // });



            $editorElem.find(".btn-save").prop('disabled', true);
            $editorElem.find(".btn-save-text").html("Saving...");

            var msg = "";
	        // Q($.ajax({
         //        url: "/api/v1/texts/" + textId,
         //        type: "PUT",
         //        data: dataObj
         //    }))
            Q($.ajax(ajaxOptions))
            .delay(300)
            .then(function(newTextObj) {

                // update the in-memory Clima.editableTexts array with the new text
                Clima.editableTexts[editableId] = newTextObj[0];

                msg = Clima.lang === "pt" ? "As alterações ao texto " + editableId + " foram gravadas" : "Changes to text " + editableId  +" were saved";

                $editorElem.find(".btn-save").prop('disabled', false);
                $editorElem.find(".btn-save-text").html("Save");

                Clima.notify("success", msg);
            })
            .catch(function(err) {

                msg = Clima.lang === "pt" ? "ERRO: o texto " + editableId + " não foi actualizado" : "ERROR: text " + editableId  +" was not updated"

                $editorElem.find(".btn-save").prop('disabled', false);
                $editorElem.find(".btn-save-text").html("Save");

                Clima.notify("danger", msg);
            });

            


        },

        "close-editor": function(event, editor, layoutInfo) {
        	//debugger;

            // we have to call the destroy in setTimeout because there's an error thrown
            // otherwise
            setTimeout(function(){ 

                // select the .is-editable corresponding to this editor widget
                var $editableElem = $(event.target).closest(".note-editor").prev();
                $editableElem.destroy(); 

                // the destroy method removes the click handler; add it again;
                $editableElem.on("click", isEditableHandler);
            }, 10);

        },

        // "get-original-text": function(event, editor, layoutInfo){
            
        //     var $editableElem = $(event.target).closest(".note-editor").prev();
        //     var textId = $editableElem.data("textId");

        //     Q($.ajax({
        //         url: "/api/v1/texts-default",
        //         type: "GET"
        //     }))
        //     .then(function(defaultTexts){

        //         var text = _.findWhere(defaultTexts, {id: textId});
        //         if(!text){
        //             throw new Error("text could not be found");
        //         }
        //         $editableElem.code($.trim(text.contents[Clima.lang]));
        //     })
        //     .catch(function(err){

        //         var msg = (Clima.lang === "pt" ? "ERRO: não foi possível obter os textos originais" : "ERROR: the original texts could not be fetched");
        //         Clima.notify("danger", msg);
        //     });

        // }
    }
});


// $('.is-editable').summernote({

// 	// note: the div for each group of buttons will have the "note-toolbar-group" class (besides "btn-group")
//     toolbar: [
//         ['toolbar-group', ['style']],
//         ['toolbar-group', ['bold', 'italic', 'underline', 'clear']],
//         ['toolbar-group', ['fontname']],
//         ['toolbar-group', ['color']],
//         ['toolbar-group', ['ul', 'ol', 'paragraph']],
//         ['toolbar-group', ['height']],
//         ['toolbar-group', ['link', 'picture', 'hr']],
//         ['toolbar-group', ['undo', 'redo',  'codeview']],
//         ['toolbar-group', ['save']]
//     ]
// });

