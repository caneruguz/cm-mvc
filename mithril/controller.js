var app = app || {};

(function(){

// Add Comments
app.controller = function() {
	this.list = new app.CommentList();
	this.content = m.prop("");
	this.add = function(content) {
	    if (content()) {
	        this.list.push(new app.Comment({content: this.content()}));
	        this.content("");
	        console.log(this.list);
	    }
	}.bind(this);

}


})(); 
