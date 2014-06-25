var app = app || {};

(function(){
  
      // Info Model that contains general information about the module  
      app.Info = function(data){
        this.title = m.prop(data.title);
        this.description = m.prop(data.description);  
        this.script = m.prop("mithril"); 
        this.loggedUser = m.prop(data.user) 
      }; 

      app.Comment = function(data){
        this.content = m.prop(data.content);
        this.username = m.prop(data.user);
      }; 

      var list = [];
      app.CommentList = function() {
          return list;
      }
//    app.CommentList = function() {
//        return m.request({method: "GET", url: "../data.json"});
//    };



})(); 
