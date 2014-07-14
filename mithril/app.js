// Load libraries
var bs = require('../js/bootstrap.min');
var m = require('./lib/mithril');
global.window.m = m;
var ko = require('./lib/knockout');
global.window.ko = ko;

// Load Pages
var home = require('./pages/home/view');
global.window.home = home;
var about = require('./pages/about/view');
global.window.about= about;



m.route(document.getElementById("app"), "/", {
    "/": home,
    "/about" : about
});