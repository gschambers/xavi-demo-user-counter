/** @jsx React.DOM */

var React = require("react");

var UserCounterView = require("./user/counter");
var UserListView = require("./user/list");
var NotificationListView = require("./notification/list");

var DashboardView = React.createClass({
	render: function() {
		return (
			<div id="dashboard" className="row">
				<div className="col-md-4">
					<UserCounterView />
					<NotificationListView />
				</div>

				<div className="col-md-8">
					<UserListView />
				</div>
			</div>
		);
	}
});

module.exports = DashboardView;
