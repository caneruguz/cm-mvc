/*
Root Module
 */




var commentLoad = require('./comments');


ko.applyBindings(commentLoad.app, document.getElementById("headers"));
ko.applyBindings(commentLoad.log, document.getElementById("cm-logs"));
ko.applyBindings(commentLoad.wiki, document.getElementById("cm-wiki"));
ko.applyBindings(commentLoad.comment, document.getElementById("cm-comment"));

