var home = home || {};

(function(){

        home.controller =  function() {
            this.message = m.route.param("message");
        };

        home.view =  function(controller) {
            return m("div", controller.message);
        }


})();
