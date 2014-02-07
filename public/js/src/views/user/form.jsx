/** @jsx React.DOM */

var React = require("react");

var UserFormView = React.createClass({
	_handleClick: function(evt) {
		evt.preventDefault();
		FR.app.vent.trigger("users.create");
	},

	render: function() {
		return (
			<form className="user-form">
				<button
					onClick={this._handleClick}
					className="btn btn-primary">
						Add New User
				</button>
			</form>
		);
	}
});

module.exports = UserFormView;
