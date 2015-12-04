var step = 0;

$(function () {
    init();
});

function isInStartBox(x, y, has_img) {
    this.has_img = has_img === undefined ? this.has_img || false : has_img;
    this.width = this.width || parseFloat($("#start-box").width());
    this.height = this.height || parseFloat($("#start-box").height());
    this.minX = this.minX || innerWidth - parseFloat($("#start-box").css("right").split('px')[0]) - this.width;
    this.maxX = this.maxX || this.minX + this.width;
    this.minY = this.minY || innerHeight - parseFloat($("#start-box").css("bottom").split('px')[0]) - this.height;
    this.maxY = this.maxY || this.minY + this.height;
    if (x >= this.minX && x <= this.maxX && y >= this.minY && y <= this.maxY && !this.has_img) {
        this.has_img = true;
        return true;
    }
    return false;
}

function startGame() {
    var sortDoc = document.createDocumentFragment();
    $("#container")[0].childNodes.all(function (e) {
        sortDoc.appendChild(e);
    });
    $("#container").append(sortDoc);
}

function canMove(node) {
    var index = null;
    this.nodelist = this.nodelist || $("#container")[0].childNodes;
    $(this.nodelist).each(function (i) {
        if (this === node) {
            index = i;
        }
    });
    if (index > 0 && this.nodelist[index - 1].getAttribute("blank") === "true") return index - 1;
    if (index < this.nodelist.length - 1 && this.nodelist[index + 1].getAttribute("blank") === "true") return index + 1;
    if (index > 3 && this.nodelist[index - 4].getAttribute("blank") === "true") return index - 4;
    if (index < this.nodelist.length - 4 && this.nodelist[index + 4].getAttribute("blank") === "true") return index + 4;
    return false;
}

function restart() {
    $("#container").empty();
    $("#start-box").html("拖动一块到此<br>处以开始游戏");
    init();
    isInStartBox(0, 0, false);
}

function init() {
    step = 0;
    var nodesToBeAppend = document.createDocumentFragment();
    for (var i = 1; i <= 16; ++i) {
        var tmp_li = document.createElement("li");
        var tmp_img = document.createElement("img");
        tmp_img.src = "src/panda_" + i + ".gif";

        (function (node) {
            var is_select = false;
            $(node).on("mousedown", function (e) {
                is_select = true;
            });
            $(node).on("mouseout", function (e) {
                if (is_select && isInStartBox(e.clientX, e.clientY)) {
                    $("#start-box").html("");
                    $("#start-box").append(node.childNodes[0]);
                    node.setAttribute("blank", "true");
                    is_select = false;
                    startGame();
                    $("#start-box").children().first().on("click", function () {
                        $("#container>li[blank=true]").append(this);
                        if (confirm()) {
                            showAlert("胜利, 共花了" + step + "步");
                            restart();
                        } else {
                            showAlert("未拼好,游戏将重新开始");
                            restart();
                        }
                    });
                }
            });
            $(node).on("click", function () {
                var can_move  = canMove(this);
                if (can_move !== false) {
                    $("#container")[0].childNodes[can_move].appendChild(node.childNodes[0]);
                    node.setAttribute("blank", "true");
                    $("#container")[0].childNodes[can_move].removeAttribute("blank");
                    ++step;
                }
            });
        })(tmp_li);

        tmp_li.appendChild(tmp_img);
        nodesToBeAppend.appendChild(tmp_li);
    }
    $("#container").append(nodesToBeAppend);
}

function confirm() {
    this.nodelist = $("#container").children();
    for (var i = 0; i < this.nodelist.length; ++i) {
        if (this.nodelist[i].childNodes[0].src.split('panda_')[1].split('.')[0] != i + 1) {
            return false;
        }
    }
    return true;
}

NodeList.prototype.all = function (callback) {
    while (this.length != 0) {
        callback(this[getRandom(0, this.length - 1)]);
    }
};

window.getRandom = function(Min,Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    return(Min + Math.round(Rand * Range));
};

window.showAlert = function(content) {
    $("#alert-box").text(content).addClass("top").blinkClass("active", 2000, function() {
        $(this).removeClass("top");
    });
};

$.fn.extend({
    blinkClass: function (className, time, func) {
        var self = this;
        if (this.hasClass(className)) {
            clearInterval(this.st);
        }
        $(this).addClass(className);
        this.st = setTimeout(function () {
            $(self).removeClass(className);
            if (func) func.call(self);
        }, time);
    }
});