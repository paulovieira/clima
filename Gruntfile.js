var Path = require("path");
//var Fs = require("fs");

module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-nunjucks');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compress');
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
        "base-" + internals.timestamp
    );


    // summernote target (we need q and underscore here)
    internals.statics.summernote = {};
    internals.statics.summernote.input = [
        "lib/web/client/static/underscore/underscore-1.6.0.js",
        "lib/web/client/static/q/q-1.1.2.js",
        "lib/web/client/static/bootstrap/bootstrap-notify-51a18c.js",
        "lib/web/client/static/jquery/jquery-livequery-70a306.js",
        "lib/web/client/static/summernote/0.6.16/summernote.js",
        "lib/web/client/summernote-app/summernote-save.js"
    ];

    internals.statics.summernote.output = Path.join(
        internals.staticsDir, 
        "_js",
        "summernote-" + internals.timestamp
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
        "dashboard-libs-" + internals.timestamp
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
        "dashboard-app-" + internals.timestamp
    );


    // cartografia target (libs)
    internals.statics.cartografiaLibs = {};
    internals.statics.cartografiaLibs.input = [
        "lib/web/client/static/jquery/jquery.mousewheel-3.1.12.js",
        "lib/web/client/static/leaflet/mapbox-2.2.1/mapbox.uncompressed.js",
        "lib/web/client/static/leaflet/leaflet-providers-1.0.29.js",
        "lib/web/client/static/leaflet/leaflet-minimap/Control.MiniMap-447530.js",
        "lib/web/client/static/underscore/underscore-1.6.0.js",
        //"lib/web/client/static/underscore/underscore.string-3.0.3.js",
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
        "cartografia-libs-" + internals.timestamp
    );


    // cartografia target (app)
    internals.statics.cartografiaApp = {};
    internals.statics.cartografiaApp.input = [
        "lib/web/client/cartografia/leaflet-backbone-view.js",
        "lib/web/client/cartografia/entities.js",
        "lib/web/client/cartografia/behaviors.js",
        "lib/web/client/cartografia/index.js"
    ];

    internals.statics.cartografiaApp.output = Path.join(
        internals.staticsDir, 
        "_js",
        "cartografia-app-" + internals.timestamp
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
        "dashboard-templates-" +  internals.timestamp
    );




    // templates target - cartografia
    internals.templates.cartografia = {};
    internals.templates.cartografia.input = [
        internals.cartografiaDir + '/**/*.html'
    ];
    internals.templates.cartografia.output = Path.join(
        internals.staticsDir, 
        "_js",
        "cartografia-templates-" +  internals.timestamp
    );


    // the tasks configuration starts here

    // TASK: concatenate js and css

    var concatConfig = {

        options: {
            separator: grunt.util.linefeed + ';' + grunt.util.linefeed + '// concat new file ' + grunt.util.linefeed,
        },
        
        base: {
            src: internals.statics.base.input,
            dest: internals.statics.base.output + ".js",
            nonull: true,
        },

        summernote: {
            src: internals.statics.summernote.input,
            dest: internals.statics.summernote.output + ".js",
            nonull: true,
        },

        "dashboard-libs": {
            src: internals.statics.dashboardLibs.input,
            dest: internals.statics.dashboardLibs.output + ".js",
            nonull: true,
        },

        "dashboard-app": {
            src: internals.statics.dashboardApp.input,
            dest: internals.statics.dashboardApp.output + ".js",
            nonull: true,
        },

        "cartografia-libs": {
            src: internals.statics.cartografiaLibs.input,
            dest: internals.statics.cartografiaLibs.output + ".js",
            nonull: true,
        },

        "cartografia-app": {
            src: internals.statics.cartografiaApp.input,
            dest: internals.statics.cartografiaApp.output + ".js",
            nonull: true,
        },
    };

    grunt.config("concat", concatConfig);


    // TASK: pre-compile nunjucks templates

    var nunjucksConfig = {

        "dashboard-templates": {
            baseDir: internals.dashboardDir,
            src: internals.templates.dashboard.input,
            dest: internals.templates.dashboard.output + ".js",
            options: {
                autoescape: true
            }
        },

        "cartografia-templates": {
            baseDir: internals.cartografiaDir,
            src: internals.templates.cartografia.input,
            dest: internals.templates.cartografia.output + ".js",
            options: {
                autoescape: true
            }
        },
    };

    grunt.config("nunjucks", nunjucksConfig);


    // TASK: uglify (to be run after concat and nunjucks)

    var uglifyConfig = {

        // if there is any problem with the minified code, try mangle: false
        options: {
            mangle: false
        },

        base: {
            src: internals.statics.base.output + ".js",
            dest: internals.statics.base.output + ".min.js"
        },

        summernote: {
            src: internals.statics.summernote.output + ".js",
            dest: internals.statics.summernote.output + ".min.js"
        },

        "dashboard-libs": {
            src: internals.statics.dashboardLibs.output + ".js",
            dest: internals.statics.dashboardLibs.output + ".min.js"
        },

        "dashboard-app": {
            src: internals.statics.dashboardApp.output + ".js",
            dest: internals.statics.dashboardApp.output + ".min.js"
        },

        "dashboard-templates": {
            src: internals.templates.dashboard.output + ".js",
            dest: internals.templates.dashboard.output + ".min.js"
        },

        "cartografia-libs": {
            src: internals.statics.cartografiaLibs.output + ".js",
            dest: internals.statics.cartografiaLibs.output + ".min.js"
        },

        "cartografia-app": {
            src: internals.statics.cartografiaApp.output + ".js",
            dest: internals.statics.cartografiaApp.output + ".min.js"
        },

        "cartografia-templates": {
            src: internals.templates.cartografia.output + ".js",
            dest: internals.templates.cartografia.output + ".min.js"
        },
    };

    grunt.config("uglify", uglifyConfig);


    // TASK: create a gzipped version of the concatenated files (this task should be run
    // right after the uglify; nginx will use these files if they are present;)

    var compressConfig = {

        options: {
            mode: 'gzip',
            pretty: true
        },

        base: {
            src: internals.statics.base.output + ".min.js",
            dest: internals.statics.base.output + ".min.js.gz"
        },

        summernote: {
            src: internals.statics.summernote.output + ".min.js",
            dest: internals.statics.summernote.output + ".min.js.gz"
        },

        "dashboard-libs": {
            src: internals.statics.dashboardLibs.output + ".min.js",
            dest: internals.statics.dashboardLibs.output + ".min.js.gz"
        },

        "dashboard-app": {
            src: internals.statics.dashboardApp.output + ".min.js",
            dest: internals.statics.dashboardApp.output + ".min.js.gz"
        },

        "dashboard-templates": {
            src: internals.templates.dashboard.output + ".min.js",
            dest: internals.templates.dashboard.output + ".min.js.gz"
        },

        "cartografia-libs": {
            src: internals.statics.cartografiaLibs.output + ".min.js",
            dest: internals.statics.cartografiaLibs.output + ".min.js.gz"
        },

        "cartografia-app": {
            src: internals.statics.cartografiaApp.output + ".min.js",
            dest: internals.statics.cartografiaApp.output + ".min.js.gz"
        },

        "cartografia-templates": {
            src: internals.templates.cartografia.output + ".min.js",
            dest: internals.templates.cartografia.output + ".min.js.gz"
        },
    };

    grunt.config("compress", compressConfig);

    // TASK: clean old files 

    var cleanConfig = {

        options: {
//            "no-write": true
        },

        "base": {
            src: Path.join(internals.staticsDir, "_js", "base*")
        },

        "base-uncompressed": {
            src: internals.statics.base.output + ".js"
        },

        "summernote": {
            src: Path.join(internals.staticsDir, "_js", "summernote*")
        },

        "summernote-uncompressed": {
            src: internals.statics.summernote.output + ".js"
        },

        "dashboard-libs": {
            src: Path.join(internals.staticsDir, "_js", "dashboard-libs-*")
        },

        "dashboard-libs-uncompressed": {
            src: internals.statics.dashboardLibs.output + ".js"
        },        

        "dashboard-app": {
            src: Path.join(internals.staticsDir, "_js", "dashboard-app-*")
        },

        "dashboard-app-uncompressed": {
            src: internals.statics.dashboardApp.output + ".js"
        },

        "dashboard-templates": {
            src: Path.join(internals.staticsDir, "_js", "dashboard-templates-*")
        },

        "dashboard-templates-uncompressed": {
            src: internals.templates.dashboard.output + ".js"
        },

        "cartografia-libs": {
            src: Path.join(internals.staticsDir, "_js", "cartografia-libs-*")
        },

        "cartografia-libs-uncompressed": {
            src: internals.statics.cartografiaLibs.output + ".js"
        },

        "cartografia-app": {
            src: Path.join(internals.staticsDir, "_js", "cartografia-app-*")
        },

        "cartografia-app-uncompressed": {
            src: internals.statics.cartografiaApp.output + ".js"
        },

        "cartografia-templates": {
            src: Path.join(internals.staticsDir, "_js", "cartografia-templates-*")
        },

        "cartografia-templates-uncompressed": {
            src: internals.templates.cartografia.output + ".js"
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
                "uglify:base",
                "clean:base-uncompressed",
                "compress:base",
                "update-bundles-info"   
            ]
        },

        "summernote": {
            files: internals.statics.summernote.input,
            tasks: [
                "clean:summernote",
                "concat:summernote",
                "uglify:summernote",
                "clean:summernote-uncompressed", 
                "compress:summernote",
                "update-bundles-info"
            ]
        },


        "dashboard-libs": {
            files: internals.statics.dashboardLibs.input,
            tasks: [
                "clean:dashboard-libs", 
                "concat:dashboard-libs",
                "uglify:dashboard-libs",
                "clean:dashboard-libs-uncompressed", 
                "compress:dashboard-libs",
                "update-bundles-info"
            ]
        },

        "dashboard-app": {
            files: internals.statics.dashboardApp.input,
            tasks: [
                "clean:dashboard-app",
                "concat:dashboard-app",
                "uglify:dashboard-app",
                "clean:dashboard-app-uncompressed", 
                "compress:dashboard-app",
                "update-bundles-info"
            ]
        },

        "dashboard-templates": {
            files: internals.templates.dashboard.input,
            tasks: [
                "clean:dashboard-templates",
                "nunjucks:dashboard-templates",
                "uglify:dashboard-templates",
                "clean:dashboard-templates-uncompressed", 
                "compress:dashboard-templates",
                "update-bundles-info"
            ]
        },


        "cartografia-libs": {
            files: internals.statics.cartografiaLibs.input,
            tasks: [
                "clean:cartografia-libs", 
                "concat:cartografia-libs",
                "uglify:cartografia-libs",
                "clean:cartografia-libs-uncompressed", 
                "compress:cartografia-libs",
                "update-bundles-info"
            ]
        },

        "cartografia-app": {
            files: internals.statics.cartografiaApp.input,
            tasks: [
                "clean:cartografia-app",
                "concat:cartografia-app",
                "uglify:cartografia-app",
                "clean:cartografia-app-uncompressed", 
                "compress:cartografia-app",
                "update-bundles-info"
            ]
        },

        "cartografia-templates": {
            files: internals.templates.cartografia.input,
            tasks: [
                "clean:cartografia-templates",
                "nunjucks:cartografia-templates",
                "uglify:cartografia-templates",
                "clean:cartografia-templates-uncompressed", 
                "compress:cartografia-templates",
                "update-bundles-info"
            ]
        },
    };


    grunt.config("watch", watchConfig);


    // TASK: update bundles.json with the filenames of the current bundles

    grunt.registerTask("update-bundles-info", function(){

        var obj = {}, filename = "./bundles.json";
        var paths;

        // bundles - base (jquery + bootstrap)
        paths = grunt.file.expand(Path.join(internals.staticsDir, "_js", "base*.min.js"));
        obj["base"] = Path.basename(paths[0]);

        // bundles - summernote
        paths = grunt.file.expand(Path.join(internals.staticsDir, "_js", "summernote*.min.js"));
        obj["summernote"] = Path.basename(paths[0]);

        // bundles - dashboard libs
        paths = grunt.file.expand(Path.join(internals.staticsDir, "_js", "dashboard-libs*.min.js"));
        obj["dashboard-libs"] = Path.basename(paths[0]);

        // bundles - dashboard app
        paths = grunt.file.expand(Path.join(internals.staticsDir, "_js", "dashboard-app*.min.js"));
        obj["dashboard-app"] = Path.basename(paths[0]);

        // bundles - dashboard templates
        paths = grunt.file.expand(Path.join(internals.staticsDir, "_js", "dashboard-templates*.min.js"));
        obj["dashboard-templates"] = Path.basename(paths[0]);


        // bundles - cartografia libs
        paths = grunt.file.expand(Path.join(internals.staticsDir, "_js", "cartografia-libs*.min.js"));
        obj["cartografia-libs"] = Path.basename(paths[0]);

        // bundles - cartografia app
        paths = grunt.file.expand(Path.join(internals.staticsDir, "_js", "cartografia-app*.min.js"));
        obj["cartografia-app"] = Path.basename(paths[0]);

        // bundles - cartografia templates
        paths = grunt.file.expand(Path.join(internals.staticsDir, "_js", "cartografia-templates*.min.js"));
        obj["cartografia-templates"] = Path.basename(paths[0]);

        grunt.file.write(filename, JSON.stringify(obj, null, 4));
    });


//    grunt.registerTask("concatenate', ['concat:base', "clean:old"]);
    grunt.registerTask('default', ['watch']);

    grunt.registerTask('build', [
        "clean:base",
        "concat:base",
        "uglify:base",
        "compress:base",
        "clean:base-uncompressed",

        "clean:summernote",
        "concat:summernote",
        "uglify:summernote",
        "compress:summernote",
        "clean:summernote-uncompressed",

        "clean:dashboard-libs",
        "concat:dashboard-libs",
        "uglify:dashboard-libs",
        "compress:dashboard-libs",
        "clean:dashboard-libs-uncompressed",

        "clean:dashboard-app",
        "concat:dashboard-app",
        "uglify:dashboard-app",
        "compress:dashboard-app",
        "clean:dashboard-app-uncompressed",
        
        "clean:dashboard-templates",
        "nunjucks:dashboard-templates",
        "uglify:dashboard-templates",
        "compress:dashboard-templates",
        "clean:dashboard-templates-uncompressed",

        "clean:cartografia-libs",
        "concat:cartografia-libs",
        "uglify:cartografia-libs",
        "compress:cartografia-libs",
        "clean:cartografia-libs-uncompressed",

        "clean:cartografia-app",
        "concat:cartografia-app",
        "uglify:cartografia-app",
        "compress:cartografia-app",
        "clean:cartografia-app-uncompressed",
        
        "clean:cartografia-templates",
        "nunjucks:cartografia-templates",
        "uglify:cartografia-templates",
        "compress:cartografia-templates",
        "clean:cartografia-templates-uncompressed",

        "update-bundles-info"
    ]);

};

