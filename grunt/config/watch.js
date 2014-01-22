module.exports = {
	test: {
		files: [
			"Gruntfile.js",
			"grunt/**/*.js",
			"lib/**/*.js",
			"test/specs/**/*.js",
			"test/helpers/**/*.js"
		],

		tasks: ["jsbeautifier", "jshint:server"]
	},

	build: {
		files: [
			"public/js/src/**/*.js",
			"public/js/src/**/*.jsx"
		],

		tasks: ["jsbeautifier", "jshint:browser", "webpack"]
	},

	less: {
		files: [
			"public/css/src/**/*.less"
		],

		tasks: ["less"]
	}
};
