var comments = require('./viewmodel');

    comments.controller = function (){
        // Filter search term to use for filtering later.
        this.filterText = m.prop("");

        // Declare and empty setter for content of the comment to bind it to the form.
        this.content = m.prop("");

        // add comment
        this.add = function () {
            if(this.content()){
                // New comment
                comments.List().push(new comments.comment(this.content()));
                // Log this behavior by adding a new Log model
                logs.List().push(new logs.singleLog("comment", this.content()));
                // Reset the form for new comments.
                this.content("");
            }
        }.bind(this);

        // Get mustache template
        this.file = m.prop("");
        var deserialize = function (value){
            return value;
        }
        m.request({method: "GET", url: "./comments/view.mustache", deserialize: deserialize}).then(this.file);

        this.template = Mustache.render(this.template(), comments.List());

        // filtering
        // Get the text
        // Go through each comment
        // Compare text
        // If found, add to comment an attribute called cmshow
        // If not found, add to the comment and attribute called cmhide
        this.filter = function (){
            var result;
            if(this.filterText()){
                comments.List().map(function(comment, index){
                    result = comment.content.indexOf(this.filterText());

                    if(result !== -1){
                        comment.show = "tableshow";
                    } else {
                        comment.show = "cmhide"
                    }
                }.bind(this));
            } else {
                comments.List().map(function(comment, index){
                    comment.show = "tableshow";
                }.bind(this));
            }
            console.log('Filter text', this.filterText());

        }.bind(this);

        this.test = function(e){
            m.withAttr("value", this.filterText)(e);
            this.filter();
        }.bind(this);
    }

   module.exports = comments;