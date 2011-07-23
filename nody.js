require.paths.unshift(__dirname);

var fs = require('fs');
var path = require('path');
var http = require('http');
var static = require('node-static');
var config = require('config');

var file = new(static.Server)('./public');
var http_server = http.createServer(function(req, res) {
        req.addListener('end', function() {
            file.serve(req, res);
        });
});
http_server.listen(config.host_port, config.host_ip);
console.log('[Nody]: http server is running on ' + config.host_port);
