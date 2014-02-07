module.exports = {
	browser: {
		options: {
			strict: true,
			globalstrict: true,
			trailing: true,
			browser: true,
			devel: true,
			globals: {
				require: false,
				module: false,
				FR: false
			}
		},

		src: [
			"public/js/src/**/*.js"
		]
	},

	server: {
		options: {
			node: true,
			trailing: true
		},

		src: [
			"Gruntfile.js",
			"grunt/**/*.js",
			"test/**/*.js",
			"lib/**/*.js"
		]
	}
};
