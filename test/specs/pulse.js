var xavi = require("xavi");
var WebSocket = require("ws");
var PulseService = require("../../lib/services/pulse");

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
		test.notEqual(PulseService, undefined);
		test.ok(xavi.Service.isPrototypeOf(PulseService));
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

	testPingReceived: function(test) {
		this.sock.bind("pulse", PulseService.extend({
			interval: 100
		}));

		this.sock.on("client.open", function(c) {
			this.sock.clients.subscribe("pulse", c);
		}.bind(this));

		var client = createClient();

		client.once("message", function(message) {
			message = JSON.parse(message);
			test.equal(message.channel, "pulse");
			test.equal(message.command, "ping");
			test.done();
		});
	},

	testPongSent: function(test) {
		this.sock.bind("pulse", PulseService.extend({
			interval: 100
		}));

		this.sock.bind("pulse", {
			handleMessage: function(message, next) {
				test.equal(message.command, "pong");
				test.done();
			}
		});

		this.sock.on("client.open", function(c) {
			this.sock.clients.subscribe("pulse", c);
		}.bind(this));

		var client = createClient();

		var pong = function(ping) {
			ping = JSON.parse(ping);

			var message = xavi.Message.extend(ping);
			message.command = "pong";

			client.send(message.toJSON());
		};

		client.on("message", pong);
	},

	testPongNotSent: function(test) {
		this.sock.bind("pulse", PulseService.extend({
			interval: 100
		}));

		this.sock.on("client.open", function(c) {
			this.sock.clients.subscribe("pulse", c);
		}.bind(this));

		var client = createClient();

		// Client closed by socket for not
		// responding to heartbeat
		client.once("close", function() {
			test.done();
		});
	},

	testPongStoppedByMiddleware: function(test) {
		test.expect(0);

		this.sock.bind("pulse", PulseService.extend({
			interval: 100
		}));

		this.sock.bind("pulse", xavi.Service.extend({
			handleMessage: function(message, next) {
				test.ok(false);
			}
		}));

		// Blocking middleware
		this.sock.use(xavi.Middleware.extend({
			onIncoming: function() {
				var next = arguments[arguments.length - 1];
				next(xavi.ErrorMessage);
			}
		}));

		this.sock.on("client.open", function(c) {
			this.sock.clients.subscribe("pulse", c);
		}.bind(this));

		var client = createClient();

		var pong = function(ping) {
			ping = JSON.parse(ping);

			var message = xavi.Message.extend(ping);
			message.command = "pong";

			client.send(message.toJSON());
		};

		client.on("message", pong);

		// Client closed by socket after
		// pong blocked by middleware
		client.on("close", function() {
			test.done();
		});
	}
};
