"use strict";

var data = {};

module.exports = {
	get: function(key) {
		if (!data[key]) {
			var Collection = require("./collections/" + key);
			data[key] = new Collection();
		}

		return data[key];
	}
};
