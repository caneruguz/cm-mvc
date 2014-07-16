// Using knockout viewmodel and knockout html
var $ = require('../../js/jquery');

var AppViewModel = function (){

    var self = this;
    self.currentPage = ko.observable("home");
    self.script = {
        title : "Knockout JS",
        url : "http://knockoutjs.com"
    }
    self.thisPage = ko.observable({
        title : "",
        desc : ""
    })
    self.activePage = function(thisPage){
        if (self.currentPage() == thisPage ){
            return "active"
        } else {
            return ""
        }
    }
    self.isHome = ko.computed(function() {
        console.log(self.currentPage());
        if ( self.currentPage() == "home") {
            return true;
        } else {
            return false;
        }
    })
    console.log(self.isHome());
    self.listPages = ko.computed(function(){
        if ( self.currentPage() == "home") {
            return [
                {
                    title : "Home",
                    active : "active",
                    desc : "Something about the home",
                    href : "?/home"
                },
                {
                    title : "About",
                    active : "",
                    desc : "This is the about page.",
                    href : "?/about"
                }
            ];
        } else {
            return [
                {
                    title : "Home",
                    active : "",
                    desc : "Something about the home",
                    href : "?/home"
                },
                {
                    title : "About",
                    active : "active",
                    desc : "This is the about page.",
                    href : "?/about"
                }
            ];
        }
    })

        ko.observableArray([
        {
            title : "Home",
            active : self.activePage("home"),
            desc : "Something about the home",
            href : "?/home"
        },
        {
            title : "About",
            active : self.activePage("about"),
            desc : "This is the about page.",
            href : "?/about"
        }
    ]);

    /***** APP INFO *******/
    self.appInfo = ko.observable({});
    // Get App information json file.
    $.getJSON("../app.json", function(data) {
        self.appInfo(data);
        console.log("AppInfo", self.appInfo());
    })

}

module.exports = AppViewModel;