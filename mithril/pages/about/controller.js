// Simple About page, uses the page components as templates.
var about = {};
about.controller = function(){
    this.pageInfo = new App.pageInfo({title : "About Us", active : "about", desc : "Learn more about us.", html : function(){return ""; }});
    this.navControl = new navbar.controller(this.pageInfo.active());
    this.headerControl = new header.controller(this.pageInfo);
}