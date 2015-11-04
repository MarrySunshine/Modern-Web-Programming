var screen = new Screen();

function Screen() {

    //public data

    this.values = [];

    this.isResultShow = false;

    //private data

    var self = this;

    var screenObj = null;

    var lastValContainer = null;

    var curValContainer = null;

    var lastValObj = null;

    var curValObj = null;

    //public method

    this.init = function() {

        screenObj = document.getElementById("screen");

        lastValContainer = document.getElementById("last-value");

        lastValObj = lastValContainer.childNodes[0];

        curValContainer = document.getElementById("current-value");

        curValObj = curValContainer.childNodes[0];

        var head = document.getElementsByTagName("head")[0];
        for (var i in head.childNodes) {
            if (head.childNodes[i].nodeName == "#text") continue;
            if (head.childNodes[i].getAttribute("tag") == "theme") break;
        }

        this.themeNode = head.childNodes[i];
    };

    this.appendValue = function(val) {
        if (self.isResultShow) {
            if (isNaN(parseInt(val)) && val != "(" && val != ")") {
                textMove("left", function() {
                    curValObj.innerText += val;
                });
            } else {
                saveLastVal();
                curValObj.innerText = val;
            }
            self.isResultShow = false;
        } else {
            if (curValObj.innerText !== "0") {
                textMove("left", function() {
                    curValObj.innerText += val;
                });
            } else {
                curValObj.innerText = val;
            }
        }
    };

    this.removeValue = function() {
        if (self.isResultShow) {
            saveLastVal();
            curValObj.innerText = "0";
            self.isResultShow = false;
        } else {
            if (curValObj.innerText.length != 1) {
                textMove("right", function() {
                    curValObj.innerText = curValObj.innerText.substring(0, curValObj.innerText.length - 1);
                });
            } else {
                curValObj.innerText = "0";
            }
        }
    };

    this.clean = function() {
        setTimeout(function() {
            if (curValObj.innerText !== "0" && self.isResultShow) {
                saveLastVal();
            }
            curValObj.innerText = "0";
            self.isResultShow = false;
        }, 300);

        screenObj.blinkClass("clear-screen", 600);
    };

    this.getResult = function() {
        try {
            curValObj.innerText = eval(curValObj.innerText);
            self.isResultShow = true;
        } catch(e) {
            if (!confirm("式子写错了,我先问你个问题,我帅不?")) {
                while (!confirm("我就问你我帅不?")) {      }
            }
        }
    };

    this.useLastVal = function() {
        lastValContainer.blinkClass("move-down", 400);
        curValContainer.blinkClass("move-down", 400, function() {
            curValObj.innerText = lastValObj.innerText;
            self.isResultShow = false;
            if (!self.values.empty()) {
                lastValObj.innerText = self.values.pop();
            } else {
                lastValObj.innerText = "0";
            }
        });
    };

    this.changeTheme = function(type) {
        self.themeNode.href = "css/" + type + ".css";
    };

    //private method

    var saveLastVal = function() {
        if (lastValObj.innerText !== "0") {
            self.values.push(lastValObj.innerText);
        }
        lastValObj.innerText = curValObj.innerText;
    };

    var textMove = function (director, then) {
        curValContainer.blinkClass("move-" + director, 200, then);
    };
}