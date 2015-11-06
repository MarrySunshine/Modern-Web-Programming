Object.prototype.forEach = function(func) {
    for (var i = 0; i < this.length; ++i) {
        func(this[i]);
    }
};

Array.prototype.empty = function() {
    return (this.length == 0);
};

Array.prototype.pop = function() {
    var val = this[this.length - 1];
    this.splice(this.length - 1, 1);
    return val;
};

NodeList.prototype.on = function(event, handle) {
    this.forEach(function(e) {
        e.addEventListener(event, handle)
    });
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

Node.prototype.on = function(event, handle) {
    this.addEventListener(event, handle);
};

//兼容火狐
Node.prototype.text = function(newVal) {
    if (newVal) {
        if (this.innerText) {
            this.innerText = newVal;
        } else {
            this.textContent = newVal;
        }
    }
    return (this.innerText || this.textContent);
};

Node.prototype.trigger = function(event, data) {
    var _event = new Event(event);
    _event.data = data;
    this.dispatchEvent(_event);
};

var queryText = function(selector, text) {
    var items = $(selector);
    for (var i in items) {
        if (items[i].text() == text) {
            return items[i];
        }
    }
    return null;
};

var showAlert = function(content) {
    var alertBox = document.getElementById("alert-box");
    alertBox.text(content);
    alertBox.addClass("top");
    alertBox.blinkClass("active", 1000, function() {
        alertBox.removeClass("top");
    });
};

function $(selector) {
    var list = document.querySelectorAll(selector);
    return list.length == 1 ? list[0] : list;
}