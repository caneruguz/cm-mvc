
    // Initialize the module
    var grid = function(options){
        var top = this;
        this.options = options;
        // Set default option properties if not given by the
        if(!top.options.hasOwnProperty("placement")){ top.options.placement= "grid" }
        if(!top.options.hasOwnProperty("sourceURL")){ top.options.sourceURL = "sample.json" }
        if(!top.options.hasOwnProperty("sort")){ top.options.sort = true }

        // Set property for data and get the data
        top.data = m.prop({});
        m.request({method: "GET", url: top.options.sourceURL}).then(top.data).then(function(){console.log(top.data())});

        // For adding new models, this should be externally handled.
        top.model = function (level){
            this.level = level;
            this.id = Math.floor(Math.random()*(1000000));
            this.name  = "JohnnyB. Goode";
            this.title  =  "Around the World in 80 Days";
            this.date = new Date;
            this.children = [];
        }

        top.controller = function () {
            var self = this;
            this.data = grid.data;
            this.todelete = m.prop(0);
            this.toadd = m.prop(0);
            this.temp = {}; // temporary object

            this.add = function(){ self.traverse("add", self.toadd()); };
            this.delete = function(){ self.traverse("delete", self.todelete())};
            this.toggle = function(toggleid){ console.log(toggleid);  self.traverse("toggle", toggleid)};

            this.move = function(from, to){
                console.log(from, to);
                var inner = this;
                var temp = {};
                inner.pull = function redo(data){
                    data.map(function(item, index, array){
                        if (item.id == from){
                            console.log("Found from", item.id);
                            array.splice(index, 1);
                            temp = item;
                            inner.push(self.data());
                        } else {
                            if(item.children.length > 0){
                                redo(item.children);
                            }
                        }

                    })
                }

                inner.push = function redo(data){
                    data.map(function(item, index, array){
                        if (item.id == to){
                            console.log("Found to", item.id);
                            temp.level = item.level+1;
                            item.children.push(temp);
                            m.redraw();
                        } else {
                            if(item.children.length > 0){
                                redo(item.children);
                            }
                        }
                    })
                }
                inner.pull(self.data());
            };


            this.traverse = function (action, id){
                var recursive = function redo(data){
                    var data = data || self.data();
                    data.map( function(item, index, array){
                        if (item.id == id){
                            // if item is found do things
                            switch(action){
                                case "pull":
                                    array.splice(index, 1);
                                    self.temp = item;
                                    self.traverse("push",self.toid());
                                    console.log("push", self.toid());
                                    break;
                                case "push":
                                    self.temp.level = item.level+1;
                                    item.children.push(self.temp);
                                    console.log(item.children);
                                    break;
                                case "delete":
                                    array.splice(index, 1);
                                    break;
                                case "add" :
                                    var level = item.level+1;
                                    item.children.push(new grid.model(level));
                                    break;
                                case "toggle":
                                    item.status = !item.status;
                                    break;
                            }
                        } else {
                            // if item isn't found keep looking
                            if(item.children.length > 0){
                                redo(item.children);
                            }
                        }
                    })

                }
                recursive(self.data());
            }

            this.titleASC = function (a, b) {
                var titleA = a.title.toLowerCase().replace(/\s+/g, " ");
                var titleB = b.title.toLowerCase().replace(/\s+/g, " ");
                if (titleA < titleB){
                    return -1;
                }
                if (titleA > titleB){
                    return 1;
                }
                return 0;
            };
            this.titleDESC = function (a, b) {
                var titleA = a.title.toLowerCase().replace(/\s/g, '');
                var titleB = b.title.toLowerCase().replace(/\s/g, '');
                if (titleA > titleB){
                    return -1;
                }
                if (titleA < titleB){
                    return 1;
                }
                return 0;
            };
            this.order = function (type){
                var recursive = function redo(data){
                    data.map( function(item, index, array){
                        if(type === "asc"){
                            item.children.sort(self.titleASC);
                        } else {
                            item.children.sort(self.titleDESC);
                        }
                        if(item.children.length > 0 ){ redo(item.children) } ;
                    });
                }
                // First reorder the top data
                if(type === "asc"){
                   self.data().sort(self.titleASC);
                } else {
                    self.data().sort(self.titleDESC);
                }
                // Then start recursive loop
                recursive(self.data());
            }
            this.ui = function (){
                $(".tdTitle").draggable({ helper: "clone" });
                $("tr").droppable({
                    tolerance : "pointer",
                    hoverClass : "highlight",
                    drop: function( event, ui ) {
                        var to = $(this).attr("data-id");
                        var from = ui.draggable.attr("data-id");
                        if (to != from ){
                            self.move(from, to);
                        }
                    }
                });
            }

        }

        // Table view
        top.view = function(ctrl){
            var i = 0; var val;
            var resultingList = [];
            var padding = 0;
            var subFix = function(item){
                if(item.children.length > 0 ){
                    if(item.status){
                        return "[-] ";
                    } else {
                        return "[+] ";
                    }
                } else {
                    return m.trust("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
                }

            }
            var redo = function(data){
                if(data.length > 0){
                    data.map(function(item, index){
                        i++;
                        padding = item.level*20;
                        padding = "padding-left: "+padding+"px";
                        if(item.status){
                            resultingList.push(
                                m("tr", { "data-id" : item.id, "data-level": item.level}, [
                                    m("td.tdTitle", {"data-id" : item.id, style : padding},  [
                                        m("span", {"data-id" : item.id, "data-level": item.level, onclick: m.withAttr("data-id", ctrl.toggle)}, subFix(item)),
                                        m("span", item.id+" "),
                                        m("span", item.title+" ")
                                    ]),
                                    m("td", item.name + " "),
                                    m("td", item.date + " ")
                                ]))
                            redo(item.children);
                        } else {
                            resultingList.push(
                                m("tr", { "data-id" : item.id, "data-level": item.level}, [
                                    m("td.tdTitle", { "data-id" : item.id,  style : padding},  [
                                        m("span", {"data-id" : item.id, onclick: m.withAttr("data-id", ctrl.toggle)}, subFix(item)),
                                        m("span", item.id+" "),
                                        m("span", item.title+" ")
                                    ]),
                                    m("td", item.name + " "),
                                    m("td", item.date + " ")
                                ]))
                        }

                        });
                } else {
                    return;
                }
            }
            redo(ctrl.data());
            return [ m("div.row", [
                      m("div.col-sm-12", [
                          m("div.row", [
                              m("div.col-sm-5",[
                                    m("span", "From: "),
                                    m("input.form-control", {onchange: m.withAttr("value", ctrl.fromid), value: ctrl.fromid()}),
                                    m("span", "To: "),
                                    m("input.form-control", {onchange: m.withAttr("value", ctrl.toid), value: ctrl.toid()}),
                                    m("button.btn.btn-info", { onclick:  ctrl.pull},  "Move")
                              ]),
                              m("div.col-sm-4",[
                                      m("input.form-control ", {onchange: m.withAttr("value", ctrl.todelete), value: ctrl.todelete()}),
                                      m("button.btn.btn-danger", { onclick:  ctrl.delete},  "Delete")
                                ]),
                              m("div.col-sm-3",[
                                    m("input.form-control", {onchange: m.withAttr("value", ctrl.toadd), value: ctrl.toadd()}),
                                     m("button.btn.btn-success", { onclick:  ctrl.add},  "Add")
                              ])
                          ])
                          ])
                    ]),
                    m("div.gridWrapper",{config : ctrl.ui}, [ m("table.table", [
                        m("thead", [
                            m("th", { width : "50%"}, [
                                m("span", "Title"),
                                m("i", { "data-order" :"asc", onclick : m.withAttr("data-order", ctrl.order)}, " [asc]"),
                                m("i", { "data-order" :"desc", onclick : m.withAttr("data-order", ctrl.order)}, " [desc]")
                            ]),
                            m("th", "Person"),
                            m("th", "Date")
                        ]),
                        m("tbody",
                            resultingList
                        )
                    ])
                   ])
            ]
        }
        console.log(top.controller);
        //m.module(document.getElementById(top.options.placement), { controller : top.controller, view : top.view(top.controller)});

    };

    //// List view
//grid.view = function(ctrl){
//    var i = 0;
//    var redo = function(data){
//        return data.map(function(item, index){
//            i++;
//            return [ m("ul.list-group", { "data-level" : item.level}, [
//                m("li.list-group-item",  [
//                    m("span", item.id + " "),
//                    m("b", item.title + " "),
//                    m("i", item.name + " "),
//                    m("small", item.date + " "),
//                    m("span", [ redo(item.children)])
//                ])
//
//            ])];
//        })
//    }
//    return [ m("div.row", [
//        m("div.col-sm-12.form.form-inline", [
//            m("input.form-control.col.sm-2", {onchange: m.withAttr("value", ctrl.fromid), value: ctrl.fromid()}),
//            m("input.form-control.col.sm-2  ", {onchange: m.withAttr("value", ctrl.toid), value: ctrl.toid()}),
//            m("button.btn.btn-info", { onclick:  ctrl.pull},  "Move"),
//            m("input.form-control.col.sm-2  ", {onchange: m.withAttr("value", ctrl.todelete), value: ctrl.todelete()}),
//            m("button.btn.btn-danger", { onclick:  ctrl.delete},  "Delete"),
//            m("input.form-control.col.sm-2  ", {onchange: m.withAttr("value", ctrl.toadd), value: ctrl.toadd()}),
//            m("button.btn.btn-success", { onclick:  ctrl.add},  "Add")
//        ])
//    ]),
//        m("ul.list-group", [
//            m("li.list-group-item", [
//                redo(ctrl.data())
//            ])
//        ])
//    ]
//}

// Table view
//grid.view = function(ctrl){
//    var i = 0;
//    var padding = 0;
//    var redo = function(data){
//        l(data.length);
//        if(data.length > 0){
//            return data.map(function(item, index){
//                i++;
//                padding = item.level*10;
//                padding = "padding-left: "+padding+"px";
//                return  [ m("tr", { "data-level" : item.level}, [
//                    m("td", {style : padding},  [
//                        m("span",  " "),
//                        m("span", item.id+" "),
//                        m("span", item.title+" ")
//                    ]),
//                    m("td", item.name + " "),
//                    m("td", item.date + " ")
//                ]),
//                    redo(item.children)
//                ];
//            })
//        } else {
//            return;
//        }
//
//    }
//    return [ m("div.row", [
//        m("div.col-sm-12", [
//            m("div.row", [
//                m("div.col-sm-5",[
//                    m("span", "From: "),
//                    m("input.form-control", {onchange: m.withAttr("value", ctrl.fromid), value: ctrl.fromid()}),
//                    m("span", "To: "),
//                    m("input.form-control", {onchange: m.withAttr("value", ctrl.toid), value: ctrl.toid()}),
//                    m("button.btn.btn-info", { onclick:  ctrl.pull},  "Move")
//                ]),
//                m("div.col-sm-4",[
//                    m("input.form-control ", {onchange: m.withAttr("value", ctrl.todelete), value: ctrl.todelete()}),
//                    m("button.btn.btn-danger", { onclick:  ctrl.delete},  "Delete")
//                ]),
//                m("div.col-sm-3",[
//                    m("input.form-control", {onchange: m.withAttr("value", ctrl.toadd), value: ctrl.toadd()}),
//                    m("button.btn.btn-success", { onclick:  ctrl.add},  "Add")
//                ])
//            ])
//        ])
//    ]),
//        m("div.gridWrapper", [ m("table.table.table-condensed", [
//            m("thead", [
//                m("th", { width : "50%"}, "Title"),
//                m("th", "Person"),
//                m("th", "Date")
//            ]),
//            m("tbody", [
//                redo(ctrl.data())
//            ])
//        ])
//        ])
//    ]
//}