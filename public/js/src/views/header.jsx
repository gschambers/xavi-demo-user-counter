/** @jsx React.DOM */

var React = require("react");

var HeaderView = React.createClass({
	render: function() {
		return (
			<header id="header">
				<nav className="navbar navbar-inverse navbar-static-top" role="navigation">
					<div className="container">
						<div className="row">
							<div className="col-xs-12">
								<div className="navbar-header">
									<a className="navbar-brand" href="#">
										<strong>xavi</strong> User Counter Demo
									</a>
								</div>

								<div className="collapse navbar-collapse">
									<ul className="nav navbar-nav pull-right"></ul>
								</div>
							</div>
						</div>
					</div>
				</nav>
			</header>
		);
	}
});

module.exports = HeaderView;
