"use strict";

var AppRouter = require("marionette").AppRouter;

var routers = {
	dashboard: require("./dashboard")
};

module.exports = {
	load: function() {
		var obj = {};

		Object.keys(routers).forEach(function(key) {
			obj[key] = routers[key];
		});

		return obj;
	}
};
