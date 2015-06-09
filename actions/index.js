var Texts = require("./texts");

var internals = {};

exports.addToServer = function(server){
    server.seneca.use(Texts);
};