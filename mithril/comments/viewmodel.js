
    var CommentViewModel = function(){
        var self = this;
        /***** COMMENTS *******/
        self.commentData = ko.observableArray([]);
        self.newCommentContent = ko.observable("");
        self.filterText = ko.observable("");

        // Get Comment json file.
        $.getJSON("../comments.json", function(data) {
            self.commentData(data);
            console.log("Comment data", self.commentData());
        })
        var CommentModel = function(data){
            console.log(app.appInfo().appUser);
            this.userid = app.appInfo().appUserID;
            this.username = app.appInfo().appUser;
            this.content = data;
            this.date = new Date();
        }
        self.addComment = function(){
            self.commentData.push(new CommentModel(self.newCommentContent()));
            console.log(log.logData());
            log.logData.push(new log.LogModel("comment", self.newCommentContent()));
            self.newCommentContent("");
        }
        self.filterComments = ko.computed(function() {
            var filter = self.filterText().toLowerCase();
            console.log(self.filterText());

            if (!filter) {
                return self.commentData();
            } else {
                return ko.utils.arrayFilter(self.commentData(), function(comment) {
                    var returned = comment.content.indexOf(self.filterText());
                    console.log(returned !== -1);
                    return returned !== -1;
                });
            }
        });
    }


    // Mithril Version
//    /* Comment Module */
//    var comments = {};
//
//    // Load existing comments from server
//    comments.List = m.request({method: "GET", url: "../comments.json"});
//
//    // Comment Model, uses information from the App about User.
//    comments.comment = function(content){
//        this.userid = App.info().appUserID;
//        this.username = App.info().appUser;
//        this.content = content;
//        this.date = new Date();
//    }
//
//    comments.controller = function (){
//        // Filter search term to use for filtering later.
//        this.filterText = m.prop("");
//
//        // Declare and empty setter for content of the comment to bind it to the form.
//        this.content = m.prop("");
//
//        // add comment
//        this.add = function () {
//            if(this.content()){
//                // New comment
//                comments.List().push(new comments.comment(this.content()));
//                // Log this behavior by adding a new Log model
//                logs.List().push(new logs.singleLog("comment", this.content()));
//                // Reset the form for new comments.
//                this.content("");
//            }
//        }.bind(this);
//
//        // filtering
//        // Get the text
//        // Go through each comment
//        // Compare text
//        // If found, add to comment an attribute called cmshow
//        // If not found, add to the comment and attribute called cmhide
//        this.filter = function (){
//            var result;
//            if(this.filterText()){
//                comments.List().map(function(comment, index){
//                    result = comment.content.indexOf(this.filterText());
//
//                    if(result !== -1){
//                        comment.show = "tableshow";
//                    } else {
//                        comment.show = "cmhide"
//                    }
//                }.bind(this));
//            } else {
//                comments.List().map(function(comment, index){
//                    comment.show = "tableshow";
//                }.bind(this));
//            }
//            console.log('Filter text', this.filterText());
//
//        }.bind(this);
//
//        this.test = function(e){
//            m.withAttr("value", this.filterText)(e);
//            this.filter();
//        }.bind(this);
//    }
