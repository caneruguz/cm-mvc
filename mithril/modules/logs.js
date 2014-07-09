var App = require('./app');
//var app = new appLoad();

var logs = {};

// Assign model directly to loaded content
logs.List =  m.request({method: "GET", url: "../logs.json"});

// Model for individual logs
logs.singleLog = function(logType, logContent){
    this.logText = "";
    switch(logType){
        case "comment" :
            this.logText =  " commented ";
            break;
        case "wiki" :
            this.logText = " changed wiki to version ";
            break;
    }
    this.logUser = App.info().appUser;
    this.logUserID = App.info().appUserID;;
    this.logDate = new Date();
    this.logContent = logContent;
}

// Log actions, add log
logs.controller = function(){
    // This example is not using the m.prop getter and setter since direct javascript makes more sense for one time log writing.
    // Add log -- This gets fired in the controller when comment is being added. Will implement for wiki as well.
    this.add = function(logType) {
        if (logType) {
            logs.List.push(new logs.singleLog(logType));
        }
    }.bind(this);

}

// Log layout, loads directly from the model, not through the controller.
logs.view = function(controller){
    return [
        m("h4", "Activity Log "),
        m("table.table.table-condensed", [
            m("tbody", [
                logs.List().map(function(log, index){
                    return m("tr", [
                        m("td", [
                            m("span.text-muted", log.logDate)
                        ]),
                        m("td", [
                            m("a[href='user/1']", log.logUser),
                            " ",
                            m("span.logText", log.logText),
                            m("i", log.logContent),
                            ".\n                        "
                        ])
                    ])
                })

            ])
        ])
    ]
}

module.exports = {
    log : logs,
    app : App
}