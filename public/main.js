var socket = io.connect('http://localhost:8000');
var canvas = document.querySelector("#canvas");
canvas.width = 400;
canvas.height = 300;
var ctx = canvas.getContext("2d");
ctx.font = "12px Arial";
var x = 0;
var y = 0;
var frame_count = 0;

var ball = {};

ball.init = function() {
    socket.emit('load_ball', {});
};

ball.move = function() {
    this.x = this.x + this.sx;
    this.y = this.y + this.sy;
    if (this.x > canvas.width) { this.sx = this.sx * -1 }
    if (this.x < 0) { this.sx = this.sx * -1 }
    if (this.y > canvas.height) { this.sy = this.sy * -1 }
    if (this.y < 0) { this.sy = this.sy * -1 }
};

ball.draw = function() {
    ctx.fillStyle = "white";
    ctx.fillRect(this.x, this.y, 10, 10);
    this.move();
};

ball.save_position = function() {
    var position = {
        x: this.x,
        y: this.y,
        sx: this.sx,
        sy: this.sy
    };
    socket.emit('save_ball', position);
};

var draw = function() {
    frame_count = frame_count + 1;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ball.draw();
    if (frame_count % 10 == 0) {
        ball.save_position();
    }
};

canvas.mousemove = function(evt) {
    var mx = evt.offsetX;
    var my = evt.offsetY;
    x = x + 1;
    y = y + 1;
};

var animate = function() {
    webkitRequestAnimationFrame(animate);
    draw();
};

socket.on('hi', function(data) {
    console.log(data);
    socket.emit('start', {msg: 'go go~'});
    ball.init();
    animate();
});

socket.on('ball', function(data) {
    console.log('loading...ball------------------------------');
    ball.x = data.x;
    ball.y = data.y;
    ball.sx = data.sx;
    ball.sy = data.sy;
});
