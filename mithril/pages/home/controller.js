var header = require('../../header/view');
var comments  = require('../../comments/view');
var wiki = require('../../wiki/view');
var log = require('../../logs/view');

// Home page
var home = {};
home.controller = function(){
    console.log(header.app);

    header.app.currentPage("home");
    m.module(document.getElementById("header"), header);

    this.wikiControl = new wiki.controller();
    this.logsControl = new log.controller();
    this.commentsControl = new comments.controller();
}
console.log(comments, wiki, home)
module.exports = { home : home, wiki : wiki, comments : comments};