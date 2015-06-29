var Path = require("path");
var Nunjucks = require('hapi-nunjucks');

var internals = {

    // absolute paths
    rootDir:      Path.resolve(__dirname, ".."),
    viewsDir:     Path.resolve(__dirname, "..", "lib/web/views"),
    dbActionsDir: Path.resolve(__dirname, "..", "database/actions"),
//    tilemillDir:       process.env.TILEMILL_PATH,
    tilemillFilesDir:  process.env.TILEMILL_FILES_PATH,

    // relative paths
    uploadsRelativeDir: "/data/uploads/public/",
    uploadsWebPath:     "/uploads/public/"
};


Nunjucks.configure(internals.viewsDir, {
    watch: false
    //    autoescape: true 
});

Nunjucks.addGlobal("lang", "pt");

Nunjucks.addFilter('stringify', function(str) {
    return JSON.stringify(str);
});


module.exports = {

    host: "localhost",
    port: 3000,
    //debugEndpoint: "/debug/consol",  // endpoint to be used in the TV module

    publicUri: "http://clima.dev",  // the domain name
    publicPort: 3000,  // probably 80

    // the default language is the first in the array below
    allowedLanguages: ["pt", "en"],

    rootDir: internals.rootDir,
    viewsDir: internals.viewsDir,
    actionsDir: {
        db: internals.dbActionsDir,
    },
    uploadsDir: {
        relative: internals.uploadsRelativeDir,
        webPath: internals.uploadsWebPath  // logical path (to be used in the urls)
    },
    tilemillFilesDir: internals.tilemillFilesDir,
    tilemillDir:      internals.tilemillDir,


    hapi: {

        // options for the Hapi.Server object (to be used in the main index.js)
        server: {
            connections: {
                router: {
                    isCaseSensitive: false,
                    stripTrailingSlash: true
                }            
            }
        },

        // options for the views (to be used in the main index.js)
        views: {
            path: internals.viewsDir,
            allowAbsolutePaths: true,
            engines: {
                "html": Nunjucks
            },
        },

        auth: {
            mode: "try"
        },



        // documentation: https://github.com/hapijs/joi#validatevalue-schema-options-callback
        joi: {
            abortEarly: false,  // returns all the errors found (does not stop on the first error)
            allowUnknown: true, // allows object to contain unknown keys (they can be deleted or not - see the stripUnknown options)
            stripUnknown: false,  // delete unknown keys
            convert: true
    /*


            convert: ...
            skipFunctions: ...
            stripUnknown: ...
            language: ...
            presence: ...
            context: ...
    */
        },

    },

    apiPrefix: {
        v1: "/api/v1"
    },

    email: {
        // should be redefined in some other configuration file (that should be present in .gitignore)
        mandrill: {
            host: "smtp.mandrillapp.com",
            port: 587,
            smtpUsername: "x@y.com",
            apiKey: "123456789"
        },

        fromEmail: "paulovieira@gmail.com",
        fromName: "CLIMA-MADEIRA",

        subject: "Password recovery",
        body: "To recover your password, please click the following link: "
    },

    db: {

        // should be redefined in some other configuration file (that should be present in .gitignore)
        postgres: {
            host: "127.0.0.1",
            database: "db_name",
            username: "db_username",
            password: "db_password",

            getConnectionString: function(){
                return "postgres://" +
                        this.username + ":" +
                        this.password + "@" +
                        this.host + "/" +
                        this.database;
            }
        },
    }



};
