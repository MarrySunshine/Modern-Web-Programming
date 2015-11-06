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

        screenObj = $("#screen");

        lastValContainer = $("#last-value");

        lastValObj = lastValContainer.childNodes[0];

        curValContainer = $("#current-value");

        curValObj = curValContainer.childNodes[0];

        var head = $("head");
        for (var i in head.childNodes) {
            if (head.childNodes[i].nodeName == "#text") continue;
            if (head.childNodes[i].getAttribute("tag") == "theme") break;
        }

        this.themeNode = head.childNodes[i];
    };

    this.appendValue = function(val) {
        if (self.isResultShow) {
            if (isNaN(parseInt(val)) && val != "(" && val != ")") {
                curValObj.text(curValObj.text() + val);
            } else {
                saveLastVal();
                curValObj.text(val);
            }
            self.isResultShow = false;
        } else {
            if (curValObj.text() !== "0") {
                curValObj.text(curValObj.text() + val);
            } else {
                curValObj.text(val);
            }
        }
    };

    this.removeValue = function() {
        if (self.isResultShow) {
            saveLastVal();
            curValObj.text("0");
            self.isResultShow = false;
        } else {
            if (curValObj.text().length != 1) {
                curValObj.text(curValObj.text().substring(0, curValObj.text().length - 1));
            } else {
                curValObj.text("0");
            }
        }
    };

    this.clean = function() {
        setTimeout(function() {
            if (curValObj.text() !== "0" && self.isResultShow) {
                saveLastVal();
            }
            curValObj.text("0");
            self.isResultShow = false;
        }, 200);

        screenObj.blinkClass("clear-screen", 400);
    };

    this.getResult = function() {
        try {
            curValObj.text(parseFloat(eval(curValObj.text()).toFixed(8)));
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
            curValObj.text(lastValObj.text());
            self.isResultShow = false;
            if (!self.values.empty()) {
                lastValObj.text(self.values.pop());
            } else {
                lastValObj.text("0");
            }
        });
    };

    this.changeTheme = function(type) {
        self.themeNode.href = "css/" + type + ".css";
        showAlert(type);
    };

    //private method

    var saveLastVal = function() {
        if (lastValObj.text() !== "0") {
            self.values.push(lastValObj.text());
        }
        lastValObj.text(curValObj.text());
    };
}