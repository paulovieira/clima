var ModalMoreInfoIV = Mn.ItemView.extend({
    template: "menu/templates/modal-map-info.html",

    ui: {
        "closeBtn":  "button.js-modal-cancel",
    },

    behaviors: {
        CloseModal: {
            behaviorClass: window.Behaviors.CloseModal,  // will listen for clicks on @ui.modalCloseBtn
        },
    },

});

var ModalMapOptionsIV = Mn.ItemView.extend({
    template: "menu/templates/modal-map-options.html",

    ui: {
        "closeBtn":  "button.js-modal-cancel",
        "updateBtn": "button.js-modal-update"
    },

    events: {
        "click @ui.updateBtn": "updateMap"
    },

    behaviors: {
        CloseModal: {
            behaviorClass: window.Behaviors.CloseModal,  // will listen for clicks on @ui.modalCloseBtn
        },
    },

    updateMap: function(){

        var opacity = parseInt(this.$("#opacity").val(), 10);
        if(_.isNumber(opacity) && opacity >= 0 && opacity <= 100){
            this.model.set("opacity", opacity);
        }

        var zindex = parseInt(this.$("#zindex").val(), 10);
        if(_.isNumber(zindex) && zindex !== this.model.get("zindex")){
            this.model.set("zindex", zindex);
        }
        //debugger;
        // var bringToFront = this.$(".js-bring-to-front").is(":checked");
        // if(bringToFront){
        //     this.model.trigger("bringToFront");
        // }

        $("#modal-1").modal("hide");
        this.destroy();
    }


});


var MenuBodyIV = Mn.ItemView.extend({
    template: "menu/templates/menu-body.html",
    ui: {
        "chkBox": "input[type='checkbox']",
        "infoBtn": "a.js-map-more-info",
        "optionsBtn": "a.js-map-options"
    },
    events: {
        "change @ui.chkBox": "changedCheckbox",
        "click @ui.infoBtn": "showInfoModal",
        "click @ui.optionsBtn": "showOptionsModal"
    },

    behaviors: {

        ShowOptionsModal: {
            behaviorClass: window.Behaviors.ShowModal,
            uiKey: "optionsBtn",  // will listen for the ocurrence of the given eventType on @ui.editModalBtn
            eventType: "click",  // "click" is the default eventyType, but we can use others to trigger the modal
            viewClass: ModalMapOptionsIV,  // will show this view in the modal region, passing the current model or collection 
            //mapId: 

        },

        ShowInfoModal: {
            behaviorClass: window.Behaviors.ShowModal,
            uiKey: "infoBtn",  // will listen for the ocurrence of the given eventType on @ui.editModalBtn
            eventType: "click",  // "click" is the default eventyType, but we can use others to trigger the modal
            viewClass: ModalMoreInfoIV,  // will show this view in the modal region, passing the current model or collection 
            //mapId: 

        },

    },

    changedCheckbox: function(e){

        var $checkBox = $(e.target);        
        var mapId = $checkBox.data("mapId");
        var mapIndex = this.model.get("mapIndex");

        if($checkBox.is(":checked")){
            cartografiaChannel.request("selectLayer", mapIndex, mapId);
        }
        else{
            cartografiaChannel.request("deselectLayer", mapIndex, mapId);
        }

    },

    onAttach: function(){
        //debugger;
        this.$('#tree-menu').treed({
            openedClass:'glyphicon-chevron-right', 
            closedClass:'glyphicon-chevron-down'
        });

        // show the tree open at start 
        this.$(".js-map-group").trigger("click");
    }
});

/*
 this view will be always present; when we "open" and "close" the menu, this is what really happens:
  - add/remove the "height: 95%" to style
  - show a new instance of the menuBody view in the region / close the region
 */


var MenuLV = Mn.LayoutView.extend({

    // NOTE: leaflet will add the "leaflet-control" class to the top div of this view
    // attributes: {
    //     style: "height: 100%;"
    // },

    template: "menu/templates/menu.html",

    modelEvents: {
        "change:menuOpen":"toggleRegion"
    },

    ui: {
        menuBtn: "i.menu-icon",
        fullscreenBtn: "a.js-full-screen"
    },

    events: {
        "click @ui.menuBtn": "toggleMenuOpen",
        "click @ui.fullscreenBtn": "fullscreenBtnClicked"
    },

    regions: {
        bodyRegion: "div.mn-r-menu-body"
    },

    fullscreenBtnClicked: function(){

        if($.fullscreen.isFullScreen()){
            cartografiaChannel.request("closeFullscreen", "#map-container");    
        }else{
            cartografiaChannel.request("openFullscreen", "#map-container");    
        }
        
    },

    toggleMenuOpen: function(){

        var menuOpen = this.model.get("menuOpen");
        this.model.set("menuOpen", !menuOpen);
    },

    onRender: function(){

        this.disableMouseInteractions();
        //console.log("TODO: make sure the mousewheel is working as expected, in all the browsers")
    },

    // all mouse related actions in the menu (such as dblclick) should not propagate
    // to the map; example: a double click on the map gives rise to a zoom in, but
    // we don't want that; 
    disableMouseInteractions: function(){
        // NOTE: to work in firefox we must add "DOMMouseScroll MozMousePixelScroll" (!???)
        // http://stackoverflow.com/questions/13274326/firefoxjquery-mousewheel-scroll-event-bug
        
        $(this.el).on("mousewheel DOMMouseScroll MozMousePixelScroll dblclick", function(e){
            e.stopPropagation();
        });

        // check the correct event name (from modernizr)
        var eventName = "mousedown";
        if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
          eventName = "touchstart";
        }

        $(this.el).on(eventName, function(e){
          //console.log(eventName)
          e.stopPropagation();
        });

        // NOTE: for non-touch browsers, "click" and "dblclick" are not necessary ("mousedown" is sufficient); but they are for
        // touch devices (where "touchstart" will be used insteadof "mousedown")
        $(this.el).on("dblclick", function(e){
           e.stopPropagation();
        });

        $(this.el).on("click", function(e){
           e.stopPropagation();
        });

    },

    toggleRegion: function(e){

        if(this.model.get("menuOpen")===true){
            this.show();
        }
        else{
            this.reset();
        }
    },

    show: function(){
        this.$el.css("height", "95%");
        this.$(".menu-container").css("height", "100%");
        this.$(".menu-container").css("min-width", "400px");

        var model = new Backbone.Model({
            mapIndex: this.model.get("mapIndex"),
            mapsMenu: Clima.mapsMenu,
            supportsFullscreen: $.fullscreen.isNativelySupported() + "",
            width: Clima.width,  // to be deleted
            width2: Clima.width2  // to be deleted
        });

        var menuBodyIV = new MenuBodyIV({
            model: model
        });

        this.bodyRegion.show(menuBodyIV);

        // manually adjust the height of the menu body; we do this manually so that the scroll
        // only affects the menu body and not the header (which is where the menu button is);
        // we want the menu button always visible;

        var menuBodyHeight = this.$(".menu-container").height() - this.$(".menu-header").height();
        this.bodyRegion.currentView.$el.css("height", menuBodyHeight);
        this.bodyRegion.currentView.$el.css("overflow-x", "auto");
    },

    reset: function(){

        this.bodyRegion.reset();

        // remove the height because after closing the menu sometimes the body region will still
        // be selected, giving a strange effect
        this.$el.css("height", "");
        this.$(".menu-container").css("height", "");
        this.$(".menu-container").css("min-width", "");
    }
});

