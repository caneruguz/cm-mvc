var app = app || {};
var home = home || {};


(function( window ) {

    m.route(document.getElementById('cm-app'), '/', {
        '/': app,
        '/home/:message' : home
    });

    m.route.mode = "hash";

})(window);
