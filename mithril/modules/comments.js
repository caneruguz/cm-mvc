/* Comment Module */
var wikiLoad = require('./wiki');
var wiki = wikiLoad.wiki;
var App = wikiLoad.app;
var logs = wikiLoad.log;


var comments = {};

// Load existing comments from server
comments.List = m.request({method: "GET", url: "../comments.json"});

// Comment Model, uses information from the App about User.
comments.comment = function(content){
    this.userid = App.info().appUserID;
    this.username = App.info().appUser;
    this.content = content;
    this.date = new Date();
}

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

// Loads commenting form and list of comments
comments.view = function(ctrl){
    return [" ",m(".row", [
        m(".col-sm-8.col-xs-12", [
            m(".col-xs-12[id='cm-comment']", [
                m(".row", [
                    m(".col-xs-8", [
                        m("h4", "Comments")
                    ]),
                    m(".col-xs-4", [
                        m("input.form-control.input-sm[placeholder='filter'][type='text']", { onkeyup: ctrl.test, value : ctrl.filterText()} )
                    ])
                ]),
                m("hr"),
                m("[id='cm-boxWrapper']", [
                    m(".row", [
                        m(".col-xs-9", [
                            m("textarea.cm-box", {onchange: m.withAttr("value", ctrl.content), value: ctrl.content()})
                        ]),
                        m(".col-xs-3", [
                            m("button.btn.btn-default.btn-block.btn-lg", {onclick: ctrl.add}, " Add ")
                        ])
                    ]),
                    m(".row", [
                        m(".col-xs-12[id='cm-commentList']", [
                            m("table.table.table-condensed", [
                                m("tbody", [
                                    comments.List().map(function(comment, index){
                                        return m("tr",{ class : comment.show }, [
                                            m("td", [
                                                m("b", comment.username)
                                            ]),
                                            m("td", comment.content),
                                            m("td", [
                                                m("span.text-muted", comment.date)
                                            ])
                                        ])

                                    })

                                ])
                            ])
                        ])
                    ])
                ])
            ])
        ]),
        m(".col-sm-4.col-xs-12", [
            m("[id='cm-logs']", [

            ])
        ])
    ])]
}

module.exports = {
    comment : comments,
    app : App,
    log : logs,
    wiki : wiki
};
