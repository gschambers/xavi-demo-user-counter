"use strict";

var _ = require("lodash");
var xavi = require("xavi");

var Collection = require("backbone").Collection;
var UserModel = require("../models/user");

var UsersCollection = Collection.extend({
	model: UserModel,

	initialize: function() {
		_.bindAll(this);
		this._bindEvents();
	},

	destroy: function() {
		this._unbindEvents();
	},

	_bindEvents: function() {
		FR.socket.on("connection", "open", this.fetch);
		FR.socket.on("users", "updateUsers", this._updateUsers);
		FR.app.vent.on("users.create", this._createNewUser);
	},

	_unbindEvents: function() {
		FR.socket.off("connection", "open", this.fetch);
		FR.socket.off("users", "updateUsers", this._updateUsers);
		FR.app.vent.off("users.create", this._createNewUser);
	},

	_updateUsers: function(message) {
		var users = message.data.users;

		for (var id in users) {
			var user = this.get(id);

			if (user) {
				user.set({
					count: users[id]
				});
			}
		}

		this.each(function(user) {
			if (!user || !users.hasOwnProperty(user.get("id"))) {
				this.remove(user);
			}
		}.bind(this));
	},

	_createNewUser: function() {
		this.add(new UserModel({
			auth: true
		}));
	},

	fetch: function() {
		var message = new xavi.Message({
			channel: "users",
			command: "getUsers"
		});

		FR.socket.send(message);
	}
});

module.exports = UsersCollection;
