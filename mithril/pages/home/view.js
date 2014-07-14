
var exports  = require('./controller');

var home = exports.home;
var wiki = exports.wiki;
var comments = exports.comments;


home.view = function (ctrl){
    return [
        m("div.container", [
            m("div.row", [
                m("div.col-md-8#cm-wiki", wiki.view(ctrl.wikiControl)),
                m("div.col-md-4#cm-logs", logs.view(ctrl.logsControl))
            ]),
            comments.view(ctrl.commentsControl),
        ])
    ];
}


module.exports = home;