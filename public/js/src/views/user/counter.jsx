/** @jsx React.DOM */

var React = require("react");
var BackboneMixinView = require("../../mixins/backbone-view");

var UserCounterView = React.createClass({
	mixins: [
		BackboneMixinView
	],

	_getBackboneModels: function() {
		return {
			users: FR.registry.get("users")
		};
	},

	render: function() {
		var count = this.models.users.length;

		return (
			<div id="userCounter" className="page-module">
				<span className="user-label">Connected users</span>
				<span className="user-count pull-right">{count}</span>
			</div>
		);
	}
});

module.exports = UserCounterView;
