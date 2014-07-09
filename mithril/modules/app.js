var bs = require('../../js/bootstrap.min');
var m = require('../mithril');
global.window.m = m;

// App module  -- Sets global app variables and settings, does not generate views
// Define module :
var App = {};
// Load information from server that will be the same for all apps
App.info = m.request({method: "GET", url: "../app.json"});
// Define information for this app only
App.script = m.prop({
    title : "Mithril",
    url : "http://lhorie.github.io/mithril/"
});
App.pageInfo = function(data){
    this.title = m.prop(data.title);
    this.active = m.prop(data.active);
    this.desc = m.prop(data.desc);
    this.html = m.prop(data.html);
}

/***************   TEMPLATE MODULES   **************************/
// Quick modules for mainly view purposes. These are built to mimic templates, they get reused for each page

// Navigation bar with pages
var navbar = {
    controller : function(activePage){
        this.active = activePage;
    },
    view : function(ctrl){
        var homeClass = "";
        var aboutClass ="";
        switch (ctrl.active) {
            case "home":
                homeClass = ".active";
                break;
            case "about" :
                aboutClass = ".active";
                break;
        }
        return [m("nav.navbar.navbar-default.navbar-static-top[role='navigation']", [
            m(".container", [
                m(".collapse.navbar-collapse[id='bs-example-navbar-collapse-1']", [
                    m("ul.nav.navbar-nav", [
                        m("li"+homeClass, [m("a[href='?/home']", "Home")]),
                        m("li"+aboutClass, [m("a[href='?/about']", "About")])
                    ]),
                    m("ul.nav.navbar-nav.navbar-right", [
                        m("li", [m("a", "You are logged in as " + App.info().appUser)])
                    ])
                ])
            ]),
            "\n"
        ])
        ]
    }
}

// Page titles and descriptions
var header = {
    controller : function (pageInfo){
        this.page = pageInfo;
    },
    view : function (ctrl){
        return  m(".jumbotron", [
            m(".container", [
                m("h2", ctrl.page.title()),
                m("p", ctrl.page.desc()),
                m("p", ctrl.page.html()())
            ]),
            "\n"
        ]);
    }
}

// Page footer
var footer = {
    controller : function () {

    },
    view : function (ctrl){
        return [
            m("hr"),
            m("div.text-muted", "Built by COS")
        ]
    }
}

module.exports = App;
global.window.navbar = navbar;
global.window.header = header;
global.window.footer = footer;