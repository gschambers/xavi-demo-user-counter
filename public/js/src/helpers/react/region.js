"use strict";

var React = require("react");
var _ = require("underscore");

var ReactRegion = function(opts) {
	_.extend(this, {
		container: null,
		selector: null
	}, opts);
};

ReactRegion.prototype = {
	getElement: function() {
		return (this.container || document).querySelector(this.selector);
	},

	show: function(component) {
		if (!this.selector) {
			return;
		}

		React.renderComponent(component, this.getElement());
	}
};

module.exports = ReactRegion;
