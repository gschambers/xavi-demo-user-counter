var _ = require("lodash");

var Message = require("xavi").Message;
var Service = require("xavi").Service;

var UsersService = Service.extend({
	broadcastDelay: 10000,
	supported: ["userCount"],

	initialize: function(opts) {
		_.bindAll(this);

		this.socket = opts.socket;
		this.binding = opts.binding;

		this._bindEvents();
	},

	destroy: function() {
		this._unbindEvents();
	},

	_bindEvents: function() {
		this.socket.on("client.open", this._broadcast);
		this.socket.on("client.close", this._broadcast);
	},

	_unbindEvents: function() {
		this.socket.off("client.open", this._broadcast);
		this.socket.off("client.close", this._broadcast);
	},

	_getConnectedUserCount: function() {
		return this.socket.clients.length;
	},

	_getPayload: function() {
		return Message.extend({
			channel: this.binding,
			command: "updateUserCount",
			data: {
				users: this._getConnectedUserCount()
			}
		});
	},

	_broadcast: function() {
		var message = this._getPayload();

		// Only queue a single broadcast request
		clearTimeout(this._timer);

		this._timer = setTimeout(function() {
			this.socket.broadcast(message);
		}.bind(this), this.broadcastDelay);
	},

	userCount: function(message, next) {
		next(null, this._getPayload());
	},

	handleMessage: function(message, next) {
		var command = message.command;

		if (_.contains(this.supported, command)) {
			this[command](message, next);
		}
	}
});

module.exports = UsersService;
