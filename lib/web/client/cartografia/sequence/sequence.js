var SequenceIV = Mn.ItemView.extend({

	template: "sequence/templates/sequence.html",

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
});