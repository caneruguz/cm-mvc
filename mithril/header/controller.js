var AppViewModel = require('./viewmodel');


var header = {};
header.app = new AppViewModel();
header.controller  = function(){
    var self = this;
    this.template = m.prop("");
    this.app = header.app;
    var deserialize = function (value){
        return value;
    }
    m.request({method: "GET", url: "./header/template.html", deserialize: deserialize}).then(this.template);
    console.log(this.template());
    this.postRender = function(element, isInitialized, context){
        if(!isInitialized){
            console.log(isInitialized);
            ko.applyBindings(self.app, document.getElementById("header"))
        }
    }
}

module.exports = header;


