var _ = require("lodash");

var Message = require("xavi").Message;
var Service = require("xavi").Service;

var UsersService = Service.extend({
	broadcastDelay: 10000,
	supported: ["getUsers"],

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

	_getClientCounts: function() {
		var clients = {};

		this.socket.clients.all().forEach(function(client) {
			if (!clients.hasOwnProperty(client.id)) {
				clients[client.id] = 0;
			}

			clients[client.id] += 1;
		});

		// The 'master' client is responsible
		// for handling the notifications, etc.
		// and should not be considered a true
		// client for the purposes of the demo
		delete clients.master;

		return clients;
	},

	_getPayload: function() {
		return Message.extend({
			channel: this.binding,
			command: "updateUsers",
			data: {
				users: this._getClientCounts()
			}
		});
	},

	_broadcast: function(client) {
		var message = this._getPayload();
		this.socket.broadcast(message);
	},

	getUsers: function(message, next) {
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
