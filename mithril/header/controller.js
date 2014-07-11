headers.controller  = function(){
    var self = this;
    this.app  = appKO;
    this.postRender = function(element, isInitialized, context){
        if(!isInitialized){
            ko.applyBindings(self.app, document.getElementById("headers"))
        }
    }
}