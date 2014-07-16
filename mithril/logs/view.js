var log = require('./controller')

// Log layout, loads directly from the model, not through the controller.
log.view = function(controller){
    return [
        m("h4", "Activity Log "),
        m("table.table.table-condensed", [
            m("tbody", [
                log.List().map(function(log, index){
                    return m("tr", [
                        m("td", [
                            m("span.text-muted", log.logDate)
                        ]),
                        m("td", [
                            m("a[href='user/1']", log.logUser),
                            " ",
                            m("span.logText", log.logText),
                            m("i", log.logContent),
                            ".\n                        "
                        ])
                    ])
                })

            ])
        ])
    ]
}

module.exports = log;