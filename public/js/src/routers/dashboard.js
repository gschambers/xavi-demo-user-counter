"use strict";

var AppRouter = require("marionette").AppRouter;
var DashboardController = require("../controllers/dashboard");

module.exports = new AppRouter({
	controller: new DashboardController(),
	appRoutes: {
		"": "redirect",
		"dashboard": "showDashboard"
	}
});
