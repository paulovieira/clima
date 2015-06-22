var Path = require("path");
var Config = require("config");

exports.endpoints = [




    // STATIC ASSETS - the handler is given here directly (unlike the handlers for the base routes)
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
                // directory: { path: './data/uploads' }
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

    {
        path: '/dashboard3/{anyPath*}',
        method: 'GET',
        handler: {
            directory: { path: Path.join(Config.get("rootDir"), "lib/web/client/dashboard3") }
        },
        config: {
            auth: false,
        }
    },

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

    {
        path: '/editor/{anyPath*}',
        method: 'GET',
        handler: {
            directory: { path: Path.join(Config.get("rootDir"), "lib/web/client/editor") }
        },
        config: {
            auth: false,
        }
    }

];

