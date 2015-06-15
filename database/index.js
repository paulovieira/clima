var Fs = require("fs");
var Path = require("path");
var pgpLib = require('pg-promise');
var PgMonitor = require("pg-monitor");
var Config = require("config");
var Q = require("q");

var pgpOptions = {
    promiseLib: Q
}

PgMonitor.attach(pgpOptions, null, true);

var pgp = pgpLib(pgpOptions); 


var connectionOptions = {
    host: Config.get("db.postgres.host"),
    port: 5432,
    user: Config.get("db.postgres.username"),
    password: Config.get("db.postgres.password"),
    database: Config.get("db.postgres.database"),
    //pgFormatting: true
};

// db will be the exported object
module.exports = pgp(connectionOptions);

module.exports.queryResult = {
    one: 1,     // single-row result is expected;
    many: 2,    // multi-row result is expected;
    none: 4,    // no rows expected;
    any: 6      // (default) = many|none = any result.
};

module.exports.as = pgp.as;

module.exports.end = function(){
    pgp.end();
    console.log("Released all connections. Goodbye!");
};

// load seneca actions (database-related)
module.exports.loadActions = function(senecaInstance){

    // we assume all modules in database/actions export a seneca action
    var actionsDir = Path.join(Config.get("rootDir"), "database/actions");
    var filenames = Fs.readdirSync(actionsDir);

    filenames.forEach(function(name){
        senecaInstance.use(Path.join(actionsDir, name));
    });

};
