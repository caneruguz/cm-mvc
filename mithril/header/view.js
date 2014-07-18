var header = require("./controller"); 
 header.view =  function(ctrl){ return m("div",{ config: ctrl.postRender }, [[m("nav.navbar.navbar-default.navbar-static-top[role='navigation']", [
		m(".container", [
			m(".collapse.navbar-collapse[id='bs-example-navbar-collapse-1']", [
				m("ul.nav.navbar-nav[data-bind='foreach: listPages']", [
					m("li[data-bind='attr : { class : active}']", [m("a[data-bind='attr : { href : href}, text : title ']")])
				]),
				m("ul.nav.navbar-nav.navbar-right", [
					m("li", ["You are logged in as ",m("span[data-bind='text: appInfo().appUser']")])
				])
			])
		])
	]),"\n",m(".jumbotron.app-jumbotron", [
		m(".container", [
			m("[data-bind='visible: isHome()']", [
				m("h2", [m("span[data-bind='text : appInfo().appTitle']")," with  ",m("span[data-bind='text: script.title']")]),
				m("p[data-bind='text : appInfo().appDesc']"),
				m("p", [m("a.btn.btn-primary.btn-lg[data-bind='attr : {href : script.url}'][role='button']", ["Learn more about ",m("span[data-bind='text: script.title']")])])
			]),
			m("[data-bind='visible: !isHome()']", [
				m("h2[data-bind='text:thisPage().title ']"),
				m("p[data-bind='text: thisPage().desc']")
			])
		])
	])]]) } 
 module.exports = header;