var Joi = require("joi");
var Hoek = require("hoek");
var Boom = require("boom");
var _s = require('underscore.string');
var _ = require('underscore');
var Config = require('config');
var ChangeCase = require('change-case-keys');
var Utils = require("./utils");

var internals = {};

exports.ids = function(value, options, next) {

    Utils.logCallsite(Hoek.callStack()[0]);

    value.ids = _s.trim(value.ids, ",").split(",");

    var idSchema = Joi.number().integer().min(0);

    // must be an objet like this: "{ ids: [3,5,7] }""
    var schema = Joi.object().keys({
        ids: Joi.array().unique().items(idSchema)
    });

    var validation = Joi.validate(value, schema, Config.get('hapi.joi'));

    if (validation.error) {
        return next(validation.error);
    }

    // at this point validation.value is on object of the form { ids: [3] } or { ids: [3,5] }; we want it to be
    // { ids: [{id: 3}, {id: 5}] }  (then we simply have pass the [{id: 3}, {id: 5}] to the postgres function)

    validation.value.ids = validation.value.ids.map(function(id) {
        return {
            "id": id
        };
    });

    return next(undefined, validation.value);
};

exports.payload = function(value, options, next, schema) {

    Utils.logCallsite(Hoek.callStack()[0]);

    if (_.isObject(value) && !_.isArray(value)) {
        value = [value];
    }

    // validate the elements of the array using the given schema
    var validation = Joi.validate(value, Joi.array().items(schema), Config.get('hapi.joi'));

    if (validation.error) {
        return next(validation.error);
    }

    // validateIds was executed before this one; the ids param (if defined) is now an array of objects like this: 
    // { ids: [{ id: 5}, { id: 7}] }
    var ids = options.context.params.ids;

//    console.log("confirm that this is an array of objects: ", ids);

    // if the ids param is defined, make sure that the ids in the param and the ids in the payload are consistent
    if (ids) {

        for (var i = 0, l = validation.value.length; i < l; i++) {
            // the id in the URL param and in the payload must be equal and in the same order

            if (ids[i].id !== validation.value[i].id) {
                return next(Boom.conflict("The ids given in the payload and in the URI must match (including the order)."));
            }
        }
    }

    // update the value that will be available in request.payload when the handler executes;
    // there are 2 differences: a) Joi has coerced the values to the type defined in the schemas;
    // b) the keys will be in underscored case (ready to be used by the postgres functions)
    return next(undefined, ChangeCase(validation.value, "underscored"));
};
