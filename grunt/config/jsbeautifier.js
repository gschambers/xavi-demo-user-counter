module.exports = {
	options: {
		js: {
			indentSize: 1,
			indentChar: "\t",
			maxPreserveNewLines: 1
		}
	},

	files: [
		"Gruntfile.js",
		"grunt/**/*.js",
		"lib/**/*.js",
		"public/js/src/**/*.js",
		"test/specs/**/*.js",
		"test/helpers/**/*.js"
	]
};
