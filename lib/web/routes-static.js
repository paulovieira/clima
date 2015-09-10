var Path = require("path");
var Config = require("config");
//var Pre = require("../common/prerequisites");

exports.endpoints = [




    // STATIC ASSETS - the handler is given here directly (unlike the handlers for the base routes)
    {
        path: '/static/{anyPath*}',
        method: 'GET',
        config: {
            handler: {
                directory: { 
                    path: Path.join(Config.get("rootDir"), "lib/web/client/static"),
                    index: false,
                    listing: false,
                    showHidden: false
                }
            },
            auth: false

        }
    },


    // PAGE EDITOR ASSETS (usig the summernote lib)
    {
        path: '/page-editor/{anyPath*}',
        method: 'GET',
        config: {
            handler: {
                directory: { 
                    path: Path.join(Config.get("rootDir"), "lib/web/client/page-editor"),
                    index: false,
                    listing: false,
                    showHidden: false
                }
            },
            auth: false

        }
    },


    // FAVICON
    {
        path: '/favicon.ico',
        method: 'GET',
        config: {
            handler: {
                file: Path.join(Config.get("rootDir"), 'lib/web/client/static/_images/favicon.ico')
            },

            auth: false
        }
    },

    // is this necessary?

    // {
    //     path: '/{param}/favicon.ico',
    //     method: 'GET',
    //     config: {
    //         handler: {
    //             file: Path.join(Config.get("rootDir"), 'lib/web/client/static/_images/favicon.ico')
    //         },

    //         auth: false
    //     }
    // },


    // old route - to be removed (in the html templates "/common/..."" should be replaced  with "/stats/..."")
    {
        path: '/common/{anyPath*}',
        method: 'GET',
        config: {
            handler: {
                directory: { path: Path.join(Config.get("rootDir"), "lib/web/client/static") }
            },
            auth: false,
        }
    },

    {
        path: '/uploads/{anyPath*}',
        method: 'GET',
        config: {
            handler: {
                directory: { path: Path.join(Config.get("rootDir"), "data/uploads") }
            },
            auth: false,
        }
    },



    // {
    //     method: 'GET',
    //     path: '/dashboard/{anyPath*}',
    //     handler: {
    //         directory: { path: './client/dashboard' }
    //     },
    //     config: {
    //         auth: false,
    //     }
    // },

    // {
    //     method: 'GET',
    //     path: '/dashboard2/{anyPath*}',
    //     handler: {
    //         directory: { path: './client/dashboard2' }
    //     },
    //     config: {
    //         auth: false,
    //     }
    // },


    // {
    //     method: 'GET',
    //     path: '/ferramenta/{anyPath*}',
    //     handler: {
    //         directory: { path: './client/ferramenta' }
    //     },
    //     config: {
    //         auth: false,
    //     }
    // },

    // {
    //     path: '/editor/{anyPath*}',
    //     method: 'GET',
    //     handler: {
    //         directory: { path: Path.join(Config.get("rootDir"), "lib/web/client/editor") }
    //     },
    //     config: {
    //         auth: false,
    //     }
    // }

];

