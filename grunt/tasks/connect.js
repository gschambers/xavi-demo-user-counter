module.exports = function(grunt) {
	grunt.registerMultiTask("connect", function() {
		var fs = require("fs");
		var path = fs.realpathSync("grunt/services/connect");

		var server = require(path + "/" + this.target);

		var options = grunt.config(["connect", this.target, "options"].join("."));
		var hostname = options.hostname === "*" ? "0.0.0.0" : options.hostname;

		var keepAlive = this.flags.keepalive || options.keepalive;
		var done = this.async();

		server.listen(options.port, hostname);

		if (!keepAlive) {
			done();
		} else {
			grunt.log.write("Waiting forever...\n");
		}

		grunt.log.writeln("Started server on %s:%d", hostname, options.port);
	});
};
