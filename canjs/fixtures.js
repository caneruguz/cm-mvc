/* Fixtures mimic the server interaction so that we can use CanJS server interaction examples */

// Get App information
var App = {
        "data" : [
        {
            "appTitle": "Framework Testing",
            "appDesc" : "Some description about the app. This data is being loaded from the server.",
            "appUser" : "Caner Uguz",
            "appUserID" : 1
        }
    ]};
can.fixture("GET /app", function(){ return App; });

// Wiki Table
var Wiki = {
    "data" :  [
        {
            "id" : 1,
            "title" : "Wiki Title Loaded from server",
            "content" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mauris ligula, ultrices at turpis nec, vestibulum dapibus purus. Cras at lacinia ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam erat volutpat. Proin quam nisl, suscipit eget justo nec, commodo scelerisque magna. Cras felis odio, fringilla ut suscipit sit amet, posuere id nulla. Pellentesque molestie nisl urna, ac facilisis lacus hendrerit et. Donec vitae risus mauris. Nunc dignissim ullamcorper nulla, eu fermentum velit. Nullam luctus tellus quam, ac lacinia mi vehicula nec. Praesent consectetur auctor dolor at varius. Etiam auctor velit id nisi congue molestie. \n Suspendisse nec porttitor leo, eget pellentesque sem. Mauris vel commodo ipsum. Morbi dapibus auctor tortor, in consectetur arcu aliquam sit amet. Phasellus urna nibh, dignissim a dignissim quis, egestas ut mauris. Ut at eros porta, dapibus erat in, interdum velit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus sit amet neque malesuada, laoreet arcu quis, pulvinar nisl. In at lectus ut ante faucibus varius."
        },
        {
            "id" : 1,
            "title" : "A completely different wiki",
            "content" : "Consectetur adipiscing elit. Cras mauris ligula, ultrices at turpis nec, vestibulum dapibus purus. Cras at lacinia ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam erat volutpat. Proin quam nisl, suscipit eget justo nec, commodo scelerisque magna. Cras felis odio, fringilla ut suscipit sit amet, posuere id nulla. Pellentesque molestie nisl urna, ac facilisis lacus hendrerit et. Donec vitae risus mauris. Nunc dignissim ullamcorper nulla, eu fermentum velit. Nullam luctus tellus quam, ac lacinia mi vehicula nec. Praesent consectetur auctor dolor at varius. Etiam auctor velit id nisi congue molestie. \n Suspendisse nec porttitor leo, eget pellentesque sem. Mauris vel commodo ipsum. Morbi dapibus auctor tortor, in consectetur arcu aliquam sit amet. Phasellus urna nibh, dignissim a dignissim quis, egestas ut mauris. Ut at eros porta, dapibus erat in, interdum velit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus sit amet neque malesuada, laoreet arcu quis, pulvinar nisl. In at lectus ut ante faucibus varius."
        }
    ]};
can.fixture("GET /wiki/{id}", function(request){
    return Wiki.data[(+request.data.id)-1];
});


// Logs Table

var Logs = {
    "data" : [
        {
            "logUser" : "Mark Brown",
            "logUserID" : 2,
            "logText" : "commented ",
            "logContent" : "This is interesting",
            "logDate" : "2014-06-27 10:01:00"
        },
        {
            "logUser" : "Loretta James",
            "logUserID" : 3,
            "logText" : "changed wiki to ",
            "logContent" : "version 6",
            "logDate" : "2014-06-27 10:01:00"
        }
    ]
};
can.fixture("GET /logs", function(){ return Logs; });

// Comments Table'

var Comments =  {
    "data" : [
        {
            "id" : 1,
            "userid" : 23,
            "username" : "Jeff",
            "content" : "This is a comment",
            "replySource" : 0,
            "date" : "2014-06-26 10:00:00"
        },
        {
            "id" : 2,
            "userid" : 25,
            "username" : "Josh",
            "content" : "Another comment to text",
            "replySource" : 0,
            "date" : "2014-06-26 10:20:00"
        },
        {
            "id" : 3,
            "userid" : 26,
            "username" : "Caner",
            "content" : "Reply to a comment, not text.",
            "replySource" : 1,
            "date" : "2014-06-26 10:40:00"
        },
        {
            "id" : 4,
            "userid" : 26,
            "username" : "Caner",
            "content" : "Vivamus sit amet neque malesuada, laoreet arcu quis, pulvinar nisl. In at lectus ut ante faucibus varius",
            "replySource" : 3,
            "date" : "2014-06-26 11:20:00"
        },
        {
            "id" : 7,
            "userid" : 26,
            "username" : "Caner",
            "content" : "reply to Josh.",
            "replySource" : 2,
            "date" : "2014-06-26 11:25:00"
        }
    ]
}
can.fixture("GET /comment", function(){ return Comments; });

