/** @jsx React.DOM */

"use strict";

var React = require("react");
var HeaderView = require("./header");

var LayoutView = React.createClass({
	render: function() {
		return (
			<div id="layout">
				<HeaderView />
				<div id="main" className="container"></div>
			</div>
		);
	}
});

module.exports = LayoutView;
