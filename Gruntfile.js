var Path = require("path");
//var Fs = require("fs");

module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-nunjucks');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // configuration data for all the tasks
    var internals = {};
    
    internals.timestamp = grunt.template.today('yymmdd-HHMMss');
    internals.staticsDir = Path.join("lib", "web", "client", "static");
    internals.dashboardDir = Path.join("lib", "web", "client", "dashboard");
    internals.cartografiaDir = Path.join("lib", "web", "client", "cartografia");

    internals.statics = {};


    // base target: this is only jquery and bootstrap and is included in every page
    internals.statics.base = {};
    internals.statics.base.input = [
        'lib/web/client/static/jquery/jquery-1.11.2.js', 
        'lib/web/client/static/bootstrap/3.3.5-original/js/bootstrap.js' 
    ];

    internals.statics.base.output = Path.join(
        internals.staticsDir, 
        "_js",
        "base-" + internals.timestamp + ".js"
    );

    // summernote target (we need q and underscore here)
    internals.statics.summernote = {};
    internals.statics.summernote.input = [
        "lib/web/client/static/underscore/underscore-1.6.0.js",
        "lib/web/client/static/q/q-1.1.2.js",
        "lib/web/client/static/bootstrap/bootstrap-notify-51a18c.js",
        "lib/web/client/static/jquery/jquery-livequery-70a306.js",
        "lib/web/client/static/summernote/0.6.16/summernote.js",
        "lib/web/client/page-editor/summernote-save.js"
    ];

    internals.statics.summernote.output = Path.join(
        internals.staticsDir, 
        "_js",
        "summernote-" + internals.timestamp + ".js"
    );

    // dashboard target (libs)
    internals.statics.dashboardLibs = {};
    internals.statics.dashboardLibs.input = [
        "lib/web/client/static/underscore/underscore-1.6.0.js",
        "lib/web/client/static/underscore/underscore.string-3.0.3.js",
        "lib/web/client/static/q/q-1.1.2.js",
        "lib/web/client/static/bootstrap/bootstrap-fileinput-4.2.0.js",
        "lib/web/client/static/bootstrap-colorpicker/2.2.0/js/bootstrap-colorpicker.js",
        "lib/web/client/static/bootstrap/bootstrap-notify-51a18c.js",
        "lib/web/client/static/bootstrap/bootstrap-modal-2.2.5.js",
        "lib/web/client/static/jquery/jquery-sortable-0.9.13.js",
        "lib/web/client/static/fecha/fecha-1.0.0.js",
        "lib/web/client/static/nunjucks/nunjucks-slim-1.3.3.js",
        "lib/web/client/static/chroma/chroma-1.0.1.js",
        "lib/web/client/static/prism/prism.js",
        "lib/web/client/static/backbone/json2.js",
        "lib/web/client/static/backbone/backbone-1.1.2.js",
        "lib/web/client/static/backbone/backbone.radio-1.0.1.js",
        "lib/web/client/static/backbone/backbone.attributes-5b0f73.js",
        "lib/web/client/static/backbone/backbone.syphon-0.6.2.js",
        "lib/web/client/static/backbone/backbone.marionette-2.4.1.js",
        "lib/web/client/static/backbone/renderer-nunjucks.js",
    ];

    internals.statics.dashboardLibs.output = Path.join(
        internals.staticsDir, 
        "_js",
        "dashboard-libs-" + internals.timestamp + ".js"
    );


    // dashboard target (app)
    internals.statics.dashboardApp = {};
    internals.statics.dashboardApp.input = [

        "lib/web/client/dashboard/entities.js",
        "lib/web/client/dashboard/behaviors.js",
        "lib/web/client/dashboard/profile/profile.js",
        "lib/web/client/dashboard/texts/texts.js",
        "lib/web/client/dashboard/users/users.js",
        "lib/web/client/dashboard/files/files.js",
        "lib/web/client/dashboard/maps/maps.js",
        "lib/web/client/dashboard/color-brew.js",
        "lib/web/client/dashboard/menu-left/menu-left.js",
        "lib/web/client/dashboard/main-layout/main-layout.js",
        "lib/web/client/dashboard/index.js"
    ];

    internals.statics.dashboardApp.output = Path.join(
        internals.staticsDir, 
        "_js",
        "dashboard-app-" + internals.timestamp + ".js"
    );


    // cartografia target (libs)
    internals.statics.cartografiaLibs = {};
    internals.statics.cartografiaLibs.input = [
        "lib/web/client/static/underscore/underscore-1.6.0.js",
        "lib/web/client/static/underscore/underscore.string-3.0.3.js",
        "lib/web/client/static/q/q-1.1.2.js",
        "lib/web/client/static/bootstrap/bootstrap-notify-51a18c.js",
        "lib/web/client/static/bootstrap/bootstrap-modal-2.2.5.js",
        "lib/web/client/static/jquery/jquery-sortable-0.9.13.js",
        "lib/web/client/static/fecha/fecha-1.0.0.js",
        "lib/web/client/static/nunjucks/nunjucks-slim-1.3.3.js",
        "lib/web/client/static/backbone/json2.js",
        "lib/web/client/static/backbone/backbone-1.1.2.js",
        "lib/web/client/static/backbone/backbone.radio-1.0.1.js",
        "lib/web/client/static/backbone/backbone.attributes-5b0f73.js",
        "lib/web/client/static/backbone/backbone.marionette-2.4.1.js",
        "lib/web/client/static/backbone/renderer-nunjucks.js",
    ];

    internals.statics.cartografiaLibs.output = Path.join(
        internals.staticsDir, 
        "_js",
        "cartografia-libs-" + internals.timestamp + ".js"
    );


    // cartografia target (app)
    internals.statics.cartografiaApp = {};
    internals.statics.cartografiaApp.input = [

        "lib/web/client/cartografia/entities.js",
        "lib/web/client/cartografia/behaviors.js",
        "lib/web/client/cartografia/index.js"
    ];

    internals.statics.cartografiaApp.output = Path.join(
        internals.staticsDir, 
        "_js",
        "cartografia-app-" + internals.timestamp + ".js"
    );



    internals.templates = {};

    // templates target - dashboard
    internals.templates.dashboard = {};
    internals.templates.dashboard.input = [
        internals.dashboardDir + '/**/*.html'
    ];
    internals.templates.dashboard.output = Path.join(
        internals.staticsDir, 
        "_js",
        "dashboard-templates-" +  internals.timestamp + ".js"
    );

console.log("internals.templates.dashboard.input: ", internals.templates.dashboard.input)

    internals.templates = {};

    // templates target - cartografia
    internals.templates.cartografia = {};
    internals.templates.cartografia.input = [
        internals.cartografiaDir + '/**/*.html'
    ];
    internals.templates.cartografia.output = Path.join(
        internals.staticsDir, 
        "_js",
        "cartografia-templates-" +  internals.timestamp + ".js"
    );


    // the tasks configuration starts here

    // TASK: concatenate js and css

    var concatConfig = {

        options: {
            separator: grunt.util.linefeed + ';' + grunt.util.linefeed + '// concat new file ' + grunt.util.linefeed,
        },
        
        base: {
            src: internals.statics.base.input,
            dest: internals.statics.base.output,
            nonull: true,
        },

        summernote: {
            src: internals.statics.summernote.input,
            dest: internals.statics.summernote.output,
            nonull: true,
        },

        "dashboard-libs": {
            src: internals.statics.dashboardLibs.input,
            dest: internals.statics.dashboardLibs.output,
            nonull: true,
        },

        "dashboard-app": {
            src: internals.statics.dashboardApp.input,
            dest: internals.statics.dashboardApp.output,
            nonull: true,
        },

        "cartografia-libs": {
            src: internals.statics.cartografiaLibs.input,
            dest: internals.statics.cartografiaLibs.output,
            nonull: true,
        },

        "cartografia-app": {
            src: internals.statics.cartografiaApp.input,
            dest: internals.statics.cartografiaApp.output,
            nonull: true,
        },
    };

    grunt.config("concat", concatConfig);


    // TASK: pre-compile nunjucks templates

    var nunjucksConfig = {

        "dashboard-templates": {
            baseDir: internals.dashboardDir,
            src: internals.templates.dashboard.input,
            dest: internals.templates.dashboard.output,
            options: {
                autoescape: true
            }
        },

        "cartografia-templates": {
            baseDir: internals.cartografiaDir,
            src: internals.templates.cartografia.input,
            dest: internals.templates.cartografia.output,
            options: {
                autoescape: true
            }
        },
    };

    grunt.config("nunjucks", nunjucksConfig);


    // TASK: clean old files 

    var cleanConfig = {

        options: {
//            "no-write": true
        },

        "base": {
            src: Path.join(internals.staticsDir, "_js", "base*.js")
        },

        "summernote": {
            src: Path.join(internals.staticsDir, "_js", "summernote*.js")
        },

        "dashboard-libs": {
            src: Path.join(internals.staticsDir, "_js", "dashboard-libs-*.js")
        },

        "dashboard-app": {
            src: Path.join(internals.staticsDir, "_js", "dashboard-app-*.js")
        },

        "dashboard-templates": {
            src: Path.join(internals.staticsDir, "_js", "dashboard-templates-*.js")
        },

        "cartografia-app": {
            src: Path.join(internals.staticsDir, "_js", "cartografia-app-*.js")
        },

        "cartografia-templates": {
            src: Path.join(internals.staticsDir, "_js", "cartografia-templates-*.js")
        }        

    };

    grunt.config("clean", cleanConfig);




    // TASK: watch files for changes

    var watchConfig = {

        "base": {
            files: internals.statics.base.input,
            tasks: [
                "clean:base", 
                "concat:base",
                "update-bundles-info"   
            ]
        },

        "summernote": {
            files: internals.statics.summernote.input,
            tasks: [
                "clean:summernote",
                "concat:summernote",
                "update-bundles-info"
            ]
        },


        "dashboard-libs": {
            files: internals.statics.dashboardLibs.input,
            tasks: [
                "clean:dashboard-libs", 
                "concat:dashboard-libs",
                "update-bundles-info"
            ]
        },

        "dashboard-app": {
            files: internals.statics.dashboardApp.input,
            tasks: [
                "clean:dashboard-app",
                "concat:dashboard-app",
                "update-bundles-info"
            ]
        },

        "dashboard-templates": {
            files: internals.templates.dashboard.input,
            tasks: [
                "clean:dashboard-templates",
                "nunjucks:dashboard-templates",
                "update-bundles-info"
            ]
        },


        "cartografia-libs": {
            files: internals.statics.cartografiaLibs.input,
            tasks: [
                "clean:cartografia-libs", 
                "concat:cartografia-libs",
                "update-bundles-info"
            ]
        },

        "cartografia-app": {
            files: internals.statics.cartografiaApp.input,
            tasks: [
                "clean:cartografia-app",
                "concat:cartografia-app",
                "update-bundles-info"
            ]
        },

        "cartografia-templates": {
            files: internals.templates.cartografia.input,
            tasks: [
                "clean:cartografia-templates",
                "nunjucks:cartografia-templates",
                "update-bundles-info"
            ]
        },
    };


    grunt.config("watch", watchConfig);


    // TASK: update bundles.json with the filenames of the current bundles

    grunt.registerTask("update-bundles-info", function(){

        var filename = "./bundles.json";
        var obj = grunt.file.readJSON(filename);

        var paths;

        // bundles - base (jquery + bootstrap)
        paths = grunt.file.expand(Path.join(internals.staticsDir, "_js", "base*.js"));
        obj["base"] = Path.basename(paths[0]);

        // bundles - summernote
        paths = grunt.file.expand(Path.join(internals.staticsDir, "_js", "summernote*.js"));
        obj["summernote"] = Path.basename(paths[0]);

        // bundles - dashboard libs
        paths = grunt.file.expand(Path.join(internals.staticsDir, "_js", "dashboard-libs*.js"));
        obj["dashboard-libs"] = Path.basename(paths[0]);

        // bundles - dashboard app
        paths = grunt.file.expand(Path.join(internals.staticsDir, "_js", "dashboard-app*.js"));
        obj["dashboard-app"] = Path.basename(paths[0]);

        // bundles - dashboard templates
        paths = grunt.file.expand(Path.join(internals.staticsDir, "_js", "dashboard-templates*.js"));
        obj["dashboard-templates"] = Path.basename(paths[0]);


        // bundles - cartografia libs
        paths = grunt.file.expand(Path.join(internals.staticsDir, "_js", "cartografia-libs*.js"));
        obj["cartografia-libs"] = Path.basename(paths[0]);

        // bundles - cartografia app
        paths = grunt.file.expand(Path.join(internals.staticsDir, "_js", "cartografia-app*.js"));
        obj["cartografia-app"] = Path.basename(paths[0]);

        // bundles - cartografia templates
        paths = grunt.file.expand(Path.join(internals.staticsDir, "_js", "cartografia-templates*.js"));
        obj["cartografia-templates"] = Path.basename(paths[0]);

        grunt.file.write(filename, JSON.stringify(obj, null, 4));
    });


//    grunt.registerTask("concatenate', ['concat:base', "clean:old"]);
    grunt.registerTask('default', ['watch']);

    grunt.registerTask('build', [
        "clean:base", 
        "concat:base",

        "clean:summernote",
        "concat:summernote",

        "clean:dashboard-libs", 
        "concat:dashboard-libs",

        "clean:dashboard-app",
        "concat:dashboard-app",
        
        "clean:dashboard-templates",
        "nunjucks:dashboard-templates",

        "clean:cartografia-libs", 
        "concat:cartografia-libs",

        "clean:cartografia-app",
        "concat:cartografia-app",
        
        "clean:cartografia-templates",
        "nunjucks:cartografia-templates",


        "update-bundles-info"
    ]);

};
