var fs = require("fs");
var path = require("path");

var shimPath = fs.realpathSync("./grunt/config/shims");
var files = fs.readdirSync(shimPath);

var aliases = {};

files.forEach(function(file) {
	var name = file.split(".").shift();
	aliases[name] = shimPath + "/" + file;
});

module.exports = {
	dist: {
		entry: "./public/js/src/main",
		module: {
			loaders: [{
				test: /\.jsx$/,
				loader: path.join(__dirname, "../services/webpack/jsx-loader.js")
			}]
		},
		output: {
			path: "./public/js/dist/",
			filename: "main.js",
			library: "FR"
		},
		resolve: {
			alias: aliases,
			extensions: ["", ".js", ".jsx"]
		},
		devtool: "inline-source-map"
	}
};
