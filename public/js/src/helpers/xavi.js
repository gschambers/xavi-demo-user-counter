"use strict";

var xavi = require("xavi");
var send = xavi.Client.prototype.send;

xavi.Client.prototype.send = function(message, onSuccess, onError) {
	message.headers.auth = this.options.query.auth || false;
	send.call(this, message, onSuccess, onError);
};

module.exports = xavi;
