/** @jsx React.DOM */

var React = require("react");

var BackboneViewMixin = require("../../mixins/backbone-view");
var NotificationListItemView = require("./list-item");

var registry = require("../../registry");

var NotificationListView = React.createClass({
	mixins: [
		BackboneViewMixin
	],

	_getBackboneModels: function() {
		return {
			notifications: registry.get("notifications")	
		};
	},

	_showNotificationList: function() {
		var list = [];
		var notifications = this.models.notifications.toArray();

		if (!notifications.length) {
			return this._showEmpty();
		}

		notifications = notifications.reverse();
		notifications = notifications.slice(0, 10);

		notifications.forEach(function(notification, i) {
			list.push(
				<NotificationListItemView
					key={i}
					model={notification} />
			);
		});

		return (
			<ul className="notification-list">{list}</ul>
		);
	},

	_showEmpty: function() {
		return (
			<div className="notification-list-empty alert alert-info">
				There are no notifications to show.
			</div>
		);
	},

	render: function() {
		return (
			<div id="notification" className="page-module hidden-sm hidden-xs">
				<h4 className="page-module-header">
					Notifications
				</h4>
				{this._showNotificationList()}
			</div>
		);
	}
});

module.exports = NotificationListView;
