"use strict";

var string = {
	capitalize: function(value) {
		if (!value) {
			return value;
		}

		return value.charAt(0).toUpperCase() + value.substring(1);
	},

	truncate: function(value, len) {
		if (value === undefined || value.length <= len) {
			return value;
		}

		return value.substring(0, len);
	},

	unCamel: function(value) {
		return value.replace(/([a-z])([A-Z])/g, function(str, a, b) {
			return a + " " + b.toLowerCase();
		});
	}
};

module.exports = string;
