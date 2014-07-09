var commentLoad = require('./comments');

var App = commentLoad.app;
var logs = commentLoad.log;
var wiki = commentLoad.wiki;
var comments = commentLoad.comment;



/***************   ROUTING AND PAGES **************************/
// Simple About page, uses the page components as templates.
var about = {};
about.controller = function(){
    this.pageInfo = new App.pageInfo({title : "About Us", active : "about", desc : "Learn more about us.", html : function(){return ""; }});
    this.navControl = new navbar.controller(this.pageInfo.active());
    this.headerControl = new header.controller(this.pageInfo);
}
about.view = function(controller){
    return [
        navbar.view(controller.navControl),
        header.view(controller.headerControl),
        m("div.container", [
            m("div", "More about the about page."),
            footer.view()
        ])
    ];
}

// Home page
var home = {};
home.controller = function(){
    this.pageInfo = new App.pageInfo({title : "Framework Application", active : "home", desc : "This page is built with Mithril.js. ", html : function(){ return m("a.btn.btn-info[href='http://lhorie.github.io/mithril/']", "Learn More"); }});
    this.navControl = new navbar.controller(this.pageInfo.active());
    this.headerControl = new header.controller(this.pageInfo);
    this.wikiControl = new wiki.controller();
    this.logsControl = new logs.controller();
    this.commentsControl = new comments.controller();
}
home.view = function (ctrl){
    return [
        navbar.view(ctrl.navControl),
        header.view(ctrl.headerControl),
        m("div.container", [
            m("div.row", [
                m("div.col-md-8#cm-wiki", wiki.view(ctrl.wikiControl)),
                m("div.col-md-4#cm-logs", logs.view(ctrl.logsControl))
            ]),
            comments.view(ctrl.commentsControl),
            footer.view()
        ])
    ];
}

/* Route - Initializes the app */
m.route(document.body, "/", {
    "/": home,
    "/about" : about
});
