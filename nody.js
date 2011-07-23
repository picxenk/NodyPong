var http = require('http');
var static = require('node-static');

var file = new(static.Server)('./public');
var http_server = http.createServer(function(req, res) {
        req.addListener('end', function() {
            file.serve(req, res);
        });
});
http_server.listen(8000, '192.168.0.97');
console.log('[Nody]: http server is running on ' + 8000);
