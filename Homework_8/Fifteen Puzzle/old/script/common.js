Object.prototype.forEach = function(func) {
    for (var i = 0; i < this.length; ++i) {
        func(this[i], i);
    }
};

Object.prototype.on = function(event, handle, selector) {
    var self = this;
    if (selector) {
        this.addEventListener(event, function(e) {
            if (self.querySelectorAll(selector).indexOf(e.target) != -1) {
                handle.apply(e.target, e);
                e.stopPropagation();
            }
        });
        this.eventList.push({
            "event": event,
            "handle": handle
        });
    } else if (this.length) {
        this.forEach(function(e) {
            e.addEventListener(event, handle);
            e.eventList.push({
                "event": event,
                "handle": handle
            });
        });
    } else {
        this.addEventListener(event, handle);
        this.eventList.push({
            "event": event,
            "handle": handle
        });
    }
};

Object.prototype.eventList = [];

Object.prototype.off = function(event) {
    if (this.length) {
        this.forEach(function (e) {
            for (var i = 0; i < e.eventList.length; ++i) {
                if (e.eventList[i].event == event)
                    e.removeEventListener(e.eventList[i].event, e.eventList[i].handle);
            }
        });
    } else {
        for (var i = 0; i < this.eventList.length; ++i) {
            if (this.eventList[i].event == event) {
                this.removeEventListener(this.eventList[i].event, this.eventList[i].handle);
            }
        }
    }
};

Object.prototype.empty = function() {
    return (this.length == 0);
};

Array.prototype.pop = function() {
    var val = this[this.length - 1];
    this.splice(this.length - 1, 1);
    return val;
};

NodeList.prototype.indexOf = function(item) {
    var flag = -1;
    for (var i = 0; i < this.length; ++i) {
        if (this[i] == item) {
            flag = i;
        }
    }
    return flag;
};

NodeList.prototype.all = function (callback) {
    while (!this.empty()) {
        callback(this[getRandom(0, this.length - 1)]);
    }
};

Node.prototype.addClass = function(className) {
    this.classList.add(className);
};

Node.prototype.removeClass = function(className) {
    this.classList.remove(className);
};

Node.prototype.hasClass = function(className) {
    for (var i in this.classList) {
        if (this.classList[i] == className)
            return true;
    }
    return false;
};

Node.prototype.blinkClass = function(className, time, func) {
    var self = this;
    if (this.hasClass(className)) {
        clearInterval(this.st);
    }
    this.addClass(className);
    this.st = setTimeout(function () {
        self.removeClass(className);
        if (func) func();
    }, time);
};

Node.prototype.trigger = function(event, data) {
    this.dispatchEvent(new Event(event));
};

function queryText(selector, text) {
    var items = $(selector);
    for (var i in items) {
        if (items[i].text() == text) {
            return items[i];
        }
    }
    return null;
}

function $(selector) {
    var list = document.querySelectorAll(selector);
    return list.length == 1 ? list[0] : list;
}

window.showAlert = function(content) {
    var alertBox = document.getElementById("alert-box");
    alertBox.textContent = content;
    alertBox.addClass("top");
    alertBox.blinkClass("active", 2000, function() {
        alertBox.removeClass("top");
    });
};

window.getRandom = function(Min,Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    return(Min + Math.round(Rand * Range));
};