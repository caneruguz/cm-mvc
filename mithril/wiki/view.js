var wiki = require('./controller');

// Wiki html
wiki.view = function (controller) {
    return [
        [m(".panel.panel-default", { config: controller.postRender }, [
            m(".panel-heading", [
                m(".row", [
                    m(".col-md-9", [
                        m("[data-bind='visible: !editMode()']", [" ",m("h2.panel-title[data-bind='text: wikiData().title']")," "]),
                        m("[data-bind='visible: editMode']", [
                            " ",
                            m("input.form-control[data-bind='value: wikiData().title']")
                        ])
                    ]),
                    m(".col-md-3.cm-wikiBar", [
                        m(".btn-group", [
                            m("button.btn.btn-sm.btn-default[data-bind='css: {active : editMode }, click : editToggle'][type='button']", "Edit"),
                            m("button.btn.btn-sm.btn-default[data-bind='css: {active : !editMode() }, click : editToggle'][type='button']", "Preview")
                        ])
                    ])
                ])
            ]),
            m(".panel-body", [
                m("[data-bind='visible: !editMode(), text : wikiData().content']", " "),
                m("[data-bind='visible: editMode']", [" ",m("textarea#wiki-edit[data-bind='value: wikiData().content']", [

                ])," "])
            ]),
            m(".panel-footer", ["Wiki Version: ",m("span[data-bind='text: wikiData().version']")])
        ])]
    ]
};

module.exports = wiki;