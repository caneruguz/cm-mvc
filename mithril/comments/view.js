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
