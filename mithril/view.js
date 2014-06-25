var app = app || {};

(function () {
    app.ShowCommentsView = function(makeComment) {
        return m("div#cm-showComments", [
            makeComment.list.map(function(comment, index){
                return   m("ul", [
                    m("li", {value : comment.content()} )
                ])
            })

        ])
    };

    app.ShowFormView = function(blankComment, makeComment){
        return  m("div#cm-addComment", [
            m("textarea.cm-box", {onchange: m.withAttr("value", blankComment.content), value: blankComment.content()}),
            m("button.btn.btn-info.cm-boxSubmit", {onclick: makeComment.add}, "Add"),
        ])
    }

    app.headerView = function(info){
        return  m("div", [
            m('h2#cm-title.', info.title()),
            m("p#cm-desc.lead", info.description())
        ])
    }

    var makeComment = new app.controller();
    var blankComment = new app.Comment({content : ""});
    // Render Headers
    // Add some info to the module
    var MyComment = new app.Info({title:"Commenting module", description: "Using Mithril framework",  user : "Caner" });
    m.render(document.getElementById("cm-header"), app.headerView(MyComment));
    m.render(document.getElementById("cm-wrapper"), app.ShowFormView(blankComment, makeComment));
    m.render(document.getElementById("cm-wrapper"), app.ShowCommentsView(makeComment));

})(); 