"use strict";

var xavi = require("./helpers/xavi");

module.exports = new xavi.Client({
	port: 8102,
	query: {
		id: "master",
		auth: true
	}
});
