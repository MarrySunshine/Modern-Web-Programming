var isCheat = true;

window.onload = function() {
    canvasManager.init();
    $("#start").on("mouseover", function() {
        gameStart();
    });
};

function gameStart() {
    canvasManager.clear();
    $("#canvas").on("mousemove", function(e) {
        canvasManager.drawPoint(e.offsetX, e.offsetY);
        isCheat = false;
        e.stopPropagation();
    });

    $("#game-container").on("mousemove", function() {
        isCheat = true;
    });

    $(".rect").on("mouseover", function() {
        this.style.background = "red";
        gameOver();
        parent.showAlert("你输了,鼠标滑过S以重新开始游戏");
    });
    $(".rect").on("mouseout", function() {
        this.style.background = "rgb(234, 234, 234)";
    });

    $("#end").on("mouseover", function() {
        if (isCheat) {
            parent.showAlert("玩游戏还是玩我?不要作弊!");
        } else {
            parent.showAlert("你赢了!");
        }
        gameOver();
    });
}

function gameOver() {
    $("#canvas").off("mousemove");
    $(".rect").off("mouseover");
    $("#game-container").off("mousemove");
    $("#end").off("mouseover");
}