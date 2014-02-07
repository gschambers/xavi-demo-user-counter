"use strict";

var React = require("react");
var Model = require("backbone").Model;
var ReactRegion = require("./region");
var _ = require("underscore");

var ReactLayout = function(opts) {
	_.extend(this, opts);

	for (var key in this.regions) {
		this.addRegion(key, this.regions[key]);
	}
};

ReactLayout.prototype = {
	addRegion: function(key, selector) {
		this[key] = new ReactRegion({
			name: key,
			selector: selector
		});
	},

	render: function() {
		if (!this.template) {
			return;
		}

		React.renderComponent(
			this.template(null),
			document.querySelector(this.selector)
		);
	}
};

module.exports = ReactLayout;
