define(['modules/app', 'modules/wiki', 'modules/logs', 'modules/comments', 'knockout', 'jquery'], function (app, wiki, logs, comments, ko, $) {
    var app = new app();
    var log = new logs();
    var wiki = new wiki();
    var comment = new comments();

    ko.applyBindings(app, document.getElementById("headers"));
    ko.applyBindings(wiki, document.getElementById("cm-wiki"));
    ko.applyBindings(comment, document.getElementById("cm-comment"));
    ko.applyBindings(log, document.getElementById("cm-logs"));

    var returnedModule = function () {

    };

    return returnedModule;

});





