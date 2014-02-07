/** @jsx React.DOM */

var React = require("react");
var BackboneViewMixin = require("../../mixins/backbone-view");

var UserFormView = require("./form");
var UserListEmptyView = require("./list-empty");
var UserListItemView = require("./list-item");

var UserListView = React.createClass({
	mixins: [
		BackboneViewMixin
	],

	_getBackboneModels: function() {
		return {
			users: FR.registry.get("users")
		};
	},

	_showUserList: function() {
		var items = [];

		if (!this.models.users.length) {
			return (
				<UserListEmptyView />
			);
		}

		this.models.users.each(function(user, i) {
			items.push(
				<UserListItemView
					key={user.get("id")}
					model={user} />
			);
		});

		return items;
	},

	render: function() {
		return (
			<div id="userList" className="page-module">
				<h4 className="page-module-header">
					Users
				</h4>
				<UserFormView />

				<table className="user-list table table-striped">
					<col className="col-xs-1" />
					<col className="col-xs-4" />
					<col className="col-xs-1" />
					<col className="col-xs-3" />
					<col className="col-xs-1" />
					<col className="col-xs-3" />

					<thead>
						<tr>
							<th className="text-center"></th>
							<th>User ID</th>
							<th className="text-center">
								<i className="fa fa-refresh"></i>
							</th>
							<th className="text-center">Status</th>
							<th className="text-center">Pooled</th>
							<th className="text-right"></th>
						</tr>
					</thead>
					<tbody>
						{this._showUserList()}
					</tbody>
				</table>
			</div>
		);
	}
});

module.exports = UserListView;
