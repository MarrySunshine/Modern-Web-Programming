var canvasManager = new CanvasManager();

function CanvasManager() {
    this.lastX = null;
    this.lastY = null;

    var canvasObj = null;
    var context = null;

    this.init = function() {
        canvasObj = $("#canvas");
        context = canvasObj.getContext("2d");
        canvasObj.width = window.innerWidth * 0.8;
        canvasObj.height = window.innerHeight * 0.8;
    };

    this.drawPoint = function(x, y) {
        this.lastX = this.lastX || x;
        this.lastY = this.lastY || y;
        context.beginPath();
        context.moveTo(this.lastX, this.lastY);
        context.lineTo(x, y);
        context.stroke();
        context.closePath();
        this.lastX = x;
        this.lastY = y;
    };

    this.clear = function() {
        context.clearRect(0, 0, canvasObj.width, canvasObj.height);
        this.lastX = null;
        this.lastY = null;
    }
}