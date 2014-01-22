module.exports = function(grunt) {
	grunt.registerTask("install", ["clean", "copy", "webpack", "less", "jsbeautifier"]);
	grunt.registerTask("test", ["jshint", "nodeunit"]);
	grunt.registerTask("package", ["uglify", "imagemin"]);
	grunt.registerTask("build", ["install", "test", "package"]);
	grunt.registerTask("listen", ["connect", "watch"]);
};
