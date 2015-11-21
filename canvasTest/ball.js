onload = function() {
    canvasManager.init();
    $("body").on("mousemove", function(e) {
        canvasManager.drawPoint(e.x, e.y);
    });
};