/** @jsx React.DOM */

var React = require("react");
var $ = require("jquery");

var string = require("../../helpers/string");

var UserListItemView = React.createClass({
	componentWillMount: function() {
		this._bindEvents();
	},

	componentWillUnmount: function() {
		this._unbindEvents();
	},

	_bindEvents: function() {
		this.props.model.on("ping", this._animatePulse);
	},

	_unbindEvents: function() {
		this.props.model.off("ping", this._animatePulse);
	},

	_handleClick: function(evt) {
		evt.preventDefault();

		var elem = evt.target;

		var type = elem.dataset.type;
		var action = elem.dataset.action;

		switch (type) {
			case "auth":
				this._setAuth(action);
				break;

			case "status":
				this._setStatus(action);
				break;

			case "reconnect":
				this._setReconnect(action);
				break;
		}
	},

	_setAuth: function(action) {
		var isAuth = action === "login";
		this.props.model.set("auth", isAuth);
	},

	_setStatus: function(action) {
		var model = this.props.model;

		switch (action) {
			case "open":
				model.start();
				break;

			case "close":
				model.stop();
				break;
		}
	},

	_setReconnect: function(action) {
		var isReconnect = action === "enable";
		this.props.model.set("reconnect", isReconnect);
	},

	_animatePulse: function() {
		var elem = $(this.refs.pulse.getDOMNode());
		elem.addClass("pulse-ping");
		elem.one("animationend webkitAnimationEnd", this._onPulseEnd);
	},

	_onPulseEnd: function() {
		var elem = $(this.refs.pulse.getDOMNode());
		elem.removeClass("pulse-ping");
	},

	_showAction: function(name, options) {
		var model = this.props.model;
		var prop = model.get(name).toString();
		
		if (!options.hasOwnProperty(prop)) {
			return;
		}

		var action = options[prop].action;
		var label = options[prop].label || string.capitalize(action);

		return (
			<button
				onClick={this._handleClick}
				data-type={name}
				data-action={action}
				className={"btn btn-xs btn-" + name}>
					{label}
			</button>
		);
	},

	_showReconnectAction: function() {
		return this._showAction("reconnect", {
			"true": {
				action: "disable",
				label: "Auto"
			},

			"false": {
				action: "enable",
				label: "Auto"
			}
		});
	},

	_showAuthAction: function() {
		return this._showAction("auth", {
			"true": {
				action: "logout"
			},

			"false": {
				action: "login"
			}
		});
	},

	_showConnAction: function() {
		return this._showAction("status", {
			"open": {
				action: "close"
			},

			"decaying": {
				action: "open"
			}
		});
	},

	render: function() {
		var model = this.props.model;

		return (
			<tr className="user-list-item">
				<td className="text-center">
					<i ref="pulse" className="fa fa-heart pulse"></i>
				</td>

				<td>{string.truncate(model.get("id"), 8)}</td>
				
				<td className="text-center">
					{this._showReconnectAction()}
				</td>

				<td className="text-center">
					<span className={"label status-" + model.get("status")}>
						{model.get("status")}
					</span>

					<span className={"label auth-" + (model.get("auth") ? "yes" : "no")}>
						<i className="fa fa-lock"></i>
					</span>
				</td>

				<td className="text-center">{model.get("count")}</td>
				
				<td className="text-right">
					<form className="user-controls">
						{this._showAuthAction()}
						{this._showConnAction()}
					</form>
				</td>
			</tr>
		);
	}
});

module.exports = UserListItemView;
