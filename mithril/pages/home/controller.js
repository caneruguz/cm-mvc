// Home page
var home = {};
home.controller = function(){
    //this.pageInfo = new App.pageInfo({title : "Framework Application", active : "home", desc : "This page is built with Mithril.js. ", html : function(){ return m("a.btn.btn-info[href='http://lhorie.github.io/mithril/']", "Learn More"); }});
    //this.navControl = new navbar.controller(this.pageInfo.active());
    m.module(document.getElementById("headers"), headers);

    this.wikiControl = new wiki.controller();
    this.logsControl = new logs.controller();
    this.commentsControl = new comments.controller();
}