var about = require('./controller');

about.view = function(controller){
    return [
        m("div.container", [
            m("div", "More about the about page.")
        ])
    ];
}

module.exports = about;