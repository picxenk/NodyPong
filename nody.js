var config = {
    host_ip : '192.168.0.97',
    host_port : 8000,
};

var http = require('http');
var static = require('node-static');

var file = new(static.Server)('./public');
var http_server = http.createServer(function(req, res) {
        req.addListener('end', function() {
            file.serve(req, res);
        });
});
http_server.listen(config.host_port, config.host_ip);
console.log('[Nody]: http server is running on ' + config.host_port);
