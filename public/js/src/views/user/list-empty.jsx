/** @jsx React.DOM */

var React = require("react");

var UserListEmptyView = React.createClass({
	render: function() {
		return (
			<tr className="user-list-empty">
				<td colSpan="6">
					There are currently no users connected.
				</td>
			</tr>
		);
	}
});

module.exports = UserListEmptyView;
