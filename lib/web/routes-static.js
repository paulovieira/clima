var Config = require("config");

exports.endpoints = [

    // STATIC ASSETS - the handler is given here directly (unlike the handlers for the base routes)
    {
        method: 'GET',
        path: '/common/{anyPath*}',
        config: {
            handler: {
                directory: { path: Config.get("staticsDir") }
            },
            auth: false,
        }
    },

    {
        method: 'GET',
        path: '/uploads/{anyPath*}',
        config: {
            handler: {
                directory: { path: './data/uploads' }
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
    //     path: '/dashboard3/{anyPath*}',
    //     handler: {
    //         directory: { path: './client/dashboard3' }
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
    //     method: 'GET',
    //     path: '/editor/{anyPath*}',
    //     handler: {
    //         directory: { path: './client/editor' }
    //     },
    //     config: {
    //         auth: false,
    //     }
    // }

];

