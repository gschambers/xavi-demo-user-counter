var connect = require("connect");

var app = connect();

app.use(connect.static("public"));
app.use(connect.directory("public"));

module.exports = app;
