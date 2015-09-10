(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["files/templates/files-delete-modal.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"modal-header\">\n    <h4 class=\"modal-title\">Delete confirmation</h4>\n</div>\n\n\n<div class=\"modal-body\">\nAre you sure you want to delete file # ";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "id"), env.opts.autoescape);
output += "?\n</div>\n\n<div class=\"modal-footer\">\n    <button type=\"button\" class=\"btn btn-danger js-modal-delete\">Yes</button>\n    <button type=\"button\" class=\"btn btn-default js-modal-cancel\">Cancel</button>\n\n\n    <div id=\"message-status\" style=\"margin-top: 35px;\"></div>\n    <div id=\"\" style=\"margin-top: 10px;\">\n        <h5 id=\"message-links\"></h5>\n    </div>\n</div>\n\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["files/templates/files-edit-modal.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"modal-header\">\n    <h4 class=\"modal-title\">Edit file #";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "id"), env.opts.autoescape);
output += "</h4>\n</div>\n\n\n<div class=\"modal-body\">\n    <form>\n\n        <div class=\"form-group\">\n            <label for=\"js-edit-files-tags\">Tags</label>\n            <input type=\"text\" id=\"js-edit-files-tags\" class=\"form-control\" name=\"edit-files-tags\" value=\"";
output += runtime.suppressValue(env.getFilter("join").call(context, runtime.contextOrFrameLookup(context, frame, "tags"),", "), env.opts.autoescape);
output += "\">\n        </div>\n\n        <div class=\"form-group\">\n            <label for=\"js-edit-name\">Name</label>\n            <input type=\"text\" class=\"form-control\" value=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "name"), env.opts.autoescape);
output += "\" disabled>\n        </div>\n\n        <div class=\"form-group\">\n            <label>Path</label>\n            <input type=\"text\" class=\"form-control\" value=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "webPath"), env.opts.autoescape);
output += "\" disabled>\n        </div>\n        <div class=\"form-group\">\n            <label>id</label>\n            <input type=\"text\" class=\"form-control\" value=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "id"), env.opts.autoescape);
output += "\" disabled>\n        </div>\n\n        <div class=\"form-group\">\n            <label>Uploaded at</label>\n            <input type=\"text\" class=\"form-control\" value=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "uploadedAt"), env.opts.autoescape);
output += "\" disabled>\n        </div>\n\n        <div class=\"form-group\">\n            <label>Owner</label>\n            <input type=\"text\" class=\"form-control\" value=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "ownerData")),"firstName", env.opts.autoescape), env.opts.autoescape);
output += " ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "ownerData")),"lastName", env.opts.autoescape), env.opts.autoescape);
output += "\" disabled>\n        </div>\n    </form>\n</div>\n\n<div class=\"modal-footer\">\n    <button type=\"button\" class=\"btn btn-primary js-modal-save\">Gravar</button>\n    <button type=\"button\" class=\"btn btn-default js-modal-cancel\">Cancelar</button>\n\n    <div id=\"message-status\" style=\"margin-top: 35px;\"></div>\n    <div id=\"\" style=\"margin-top: 10px;\">\n        <h5 id=\"message-links\"></h5>\n    </div>\n</div>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["files/templates/files-new.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"row\">\n    <div class=\"col-sm-10 col-sm-offset-1\" style=\"padding-top: 10px;\">\n\n\n<!--         <form method=\"post\" action=\"/api/files\" enctype=\"multipart/form-data\"> -->\n\t\t<form enctype=\"multipart/form-data\">\n\n\t\t\t <div class=\"form-group\">\n                 <label for=\"new_file\" style=\"margin-top: 15px;\">New file</label> \n\t\t\t\t<input id=\"new_file\" name=\"new_file\" type=\"file\" multiple=false class=\"file\">\n\n                <label for=\"new-file-tags\" style=\"margin-top: 30px;\">Tags (use a comma to separate)</label>\n                <input type=\"text\" id=\"new-file-tags\" class=\"form-control\" name=\"new-file-tags\">\n\t\t\t</div>\n\n            <hr>\n";
output += "\n        </form>\n\n\n    </div>\n</div>\n\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["files/templates/files-row.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<td>";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "id"), env.opts.autoescape);
output += "</td>\n\n<td>\n    ";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "name"), env.opts.autoescape);
output += "\n</td>\n\n<td>\n\t";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "webPath"), env.opts.autoescape);
output += "\n</td>\n\n<td>\n\t";
output += runtime.suppressValue(env.getFilter("join").call(context, runtime.contextOrFrameLookup(context, frame, "tags"),", "), env.opts.autoescape);
output += "\n</td>\n\n<td>\n\t";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "uploadedAt"), env.opts.autoescape);
output += "\n</td>\n";
output += "\n<td class=\"text-right\">\n    <button class=\"btn btn-primary btn-xs js-edit\"><span class=\"glyphicon glyphicon-pencil\"></span>\n    </button>\n    <button class=\"btn btn-danger btn-xs js-delete\"><span class=\"glyphicon glyphicon-trash\"></span>\n    </button>\n</td>\n\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["files/templates/files-tab.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<ul class=\"nav nav-tabs\">\n    <li role=\"presentation\" class=\"active\">\n        <a href=\"#\" class=\"js-dashboard-sep\" data-tab-separator=\"files-all\">All files</a>\n    </li>\n    <li role=\"presentation\">\n        <a href=\"#\" class=\"js-dashboard-sep\" data-tab-separator=\"new-file\">Upload new file</a>\n    </li>\n    <li role=\"presentation\">\n        <a href=\"#\" class=\"js-dashboard-sep\" data-tab-separator=\"new-shape\">Upload new shape/raster</a>\n    </li>\n</ul>\n\n<div id=\"files-region\"></div>";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["files/templates/files-table.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"xtable-responsive\">\n    <table class=\"table table-striped table-condensed table-dashboard\">\n\n        <thead>\n            <tr>\n            \n                <th style=\"width: 5%\">id</th>\n                <th style=\"width: 23%\">Name</th>\n                <th style=\"width: 20%\">Path</th>\n                <th style=\"width: 20%\">Tags</th>\n                <th style=\"width: 18%\">Uploaded At</th>\n";
output += "\n                <th style=\"width: 10%\"></th>\n            </tr>\n        </thead>\n\n        <tbody>\n        </tbody>\n\n    </table>\n</div>\n\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["files/templates/shapes-new.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"row\">\n    <div class=\"col-sm-10 col-sm-offset-1\" style=\"padding-top: 10px;\">\n\n\n        <p>Create a .zip archive with a shape or raster file and upload that zip file. Only 1 shape/raster per zip is allowed.</p>\n\n        <div class=\"radio\">\n          <label>\n            <input type=\"radio\" name=\"new-shape-or-raster\"  value=\"shape\" checked>\n            Shape\n          </label>\n        </div>\n        <div class=\"radio\">\n          <label>\n            <input type=\"radio\" name=\"new-shape-or-raster\"  value=\"raster\">\n            Raster\n          </label>\n        </div>\n\n<!--         <form method=\"post\" action=\"/api/files\" enctype=\"multipart/form-data\"> -->\n\t\t<form enctype=\"multipart/form-data\">\n\n\t\t\t <div class=\"form-group\">\n                 <label for=\"new_file\" style=\"margin-top: 15px;\">New shape or raster</label> \n\t\t\t\t<input id=\"new_file\" name=\"new_file\" type=\"file\" multiple=false class=\"file\">\n\t\t\t</div>\n\n        </form>\n\n        <div class=\"row\">\n\n            <div class=\"col-sm-5\">\n                <div class=\"form-group\">\n                    <label for=\"js-new-shape-srid\">SRID (projection identifier)</label>\n                    <input type=\"text\" id=\"js-new-shape-srid\" class=\"form-control\" name=\"from-srid\" value=\"4326\">\n                </div>\n            </div>\n            <div class=\"col-sm-7\" style=\"font-size: small;\">\n            <b>Note:</b> you can check the SRID by opening the shapefile in QGIS or ArcGis. After the upload the geometries will be automatically converted to EPSG:4326 (if it isn't already).\n            </div>\n\n        </div>\n        <div class=\"row\">    \n            <div class=\"col-sm-12\">\n                <div class=\"form-group\">\n                    <label for=\"js-new-shape-desc\">Shape description</label>\n                    <textarea id=\"js-new-shape-desc\"  name=\"shape-description\" class=\"form-control\" rows=\"2\"></textarea>\n                </div>\n            </div>\n        </div>\n\n        <div class=\"row\">    \n            <div class=\"col-sm-12\">\n                <label for=\"new-file-tags\" style=\"margin-top: 0px;\">Tags (use a comma to separate)</label>\n                <input type=\"text\" id=\"new-file-tags\" class=\"form-control\" name=\"new-file-tags\">\n            </div>\n        </div>\n\n\n\n    </div>\n</div>\n\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["main-layout/templates/main-layout.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"row\" style=\"padding-top: 20px;\">\n\n    <div class=\"col-sm-3\" id=\"main-left-region\">\n    </div>\n\n    <div class=\"col-sm-9\" id=\"main-right-region\">\n    </div>\n\n</div>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["maps/templates/controls-delete-modal.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"modal-header\">\n    <h4 class=\"modal-title\">Delete confirmation</h4>\n</div>\n\n\n<div class=\"modal-body\">\n\n\t<p>Are you sure you want to delete this control?</p>\n";
output += "\n\n</div>\n\n<div class=\"modal-footer\">\n    <button type=\"button\" class=\"btn btn-danger js-modal-delete\">Yes</button>\n    <button type=\"button\" class=\"btn btn-default js-modal-cancel\">Cancel</button>\n\n\n    <div id=\"message-status\" style=\"margin-top: 35px;\"></div>\n    <div id=\"\" style=\"margin-top: 10px;\">\n        <h5 id=\"message-links\"></h5>\n    </div>\n</div>\n\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["maps/templates/controls-edit-modal.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"modal-header\">\n    <h4 class=\"modal-title\">Edit control #";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "id"), env.opts.autoescape);
output += "</h4>\n</div>\n\n\n<div class=\"modal-body\">\n\n    <form>\n\n        <div class=\"form-group\">\n            <label for=\"js-select-period\">Select the period</label>\n            <select id=\"js-select-period\" name=\"period\" class=\"form-control\">\n                <option value=\"none\"      ";
output += runtime.suppressValue((runtime.contextOrFrameLookup(context, frame, "period") == "none"?"selected":""), env.opts.autoescape);
output += "      >None</option>\n                <option value=\"reference\" ";
output += runtime.suppressValue((runtime.contextOrFrameLookup(context, frame, "period") == "reference"?"selected":""), env.opts.autoescape);
output += " >Reference</option>\n                <option value=\"short\"     ";
output += runtime.suppressValue((runtime.contextOrFrameLookup(context, frame, "period") == "short"?"selected":""), env.opts.autoescape);
output += "     >Short</option>\n                <option value=\"medium\"    ";
output += runtime.suppressValue((runtime.contextOrFrameLookup(context, frame, "period") == "medium"?"selected":""), env.opts.autoescape);
output += "    >Medium</option>\n                <option value=\"long\"      ";
output += runtime.suppressValue((runtime.contextOrFrameLookup(context, frame, "period") == "long"?"selected":""), env.opts.autoescape);
output += "      >Long</option>\n            </select>\n        </div>\n\n        <div class=\"form-group\">\n            <label for=\"js-select-play-btn\">Show play button in this control (<span class=\"glyphicon glyphicon-play\" aria-hidden=\"true\"></span>)</label>\n            <select id=\"js-select-play-btn\" name=\"showPlayButton\" class=\"form-control\">\n                <option value=\"false\" ";
output += runtime.suppressValue((runtime.contextOrFrameLookup(context, frame, "showPlayButton") == false?"selected":""), env.opts.autoescape);
output += " >No</option>\n                <option value=\"true\"  ";
output += runtime.suppressValue((runtime.contextOrFrameLookup(context, frame, "showPlayButton") == true?"selected":""), env.opts.autoescape);
output += " >Yes</option>\n            </select>\n        </div>\n\n\n        <h4>Data columns</h4>\n\n        <p>Choose the columns to be used for this control</p>\n\n        ";
frame = frame.push();
var t_3 = runtime.contextOrFrameLookup(context, frame, "selectedShapes");
if(t_3) {var t_2 = t_3.length;
for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("shapeObj", t_4);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\n\n        <strong>Shape #";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index", env.opts.autoescape), env.opts.autoescape);
output += "</strong> (code: ";
output += runtime.suppressValue(runtime.memberLookup((t_4),"code", env.opts.autoescape), env.opts.autoescape);
output += ")\n    \n        <div class=\"xtable-responsive\">\n            <table class=\"table table-condensedx table-hover table-dashboard\">\n\n                <thead>\n                    <tr>\n                        <th style=\"width: 10%\"></th>\n                        <th style=\"width: 30%\">Column name</th>\n                        <th style=\"width: 30%\">Column type</th>\n                        <th style=\"width: 30%\">Public name</th>\n                    </tr>\n                </thead>\n\n                <tbody>\n                    ";
frame = frame.push();
var t_7 = runtime.memberLookup((t_4),"attributesInfo", env.opts.autoescape);
if(t_7) {var t_6 = t_7.length;
for(var t_5=0; t_5 < t_7.length; t_5++) {
var t_8 = t_7[t_5];
frame.set("column", t_8);
frame.set("loop.index", t_5 + 1);
frame.set("loop.index0", t_5);
frame.set("loop.revindex", t_6 - t_5);
frame.set("loop.revindex0", t_6 - t_5 - 1);
frame.set("loop.first", t_5 === 0);
frame.set("loop.last", t_5 === t_6 - 1);
frame.set("loop.length", t_6);
output += "\n                        <tr class=\"js-shape-row\">\n\n                            <td>\n                                <input type=\"checkbox\" name=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"id", env.opts.autoescape), env.opts.autoescape);
output += "[";
output += runtime.suppressValue(runtime.memberLookup((t_8),"column_number", env.opts.autoescape), env.opts.autoescape);
output += "][isSelected]\" ";
output += runtime.suppressValue((runtime.memberLookup((t_8),"isSelected", env.opts.autoescape) == true?"checked":""), env.opts.autoescape);
output += " >\n                            </td>\n\n                            <td class=\"xjs-file-id\">\n                                ";
output += runtime.suppressValue(runtime.memberLookup((t_8),"column_name", env.opts.autoescape), env.opts.autoescape);
output += "\n                            </td>\n\n                            <td>\n                                ";
output += runtime.suppressValue(runtime.memberLookup((t_8),"data_type", env.opts.autoescape), env.opts.autoescape);
output += "\n                            </td>\n                            \n                            <td>\n                                <input type=\"text\" name=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"id", env.opts.autoescape), env.opts.autoescape);
output += "[";
output += runtime.suppressValue(runtime.memberLookup((t_8),"column_number", env.opts.autoescape), env.opts.autoescape);
output += "][publicName]\" value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_8),"publicName", env.opts.autoescape), env.opts.autoescape);
output += "\">\n                            </td>\n\n                        </tr>\n                    ";
;
}
}
frame = frame.pop();
output += "\n                </tbody>\n\n            </table>\n        </div>\n\n        <hr>\n\n        ";
;
}
}
frame = frame.pop();
output += "\n\n    </form>\n\n\n</div>\n\n<div class=\"modal-footer\">\n    <button type=\"button\" class=\"btn btn-info js-modal-apply\">Apply</button>\n    <button type=\"button\" class=\"btn btn-default js-modal-close\">Close</button>  \n\n    <div id=\"message-status\" style=\"margin-top: 35px;\"></div>\n    <div id=\"\" style=\"margin-top: 10px;\">\n        <h5 id=\"message-links\"></h5>\n    </div>\n</div>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["maps/templates/controls-row.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<td>\n\tControl #";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "id"), env.opts.autoescape);
output += "\n</td>\n\n";
output += "\n\n<td class=\"text-right\">\n    <button class=\"btn btn-primary btn-xs js-edit\"><span class=\"glyphicon glyphicon-pencil\"></span>\n    </button>\n    <button class=\"btn btn-danger btn-xs js-delete\"><span class=\"glyphicon glyphicon-trash\"></span>\n    </button>\n</td>\n\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["maps/templates/controls-table.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"xtable-responsive\">\n    <table class=\"table table-striped table-condensed table-dashboard\">\n\n        <thead>\n            <tr>\n            \n                <th style=\"width: 50%\"></th>\n\n";
output += "\n                <th style=\"width: 10%\"></th>\n            </tr>\n        </thead>\n\n        <tbody>\n        </tbody>\n\n    </table>\n\n\n</div>\n\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["maps/templates/legends-choose-attribute.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var t_1;
t_1 = "&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;";
frame.set("separator", t_1, true);
if(!frame.parent) {
context.setVariable("separator", t_1);
context.addExport("separator");
}
output += "\n\n<div class=\"row\">\n    <div class=\"col-sm-10 col-sm-offset-1\" style=\"padding-top: 20px;\">\n        <p style=\"margin-bottom: 0px;\"><b>Step 3:</b> choose the attribute</p>    \n        <span style=\"font-size: 90%;\">These are the attributes available in the selected shape</span>\n\n        ";
output += "\n        <div class=\"row\" style=\"margin-top: 20px;\">\n            <div class=\"col-sm-4\">\n                Attribute:\n            </div>\n            <div class=\"col-sm-4\">\n                Number of classes:\n            </div>\n            <div class=\"col-sm-4\">\n                Color scheme:\n            </div>\n        </div>\n\n\n        ";
output += "\n        <div class=\"row\" style=\"margin-top: 5px;\">\n            <div class=\"col-sm-4\">\n\n                <select class=\"form-control js-available-attributes\">\n                    <option value=\"\">&mdash;</option>\n\n                    ";
frame = frame.push();
var t_4 = runtime.contextOrFrameLookup(context, frame, "items");
if(t_4) {var t_3 = t_4.length;
for(var t_2=0; t_2 < t_4.length; t_2++) {
var t_5 = t_4[t_2];
frame.set("obj", t_5);
frame.set("loop.index", t_2 + 1);
frame.set("loop.index0", t_2);
frame.set("loop.revindex", t_3 - t_2);
frame.set("loop.revindex0", t_3 - t_2 - 1);
frame.set("loop.first", t_2 === 0);
frame.set("loop.last", t_2 === t_3 - 1);
frame.set("loop.length", t_3);
output += "\n                        <option value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_5),"column_name", env.opts.autoescape), env.opts.autoescape);
output += "\" >";
output += runtime.suppressValue(runtime.memberLookup((t_5),"column_name", env.opts.autoescape), env.opts.autoescape);
output += "  (";
output += runtime.suppressValue(runtime.memberLookup((t_5),"data_type", env.opts.autoescape), env.opts.autoescape);
output += ")</option>\n                    ";
;
}
}
frame = frame.pop();
output += "\n\n                </select>\n\n            </div>\n\n            <div class=\"col-sm-4\">\n\n                <select class=\"form-control js-number-classes\" disabled>\n                    <option value=\"0\">&mdash;</option>\n                    <option value=\"1\">1</option>\n                    <option value=\"2\">2</option>\n                    <option value=\"3\">3</option>\n                    <option value=\"4\">4</option>\n                    <option value=\"5\">5</option>\n                    <option value=\"6\">6</option>\n                    <option value=\"7\">7</option>\n                    <option value=\"8\">8</option>\n                    <option value=\"9\">9</option>\n                    <option value=\"10\">10</option>\n                    <option value=\"11\">11</option>\n                    <option value=\"12\">12</option>\n                </select>\n            </div>\n\n            <div class=\"col-sm-4\">\n\n                <select class=\"form-control js-color-scheme\"  disabled>\n                    <optgroup label=\"\">\n                        <option value=\"\">&mdash;</option>\n                    </optgroup>\n\n                    <optgroup label=\"Sequential (multi-hue)\">\n                        <option value=\"BuGn\"> BuGn (blue - green) </option>\n                        <option value=\"BuPu\"> BuPu (blue - purple) </option>\n                        <option value=\"GnBu\"> GnBu (green - blues </option>\n                        <option value=\"OrRd\"> OrRd (orange - red) </option>\n                        <option value=\"PuBu\"> PuBu (purple - blue) </option>\n                        <option value=\"PuBuGn\"> PuBuGn (purple - blue - green) </option>\n\n                        <option value=\"separator1\" disabled>";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "separator"), env.opts.autoescape);
output += "</option>\n\n                        <option value=\"PuRd\"> PuRd (purple - red) </option>\n                        <option value=\"RdPu\"> RdPu (red - purple) </option>\n                        <option value=\"YlGn\"> YlGn (yellow - green) </option>\n                        <option value=\"YlGnBu\"> YlGnBu (yellow - green - blue) </option>\n                        <option value=\"YlOrBr\"> YlOrBr (yellow - orange - brown) </option>\n                        <option value=\"YlOrRd\"> YlOrRd (yellow - orange - red) </option>\n\n                        <option value=\"empty1\"  disabled></option>\n                    </optgroup>\n\n                    <optgroup label=\"Sequential (single hue)\">\n                        <option value=\"Blues\"> Blues </option>\n                        <option value=\"Greens\"> Greens </option>\n                        <option value=\"Greys\"> Greys </option>\n\n                        <option value=\"separator2\" disabled>";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "separator"), env.opts.autoescape);
output += "</option>\n\n                        <option value=\"Oranges\"> Oranges </option>\n                        <option value=\"Purples\"> Purples </option>\n                        <option value=\"Reds\"> Reds </option>\n                       \n                        <option value=\"empty2\" disabled></option>               \n                    </optgroup>\n\n\n\n                    <optgroup label=\"Diverging\">\n                        <option value=\"BrBG\"> BrBG (brown - blue/green) </option>\n                        <option value=\"PiYG\"> PiYG (pink - green) </option>\n                        <option value=\"PRGn\"> PRGn (purple - green) </option>\n                        <option value=\"PuOr\"> PuOr (orange - purple) </option>\n                        <option value=\"RdBu\"> RdBu (red - blue) </option>\n                        <option value=\"RdGy\"> RdGy (red - gray) </option>\n                        <option value=\"RdYlBu\"> RdYlBu (red - yellow - blue) </option>\n                        <option value=\"RdYlGn\"> RdYlGn (red - yellow - green) </option>\n                        <option value=\"Spectral\"> Spectral </option>\n\n                        <option value=\"empty3\" disabled></option>\n                    </optgroup>\n\n                    <optgroup label=\"Qualitative\">\n                        <option value=\"Accent\"> Accent </option>\n                        <option value=\"Dark2\"> Dark2 </option>\n                        <option value=\"Paired\"> Paired </option>\n                        <option value=\"Pastel1\"> Pastel1 </option>\n                        <option value=\"Pastel2\"> Pastel2 </option>\n                        <option value=\"RdGy\"> RdGy </option>\n                        <option value=\"Set1\"> Set1 </option>\n                        <option value=\"Set2\"> Set2 </option>\n                        <option value=\"Set3\"> Set3 </option>\n                    </optgroup>\n                </select>\n                <span style=\"font-size: 90%;\">Taken from <a target=\"_blank\" href=\"http://colorbrewer2.org/\">colorbrewer2.org <span class=\"glyphicon glyphicon-new-window\" aria-hidden=\"true\"></span></a></span>\n\n            </div>\n        </div>\n\n    </div>\n</div>\n\n\n<div id=\"js-colors-region\" style=\"margin-top: 20px;\"></div>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["maps/templates/legends-choose-map.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "\n\n<div class=\"row\">\n    <div class=\"col-sm-6 col-sm-offset-1\" style=\"padding-top: 20px;\">\n\n        <p><b>Step 1:</b> choose a web map</p> \n\n        <select class=\"form-control js-all-maps\">\n            <option value=\"\">&mdash;</option>\n            ";
frame = frame.push();
var t_3 = runtime.contextOrFrameLookup(context, frame, "items");
if(t_3) {var t_2 = t_3.length;
for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("obj", t_4);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\n                <option value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"id", env.opts.autoescape), env.opts.autoescape);
output += "\" >";
output += runtime.suppressValue(runtime.memberLookup((t_4),"name", env.opts.autoescape), env.opts.autoescape);
output += "</option>\n            ";
;
}
}
frame = frame.pop();
output += "\n        </select>\n   \n    </div>\n\n    <div class=\"col-sm-5\">\n    </div>\n</div>\n\n<div id=\"choose-shape-region\"></div>\n\n\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["maps/templates/legends-choose-shape.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"row\">\n    <div class=\"col-sm-6 col-sm-offset-1\" style=\"padding-top: 20px;\">\n\n        <p style=\"margin-bottom: 0px;\"><b>Step 2:</b> choose shape </p>\n        <span style=\"font-size: 90%;\">These are the shapes that have been added to the selected web map</span>\n\n        <select style=\"margin-top: 10px;\" class=\"form-control js-available-shapes\">\n            <option value=\"\">&mdash;</option>\n            ";
frame = frame.push();
var t_3 = runtime.contextOrFrameLookup(context, frame, "items");
if(t_3) {var t_2 = t_3.length;
for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("obj", t_4);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\n                <option value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"tableName", env.opts.autoescape), env.opts.autoescape);
output += "\" >";
output += runtime.suppressValue(runtime.memberLookup((t_4),"tableName", env.opts.autoescape), env.opts.autoescape);
output += "</option>\n            ";
;
}
}
frame = frame.pop();
output += "\n        </select>\n\n    </div>\n    <div class=\"col-sm-5\">\n    </div>\n</div>\n\n<div id=\"choose-attribute-region\"></div>\n\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["maps/templates/legends-code.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
env.getTemplate("nunjucks-macros.html", false, "maps/templates/legends-code.html", function(t_2,t_1) {
if(t_2) { cb(t_2); return; }
t_1.getExported(function(t_3,t_1) {
if(t_3) { cb(t_3); return; }
context.setVariable("macros", t_1);
output += "\n";
var t_4;
t_4 = runtime.contextOrFrameLookup(context, frame, "countGeometries") - runtime.contextOrFrameLookup(context, frame, "count");
frame.set("numNullValues", t_4, true);
if(!frame.parent) {
context.setVariable("numNullValues", t_4);
context.addExport("numNullValues");
}
output += " \n\n\n\n<div class=\"row\" style=\"padding-left: 15px; padding-right: 15px;\">\n    <div class=\"col-sm-10 col-sm-offset-1\" style=\"border-style:solid; border-radius: px; border-width: 1px; border-color: rgb(228, 228, 228);   padding: 20px 40px; margin-bottom: 50px; \">\n\n        ";
if(runtime.contextOrFrameLookup(context, frame, "scale") != false) {
output += "\n\n        <p>\n            Copy-paste the following two blocks to the \n            <a target=\"_blank\" href=\"/pt/tilemill#/project/";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "mapId"), env.opts.autoescape);
output += "\">\n                ";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "mapName"), env.opts.autoescape);
output += " \n                <span class=\"glyphicon glyphicon-new-window\" aria-hidden=\"true\"></span>\n            </a> \n            map settings:\n        </p>\n\n\n        <div class=\"row\">\n        \n            <div class=\"col-sm-9\">\n                <p style=\"margin-top: 15px; margin-bottom: 0px; display: inline-block;\"><b>1) CartoCSS</b></p><span style=\"font-size: 90%;\">&nbsp; (paste at the bottom of the \"main-style.mss\" settings)</span>\n            </div>\n            <div class=\"col-sm-3\">\n                <button type=\"button\" class=\"pull-right btn btn-block btn-default js-select-code\" id=\"code-carto-0\">\n                    Select  &nbsp;\n                    <span class=\"glyphicon glyphicon-copy\"></span>\n                </button>\n            </div>\n\n            <div class=\"col-sm-12\">\n                <pre style=\"margin-top: 4px;\"><code id=\"js-carto-0\" class=\"language-css\">\n                    ";
output += runtime.suppressValue(env.getFilter("trim").call(context, (lineno = 34, colno = 40, runtime.callWrap(runtime.memberLookup((t_1),"getCartoCode", env.opts.autoescape), "macros[\"getCartoCo\"]", [runtime.contextOrFrameLookup(context, frame, "scale"),runtime.contextOrFrameLookup(context, frame, "tableName"),runtime.contextOrFrameLookup(context, frame, "columnName"),runtime.contextOrFrameLookup(context, frame, "geometryTypePrimitive"),runtime.contextOrFrameLookup(context, frame, "dataType")]))), env.opts.autoescape);
output += "\n                </code></pre>\n            </div>\n\n        </div>\n\n\n        ";
if(runtime.contextOrFrameLookup(context, frame, "numNullValues") > 0) {
output += "\n\n        <div class=\"row\">\n\n            <div class=\"col-sm-12\" style=\"margin-top: 20px;\">\n                <div class=\"alert alert-danger\">\n                    <b>Warning:</b> the shape has ";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "countGeometries"), env.opts.autoescape);
output += " geometries, so there ";
output += runtime.suppressValue((runtime.contextOrFrameLookup(context, frame, "numNullValues") == 1?"is":"are"), env.opts.autoescape);
output += " ";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "numNullValues"), env.opts.autoescape);
output += " entries in the \"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "columnName"), env.opts.autoescape);
output += "\" column with null values. The visualization of these entries has to handled separately. Add the following condition in the cartoCSS editor (\"main-style.mss\").\n                </div>\n            </div>\n\n            <div class=\"col-sm-9\">\n                <p style=\"margin-top: 15px; margin-bottom: 0px; \"><b>1b) CartoCSS</b></p>\n            </div>\n            <div class=\"col-sm-3\">\n\n                <button type=\"button\" class=\"pull-right btn btn-block btn-default js-select-code\" id=\"code-carto-1\">\n                    Select  &nbsp;\n                    <span class=\"glyphicon glyphicon-copy\"></span>\n                </button>\n            </div>\n\n            <div class=\"col-sm-12\">\n                <pre style=\"margin-top: 4px;\"><code id=\"js-carto-1\" class=\"language-css\">\n#";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "tableName"), env.opts.autoescape);
output += "[\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "columnName"), env.opts.autoescape);
output += "\" = null] {\n    // now use the correct cartoCSS properties to identify null values\n    marker-fill: black;  // or line-color, or polygon-fill, etc\n}\n\n                </code></pre>\n            </div>\n\n        </div>\n\n\n        ";
;
}
output += "\n\n\n\n        <div class=\"row\">\n\n            <div class=\"col-sm-12\">\n                <p style=\"margin-top: 15px; margin-bottom: 0px; display: inline-block;\"><b>2) HTML for the legend</b></p><span style=\"font-size: 90%;\">&nbsp; (paste in the \"Legends\" settings)</span>\n            </div>\n\n            <div class=\"col-sm-12\">\n                <div class=\"form-group\" style=\"margin-top: 15px; margin-bottom: 0;\">\n                   <label style=\"margin-bottom: 0;\">Legend style:</label>\n\n                   <div class=\"radio\" style=\"margin-top: 0;\">\n                     <label>\n                       <input type=\"radio\" name=\"legend-style\" value=\"horizontal\" ";
output += runtime.suppressValue((runtime.contextOrFrameLookup(context, frame, "legendStyle") == "horizontal"?"checked":""), env.opts.autoescape);
output += ">\n                       Horizontal\n                     </label>\n                   </div>\n                   <div class=\"radio\" style=\"margin-top: -10px;\">\n                     <label>\n                       <input type=\"radio\" name=\"legend-style\" value=\"vertical\" ";
output += runtime.suppressValue((runtime.contextOrFrameLookup(context, frame, "legendStyle") == "vertical"?"checked":""), env.opts.autoescape);
output += ">\n                       Vertical\n                     </label>\n                   </div>\n                </div>\n            </div>\n\n            <div style=\"margin-top: -10px;\" class=\"col-sm-offset-6 col-sm-3\">\n                <button type=\"button\" class=\"pull-right btn btn-block btn-default js-select-code\" id=\"code-html-preview\">\n                    Preview  &nbsp;\n                    <span class=\"glyphicon glyphicon glyphicon-eye-open\"></span>\n                </button>\n            </div>\n            <div style=\"margin-top: -10px;\" class=\"col-sm-3\">\n                <button type=\"button\" class=\"pull-right btn btn-block btn-default js-select-code\" id=\"code-html\">\n                    Select  &nbsp;\n                    <span class=\"glyphicon glyphicon-copy\"></span>\n                    </button>        \n            </div>\n\n            <div class=\"col-sm-12\">\n                <pre style=\"margin-top: 4px;\"><code class=\"language-markup\">\n                    ";
output += runtime.suppressValue(env.getFilter("escape").call(context, env.getFilter("trim").call(context, (lineno = 119, colno = 48, runtime.callWrap(runtime.memberLookup((t_1),"getDefaultLegendHtml", env.opts.autoescape), "macros[\"getDefault\"]", [runtime.contextOrFrameLookup(context, frame, "scale"),runtime.contextOrFrameLookup(context, frame, "mapName"),runtime.contextOrFrameLookup(context, frame, "legendStyle")])))), env.opts.autoescape);
output += "\n                </code></pre>\n            </div>\n\n        </div>\n\n\n \n\n        ";
;
}
output += "\n\n    </div>\n</div>\n";
cb(null, output);
})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["maps/templates/legends-colors.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
env.getTemplate("nunjucks-macros.html", false, "maps/templates/legends-colors.html", function(t_2,t_1) {
if(t_2) { cb(t_2); return; }
t_1.getExported(function(t_3,t_1) {
if(t_3) { cb(t_3); return; }
context.setVariable("macros", t_1);
output += "\n";
var t_4;
t_4 = runtime.contextOrFrameLookup(context, frame, "countGeometries") - runtime.contextOrFrameLookup(context, frame, "count");
frame.set("numNullValues", t_4, true);
if(!frame.parent) {
context.setVariable("numNullValues", t_4);
context.addExport("numNullValues");
}
output += " \n\n\n\n<div class=\"row\" style=\"padding-left: 15px; padding-right: 15px;\">\n    <div class=\"col-sm-10 col-sm-offset-1\" style=\"border-style:solid; border-radius: px; border-width: 1px; border-color: rgb(228, 228, 228);   padding: 20px 40px; margin-bottom: 50px; margin-top: 20px;\">\n\n        <p><b>Data overview:</b></p>\n        ";
if(runtime.contextOrFrameLookup(context, frame, "dataType") == "int" || runtime.contextOrFrameLookup(context, frame, "dataType") == "real") {
output += "\n\n        <ul style=\"margin-bottom: 10px; padding-left: 30px;\">\n            <li>count: ";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "count"), env.opts.autoescape);
output += " (number of not null values)</li>\n            <li>minimum value: ";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "min"), env.opts.autoescape);
output += "</li>\n            <li>maximum value: ";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "max"), env.opts.autoescape);
output += "</li>\n        </ul>\n\n        ";
;
}
else {
if(runtime.contextOrFrameLookup(context, frame, "dataType") == "char") {
output += "\n\n            ";
if(runtime.contextOrFrameLookup(context, frame, "distinctWords")) {
output += "\n\n            <ul style=\"margin-bottom: 10px; padding-left: 30px;\">\n                <li><b>Count:</b> ";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "count"), env.opts.autoescape);
output += " (number of not null values)</li>\n                <li><b>Distinct words:</b></li>\n                <ul>\n                    ";
frame = frame.push();
var t_7 = runtime.contextOrFrameLookup(context, frame, "distinctWords");
if(t_7) {var t_6 = t_7.length;
for(var t_5=0; t_5 < t_7.length; t_5++) {
var t_8 = t_7[t_5];
frame.set("word", t_8);
frame.set("loop.index", t_5 + 1);
frame.set("loop.index0", t_5);
frame.set("loop.revindex", t_6 - t_5);
frame.set("loop.revindex0", t_6 - t_5 - 1);
frame.set("loop.first", t_5 === 0);
frame.set("loop.last", t_5 === t_6 - 1);
frame.set("loop.length", t_6);
output += "\n                    <li>\n                        ";
if(t_8 == runtime.contextOrFrameLookup(context, frame, "undefined")) {
output += "\n                            <em style=\"color: gray;\">NULL</em>\n                        ";
;
}
else {
output += "\n                            ";
output += runtime.suppressValue(t_8, env.opts.autoescape);
output += "\n                        ";
;
}
output += "\n                        \n                    </li>\n                    ";
;
}
}
frame = frame.pop();
output += "                \n                </ul>\n            </ul>\n\n            ";
;
}
else {
output += "\n\n            <ul style=\"margin-bottom: 10px; padding-left: 30px;\">\n                <li><b>Count:</b> ";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "count"), env.opts.autoescape);
output += " (number of not null values)</li>\n                <li><b>Distinct words:</b> too many, sorry! (the column must have at most 12 distinct words to be used in a legend, because the color scales have at most 12 colors)</li>\n            </ul>\n\n            ";
;
}
output += "\n\n        ";
;
}
;
}
output += "\n\n\n\n        ";
if(runtime.contextOrFrameLookup(context, frame, "scale") != false) {
output += "\n\n        <p><b>Color classes:</b></p>\n\n        <div  style=\"padding-left: 15px;\">\n        <table class=\"table table-bordered\">\n\n            <thead>\n                <tr>\n                    <th  style=\"width: 25%\" class=\"text-center\">\n                        \n                    </th >\n                    <th  style=\"width: 25%\" class=\"text-center\">\n                        \n                    </th >\n\n                    <th  style=\"width: 30%\" class=\"text-center\">\n                        color\n                    </th>\n\n                    <th  style=\"width: 20%; padding: 4px 12px 4px 12px;\" class=\"text-center\">\n                        color (hex code)\n                    </th>\n\n                </tr>\n            </thead>\n\n            <tbody>\n\n                \n                ";
frame = frame.push();
var t_11 = runtime.contextOrFrameLookup(context, frame, "scale");
if(t_11) {var t_10 = t_11.length;
for(var t_9=0; t_9 < t_11.length; t_9++) {
var t_12 = t_11[t_9];
frame.set("class", t_12);
frame.set("loop.index", t_9 + 1);
frame.set("loop.index0", t_9);
frame.set("loop.revindex", t_10 - t_9);
frame.set("loop.revindex0", t_10 - t_9 - 1);
frame.set("loop.first", t_9 === 0);
frame.set("loop.last", t_9 === t_10 - 1);
frame.set("loop.length", t_10);
output += "\n\n                <tr>\n                    <td class=\"text-center\">\n                        \n                        <div class=\"form-group\" style=\"margin-bottom: 0;\">\n                            <input type=\"text\" id=\"left-extreme-";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index", env.opts.autoescape), env.opts.autoescape);
output += "\" class=\"form-control js-classes-left-extreme\" value=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_12),"valueClass", env.opts.autoescape)),0, env.opts.autoescape), env.opts.autoescape);
output += "\">\n                        </div>\n\n                    </td>\n\n                    <td class=\"text-center\">\n\n                        <div class=\"form-group\" style=\"margin-bottom: 0;\">\n                            <input type=\"text\" id=\"right-extreme-";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index", env.opts.autoescape), env.opts.autoescape);
output += "\" class=\"form-control js-classes-right-extreme\" value=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_12),"valueClass", env.opts.autoescape)),1, env.opts.autoescape), env.opts.autoescape);
output += "\">\n                        </div>\n\n                    </td>\n\n                    <td class=\"text-center\" style=\"background-color: ";
output += runtime.suppressValue(runtime.memberLookup((t_12),"colorHex", env.opts.autoescape), env.opts.autoescape);
output += "; border: solid 1px rgb(215, 215, 215);\">\n                        &nbsp;\n                    </td>\n\n                    <td class=\"text-center\">\n\n                        <div class=\"form-group\" style=\"margin-bottom: 0;\">\n                            <input type=\"text\" class=\"form-control my-color-picker\" value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_12),"colorHex", env.opts.autoescape), env.opts.autoescape);
output += "\">\n                        </div>\n\n                        ";
output += "\n                    </td>\n\n\n                </tr>\n\n                ";
;
}
}
frame = frame.pop();
output += "\n\n            </tbody>\n\n        </table>\n        </div>\n\n        <p><b>Color adjustments:</b></p>\n\n        <div style=\"padding-left: 15px;\" class=\"checkbox\">\n          <label>\n            <input type=\"checkbox\" value=\"\" id=\"js-invert-colors\" ";
output += runtime.suppressValue((runtime.contextOrFrameLookup(context, frame, "invertColors")?"checked":""), env.opts.autoescape);
output += ">\n            Invert order\n          </label>\n        </div>\n\n        <div style=\"padding-left: 15px;\">\n            <p style=\"display: inline-block; margin-right: 10px;\">Lightness:</p>\n            <div  class=\"btn-group\" role=\"group\">\n                <button type=\"button\" class=\"btn btn-default\" id=\"js-darken-colors\">Darker</button>\n                <button type=\"button\" class=\"btn btn-default\" id=\"js-brighten-colors\">Brigther</button>\n            </div>\n        </div>\n        \n        <div style=\"padding-left: 15px; margin-top: 10px;\">\n            <p style=\"display: inline-block; margin-right: 6px;\">Saturation:</p>\n            <div class=\"btn-group\" role=\"group\">\n                <button type=\"button\" class=\"btn btn-default\" id=\"js-desaturate-colors\">Desaturate</button>\n                <button type=\"button\" class=\"btn btn-default\" id=\"js-saturate-colors\">Saturate</button>\n            </div>   \n        </div>\n\n        <hr>\n \n\n        ";
;
}
output += "\n\n    </div>\n</div>\n\n<div id=\"code-region\"></div>\n";
cb(null, output);
})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["maps/templates/legends-no-available-attributes.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"row\">\n    <div class=\"col-sm-10 col-sm-offset-1\" style=\"padding-top: 20px;\">\n        <p>This shape doesn't have any numeric attributes. There's nothing to do here!</p>\n    </div>\n</div>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["maps/templates/legends-no-available-shapes.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"row\">\n    <div class=\"col-sm-10 col-sm-offset-1\" style=\"padding-top: 20px;\">\n        <p>This map doesn't have any shapes yet! </p>\n        <p>Use the \"Layers\" menu in the TileMill interface (bottom left corner, last button).</p>\n    </div>\n</div>";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["maps/templates/legends-preview-modal.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
env.getTemplate("nunjucks-macros.html", false, "maps/templates/legends-preview-modal.html", function(t_2,t_1) {
if(t_2) { cb(t_2); return; }
t_1.getExported(function(t_3,t_1) {
if(t_3) { cb(t_3); return; }
context.setVariable("macros", t_1);
output += "\n\n<div class=\"modal-header\">\n    <h4 class=\"modal-title\">Preview legend for map ";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "mapName"), env.opts.autoescape);
output += "</h4>\n</div>\n\n<div class=\"modal-body\">\n\t<div class=\"row\">\n\t\t<div style=\"margin-top: 40px; margin-bottom: 40px; border: 1px solid;\" class=\"col-sm-offset-3 col-sm-6\" >\n\n\t\t\t";
output += runtime.suppressValue((lineno = 10, colno = 31, runtime.callWrap(runtime.memberLookup((t_1),"getDefaultLegendHtml", env.opts.autoescape), "macros[\"getDefault\"]", [runtime.contextOrFrameLookup(context, frame, "scale"),runtime.contextOrFrameLookup(context, frame, "mapName"),runtime.contextOrFrameLookup(context, frame, "legendStyle")])), env.opts.autoescape);
output += "\n\n\t\t</div>\t\n\t</div>\n</div>\n\n<div class=\"modal-footer\">\n    <button type=\"button\" class=\"btn btn-default js-modal-cancel\">Close</button>\n</div>\n";
cb(null, output);
})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["maps/templates/map-menu.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "\n<div class=\"row\" style=\"margin-top: 40px;\">\n    <div class=\"col-sm-6 col-sm-offset-3\">\n\n        <ul class=\"list-group map-groups\" id=\"main\">\n\n\n";
output += "\n\n\n\t\t\t\t            <li class=\"list-group-item map-elems-group\" style=\"margin-bottom: 15px;\">\n\t\t\t\t                <b>Published maps</b>\n\t\t\t\t                <i class=\"fa fa-arrows\"></i>\n\t\t\t\t                \n\t\t\t\t                <ul class=\"list-group xmap-elems\" style=\"margin-bottom: 15px;\">\n\t\t\t\t                    <li class=\"list-group-item\">a</li>\n\t\t\t\t                    <li class=\"list-group-item\">b</li>\n\t\t\t\t                    <li class=\"list-group-item\">c</li>\n\t\t\t\t                </ul>\n\t\t\t\t                ";
output += "\n\t\t\t\t            </li>\n\t\t\t\t            <li class=\"list-group-item map-elems-group\" style=\"margin-bottom: 15px;\">\n\t\t\t\t                <b>Unpublished maps</b>\n\t\t\t\t                <i class=\"fa fa-arrows\"></i>\n\t\t\t\t                \n\t\t\t\t                <ul class=\"list-group xmap-elems\" id=\"y-list\">\n\t\t\t\t                    <li class=\"list-group-item\">d</li>\n\t\t\t\t                    <li class=\"list-group-item\">e</li>\n\t\t\t\t                </ul>\n\t\t\t\t                ";
output += "\n\t\t\t\t            </li>\n\n\n        </ul>\n\n    </div>\n</div>\n\n\n<div class=\"row\" style=\"margin-top: 40px;\">\n    <div class=\"col-sm-6 col-sm-offset-3\">\n\t\t<button type=\"button\" class=\"btn btn-primary btn-block\" id=\"js-save-map-menu\">Save</button>\n    </div>\n</div>";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["maps/templates/maps-delete-modal.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"modal-header\">\n    <h4 class=\"modal-title\">Delete confirmation</h4>\n</div>\n\n\n<div class=\"modal-body\">\n\n\t<p>Are you sure you want to delete this map?</p>\n\n\t<div class=\"form-group\" style=\"margin-top: 20px;\">\n\t    <label >Name</label>\n\t    <input class=\"form-control\" value=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "name"), env.opts.autoescape);
output += "\" disabled>\n\t</div>\n\n    <div class=\"form-group\" style=\"margin-top: 20px;\">\n        <label >Description</label>\n        <textarea class=\"form-control\" rows=\"3\" disabled>";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "description"), env.opts.autoescape);
output += "</textarea>\n    </div>\n\n\n</div>\n\n<div class=\"modal-footer\">\n    <button type=\"button\" class=\"btn btn-danger js-modal-delete\">Yes</button>\n    <button type=\"button\" class=\"btn btn-default js-modal-cancel\">Cancel</button>\n\n\n    <div id=\"message-status\" style=\"margin-top: 35px;\"></div>\n    <div id=\"\" style=\"margin-top: 10px;\">\n        <h5 id=\"message-links\"></h5>\n    </div>\n</div>\n\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["maps/templates/maps-edit-modal.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"modal-header\">\n    <h4 class=\"modal-title\">Edit map #";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "id"), env.opts.autoescape);
output += "</h4>\n</div>\n\n\n<div class=\"modal-body\">\n\n\n    <form>\n\n        <div class=\"form-group\">\n            <label for=\"js-edit-map-title-pt\">Title (português)</label>\n            <input id=\"js-edit-map-title-pt\" class=\"form-control\" name=\"title[pt]\" value=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "title")),"pt", env.opts.autoescape), env.opts.autoescape);
output += "\">\n        </div>\n        <div class=\"form-group\">\n            <label for=\"js-edit-map-title-en\">Title (english)</label>\n            <input id=\"js-edit-map-title-en\" class=\"form-control\" name=\"title[en]\" value=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "title")),"en", env.opts.autoescape), env.opts.autoescape);
output += "\">\n        </div>\n\n        <div class=\"row\">\n            <div class=\"col-sm-6\">\n\n                <div class=\"form-group\">\n                    <label for=\"js-edit-map-category\">Map category</label>\n\n                    <select id=\"js-edit-map-category\" name=\"categoryId\" class=\"form-control\">\n\n                    ";
frame = frame.push();
var t_3 = runtime.contextOrFrameLookup(context, frame, "mapCategories");
if(t_3) {var t_2 = t_3.length;
for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("obj", t_4);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\n                        <option value=";
output += runtime.suppressValue(runtime.memberLookup((t_4),"id", env.opts.autoescape), env.opts.autoescape);
output += " ";
output += runtime.suppressValue((runtime.memberLookup((t_4),"id", env.opts.autoescape) == runtime.contextOrFrameLookup(context, frame, "categoryId")?"selected":""), env.opts.autoescape);
output += ">\n                            ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_4),"contents", env.opts.autoescape)),"en", env.opts.autoescape), env.opts.autoescape);
output += "\n                        </option>\n                    ";
;
}
}
frame = frame.pop();
output += "\n                    \n                    </select>\n                </div>\n                \n            </div>\n            <div class=\"col-sm-6\">\n              \n                <label>Code</label>\n                <input class=\"form-control\" value=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "code"), env.opts.autoescape);
output += "\" disabled>\n\n            </div>\n        </div>\n\n\n\n        <hr>\n\n        <h4>Selected shapes (data source)</h4>\n\n        <div class=\"xtable-responsive\">\n            <table class=\"table table-stripedx table-hover table-condensed table-dashboard\">\n\n                <thead>\n                    <tr>\n                        <th style=\"width: 5%\"></th>\n                        <th style=\"width: 15%\">Shape id</th>\n                        <th style=\"width: 40%\">Shape code</th>\n                        <th style=\"width: 15%\">Shape srid</th>\n                        <th style=\"width: 25%\">Owner</th>\n                    </tr>\n                </thead>\n\n                <tbody>\n                    ";
frame = frame.push();
var t_7 = runtime.contextOrFrameLookup(context, frame, "allShapes");
if(t_7) {var t_6 = t_7.length;
for(var t_5=0; t_5 < t_7.length; t_5++) {
var t_8 = t_7[t_5];
frame.set("obj", t_8);
frame.set("loop.index", t_5 + 1);
frame.set("loop.index0", t_5);
frame.set("loop.revindex", t_6 - t_5);
frame.set("loop.revindex0", t_6 - t_5 - 1);
frame.set("loop.first", t_5 === 0);
frame.set("loop.last", t_5 === t_6 - 1);
frame.set("loop.length", t_6);
output += "\n                        <tr class=\"js-shape-row\">\n                            <td><input type=\"checkbox\" name=\"selectedShapes[";
output += runtime.suppressValue(runtime.memberLookup((t_8),"id", env.opts.autoescape), env.opts.autoescape);
output += "]\" ";
output += runtime.suppressValue((runtime.memberLookup((t_8),"isSelected", env.opts.autoescape) == true?"checked":""), env.opts.autoescape);
output += "></td>\n                            <td>";
output += runtime.suppressValue(runtime.memberLookup((t_8),"id", env.opts.autoescape), env.opts.autoescape);
output += "</td>\n                            <td>";
output += runtime.suppressValue(runtime.memberLookup((t_8),"code", env.opts.autoescape), env.opts.autoescape);
output += "</td>\n                            <td>";
output += runtime.suppressValue(runtime.memberLookup((t_8),"srid", env.opts.autoescape), env.opts.autoescape);
output += "</td>\n                            <td>";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_8),"ownerData", env.opts.autoescape)),"firstName", env.opts.autoescape), env.opts.autoescape);
output += " ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_8),"ownerData", env.opts.autoescape)),"lastName", env.opts.autoescape), env.opts.autoescape);
output += "</td>\n                        </tr>\n                    ";
;
}
}
frame = frame.pop();
output += "\n                </tbody>\n\n            </table>\n        </div>\n        \n\n\n        <hr>\n\n        <h4>Controls</h4>\n        \n\n";
output += "\n    </form>\n\n    <div id=\"controls-region\"></div>\n\n    <button type=\"button\" class=\"btn btn-primary js-add-control\">Add control</button>\n\n</div>\n\n<div class=\"modal-footer\">\n    <button type=\"button\" class=\"btn btn-primary js-modal-save\">Gravar</button>\n    <button type=\"button\" class=\"btn btn-default js-modal-cancel\">Cancelar</button>\n\n    <div id=\"message-status\" style=\"margin-top: 35px;\"></div>\n    <div id=\"\" style=\"margin-top: 10px;\">\n        <h5 id=\"message-links\"></h5>\n    </div>\n</div>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["maps/templates/maps-new.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"row\">\n    <div class=\"col-sm-10 col-sm-offset-1\" style=\"padding-top: 20px;\">\n\n        <form style=\"margin-top: 20px;\">\n\n            <div class=\"form-group\">\n                <label for=\"js-new-map-name\">Map name</label>\n                <input type=\"text\" id=\"js-new-map-name\" class=\"form-control\" name=\"name\" >\n            </div>\n\n            <div class=\"form-group\">\n                <label for=\"js-new-map-desc\">Map description</label>\n                <textarea id=\"js-new-map-desc\" class=\"form-control\" rows=\"3\" name=\"description\"></textarea>\n            </div>\n\n            <div class=\"form-group\">\n\n                <label for=\"js-new-map-name\">Center map around</label>\n                <div class=\"radio\" style=\"margin-top: 0;\">\n                  <label>\n                    <input type=\"radio\" name=\"center\"  value=\"madeira\" checked>\n                    Madeira\n                  </label>\n                </div>\n                <div class=\"radio\">\n                  <label>\n                    <input type=\"radio\" name=\"center\"  value=\"azores\">\n                    Azores\n                  </label>\n                </div>\n                <div class=\"radio\">\n                  <label>\n                    <input type=\"radio\" name=\"center\"  value=\"mainland\">\n                    Mainland Portugal\n                  </label>\n                </div>\n            </div> \n\n        </form>\n\n           \n\n\n        <div class=\"row\" style=\"margin-top: 20px; margin-bottom: 40px;\">\n        \t<div class=\"col-sm-6 col-sm-offset-3\">\n            \t<button type=\"button\" class=\"btn btn-primary btn-block js-save-map\">Create map</button>\n            </div>\n\n            <div class=\"col-sm-6 col-sm-offset-3\" id=\"new-map-container\" style=\"display: none; margin-top: 10px;\">\n                <p class=\"text-center\" style=\"margin-bottom: 3px;\">The new map was created!</p>\n                <a href=\"\" target=\"_blank\" style=\"\" class=\"btn btn-success btn-block js-edit-map\" role=\"button\">Start editing!</a>\n            </div>\n        </div>\n\n    </div>\n</div>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["maps/templates/maps-row.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "\n<td>\n    ";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "name"), env.opts.autoescape);
output += "\n</td>\n\n<td>\n    ";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "description"), env.opts.autoescape);
output += "\n</td>\n\n\n";
output += "\n\n<td class=\"text-right\">\n";
output += "\n    <a class=\"btn btn-primary btn-xs js-edit\" href=\"/pt/tilemill#/project/";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "id"), env.opts.autoescape);
output += "\" target=\"_blank\"><span class=\"glyphicon glyphicon-pencil\"></span></a>\n    <button class=\"btn btn-danger btn-xs js-delete\"><span class=\"glyphicon glyphicon-trash\"></span>\n    </button>\n</td>\n\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["maps/templates/maps-tab.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<ul class=\"nav nav-tabs\">\n\n";
output += "\n\n    <li role=\"presentation\" class=\"active\">\n        <a href=\"#\" class=\"js-dashboard-sep\" data-tab-separator=\"shapes-all\">All shapes</a>\n    </li>\n    \n    <li role=\"presentation\">\n        <a href=\"#\" class=\"js-dashboard-sep\" data-tab-separator=\"map-menu\">Menu order</a>\n    </li>\n\n    <li role=\"presentation\">\n        <a href=\"#\" class=\"js-dashboard-sep\" data-tab-separator=\"map-legends\">Legends</a>\n    </li>\n    ";
output += "\n\n</ul>\n\n<div id=\"maps-region\"></div>";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["maps/templates/maps-table.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"xtable-responsive\">\n    <table class=\"table table-striped table-condensed table-dashboard\">\n\n        <thead>\n            <tr>\n";
output += "\n\n                <th style=\"width: 35%\">Name</th>\n                <th style=\"width: 65%\">Description</th>\n";
output += "\n                <th style=\"width: 10%\"></th>\n            </tr>\n        </thead>\n\n        <tbody>\n        </tbody>\n\n    </table>\n\n    \n</div>\n\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["maps/templates/shapes-delete-modal.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"modal-header\">\n    <h4 class=\"modal-title\">Delete confirmation</h4>\n</div>\n\n\n<div class=\"modal-body\">\n\n\t<p>Are you sure you want to delete this shape?</p>\n\n\t<div class=\"form-group\" style=\"margin-top: 20px;\">\n\t    <label >Table name</label>\n\t    <input class=\"form-control\" value=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "tableName"), env.opts.autoescape);
output += "\" disabled>\n\t</div>\n\n</div>\n\n<div class=\"modal-footer\">\n    <button type=\"button\" class=\"btn btn-danger js-modal-delete\">Yes</button>\n    <button type=\"button\" class=\"btn btn-default js-modal-cancel\">Cancel</button>\n\n\n    <div id=\"message-status\" style=\"margin-top: 35px;\"></div>\n    <div id=\"\" style=\"margin-top: 10px;\">\n        <h5 id=\"message-links\"></h5>\n    </div>\n</div>\n\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["maps/templates/shapes-edit-modal.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"modal-header\">\n    <h4 class=\"modal-title\">Edit shape #";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "id"), env.opts.autoescape);
output += "</h4>\n</div>\n\n\n<div class=\"modal-body\">\n    <form>\n\n        <div class=\"form-group\">\n            <label for=\"js-edit-text-en\">Description</label>\n            <textarea id=\"js-edit-desc-en\" class=\"form-control\" name=\"edit-desc-en\" >";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "description")),"en", env.opts.autoescape), env.opts.autoescape);
output += "</textarea>\n        </div>\n\n        <hr>\n\n        <div class=\"row\">\n\n            <div class=\"col-sm-6\">\n                <div class=\"form-group\">\n                    <label>SRID</label>\n                    <input type=\"text\" class=\"form-control\" value=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "srid"), env.opts.autoescape);
output += "\" disabled>\n                </div>\n            </div>\n\n            <div class=\"col-sm-6\">\n                <div class=\"form-group\">\n                    <label>Original file</label>\n                    <input type=\"text\" class=\"form-control\" value=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "fileData")),"name", env.opts.autoescape), env.opts.autoescape);
output += "\" disabled>\n                </div>\n            </div>\n\n        </div>\n\n        <div class=\"row\">\n\n            <div class=\"col-sm-6\">\n                <div class=\"form-group\">\n                    <label>Owner</label>\n                    <input type=\"text\" class=\"form-control\" value=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "ownerData")),"firstName", env.opts.autoescape), env.opts.autoescape);
output += " ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "ownerData")),"lastName", env.opts.autoescape), env.opts.autoescape);
output += "\" disabled>\n                </div>\n            </div>\n\n            <div class=\"col-sm-6\">\n                <div class=\"form-group\">\n                    <label>Created at</label>\n                    <input type=\"text\" class=\"form-control\" value=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "createdAt"), env.opts.autoescape);
output += "\" disabled>\n                </div>\n            </div>\n        </div>\n\n        <div class=\"row\">\n\n            <div class=\"col-sm-6\">\n                <div class=\"form-group\">\n                    <label>PostGIS table</label>\n                    <input type=\"text\" class=\"form-control\" value=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "tableName"), env.opts.autoescape);
output += "\" disabled>\n                </div>\n            </div>\n\n            <div class=\"col-sm-6\">\n                <div class=\"form-group\">\n                    <label>Geometry type</label>\n                    <input type=\"text\" class=\"form-control\" value=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "geometryType"), env.opts.autoescape);
output += "\" disabled>\n                </div>\n            </div>\n        </div>\n\n        <div class=\"row\">\n            <div class=\"col-sm-12\">\n\n                <label>Attribute table informations</label>\n                <div class=\"row\">\n                    <div class=\"col-sm-10 col-sm-offset-1\">\n                        <div class=\"form-group\">\n                            <table class=\"table table-striped table-condensed table-dashboard table-bordered\">\n                                <thead>\n                                    <tr>\n                                        <th  class=\"text-center\" style=\"width: 23%\">Column name</th>\n                                        <th  class=\"text-center\" style=\"width: 23%\">Data type</th>\n                                        <th  class=\"text-center\" style=\"width: 18%\">Min</th>\n                                        <th  class=\"text-center\" style=\"width: 18%\">Max</th>\n                                        <th  class=\"text-center\" style=\"width: 18%\">Count</th>\n                                    </tr>\n                                </thead>\n\n                                <tbody>\n                                    ";
frame = frame.push();
var t_3 = runtime.contextOrFrameLookup(context, frame, "attributesInfo");
if(t_3) {var t_2 = t_3.length;
for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("column", t_4);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\n\n                                        ";
if(runtime.memberLookup((t_4),"column_name", env.opts.autoescape) != "gid" && runtime.memberLookup((t_4),"column_name", env.opts.autoescape) != "geom") {
output += "\n                                        <tr>\n                                            <td class=\"text-center\">";
output += runtime.suppressValue(runtime.memberLookup((t_4),"column_name", env.opts.autoescape), env.opts.autoescape);
output += "</td>\n                                            <td class=\"text-center\">";
output += runtime.suppressValue(runtime.memberLookup((t_4),"data_type", env.opts.autoescape), env.opts.autoescape);
output += "</td>\n                                            <td class=\"text-center\">";
output += runtime.suppressValue((runtime.memberLookup((t_4),"min", env.opts.autoescape) != runtime.contextOrFrameLookup(context, frame, "null")?runtime.memberLookup((t_4),"min", env.opts.autoescape):"&mdash;"), env.opts.autoescape);
output += "</td>\n                                            <td class=\"text-center\">";
output += runtime.suppressValue((runtime.memberLookup((t_4),"max", env.opts.autoescape) != runtime.contextOrFrameLookup(context, frame, "null")?runtime.memberLookup((t_4),"max", env.opts.autoescape):"&mdash;"), env.opts.autoescape);
output += "</td>                                      \n                                            <td class=\"text-center\">";
output += runtime.suppressValue((runtime.memberLookup((t_4),"count", env.opts.autoescape) != runtime.contextOrFrameLookup(context, frame, "null")?runtime.memberLookup((t_4),"count", env.opts.autoescape):"&mdash;"), env.opts.autoescape);
output += "</td>                                      \n                                        </tr>\n                                        ";
;
}
output += "\n\n                                    ";
;
}
}
frame = frame.pop();
output += "\n                                </tbody>\n                            </table>\n\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </form>\n";
output += "\n</div>\n\n<div class=\"modal-footer\">\n    <button type=\"button\" class=\"btn btn-primary js-modal-save\">Gravar</button>\n    <button type=\"button\" class=\"btn btn-default js-modal-cancel\">Cancelar</button>\n\n    <div id=\"message-status\" style=\"margin-top: 35px;\"></div>\n    <div id=\"\" style=\"margin-top: 10px;\">\n        <h5 id=\"message-links\"></h5>\n    </div>\n</div>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["maps/templates/shapes-new.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"row\">\n    <div class=\"col-sm-10 col-sm-offset-1\" style=\"padding-top: 20px;\">\n\n        <h4 class=\"text-center\">Carregar um novo shape para a base de dados</h4>\n        <form style=\"margin-top: 40px;\">\n\n\t\t\t<div class=\"row\">\n\n\t\t\t\t<div class=\"col-sm-6\">\n\t\t            <div class=\"form-group\">\n\t\t                <label for=\"js-new-shape-code\">Shape code</label>\n\t\t                <input type=\"text\" id=\"js-new-shape-code\" class=\"form-control\" name=\"code\">\n\t\t            </div>\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"col-sm-6\">\n\t\t            <div class=\"form-group\">\n\t\t                <label for=\"js-new-shape-srid\">SRID (projection identifier)</label>\n\t\t                <input type=\"text\" id=\"js-new-shape-srid\" class=\"form-control\" name=\"srid\" value=\"4326\">\n\t\t            </div>\n\t\t\t\t</div>\n\n            </div>\n\n            <div class=\"form-group\">\n                <label for=\"js-new-shape-desc-pt\">Description (portuguese)</label>\n                <input type=\"text\" id=\"js-new-shape-desc-pt\" class=\"form-control\" name=\"description[pt]\" >\n            </div>\n            <div class=\"form-group\">\n                <label for=\"js-new-shape-desc-en\">Description (english)</label>\n                <input type=\"text\" id=\"js-new-shape-desc-en\" class=\"form-control\" name=\"description[en]\" >\n            </div>\n\n\n            <h4>Available zip files containing shapes</h4>\n\n            <div class=\"xtable-responsive\">\n                <table class=\"table table-condensedx table-hover table-dashboard\">\n\n                    <thead>\n                        <tr>\n                            <th style=\"width: 5%\"></th>\n                            <th style=\"width: 10%\">File id</th>\n                            <th style=\"width: 20%\">Name</th>\n                            <th style=\"width: 20%\">Owner</th>\n                            <th style=\"width: 20%\">Uploaded at</th>\n                        </tr>\n                    </thead>\n\n                    <tbody>\n                        ";
frame = frame.push();
var t_3 = runtime.contextOrFrameLookup(context, frame, "zipFilesWithShapes");
if(t_3) {var t_2 = t_3.length;
for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("obj", t_4);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\n                            <tr class=\"js-shape-row\">\n                                <td><input type=\"radio\" name=\"fileId\" value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"id", env.opts.autoescape), env.opts.autoescape);
output += "\"></td>\n                                <td class=\"js-file-id\">";
output += runtime.suppressValue(runtime.memberLookup((t_4),"id", env.opts.autoescape), env.opts.autoescape);
output += "</td>\n                                <td>";
output += runtime.suppressValue(runtime.memberLookup((t_4),"name", env.opts.autoescape), env.opts.autoescape);
output += "</td>\n                                <td>";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_4),"ownerData", env.opts.autoescape)),"firstName", env.opts.autoescape), env.opts.autoescape);
output += " ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_4),"ownerData", env.opts.autoescape)),"lastName", env.opts.autoescape), env.opts.autoescape);
output += "</td>\n                                <td>";
output += runtime.suppressValue(runtime.memberLookup((t_4),"uploadedAt", env.opts.autoescape), env.opts.autoescape);
output += "</td>\n                            </tr>\n                        ";
;
}
}
frame = frame.pop();
output += "\n                    </tbody>\n\n                </table>\n            </div>\n\n        </form>\n\n\n        <hr>\n\n        <div class=\"row\" style=\"margin-top: 20px;\">\n        \t<div class=\"col-sm-6 col-sm-offset-3\">\n            \t<button type=\"button\" class=\"btn btn-primary btn-block js-save\">Carregar shape!</button>\n            </div>\n        </div>\n\n    </div>\n</div>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["maps/templates/shapes-row.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "\n<td>\n    ";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "tableName"), env.opts.autoescape);
output += "\n</td>\n\n<td>\n    ";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "srid"), env.opts.autoescape);
output += "\n</td>\n\n<td>\n    ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "fileData")),"name", env.opts.autoescape), env.opts.autoescape);
output += "\n</td>\n\n<td>\n    ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "ownerData")),"firstName", env.opts.autoescape), env.opts.autoescape);
output += " ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "ownerData")),"lastName", env.opts.autoescape), env.opts.autoescape);
output += "\n</td>\n\n<td>\n    ";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "createdAt"), env.opts.autoescape);
output += "\n</td>\n\n";
output += "\n\n<td class=\"text-right\">\n";
output += "\n    <button class=\"btn btn-primary btn-xs js-edit\"><span class=\"glyphicon glyphicon-pencil\"></span>\n    </button>\n\n    <button class=\"btn btn-danger btn-xs js-delete\"><span class=\"glyphicon glyphicon-trash\"></span>\n    </button>\n</td>\n\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["maps/templates/shapes-table.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"xtable-responsive\">\n    <table class=\"table table-striped table-condensed table-dashboard\">\n\n        <thead>\n            <tr>\n            \n";
output += "\n                <th style=\"width: 25%\">Table name</th>\n                <th style=\"width: 10%\">Projection</th>\n                <th style=\"width: 20%\">Source file</th>\n                <th style=\"width: 15%\">Owner</th>\n";
output += "\n                <th style=\"width: 20%\">Created At</th>\n                <th style=\"width: 10%\"></th>\n            </tr>\n        </thead>\n\n        <tbody>\n        </tbody>\n\n    </table>\n\n</div>\n\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["menu-left/templates/menu-left.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"list-group\">\n\n";
frame = frame.push();
var t_3 = runtime.contextOrFrameLookup(context, frame, "items");
if(t_3) {var t_2 = t_3.length;
for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("obj", t_4);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\n\n\t<a href=\"#";
output += runtime.suppressValue(runtime.memberLookup((t_4),"itemCode", env.opts.autoescape), env.opts.autoescape);
output += "\" class=\"list-group-item\" style=\"padding-top: 13px; padding-bottom: 13px;\">\n    \t<i class=\"fa ";
output += runtime.suppressValue(runtime.memberLookup((t_4),"itemIcon", env.opts.autoescape), env.opts.autoescape);
output += " fa-lg\"></i>&nbsp;\n\t\t";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_4),"itemTitle", env.opts.autoescape)),runtime.memberLookup((t_4),"lang", env.opts.autoescape), env.opts.autoescape), env.opts.autoescape);
output += "\n\t\t<span class=\"arrow-container pull-right\"></span>\n\t</a>\n\n";
;
}
}
frame = frame.pop();
output += "\n\n<a href=\"/pt/tilemill\" title=\"Open TileMill (in a new tab)\" target=\"_blank\" class=\"list-group-item\" style=\"padding-top: 13px; padding-bottom: 13px;\">\n    <i class=\"fa fa-map-marker fa-lg\"></i>&nbsp;\n    Map editor\n    <span class=\"arrow-container pull-right\"></span>\n</a>\n\n</div>";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["nunjucks-macros.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "\n";
var macro_t_1 = runtime.makeMacro(
["scale", "tableName", "columnName", "geometryTypePrimitive", "dataType"], 
[], 
function (l_scale, l_tableName, l_columnName, l_geometryTypePrimitive, l_dataType, kwargs) {
frame = frame.push();
kwargs = kwargs || {};
if (kwargs.hasOwnProperty("caller")) {
frame.set("caller", kwargs.caller); }
frame.set("scale", l_scale);
frame.set("tableName", l_tableName);
frame.set("columnName", l_columnName);
frame.set("geometryTypePrimitive", l_geometryTypePrimitive);
frame.set("dataType", l_dataType);
var t_2 = "";t_2 += "\n\n";
var t_3;
t_3 = "";
frame.set("cartoCode", t_3, true);
if(!frame.parent) {
context.setVariable("cartoCode", t_3);
context.addExport("cartoCode");
}
t_2 += "\n\n";
frame = frame.push();
var t_6 = l_scale;
if(t_6) {var t_5 = t_6.length;
for(var t_4=0; t_4 < t_6.length; t_4++) {
var t_7 = t_6[t_4];
frame.set("class", t_7);
frame.set("loop.index", t_4 + 1);
frame.set("loop.index0", t_4);
frame.set("loop.revindex", t_5 - t_4);
frame.set("loop.revindex0", t_5 - t_4 - 1);
frame.set("loop.first", t_4 === 0);
frame.set("loop.last", t_4 === t_5 - 1);
frame.set("loop.length", t_5);
t_2 += "\n\n    ";
t_2 += "\n\n    ";
if(runtime.memberLookup((runtime.memberLookup((t_7),"valueClass", env.opts.autoescape)),0, env.opts.autoescape) != runtime.memberLookup((runtime.memberLookup((t_7),"valueClass", env.opts.autoescape)),1, env.opts.autoescape)) {
t_2 += "\n\n        ";
var t_8;
t_8 = runtime.contextOrFrameLookup(context, frame, "cartoCode") + "#" + l_tableName + "[\"" + l_columnName + "\" >= " + runtime.memberLookup((runtime.memberLookup((t_7),"valueClass", env.opts.autoescape)),0, env.opts.autoescape) + "]" + "[\"" + l_columnName + "\" <= " + runtime.memberLookup((runtime.memberLookup((t_7),"valueClass", env.opts.autoescape)),1, env.opts.autoescape) + "]{" + "\n";
frame.set("cartoCode", t_8, true);
if(!frame.parent) {
context.setVariable("cartoCode", t_8);
context.addExport("cartoCode");
}
t_2 += "\n    \n\n    ";
;
}
else {
t_2 += "    \n        ";
if(l_dataType == "char") {
t_2 += "\n            ";
if(runtime.memberLookup((runtime.memberLookup((t_7),"valueClass", env.opts.autoescape)),0, env.opts.autoescape) == runtime.contextOrFrameLookup(context, frame, "undefined")) {
t_2 += "\n\n                ";
var t_9;
t_9 = runtime.contextOrFrameLookup(context, frame, "cartoCode") + "#" + l_tableName + "[\"" + l_columnName + "\" = null]{" + "\n";
frame.set("cartoCode", t_9, true);
if(!frame.parent) {
context.setVariable("cartoCode", t_9);
context.addExport("cartoCode");
}
t_2 += "\n\n            ";
;
}
else {
t_2 += "\n\n                ";
var t_10;
t_10 = runtime.contextOrFrameLookup(context, frame, "cartoCode") + "#" + l_tableName + "[\"" + l_columnName + "\" = \"" + runtime.memberLookup((runtime.memberLookup((t_7),"valueClass", env.opts.autoescape)),0, env.opts.autoescape) + "\"]{" + "\n";
frame.set("cartoCode", t_10, true);
if(!frame.parent) {
context.setVariable("cartoCode", t_10);
context.addExport("cartoCode");
}
t_2 += "\n\n            ";
;
}
t_2 += "\n\n\n        ";
t_2 += "\n        ";
;
}
else {
t_2 += "  \n\n            ";
var t_11;
t_11 = runtime.contextOrFrameLookup(context, frame, "cartoCode") + "#" + l_tableName + "[\"" + l_columnName + "\" = " + runtime.memberLookup((runtime.memberLookup((t_7),"valueClass", env.opts.autoescape)),0, env.opts.autoescape) + "]{" + "\n";
frame.set("cartoCode", t_11, true);
if(!frame.parent) {
context.setVariable("cartoCode", t_11);
context.addExport("cartoCode");
}
t_2 += "\n\n        ";
;
}
t_2 += "\n\n\n    ";
;
}
t_2 += "\n\n    ";
t_2 += "\n    ";
if(l_geometryTypePrimitive == "point") {
t_2 += "\n\n        ";
var t_12;
t_12 = runtime.contextOrFrameLookup(context, frame, "cartoCode") + "    marker-fill: " + runtime.memberLookup((t_7),"colorHex", env.opts.autoescape) + ";\n";
frame.set("cartoCode", t_12, true);
if(!frame.parent) {
context.setVariable("cartoCode", t_12);
context.addExport("cartoCode");
}
t_2 += "\n\n    ";
;
}
else {
if(l_geometryTypePrimitive == "linestring") {
t_2 += "\n\n        ";
var t_13;
t_13 = runtime.contextOrFrameLookup(context, frame, "cartoCode") + "    line-color: " + runtime.memberLookup((t_7),"colorHex", env.opts.autoescape) + ";\n";
frame.set("cartoCode", t_13, true);
if(!frame.parent) {
context.setVariable("cartoCode", t_13);
context.addExport("cartoCode");
}
t_2 += "\n\n    ";
;
}
else {
if(l_geometryTypePrimitive == "polygon") {
t_2 += "\n\n        ";
var t_14;
t_14 = runtime.contextOrFrameLookup(context, frame, "cartoCode") + "    polygon-fill: " + runtime.memberLookup((t_7),"colorHex", env.opts.autoescape) + ";\n";
frame.set("cartoCode", t_14, true);
if(!frame.parent) {
context.setVariable("cartoCode", t_14);
context.addExport("cartoCode");
}
t_2 += "\n        \n    ";
;
}
else {
t_2 += "\n\n        ";
var t_15;
t_15 = runtime.contextOrFrameLookup(context, frame, "cartoCode") + "    /* one of these 3 should probably be commented */\n" + "    marker-fill: " + runtime.memberLookup((t_7),"colorHex", env.opts.autoescape) + ";\n" + "    line-color: " + runtime.memberLookup((t_7),"colorHex", env.opts.autoescape) + ";\n" + "    polygon-fill: " + runtime.memberLookup((t_7),"colorHex", env.opts.autoescape) + ";\n";
frame.set("cartoCode", t_15, true);
if(!frame.parent) {
context.setVariable("cartoCode", t_15);
context.addExport("cartoCode");
}
t_2 += "\n\n    ";
;
}
;
}
;
}
t_2 += "\n\n    ";
t_2 += "\n\n    ";
var t_16;
t_16 = runtime.contextOrFrameLookup(context, frame, "cartoCode") + "}\n\n";
frame.set("cartoCode", t_16, true);
if(!frame.parent) {
context.setVariable("cartoCode", t_16);
context.addExport("cartoCode");
}
t_2 += "\n";
;
}
}
frame = frame.pop();
t_2 += "\n\n\n";
t_2 += "\n";
t_2 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "cartoCode"), env.opts.autoescape);
t_2 += "\n\n\n";
;
frame = frame.pop();
return new runtime.SafeString(t_2);
});
context.addExport("getCartoCode");
context.setVariable("getCartoCode", macro_t_1);
output += "\n\n\n\n\n\n\n\n";
var macro_t_17 = runtime.makeMacro(
["scale", "mapName", "legendStyle"], 
[], 
function (l_scale, l_mapName, l_legendStyle, kwargs) {
frame = frame.push();
kwargs = kwargs || {};
if (kwargs.hasOwnProperty("caller")) {
frame.set("caller", kwargs.caller); }
frame.set("scale", l_scale);
frame.set("mapName", l_mapName);
frame.set("legendStyle", l_legendStyle);
var t_18 = "";t_18 += "\n\n";
var t_19;
t_19 = "<div class='my-legend'>\n" + "<div class='legend-title'>" + l_mapName + "</div>\n" + "<div class='legend-scale'>\n\n" + "  <!--   BEGIN COLORS   |   BEGIN COLORS   |   BEGIN COLORS   -->\n" + "  <ul class='legend-labels'>\n";
frame.set("legendHtml", t_19, true);
if(!frame.parent) {
context.setVariable("legendHtml", t_19);
context.addExport("legendHtml");
}
t_18 += "\n";
frame = frame.push();
var t_22 = l_scale;
if(t_22) {var t_21 = t_22.length;
for(var t_20=0; t_20 < t_22.length; t_20++) {
var t_23 = t_22[t_20];
frame.set("class", t_23);
frame.set("loop.index", t_20 + 1);
frame.set("loop.index0", t_20);
frame.set("loop.revindex", t_21 - t_20);
frame.set("loop.revindex0", t_21 - t_20 - 1);
frame.set("loop.first", t_20 === 0);
frame.set("loop.last", t_20 === t_21 - 1);
frame.set("loop.length", t_21);
t_18 += "\n\n    ";
t_18 += "\n\n    ";
if(runtime.memberLookup((runtime.memberLookup((t_23),"valueClass", env.opts.autoescape)),0, env.opts.autoescape) != runtime.memberLookup((runtime.memberLookup((t_23),"valueClass", env.opts.autoescape)),1, env.opts.autoescape)) {
t_18 += "\n\n        ";
var t_24;
t_24 = runtime.contextOrFrameLookup(context, frame, "legendHtml") + "    <li><span style='background:" + runtime.memberLookup((t_23),"colorHex", env.opts.autoescape) + ";'></span>\n" + "            " + runtime.memberLookup((runtime.memberLookup((t_23),"valueClass", env.opts.autoescape)),0, env.opts.autoescape) + " &ndash; " + runtime.memberLookup((runtime.memberLookup((t_23),"valueClass", env.opts.autoescape)),1, env.opts.autoescape) + "\n" + "    </li>\n";
frame.set("legendHtml", t_24, true);
if(!frame.parent) {
context.setVariable("legendHtml", t_24);
context.addExport("legendHtml");
}
t_18 += "\n    \n\n    ";
;
}
else {
t_18 += "    \n\n        ";
var t_25;
t_25 = runtime.contextOrFrameLookup(context, frame, "legendHtml") + "    <li><span style='background:" + runtime.memberLookup((t_23),"colorHex", env.opts.autoescape) + ";'></span>\n" + "            " + runtime.memberLookup((runtime.memberLookup((t_23),"valueClass", env.opts.autoescape)),0, env.opts.autoescape) + "\n" + "    </li>\n";
frame.set("legendHtml", t_25, true);
if(!frame.parent) {
context.setVariable("legendHtml", t_25);
context.addExport("legendHtml");
}
t_18 += "\n\n    ";
;
}
t_18 += "\n\n\n    ";
t_18 += "\n\n";
;
}
}
frame = frame.pop();
t_18 += "\n\n";
var t_26;
t_26 = runtime.contextOrFrameLookup(context, frame, "legendHtml") + "  </ul>\n" + "  <!--   END COLORS   |   END COLORS   |   END COLORS   -->\n\n" + "</div>\n\n" + "<!--   BEGIN SOURCE   |   BEGIN SOURCE   |   BEGIN SOURCE   -->\n" + "<div class='legend-source'>\n" + "  Source: <a href='#'>Source name</a>\n" + "</div>\n" + "<!--   END SOURCE   |   END SOURCE   |   END SOURCE   -->\n\n" + "</div>\n\n";
frame.set("legendHtml", t_26, true);
if(!frame.parent) {
context.setVariable("legendHtml", t_26);
context.addExport("legendHtml");
}
t_18 += "\n\n";
if(l_legendStyle == "horizontal") {
t_18 += "\n\n    ";
var t_27;
t_27 = "\n<style type='text/css'>\n  .my-legend .legend-title {\n    text-align: left;\n    margin-bottom: 8px;\n    font-weight: bold;\n    font-size: 90%;\n    }\n  .my-legend .legend-scale ul {\n    margin: 0;\n    padding: 0;\n    float: left;\n    list-style: none;\n    }\n  .my-legend .legend-scale ul li {\n    display: block;\n    float: left;\n    width: 50px;\n    margin-bottom: 6px;\n    text-align: center;\n    font-size: 80%;\n    list-style: none;\n    }\n  .my-legend ul.legend-labels li span {\n    display: block;\n    float: left;\n    height: 15px;\n    width: 50px;\n    }\n  .my-legend .legend-source {\n    font-size: 70%;\n    color: #999;\n    clear: both;\n    }\n  .my-legend a {\n    color: #777;\n    }\n</style>";
frame.set("legendCss", t_27, true);
if(!frame.parent) {
context.setVariable("legendCss", t_27);
context.addExport("legendCss");
}
t_18 += "\n\n";
;
}
else {
if(l_legendStyle == "vertical") {
t_18 += "\n\n";
var t_28;
t_28 = "\n<style type='text/css'>\n  .my-legend .legend-title {\n    text-align: left;\n    margin-bottom: 5px;\n    font-weight: bold;\n    font-size: 90%;\n    }\n  .my-legend .legend-scale ul {\n    margin: 0;\n    margin-bottom: 5px;\n    padding: 0;\n    float: left;\n    list-style: none;\n    }\n  .my-legend .legend-scale ul li {\n    font-size: 80%;\n    list-style: none;\n    margin-left: 0;\n    line-height: 18px;\n    margin-bottom: 2px;\n    }\n  .my-legend ul.legend-labels li span {\n    display: block;\n    float: left;\n    height: 16px;\n    width: 30px;\n    margin-right: 5px;\n    margin-left: 0;\n    border: 1px solid #999;\n    }\n  .my-legend .legend-source {\n    font-size: 70%;\n    color: #999;\n    clear: both;\n    }\n  .my-legend a {\n    color: #777;\n    }\n</style>";
frame.set("legendCss", t_28, true);
if(!frame.parent) {
context.setVariable("legendCss", t_28);
context.addExport("legendCss");
}
t_18 += "\n\n";
;
}
;
}
t_18 += "\n\n";
var t_29;
t_29 = runtime.contextOrFrameLookup(context, frame, "legendHtml") + runtime.contextOrFrameLookup(context, frame, "legendCss");
frame.set("legendHtml", t_29, true);
if(!frame.parent) {
context.setVariable("legendHtml", t_29);
context.addExport("legendHtml");
}
t_18 += "\n\n";
t_18 += "\n";
t_18 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "legendHtml"), env.opts.autoescape);
t_18 += "\n\n";
;
frame = frame.pop();
return new runtime.SafeString(t_18);
});
context.addExport("getDefaultLegendHtml");
context.setVariable("getDefaultLegendHtml", macro_t_17);
output += "\n\n\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["profile/templates/profile.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"row\">\n    <div class=\"col-sm-10 col-sm-offset-1\" style=\"padding-top: 20px;\">\n\n        <h3 class=\"text-center\">Dados pessoais</h3>\n        <form>\n            <div class=\"form-group\">\n                <label for=\"js-personal-first-name\">Primeiro nome</label>\n                <input type=\"text\" id=\"js-personal-first-name\" class=\"form-control\" name=\"firstName\" value=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "firstName"), env.opts.autoescape);
output += "\">\n            </div>\n            <div class=\"form-group\">\n                <label for=\"js-personal-last-name\">Apelido</label>\n                <input type=\"text\" id=\"js-personal-last-name\" class=\"form-control\" name=\"lastName\" value=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "lastName"), env.opts.autoescape);
output += "\">\n            </div>\n            <div class=\"form-group\">\n                <label for=\"js-personal-email\">Email</label>\n                <input type=\"text\" id=\"js-personal-email\" class=\"form-control\" name=\"email\" value=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "email"), env.opts.autoescape);
output += "\">\n            </div>\n        </form>\n\n        <div class=\"row\" style=\"margin-top: 20px;\">\n        \t<div class=\"col-sm-6 col-sm-offset-3\">\n            \t<button type=\"button\" class=\"btn btn-primary btn-block js-save\">Gravar</button>\n            </div>\n        </div>\n\n\n        <h3 class=\"text-center\" style=\"margin-top: 50px;\">Alterar password</h3>\n        <form>\n            <div class=\"form-group\">\n                <label for=\"js-personal-current-pw\">Password actual</label>\n                <input type=\"password\" id=\"js-personal-current-pw\" class=\"form-control\" name=\"currentPw\">\n            </div>\n            <div class=\"form-group\">\n                <label for=\"js-personal-new-pw\">Nova password</label>\n                <input type=\"password\" id=\"js-personal-new-pw\" class=\"form-control\" name=\"newPw\">\n            </div>\n            <div class=\"form-group\">\n                <label for=\"js-personal-new-pw-2\">Nova password (novamente)</label>\n                <input type=\"password\" id=\"js-personal-new-pw-2\" class=\"form-control\" name=\"newPw2\">\n            </div>\n        </form>\n\n        <div class=\"row\" style=\"margin-top: 20px;\">\n            <div class=\"col-sm-6 col-sm-offset-3\">\n                <button type=\"button\" class=\"btn btn-primary btn-block js-change-pw\">Alterar password</button>\n            </div>\n        </div>\n\n    </div>\n</div>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["texts/templates/texts-delete-modal.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"modal-header\">\n    <h4 class=\"modal-title\">Delete confirmation</h4>\n</div>\n\n\n<div class=\"modal-body\">\nAre you sure you want to delete text # ";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "id"), env.opts.autoescape);
output += "?\n</div>\n\n<div class=\"modal-footer\">\n    <button type=\"button\" class=\"btn btn-danger js-modal-delete\">Yes</button>\n    <button type=\"button\" class=\"btn btn-default js-modal-cancel\">Cancel</button>\n\n\n    <div id=\"message-status\" style=\"margin-top: 35px;\"></div>\n    <div id=\"\" style=\"margin-top: 10px;\">\n        <h5 id=\"message-links\"></h5>\n    </div>\n</div>\n\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["texts/templates/texts-edit-modal.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"modal-header\">\n    <h4 class=\"modal-title\">Edit text #";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "id"), env.opts.autoescape);
output += "</h4>\n</div>\n\n\n<div class=\"modal-body\">\n    <form>\n        <div class=\"form-group\">\n            <label for=\"js-edit-text-pt\">Português</label>\n            <textarea id=\"js-edit-text-pt\" class=\"form-control\" name=\"edit-text-pt\" rows=\"3\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "contents")),"pt", env.opts.autoescape), env.opts.autoescape);
output += "</textarea>\n        </div>\n        <div class=\"form-group\">\n            <label for=\"js-edit-text-en\">Inglês</label>\n            <textarea  id=\"js-edit-text-en\" class=\"form-control\" name=\"edit-text-en\" rows=\"3\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "contents")),"en", env.opts.autoescape), env.opts.autoescape);
output += "</textarea>\n        </div>\n        <div class=\"form-group\">\n            <label for=\"js-edit-text-tags\">Tags</label>\n            <input type=\"text\" id=\"js-edit-text-tags\" class=\"form-control\" name=\"edit-text-tags\" value=\"";
output += runtime.suppressValue(env.getFilter("join").call(context, runtime.contextOrFrameLookup(context, frame, "tags"),", "), env.opts.autoescape);
output += "\">\n        </div>\n        <div class=\"form-group\">\n            <label>id</label>\n            <input type=\"text\" class=\"form-control\" value=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "id"), env.opts.autoescape);
output += "\" disabled>\n        </div>\n        <div class=\"form-group\">\n            <label>Last updated</label>\n            <input type=\"text\" class=\"form-control\" value=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "lastUpdated"), env.opts.autoescape);
output += "\" disabled>\n        </div>\n        <div class=\"form-group\">\n            <label>Author (of the last update)</label>\n            <input type=\"text\" class=\"form-control\" value=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "authorData")),"firstName", env.opts.autoescape), env.opts.autoescape);
output += " ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "authorData")),"lastName", env.opts.autoescape), env.opts.autoescape);
output += "\" disabled>\n        </div>\n    </form>\n</div>\n\n<div class=\"modal-footer\">\n    <button type=\"button\" class=\"btn btn-primary js-modal-save\">Gravar</button>\n    <button type=\"button\" class=\"btn btn-default js-modal-cancel\">Cancelar</button>\n\n    <div id=\"message-status\" style=\"margin-top: 35px;\"></div>\n    <div id=\"\" style=\"margin-top: 10px;\">\n        <h5 id=\"message-links\"></h5>\n    </div>\n</div>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["texts/templates/texts-new.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"row\">\n    <div class=\"col-sm-10 col-sm-offset-1\" style=\"padding-top: 20px;\">\n\n        ";
output += "\n        <form>\n            <div class=\"form-group\">\n                <label for=\"js-new-text-pt\">Português</label>\n                <textarea id=\"js-new-text-pt\" class=\"form-control\" name=\"new-text-pt\" rows=\"3\"></textarea>\n            </div>\n            <div class=\"form-group\">\n                <label for=\"js-new-text-en\">Inglês</label>\n                <textarea id=\"js-new-text-en\" class=\"form-control\" name=\"new-text-en\" rows=\"3\"></textarea>\n            </div>\n            <div class=\"form-group\">\n                <label for=\"js-new-text-tags\">Tags (separar com vírgulas)</label>\n                <input type=\"text\" id=\"js-new-text-tags\" class=\"form-control\" name=\"new-text-tags\">\n            </div>\n        </form>\n\n        <div class=\"row\" style=\"margin-top: 20px;\">\n        \t<div class=\"col-sm-6 col-sm-offset-3\">\n            \t<button type=\"button\" class=\"btn btn-primary btn-block js-save\">Gravar</button>\n            </div>\n        </div>\n\n    </div>\n</div>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["texts/templates/texts-row.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<td>";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "id"), env.opts.autoescape);
output += "</td>x\n\n<td>\n    ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "contents")),"pt", env.opts.autoescape), env.opts.autoescape);
output += "\n</td>\n\n<td>\n\t";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "contents")),"en", env.opts.autoescape), env.opts.autoescape);
output += "\n</td>\n<td>";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "authorData")),"firstName", env.opts.autoescape), env.opts.autoescape);
output += " ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "authorData")),"lastName", env.opts.autoescape), env.opts.autoescape);
output += "</td>\n\n<td>";
output += runtime.suppressValue(env.getFilter("join").call(context, runtime.contextOrFrameLookup(context, frame, "tags"),", "), env.opts.autoescape);
output += "</td>\n\n\n<td class=\"text-right\">\n    <button class=\"btn btn-primary btn-xs js-edit\"><span class=\"glyphicon glyphicon-pencil\"></span>\n    </button>\n    <button class=\"btn btn-danger btn-xs js-delete\"><span class=\"glyphicon glyphicon-trash\"></span>\n    </button>\n</td>\n\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["texts/templates/texts-tab.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<ul class=\"nav nav-tabs\">\n    <li role=\"presentation\" class=\"activex\">\n        <a href=\"#\" class=\"js-dashboard-sep\" data-tab-separator=\"texts-all\">Todos os textos</a>\n    </li>\n    <li role=\"presentation\">\n        <a href=\"#\" class=\"js-dashboard-sep\" data-tab-separator=\"texts-new\">Novo texto</a>\n    </li>\n</ul>\n\n<div id=\"texts-region\"></div>";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["texts/templates/texts-table.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"xtable-responsive\">\n    <table class=\"table table-striped table-condensed table-dashboard\">\n\n        <thead>\n            <tr>\n                <th style=\"width: 4%\">id</th>\n                <th style=\"width: 30%\">pt</th>\n                <th style=\"width: 30%\">en</th>\n                <th style=\"width: 16%\">Author</th>\n                <th style=\"width: 10%\">Tags</th>\n                <th style=\"width: 10%\"></th>\n            </tr>\n        </thead>\n\n        <tbody>\n        </tbody>\n\n    </table>\n</div>\n\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["users/templates/users-delete-modal.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"modal-header\">\n    <h4 class=\"modal-title\">Delete confirmation</h4>\n</div>\n\n\n<div class=\"modal-body\">\nAre you sure you want to delete user # ";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "id"), env.opts.autoescape);
output += "?\n</div>\n\n<div class=\"modal-footer\">\n    <button type=\"button\" class=\"btn btn-danger js-modal-delete\">Yes</button>\n    <button type=\"button\" class=\"btn btn-default js-modal-cancel\">Cancel</button>\n\n\n    <div id=\"message-status\" style=\"margin-top: 35px;\"></div>\n    <div id=\"\" style=\"margin-top: 10px;\">\n        <h5 id=\"message-links\"></h5>\n    </div>\n</div>\n\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["users/templates/users-edit-modal.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"modal-header\">\n    <h4 class=\"modal-title\">Edit user #";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "id"), env.opts.autoescape);
output += "</h4>\n</div>\n\n\n<div class=\"modal-body\">\n    <form>\n\n        <div class=\"form-group\">\n            <label for=\"js-edit-user-first-name\">First Name</label>\n            <input type=\"text\" id=\"js-edit-user-first-name\" class=\"form-control\" name=\"edit-user-first-name\" value=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "firstName"), env.opts.autoescape);
output += "\" >\n        </div>\n\n        <div class=\"form-group\">\n            <label for=\"js-user-last-name\">Last Name</label>\n            <input type=\"text\" id=\"js-user-last-name\" class=\"form-control\" name=\"edit-user-last-name\" value=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "lastName"), env.opts.autoescape);
output += "\" >\n        </div>\n\n        <div class=\"form-group\">\n            <label for=\"js-edit-user-email\">Email</label>\n            <input type=\"text\" id=\"js-edit-user-email\" class=\"form-control\" name=\"edit-user-email\" value=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "email"), env.opts.autoescape);
output += "\" >\n        </div>\n\n        <div class=\"form-group\">\n            <label>id</label>\n            <input type=\"text\" class=\"form-control\" value=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "id"), env.opts.autoescape);
output += "\" disabled>\n        </div>\n        <div class=\"form-group\">\n            <label>Created At</label>\n            <input type=\"text\" class=\"form-control\" value=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "createdAt"), env.opts.autoescape);
output += "\" disabled>\n        </div>\n        \n    </form>\n</div>\n\n<div class=\"modal-footer\">\n    <button type=\"button\" class=\"btn btn-primary js-modal-save\">Gravar</button>\n    <button type=\"button\" class=\"btn btn-default js-modal-cancel\">Cancelar</button>\n\n    <div id=\"message-status\" style=\"margin-top: 35px;\"></div>\n    <div id=\"\" style=\"margin-top: 10px;\">\n        <h5 id=\"message-links\"></h5>\n    </div>\n</div>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["users/templates/users-row.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<td>";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "id"), env.opts.autoescape);
output += "</td>x\n\n<td>\n    ";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "firstName"), env.opts.autoescape);
output += "\n</td>\n\n<td>\n\t";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "lastName"), env.opts.autoescape);
output += "\n</td>\n\n<td>\n\t";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "email"), env.opts.autoescape);
output += "\n</td>\n\n<td>\n\t";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "createdAt"), env.opts.autoescape);
output += "\n</td>\n\n<td class=\"text-right\">\n    <button class=\"btn btn-primary btn-xs js-edit\"><span class=\"glyphicon glyphicon-pencil\"></span>\n    </button>\n    <button class=\"btn btn-danger btn-xs js-delete\"><span class=\"glyphicon glyphicon-trash\"></span>\n    </button>\n</td>\n\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["users/templates/users-tab.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<ul class=\"nav nav-tabs\">\n    <li role=\"presentation\" class=\"active\">\n        <a href=\"#\" class=\"js-dashboard-sep\" data-tab-separator=\"users-all\">Todos os utilizadores</a>\n    </li>\n    <li role=\"presentation\">\n        <a href=\"#\" class=\"js-dashboard-sep\" data-tab-separator=\"users-new\">Novo utilizador</a>\n    </li>\n</ul>\n\n<div id=\"users-region\"></div>";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["users/templates/users-table.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"xtable-responsive\">\n    <table class=\"table table-striped table-condensed table-dashboard\">\n\n        <thead>\n            <tr>\n            \n                <th style=\"width: 5%\">id</th>\n                <th style=\"width: 20%\">First Name</th>\n                <th style=\"width: 20%\">Last Name</th>\n                <th style=\"width: 25%\">email</th>\n                <th style=\"width: 20%\">Created At</th>\n\n                <th style=\"width: 10%\"></th>\n            </tr>\n        </thead>\n\n        <tbody>\n        </tbody>\n\n    </table>\n</div>\n\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
