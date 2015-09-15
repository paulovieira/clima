(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["main-menu/templates/main-menu.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<ul>\n    <li data-name=\"a\">one</li>\n    <li data-name=\"b\" id=\"two\">two</li>\n    <li data-name=\"c\">three</li>\n</ul>\n<button id=\"move\">delete</button>\n<button id=\"check\">check</button>\n";
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
