var ko = require("knockout");
window.ko = ko;

var AppViewModel = function (){

    var self = this;

    self.script = {
        title : "Knockout JS",
        url : "http://knockoutjs.com"
    }
    self.isHome = true;
    self.currentPage = ko.observable("home");
    self.listPages = ko.observableArray([
        {
            title : "Home",
            active : "active",
            desc : "Something about the home",
            href : "home"
        },
        {
            title : "About",
            active : "",
            desc : "This is the about page.",
            href : "about"
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




