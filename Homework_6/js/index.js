window.onload = function() {
    $("iframe:nth-of-type(1)").on("mouseover", function(e) {
        this.addClass("active");
        $("iframe:nth-of-type(2)").addClass("blur");
        showAlert("鼠标滑过S开始游戏");
    });
    $("iframe:nth-of-type(2)").on("mouseover", function(e) {
        this.addClass("active");
        $("iframe:nth-of-type(1)").addClass("blur");
    });
    $("iframe").on("mouseout", function(e) {
        this.removeClass("active");
        $("iframe").forEach(function(item) {
            item.removeClass("blur");
        });
    });
};