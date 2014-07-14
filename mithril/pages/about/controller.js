var header = require('../../header/view');
global.window.header = header;
var logs = require('../../logs/view');
global.window.log = logs;

// Simple About page, uses the page components as templates.
var about = {};

about.controller = function(){

    header.app.currentPage("about");
    header.app.thisPage({title: "About Us", desc : "This is the about page. "});
    console.log(header.app.currentPage());
    console.log(header.app.isHome());
    m.module(document.getElementById("header"), header);
}

module.exports = about;