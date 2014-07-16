/* Logs Module  */
// Using only Mithril
var header = require('../header/view');


var log = {};

// Assign model directly to loaded content
log.List =  m.request({method: "GET", url: "../logs.json"});

// Model for individual logs
log.singleLog = function(logType, logContent){
    this.logText = "";
    switch(logType){
        case "comment" :
            this.logText =  " commented ";
            break;
        case "wiki" :
            this.logText = " changed wiki to version ";
            break;
    }
    return {
        logUser : header.app.appInfo().appUser,
        logUserID : header.app.appInfo().appUserID,
        logDate : new Date(),
        logContent : logContent,
        logText : this.logText
    }
}

// Log actions, add log
log.controller = function(){
    // This example is not using the m.prop getter and setter since direct javascript makes more sense for one time log writing.
    // Add log -- This gets fired in the controller when comment is being added. Will implement for wiki as well.
    this.add = function(logType) {
        if (logType) {
            log.List().push(new logs.singleLog(logType));
        }
    }.bind(this);

}

module.exports = log;

// Knockout Version
//    var LogViewModel = function(){
//        var self = this;
//        /***** LOGS *******/
//        self.logData = ko.observableArray([]);
//        // Get Log json file.
//        $.getJSON("../logs.json", function(data) {
//            self.logData(data);
//            console.log("Log data", self.logData());
//        })
//        self.LogModel = function(logType, logContent){
//            var logText = "";
//            switch(logType){
//                case "comment" :
//                    logText =  " commented ";
//                    break;
//                case "wiki" :
//                    logText = " changed wiki to version ";
//                    break;
//            }
//
//            this.logUser = app.appInfo().appUser;
//            this.logUserID = app.appInfo().appUserID;
//            this.logText = logText;
//            this.logDate = new Date();
//            this.logContent = logContent;
//        }
//        return self;
//    };
