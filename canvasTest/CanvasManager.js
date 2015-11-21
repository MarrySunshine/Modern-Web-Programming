var canvasManager = new CanvasManager();

function CanvasManager() {
    this.lastX = null;
    this.lastY = null;

    var canvasObj = null;
    var context = null;

    this.init = function() {
        canvasObj = $("#canvas");
        context = canvasObj.getContext("2d");
        canvasObj.width = window.innerWidth;
        canvasObj.height = window.innerHeight;

        var image = new Image();
        image.src = "background.jpg";
        image.on("load", function() {
            context.drawImage(this, 0, 0, canvasObj.width, canvasObj.height);
        });

    };

    this.drawPoint = function(x, y) {
        this.lastX = this.lastX || x;
        this.lastY = this.lastY || y;
        context.beginPath();
        context.arc(x, y, 100, 0, 360);
        context.fillStyle = "white";
        context.fill();
        this.lastX = x;
        this.lastY = y;
    };

    this.clear = function() {
        context.clearRect(0, 0, canvasObj.width, canvasObj.height);
        this.lastX = null;
        this.lastY = null;
    }
}