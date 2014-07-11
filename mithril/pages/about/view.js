about.view = function(controller){
    return [
        navbar.view(controller.navControl),
        header.view(controller.headerControl),
        m("div.container", [
            m("div", "More about the about page."),
            footer.view()
        ])
    ];
}
