(function(){

var grid = {};

    grid.data = m.prop({});

    m.request({method: "GET", url: "sample.json"}).then(grid.data).then(function(){console.log(grid.data())});

    grid.model = function (level){
        	this.level = level;
            this.id = Math.floor(Math.random()*(1000000));
            this.name  = "JohnnyB. Goode";
            this.title  =  "Around the World in 80 Days";
            this.date = new Date;
            this.children = [];
    }

    grid.controller = function () {
        var self = this;
        this.data = grid.data;
        this.fromid = m.prop(12);
        this.toid = m.prop(8);
        this.todelete = m.prop(0);
        this.toadd = m.prop(0);
        this.temp = {}; // temporary object

        var i, item;
        // Move
        this.pull = function redo (data){
            var pulldata = data || self.data();
            if(data.type === "click") { pulldata = self.data()};
            pulldata.map( function(item, index, array){
                if (item.id == self.fromid()){
                    console.log("found pull", item.id, index);
                    // delete element
                    array.splice(index, 1);
                    self.temp = item;
                    self.push();
                } else {
                    if(item.children.length > 0){
                        redo(item.children);
                    }
                }
            })
        }

        this.push = function redo (data){
            var pushdata = data || self.data();
            pushdata.map( function(item, index){
                if (item.id == self.toid()){
                    console.log("found push", item.id);
                    item.children.push(self.temp);
                } else {
                    if(item.children.length > 0){
                        redo(item.children);
                    }
                }
            })
        }

        // Delete
        this.delete = function redo (data){
            var deldata = data || self.data();
            if(data.type === "click") { deldata = self.data()};
            deldata.map( function(item, index, array){
                if (item.id == self.todelete()){
                    console.log("found delete", item.id, index);
                    // delete element
                    array.splice(index, 1);
                    console.log("Deleted: ", item) ;
                } else {
                    if(item.children.length > 0){
                        redo(item.children);
                    }
                }
            })
        }

        // Add
        this.add = function redo (data){
            var adddata = data || self.data();
            if(data.type === "click") { adddata = self.data()};
            adddata.map( function(item, index, array){
                if (item.id == self.toadd()){
                    console.log("found add", item.id );
                    var level = item.level+1;
                    item.children.push(new grid.model(level));
                } else {
                    if(item.children.length > 0){
                        redo(item.children);
                    }
                }
            })
        }
        this.toggle = function(toggleid){
            //item.status  = !item.status;
            var toggleFunction = function redo (data ){
                data.map( function(item, index, array){
                    if (item.id == toggleid){
                        console.log("found toggle", item.id );
                        item.status = !item.status;
                    } else {
                        if(item.children.length > 0){
                            redo(item.children);
                        }
                    }
                })
            }
            toggleFunction(self.data());
        }


    }

    // Table view
    grid.view = function(ctrl){
        var i = 0;
        var padding = 0;
        var redo = function(data){
            return data.map(function(item, index){
                i++;
                padding = item.level*10;
                padding = "padding-left: "+padding+"px";

                    if(item.status){
                        return [ m("tr", { "data-level" : item.level}, [
                            m("td", {style : padding},  [
                                m("span", {"data-id" : item.id, onclick: m.withAttr("data-id", ctrl.toggle)}, "[-] "),
                                m("span", item.id+" "),
                                m("span", item.title+" ")
                            ]),                            m("td", item.name + " "),
                            m("td", item.date + " ")
                        ]),
                            redo(item.children)
                        ];
                    } else {
                        return [ m("tr", { "data-level" : item.level}, [
                            m("td", {style : padding},  [
                                m("span", {"data-id" : item.id, onclick: m.withAttr("data-id", ctrl.toggle)}, "[+] "),
                                m("span", item.id+" "),
                                m("b", item.title+" ")
                            ]),
                            m("td", item.name + " "),
                            m("td", item.date + " ")
                        ])

                        ];
                    }
                    return [ m("tr", { "data-level" : item.level}, [
                                m("td", {style : padding},  item.id + " " + item.title + " "),
                                m("td", item.name + " "),
                                m("td", item.date + " ")
                            ]),
                             redo(item.children)
                    ];

            })
        }
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
                m("div.gridWrapper", [ m("table.table.table-condensed", [
                    m("thead", [
                        m("th", { width : "50%"}, "Title"),
                        m("th", "Person"),
                        m("th", "Date")
                    ]),
                    m("tbody", [
                        redo(ctrl.data())
                    ])
                ])
               ])
        ]
    }

    m.module(document.getElementById("grid"), grid);

})();


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



//grid.view = function(ctrl){
//    console.log(ctrl.data());
//    var i = 0;
//    var redo = function(data){
//        return data.map(function(item, index){
//            console.log(i, item);
//            i++;
//            return [ m("tr.p-left", [
//                m("td", i),
//                m("td", item.title),
//                m("td", item.name),
//                m("td", item.date)
//            ]), redo(item.children)] ;
//        })
//    }
//    return m("table.table.table-condensed", [
//        m("thead", [
//            m("th", "ID"),
//            m("th", { width : "50%"}, "Title"),
//            m("th", "Person"),
//            m("th", "Date")
//        ]),
//        m("tbody", [
//            redo(ctrl.data())
//        ])
//
//    ])
//}