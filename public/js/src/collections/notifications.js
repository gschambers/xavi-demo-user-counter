"use strict";

var _ = require("lodash");

var Collection = require("backbone").Collection;
var NotificationModel = require("../models/notification");

var NotificationsCollection = Collection.extend({
	model: NotificationModel,

	initialize: function() {
		_.bindAll(this);
		this._bindEvents();
	},

	destroy: function() {
		this._unbindEvents();
	},

	_bindEvents: function() {
		FR.socket.on("notification", "*", this._addNotification);
	},

	_unbindEvents: function() {
		FR.socket.off("notification", "*", this._addNotification);
	},

	_addNotification: function(message) {
		var user = FR.registry.get("users").get(message.data);

		// Only show notifications created by
		// this application session
		if (user) {
			this.add({
				type: message.command,
				id: message.data
			});
		}
	},

	fetch: function() {}
});

module.exports = NotificationsCollection;
