var wikiViewModel = require('./viewmodel');

/***************   HOME PAGE MODULES   **************************/
/* Wiki Module  */
var wiki = {};

// an example of loading into a Model

// Long way of binding the data to view
wiki.controller = function(){
    var self = this;
    self.wiki = new wikiViewModel();
    self.wikiContent = m.prop({});
    var addData = function(){
        console.log(self.wiki.wikiData());
        self.wiki.wikiData(new self.wiki.WikiModel(self.wikiContent()));
    }

    m.request({method: "GET", url: "../wiki.json"}).then(self.wikiContent).then(addData);

    this.postRender = function(element, isInitialized, context){
        if(!isInitialized){
            ko.applyBindings(self.wiki, document.getElementById("cm-wiki"))
        }
    }

}

module.exports = wiki;