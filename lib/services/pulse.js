var Service = require("xavi").Service;
var Message = require("xavi").Message;

var PulseService = Service.extend({
	interval: 1000,

	initialize: function(opts) {
		this.socket = opts.socket;
		this.binding = opts.binding;

		this._pending = [];
		this._start();
	},

	_start: function() {
		this._timer = null;

		this._tick(function next() {
			// Any remaining clients in the pending queue
			// have not responded the previous ping
			// and should be considered idle
			this._pending.forEach(function(client) {
				client.close();
			});

			this._ping();
			this._tick(next.bind(this));
		}.bind(this));
	},

	_tick: function(next) {
		this._timer = setTimeout(next, this.interval);
	},

	_ping: function() {
		var clients = this.socket.clients.all();
		var message = Message.extend({
			channel: this.binding,
			command: "ping"
		});

		this.socket.broadcast(message);
		this._pending.push.apply(this._pending, clients);
	},

	_pong: function(client) {
		var i = this._pending.length;

		while (i--) {
			if (this._pending[i] === client) {
				this._pending.splice(i, 1);
			}
		}
	},

	handleMessage: function(message, next) {
		this._pong(message.client);
		next();
	}
});

module.exports = PulseService;
