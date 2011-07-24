require.paths.unshift(__dirname);

var fs = require('fs');
var path = require('path');
var http = require('http');
var static = require('node-static');
var config = require('config');
var io = require('socket.io');

var file = new(static.Server)('./public');
var http_server = http.createServer(function(req, res) {
        req.addListener('end', function() {
            file.serve(req, res);
        });
});

io = io.listen(http_server);
http_server.listen(config.host_port, config.host_ip);
console.log('[Nody]: http server is running on ' + config.host_port);


var ball = {x:0, y:0, sx:5, sy:5};
io.sockets.on('connection', function(socket) {
    socket.emit('hi', { msg: 'hello' });
    socket.on('start', function(data) {
        console.log(data);
    });
    socket.on('save_ball', function(data) {
        ball = data;
        socket.broadcast.emit('ball', ball);
        console.dir(ball);
    });
    socket.on('load_ball', function(data) {
        socket.emit('ball', ball);
    });
});
