var canvas = document.querySelector("#canvas");
canvas.width = 400;
canvas.height = 300;
var ctx = canvas.getContext("2d");
ctx.font = "12px Arial";
var x = 0;
var y = 0;

var ball = {};
ball.x = Math.random(canvas.width);
ball.y = Math.random(canvas.height);
ball.sx = 5;
ball.sy = 5;
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

var draw = function() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ball.draw();
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

animate();
