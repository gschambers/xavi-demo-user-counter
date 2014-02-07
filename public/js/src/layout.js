"use strict";

var ReactLayout = require("./helpers/react/layout");
var LayoutView = require("./views/layout");

module.exports = new ReactLayout({
	selector: "body",
	template: LayoutView,
	regions: {
		main: "#main"
	}
});
