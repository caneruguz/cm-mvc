var comments = require('./viewmodel');
var Mustache = require('../lib/mustache');
var log = require('../logs/view');
var $ = require('../../js/jquery');

    comments.controller = function (){
        var self = this;
        // Filter search term to use for filtering later.
        this.filterText = m.prop("");

        // Declare and empty setter for content of the comment to bind it to the form.
        this.content = m.prop("");

        // Add Comment with jquery and mustache
        $(document).on('click', '#addComment', function(){
            var commentText = $('#commentText').val();
            comments.List().push(new comments.comment(commentText));
            log.List().push(new log.singleLog("comment", commentText));
            console.log("Comments", comments.List());
            getMustache();
            m.redraw();

        })
        $(document).on('keyup', '#filterText', function(){
            var text = $('#filterText').val();
            self.filterText(text);
            self.filter();
//            m.redraw()
//          console.log(text);
        })


        this.file = m.prop("");
        this.template= m.prop("");

        // Get mustache template
        var getMustache = function(){
             var deserialize = function (value){
                return value;
            }
            var writeTemplate = function (){
                self.template(Mustache.render(
                    self.file(),
                    { list : comments.List()}
                ));
            }
            m.request({method: "GET", url: "./comments/view.mustache", deserialize: deserialize}).then(self.file).then(writeTemplate);
        }
        getMustache();
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
            console.log(comments.List());
            getMustache();
            console.log('Filter text', this.filterText());

        }.bind(this);

        this.test = function(e){
            m.withAttr("value", this.filterText)(e);
            this.filter();
        }.bind(this);
    }

   module.exports = comments;