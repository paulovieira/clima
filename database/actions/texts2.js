// Prepare yourself, this is where the dirty stuff lives!
// access the database to interact with the data

var Hoek = require("hoek");
var Boom = require("boom");
var Db = require("..");
var Utils = require("../../lib/common/utils");


var internals = {

    transformMap: {

        // a) properties to be maintained
        "id": "id",
        "tags": "tags",
        "contents": "contents",
        "lastUpdated": "last_updated",

        // b) new properties (move properties from the nested object to the top object)
        // NOTE: this is used to make the server-side templates lighter
        //          "pt": "contents.pt",
        //          "en": "contents.en",

        // c) changed properties (some fields from authorData, such as pwHash, will be deleted)

        // the changeCaseKeys is only changinf the 1st level keys
        "authorData.id": "author_data.id",
        "authorData.firstName": "author_data.first_name",
        "authorData.lastName": "author_data.last_name",
        "authorData.email": "author_data.email",

        // d) deleted properties: "contentsDesc", "authorId", "active"
    },


};


module.exports = function(options){

    var seneca = this;


    seneca.add("role:texts2, cmd:readAll", function actionTextReadAll(args, done){

        Utils.logCallsite(Hoek.callStack()[0]);

        Db.func('texts_read')
            .then(function(data) {

                return done(null, Hoek.transform(data, internals.transformMap));
            })
            .catch(function(err) {

                return done(err.isBoom ? err : Boom.badImplementation(null, err));
            });
    });


    seneca.add("role:texts2, cmd:read", function actionTextRead(args, done){

        Utils.logCallsite(Hoek.callStack()[0]);

        Db.func('texts_read', JSON.stringify(args.ids))
            .then(function(data) {

                if (data.length === 0) {
                    throw Boom.notFound("The resource does not exist.");
                }

                return done(null, Hoek.transform(data, internals.transformMap));
            })
            .catch(function(err) {

                return done(err.isBoom ? err : Boom.badImplementation(null, err));
            });

    });


    seneca.add("role:texts2, cmd:create", function actionTextCreate(args, done){

        Utils.logCallsite(Hoek.callStack()[0]);

        // 1) create the resources with the payload data
        Db.func('texts_create', JSON.stringify(args.payload))

            // 2) read the created resources (to obtain the joined data)
            .then(function(createdData) {

                if (createdData.length === 0) {
                    throw Boom.badRequest("The resource could not be created.");
                }

                var createdIds = createdData.map(function(obj){ 
                    return { id: obj.id }; 
                });

                return Db.func("texts_read", JSON.stringify(createdIds));
            })

            // 3) apply the object transform and reply
            .then(function(data){

                if (data.length === 0) {
                    throw Boom.notFound("The resource does not exist.");
                }

                return done(null, Hoek.transform(data, internals.transformMap));
            })
            .catch(function(err) {

                return done(err.isBoom ? err : Boom.badImplementation(null, err));
            });
    });


    seneca.add("role:texts2, cmd:update", function actionTextUpdate(args, done){

        Utils.logCallsite(Hoek.callStack()[0]);

        // 1) read the resources to be updated (to verify that they exist)
        Db.func('texts_read', JSON.stringify(args.ids))

            // 2) update the resources with the payload data
            .then(function(data) {

                if (data.length === 0) {
                    throw Boom.notFound("The resource does not exist.");
                }

                // TODO: verify that data.length === args.ids.length

                return Db.func("texts_update", JSON.stringify(args.payload))
            })

            // 3) read again the updated resources (to obtain the joined data)
            .then(function(updatedData) {

                if (updatedData.length === 0) {
                    throw Boom.badRequest("The resource could not be updated.");
                }

                var updatedIds = updatedData.map(function(obj){ 
                    return { id: obj.id }; 
                });

                return Db.func("texts_read", JSON.stringify(updatedIds));
            })

            // 4) apply the object transform and reply
            .then(function(data){

                if (data.length === 0) {
                    throw Boom.notFound("The resource does not exist.");
                }

                return done(null, Hoek.transform(data, internals.transformMap));
            })
            .catch(function(err) {

                return done(err.isBoom ? err : Boom.badImplementation(null, err));
            });
    });


    seneca.add("role:texts2, cmd:delete", function actionTextDelete(args, done){

        Utils.logCallsite(Hoek.callStack()[0]);

        Db.func('texts_delete', JSON.stringify(args.ids))
            .then(function(data) {

                if (data.length === 0) {
                    throw Boom.notFound("The resource does not existx.");
                }

                return done(null, data);
            })
            .catch(function(err) {

                return done(err.isBoom ? err : Boom.badImplementation(null, err));
            });
    });
};
