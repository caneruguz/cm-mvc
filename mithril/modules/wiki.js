
/* Wiki Module  */
var logLoad = require('./logs');
var logs = logLoad.log;
var App = logLoad.app;

var wiki = {};

// an example of loading into a Model
wiki.Data = function () {
    return m.request({method: "GET", url: "../wiki.json"});
};

// Long way of binding the data to view
wiki.controller = function(){
    this.content = m.prop("");
    this.title = m.prop("");
    this.wikiInfo = wiki.Data().then(function(info){
        this.content(info.content);
        this.title(info.title);
    }.bind(this));
    this.version = 1;
    this.edit = m.prop("cmhide");
    this.preview = m.prop("cmshow");

    // when the edit button is clicked.
    // Render editable title
    // Render editable textarea with the information in it

    this.showEdit = function (){
        this.edit("cmshow");
        this.preview("cmhide");
    }.bind(this);

    // When the preview button is clicked
    // Render static title
    // Render static text
    this.showPreview = function(){
        this.edit("cmhide");
        this.preview("cmshow");
        this.version++;
        logs.List().push(new logs.singleLog("wiki", this.version));
    }.bind(this);

}

// Wiki html
wiki.view = function (controller) {
    return [ m(".panel.panel-default", { class : controller.preview() }, [
        m(".panel-heading", [
            m(".row", [
                m(".col-md-9", [
                    m("h2.panel-title", controller.title())
                ]),
                m(".col-md-3.cm-wikiBar", [
                    m(".btn-group", [
                        m("button.btn.btn-sm.btn-default[type='button']",{ onclick : controller.showEdit }, "Edit"),
                        m("button.btn.btn-sm.btn-default.active[type='button']", "Preview")
                    ])
                ])
            ])
        ]),
        m(".panel-body", [
            m("p#wiki-preview", controller.content())
        ])
    ]),
        m(".panel.panel-default", { class : controller.edit() }, [
            m(".panel-heading", [
                m(".row", [
                    m(".col-md-9", [
                        m("span", "Change Title: "), m("input.form-control", { onchange: m.withAttr("value", controller.title), value: controller.title()} )
                    ]),
                    m(".col-md-3.cm-wikiBar", [
                        m(".btn-group", [
                            m("button.btn.btn-sm.btn-default.active[type='button']", "Edit"),
                            m("button.btn.btn-sm.btn-default[type='button']",{onclick : controller.showPreview }, "Preview")
                        ])
                    ])
                ])
            ]),
            m(".panel-body", [
                m("textarea#wiki-edit", { onchange: m.withAttr("value", controller.content), value: controller.content()} )
            ])
        ])]
};

module.exports = {
    wiki : wiki,
    log : logs,
    app : App
}