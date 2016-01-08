var Path = require("path");
var Fs = require("fs");
var Nunjucks = require('hapi-nunjucks');

// note: when this file is first read, the end variables TILEMILL_FILES_DIR and NODE_ENV
// are defined for sure (see the main index.js)
var internals = {

    // absolute paths
    rootDir:      Path.resolve(__dirname, ".."),
    viewsDir:     Path.resolve(__dirname, "..", "lib/web/views"),
    dbActionsDir: Path.resolve(__dirname, "..", "database/actions"),
//    tilemillFilesDir:  process.env.TILEMILL_FILES_DIR,

    // relative paths
    uploadsRelativeDir: "/data/uploads/public/",
    uploadsWebPath:     "/uploads/public/",

    env:process.env.NODE_ENV 
};

internals.bundles = JSON.parse(Fs.readFileSync(Path.join(internals.rootDir, "bundles.json"), "utf8"));





module.exports = {

    host: "localhost",
    port: 3000,
    //debugEndpoint: "/debug/consol",  // endpoint to be used in the TV module

    publicUri: "localhost",  // host
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
//    tilemillFilesDir: internals.tilemillFilesDir,
    
    bundles: internals.bundles,

    hapi: {

        // options for the Hapi.Server object (to be used in the main index.js)

        // server: {
        //     connections: {
        //         router: {
        //             isCaseSensitive: false,
        //             stripTrailingSlash: true
        //         }            
        //     }
        // },

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
            abortEarly: true,  // returns all the errors found (does not stop on the first error)
            stripUnknown: true,  // delete unknown keys; this means that only the keys that are explicitely stated in the schema will be present in request.payload and request.query when the handler executes;
            convert: true
    /*

            allowUnknown: false, // allows object to contain unknown keys; note that is stipUnknown option is used, this becomes obsolete (because all unknown keys will be removed before the check for unknown keys is done)

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
            port: 5432,
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
    },

    tilemill: {
        files: Path.join(process.env.HOME, "tilemill-files"),
        port: 20009,
        tilePort: 20008,
        coreUrl: "localhost",
        tileUrl: "localhost",
        updates: 0,
        delay: 2  // tilemill will start only after n seconds
    }

};

