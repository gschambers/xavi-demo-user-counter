module.exports = function(grunt) {
	"use strict";

	var fs = require("fs");

	var config = {
		pkg: grunt.file.readJSON("package.json")
	};

	var files = fs.readdirSync("./grunt/config");

	files.forEach(function(file) {
		if (!/\.js$/.test(file)) {
			return;
		}

		var name = file.split(".").shift();
		config[name] = require("./grunt/config/" + file);
	});

	grunt.initConfig(config);

	Object.keys(config.pkg.devDependencies)
		.filter(function(dep) {
			return (/^grunt-/).test(dep);
		})
		.forEach(function(dep) {
			grunt.loadNpmTasks(dep);
		});

	grunt.loadTasks("./grunt/tasks");
};
