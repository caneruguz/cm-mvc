
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
