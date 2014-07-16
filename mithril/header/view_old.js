
var header = require('./controller');
header.view =  function(ctrl){
    return m("div", { config: ctrl.postRender }, [
        m.trust(ctrl.template())
    ])
}
module.exports = header;

