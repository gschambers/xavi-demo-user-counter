(function() {
	"use strict";

	var EventEmitter = require("events").EventEmitter;

	var xavi = require("xavi");
	var _ = require("lodash");
	var $ = require("jquery");

	var config = {};

	var session = Object.create(EventEmitter.prototype);

	_.extend(session, {
		configure: function(opts) {
			_.extend(config, opts);
		},

		start: function(id) {
			if (!this.clientId) {
				throw new Error("No client ID specified");
			}

			this.client = new xavi.Client({
				host: config.host,
				port: config.port
			});

			this.client.connect();
			this.bindEvents();
		},

		bindEvents: function() {
			this.client.on("connection", "open", this.onOpen);
			this.client.on("connection", "error", this.onError);
			this.client.on("connection", "close", this.onClose);

			this.client.on("users", "updateUserCount", this.onUserCount);
		},

		onOpen: function() {
			this.client.subscribe("users");
			this.emit("ready");
		},

		onError: function(err) {
			this.emit("error", err);
		},

		onClose: function() {
			this.emit("close");
		},

		onUserCount: function(message) {
			this.render(message.data.users);
		},

		fetch: function() {
			var message = new xavi.Message({
				channel: "users",
				command: "userCount"
			});

			this.client.send(message);
		},

		render: function(userCount) {
			$("#count").text(userCount || 0);
		}
	});

	_.bindAll(session);

	module.exports = session;
}).call(this);
