var _ = require("lodash");

var Service = require("xavi").Service;
var Message = require("xavi").Message;

var NotificationService = Service.extend({
	initialize: function(opts) {
		_.bindAll(this);

		this.socket = opts.socket;
		this.binding = opts.binding;

		this._bindEvents();
	},

	destroy: function() {
		this._unbindEvents();
		this.socket = null;
	},

	_bindEvents: function() {
		this.socket.on("client.open", this._onClientOpen);
		this.socket.on("client.decaying", this._onClientDecaying);
		this.socket.on("client.close", this._onClientClose);
		this.socket.on("client.authError", this._onClientAuthError);
	},

	_unbindEvents: function() {
		this.socket.off("client.open", this._onClientOpen);
		this.socket.off("client.decaying", this._onClientDecaying);
		this.socket.off("client.close", this._onClientClose);
		this.socket.off("client.authError", this._onClientAuthError);
	},

	_onClientOpen: function(client) {
		this._sendMessage("open", client.id);
	},

	_onClientDecaying: function(client) {
		this._sendMessage("decaying", client.id);
	},

	_onClientClose: function(client) {
		this._sendMessage("close", client.id);
	},

	_onClientAuthError: function(client) {
		this._sendMessage("authError", client.id);
	},

	_sendMessage: function(command, id) {
		// The 'master' client is responsible
		// for handling the notifications, etc.
		// and should not be considered a true
		// client for the purposes of the demo
		if (id === "master") {
			return;
		}

		var message = Message.extend({
			channel: this.binding,
			command: command,
			data: id
		});

		this.socket.broadcast(message);
	}
});

module.exports = NotificationService;
