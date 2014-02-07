/** @jsx React.DOM */

var React = require("react");
var string = require("../../helpers/string");

var NotificationListItemView = React.createClass({
	render: function() {
		var type = this.props.model.get("type");
		var id = string.truncate(this.props.model.get("id"), 8);

		return (
			<li className={"notification notification-" + type}>
				<span className="type">{string.unCamel(type)}</span>
				<span className="client-id pull-right">{id}</span>
			</li>
		);
	}
});

module.exports = NotificationListItemView;
