var xavi = require("xavi");
var url = require("url");

var AuthMiddleware = require("xavi-middleware-auth");
var UsersService = require("./services/users");
var NotificationService = require("./services/notification");

var app = xavi.createServer();

app.use(AuthMiddleware.extend({
	backend: {
		authenticate: function(client, message, next) {
			var isAuth = message.headers.auth;

			if (isAuth === undefined) {
				var query = url.parse(client.ws.upgradeReq.url, true).query;
				isAuth = JSON.parse(query.auth || "false");
			}

			if (!isAuth) {
				app.emit("client.authError", client);
				return next("Not authenticated");
			}

			next();
		}
	}
}));

app.bind("notification", NotificationService);
app.bind("users", UsersService);

if (require.main === module) {
	app.listen(
		process.env.XAVI_PORT,
		process.env.XAVI_HOST
	);
}

module.exports = app;
