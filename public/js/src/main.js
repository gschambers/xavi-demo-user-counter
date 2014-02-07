"use strict";

var Backbone = require("backbone");
var Marionette = require("marionette");
var $ = require("jquery");

var routers = require("./routers");
var layout = require("./layout");
var socket = require("./socket");
var registry = require("./registry");

var app = new Marionette.Application();

app.on("initialize:before", function() {
	routers.load();
	layout.render();
});

app.on("initialize:after", function() {
	if (Backbone.history) {
		Backbone.history.start();
	}

	socket.connect();
});

$(function() {
	app.start();
});

module.exports.app = app;
module.exports.socket = socket;
module.exports.layout = layout;
module.exports.registry = registry;
