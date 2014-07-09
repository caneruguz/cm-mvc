var logLoad = require('./logs');
var log = new logLoad.log();
var app = logLoad.app;

var WikiViewModel = function(){
        var self = this;
        /***** WIKI *******/
            // Get Wiki json file.
        self.wikiData = ko.observable({});
        $.getJSON("../wiki.json", function(data) {
            self.wikiData(new WikiModel(data));
            console.log("Wiki data", self.wikiData());
        })
        var WikiModel = function(data){
            this.title = ko.observable(data.title);
            this.content = ko.observable(data.content);
            this.version = ko.observable(data.version);
        }
        self.editMode = ko.observable(false);
        self.editToggle = function (){
            if(self.editMode()){
                self.editMode(false);
                var version = self.wikiData().version();
                self.wikiData().version(version+1);
                log.logData.push(new log.LogModel("wiki", self.wikiData().version()))
            } else {
                self.editMode(true);
            }

        }
    }

    module.exports = {
        wiki : WikiViewModel,
        log : log,
        app : app
    }

