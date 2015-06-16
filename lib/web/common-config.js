var Validate = require("../common/validate");
var Pre = require("../common/prerequisites");

exports.config = {

    validate: {
        params: Validate.lang
    },
    
    pre: [
    	[Pre.abortIfInvalidLang],
    	[Pre.readAllTexts],
    	[Pre.prepareTextsForView]
    ]
};
