var xavi = require("xavi");
var WebSocket = require("ws");
var UsersService = require("../../lib/services/users");

var XAVI_HOST = "localhost";
var XAVI_PORT = 8888;

var createServer = function() {
	var app = xavi.createServer();
	app.listen(XAVI_PORT, XAVI_HOST);
	return app;
};

var createClient = function(opts) {
	var uri = "ws://" + XAVI_HOST + ":" + XAVI_PORT;
	return new WebSocket(uri, null, opts);
};

module.exports.moduleDefinition = {
	testDefinition: function(test) {
		test.notEqual(UsersService, undefined);
		test.ok(xavi.Service.isPrototypeOf(UsersService));
		test.done();
	}
};

module.exports.binding = {
	setUp: function(next) {
		this.sock = createServer();
		this.sock.on("listening", next);
	},

	tearDown: function(next) {
		this.sock.close();
		this.sock.on("close", next);
	},

	testUserCountOnOpen: function(test) {
		this.sock.bind("users", UsersService.extend({
			broadcastDelay: 100
		}));

		this.sock.on("client.open", function(c) {
			this.sock.clients.subscribe("users", c);
		}.bind(this));

		var client = createClient();

		client.once("message", function(res) {
			res = JSON.parse(res);
			test.equal(res.command, "updateUserCount");
			test.equal(res.data.users, 1);
			test.done();
		});
	},

	testUserCountOnClose: function(test) {
		test.expect(3);

		this.sock.bind("users", UsersService.extend({
			broadcastDelay: 100
		}));

		this.sock.on("client.open", function(c) {
			this.sock.clients.subscribe("users", c);
		}.bind(this));

		var clientA = createClient();
		var clientB = createClient();

		clientB.once("message", function(res) {
			res = JSON.parse(res);
			test.equal(res.data.users, 2);
			clientB.close();
		});

		var count = 0;

		// First message will be received when both
		// clients connect; second message received
		// when client B disconnects
		clientA.on("message", function(res) {
			res = JSON.parse(res);

			switch (++count) {
				case 1:
					test.equal(res.data.users, 2);
					break;

				case 2:
					test.equal(res.data.users, 1);
					test.done();
					break;
			}
		});
	},

	testUserCountRequest: function(test) {
		test.expect(3);

		this.sock.bind("users", UsersService.extend({
			broadcastDelay: 100
		}));

		this.sock.on("client.open", function(c) {
			this.sock.clients.subscribe("users", c);
		}.bind(this));

		var client = createClient();

		var count = 0;

		client.on("message", function(res) {
			res = JSON.parse(res);
			test.equal(res.data.users, 1);

			if (++count === 3) {
				test.done();
			}
		});

		var message = xavi.Message.extend({
			channel: "users",
			command: "userCount"
		});

		client.on("open", function() {
			client.send(message.toJSON());
			client.send(message.toJSON());
		});
	}
};
