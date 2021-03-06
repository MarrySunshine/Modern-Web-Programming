function bindClickEvent() {
    $(".btn-item.display-on-screen").on("click", displayBtnClicked);
    $(".btn-item.no-display").on("click", noDisplayBtnClicked);
}

function bindKeyDownEvent() {
    $("body").on("keydown", KeyDownEvent);
}

function KeyDownEvent(e) {
    var item = null;
    switch (e.keyCode) {
        case 13:
            item = queryText(".btn-item.no-display", "=");
            break;
        case 8:
        case 37:
            item = queryText(".btn-item.no-display", "←");
            break;
        case 38:
            item = queryText(".btn-item.no-display", "↑");
            break;
        case 190:
            item = queryText(".btn-item.display-on-screen", ".");
            break;
        case 187:
            if (e.shiftKey)
                item = queryText(".btn-item.display-on-screen", "+");
            else
                item = queryText(".btn-item.no-display", "=");
            break;
        case 189:
            item = queryText(".btn-item.display-on-screen", "-");
            break;
        case 191:
            item = queryText(".btn-item.display-on-screen", "/");
            break;
        case 27:
        case 32:
            item = queryText(".btn-item.no-display", "CE");
            break;
        case 82:
            item = queryText(".btn-item.no-display", "R");
            break;
        case 76:
            item = queryText(".btn-item.no-display", "L");
            break;
        case 68:
            item = queryText(".btn-item.no-display", "D");
            break;
        case 89:
            item = queryText(".btn-item.no-display", "Y");
            break;

        case 56:
            if (e.shiftKey) {
                item = queryText(".btn-item.display-on-screen", "*");
                break;
            }
        case 57:
            if (e.shiftKey) {
                item = queryText(".btn-item.display-on-screen", "(");
                break;
            }
        case 48:
            if (e.shiftKey) {
                item = queryText(".btn-item.display-on-screen", ")");
                break;
            }
        default:
            if (e.keyCode >= 48 && e.keyCode <= 57) {
                item = queryText(".btn-item.display-on-screen", (e.keyCode - 48).toString());
            }
            break;
    }

    if (item) {
        item.trigger("click");
        item.blinkClass("active", 100);
    }
}

function displayBtnClicked(e) {
    screen.appendValue(this.text());
}

function noDisplayBtnClicked(e) {
    switch (this.text()) {
        case "←":
            screen.removeValue();
            break;
        case "CE":
            screen.clean();
            break;
        case "=":
            screen.getResult();
            break;
        case "↑":
            screen.useLastVal();
            break;
        case "L":
            screen.changeTheme("light");
            break;
        case "R":
            screen.changeTheme("red");
            break;
        case "D":
            screen.changeTheme("dark");
            break;
        case "Y":
            screen.changeTheme("yellow");
            break;
    }
}
