module.exports = {
	vendor: {
		files: [{
			expand: true,
			flatten: true,
			src: [
				"bower_components/backbone/backbone*",
				"bower_components/backbone.marionette/lib/backbone*",
				"bower_components/jquery/jquery.*",
				"bower_components/lodash/dist/lodash.underscore*",
				"bower_components/bootstrap/dist/js/*",
				"bower_components/moment/min/moment.min.js",
				"bower_components/react/*.js",
				"bower_components/xavi/dist/xavi.*"
			],
			dest: "public/js/vendor/"
		}, {
			expand: true,
			flatten: true,
			src: ["bower_components/bootstrap/dist/css/*"],
			dest: "public/css/vendor/"
		}, {
			expand: true,
			flatten: true,
			src: ["bower_components/bootstrap/dist/fonts/*"],
			dest: "public/fonts/vendor/"
		}, {
			expand: true,
			flatten: true,
			src: [
				"bower_components/font-awesome/css/*",
				"bower_components/font-awesome/fonts/*"
			],
			dest: "public/css/vendor/fonts/"
		}]
	}
};
