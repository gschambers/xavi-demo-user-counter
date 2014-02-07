"use strict";

var xavi = require("../helpers/xavi");
var _ = require("lodash");

var Model = require("backbone").Model;
var socket = require("../socket");

var UserModel = Model.extend({
	defaults: {
		auth: false,
		reconnect: false,
		status: "connecting",
		count: 0
	},

	initialize: function() {
		_.bindAll(this);

		var options = {
			port: socket.options.port,
			reconnect: this.get("reconnect"),
			query: {
				auth: this.get("auth")
			}
		};

		if (this.get("id")) {
			options.query.id = this.get("id");
		}

		this.client = new xavi.Client(options);
		this.start();

		this._bindEvents();
	},

	destroy: function() {
		this.stop();
		this._unbindEvents();
		this.client = null;
	},

	_bindEvents: function() {
		this.on("remove", this.destroy);
		this.on("change:auth", this._setAuth);
		this.on("change:reconnect", this._setReconnect);

		this.client.on("connection", "handshake", this._onHandshake);
		this.client.on("connection", "open", this._onOpen);
		this.client.on("connection", "close", this._onClose);

		this.client.on(xavi.channels.PULSE, "ping", this._onPing);
	},

	_unbindEvents: function() {
		this.off("remove", this.destroy);
		this.off("change:auth", this._setAuth);
		this.off("change:reconnect", this._setReconnect);

		this.client.off("connection", "handshake", this._onHandshake);
		this.client.off("connection", "open", this._onOpen);
		this.client.off("connection", "close", this._onClose);

		this.client.off(xavi.channels.PULSE, "ping", this._onPing);
	},

	_onHandshake: function(data) {
		var id = data.id;
		this.set("id", id);
	},

	_onOpen: function() {
		this.set("status", "open");
	},

	_onClose: function() {
		this.set("status", "decaying");
	},

	_onPing: function() {
		this.trigger("ping");
	},

	_setAuth: function(model, value) {
		if (this.client !== null) {
			this.client.options.query.auth = value;
		}
	},

	_setReconnect: function(model, value) {
		if (this.client !== null) {
			this.client.options.reconnect = value;
		}
	},

	start: function() {
		this.client.connect();
	},

	stop: function() {
		this.client.disconnect();
	},

	_restart: function() {
		this.stop();
		this.start();
	}
});

module.exports = UserModel;
