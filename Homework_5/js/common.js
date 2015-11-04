Array.prototype.empty = function() {
    return (this.length == 0);
};

Array.prototype.pop = function() {
    var val = this[this.length - 1];
    this.splice(this.length - 1, 1);
    return val;
};

Node.prototype.addClass = function(className) {
    this.classList.add(className);
};

Node.prototype.removeClass = function(className) {
    this.classList.remove(className);
};

Node.prototype.hasClass = function(className) {
    for (var i in this.classList) {
        if (this.classList[i] == className) return true;
    }
    return false;
};

Node.prototype.blinkClass = function(className, time, func) {
    var self = this;
    this.addClass(className);
    var st = setTimeout(function () {
        self.removeClass(className);
        if (func) func();
    }, time);
};

var queryText = function(selector, text) {
    var items = document.querySelectorAll(selector);
    for (var i in items) {
        if (items[i].innerText == text) {
            return items[i];
        }
    }
    return null;
};