 module.exports = require("./lib");

// TODO: reinstall Hoek as soon once it is greater than 2.14.0, and remove this
var Hoek = require("hoek");
Hoek.transform = function (source, transform, options) {

    Hoek.assert(source === null || source === undefined || typeof source === 'object' || Array.isArray(source), 'Invalid source object: must be null, undefined, an object, or an array');

    if (Array.isArray(source)) {
        return source.map(function (obj) {

            return Hoek.transform(obj, transform, options);
        });
    }

    var result = {};
    var keys = Object.keys(transform);

    for (var k = 0, kl = keys.length; k < kl; ++k) {
        var key = keys[k];
        var path = key.split('.');
        var sourcePath = transform[key];

        Hoek.assert(typeof sourcePath === 'string', 'All mappings must be "." delineated strings');

        var segment;
        var res = result;

        while (path.length > 1) {
            segment = path.shift();
            if (!res[segment]) {
                res[segment] = {};
            }
            res = res[segment];
        }
        segment = path.shift();
        res[segment] = Hoek.reach(source, sourcePath, options);
    }

    return result;
};
