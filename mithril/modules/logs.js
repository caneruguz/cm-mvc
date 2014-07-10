    var LogViewModel = function(){
        var self = this;
        /***** LOGS *******/
        self.logData = ko.observableArray([]);
        // Get Log json file.
        $.getJSON("../logs.json", function(data) {
            self.logData(data);
            console.log("Log data", self.logData());
        })
        self.LogModel = function(logType, logContent){
            var logText = "";
            switch(logType){
                case "comment" :
                    logText =  " commented ";
                    break;
                case "wiki" :
                    logText = " changed wiki to version ";
                    break;
            }

            this.logUser = app.appInfo().appUser;
            this.logUserID = app.appInfo().appUserID;
            this.logText = logText;
            this.logDate = new Date();
            this.logContent = logContent;
        }
        return self;
    };
