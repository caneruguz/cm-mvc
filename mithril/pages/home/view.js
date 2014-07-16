
var exports  = require('./controller');

var home = exports.home;
var wiki = exports.wiki;
var comments = exports.comments;
var log = require('../../logs/view');


home.view = function (ctrl){
    return [
        m("div.container", [
            m("div.row", [
                m("div.col-md-8#cm-wiki", [ wiki.view(ctrl.wikiControl), comments.view(ctrl.commentsControl)]),
                m("div.col-md-4#cm-logs", log.view(ctrl.logsControl))
            ])

        ])
    ];
}


module.exports = home;