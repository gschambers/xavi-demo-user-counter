"use strict";

var Controller = require("marionette").Controller;
var DashboardView = require("../views/dashboard");

var layout = require("../layout");
var socket = require("../socket");

var DashboardController = Controller.extend({
	initialize: function() {
		socket.subscribe("notification");
		socket.subscribe("users");
	},

	onClose: function() {
		socket.unsubscribe("notification");
		socket.unsubscribe("users");
	},

	redirect: function() {
		var router = require("../routers/dashboard");
		router.navigate("dashboard", {
			trigger: true
		});
	},

	showDashboard: function() {
		layout.main.show(new DashboardView());
	}
});

module.exports = DashboardController;
