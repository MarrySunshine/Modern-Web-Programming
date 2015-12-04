$(function () {
    if (location.href.split('?')[1]) {
        showInformation(urlToObject(location.href).username);
    }
    $("#submit").on("click", function () {
        validate("username", $("#username").val(), validateHandle);
        validate("phone", $("#phone").val(), validateHandle);
        validate("student-id", $("#student-id").val(), validateHandle);
        validate("email", $("#email").val(), validateHandle);
        if ($(".error").length === 0) {
            regist($("#username").val(), $("#student-id").val(), $("#phone").val(), $("#email").val())
                .success(function (result) {
                    if (result.result) {
                        location.href = "http://localhost:8000?username=" + $("#username").val();
                    } else {
                        result.duplicateArray.forEach(function (e) {
                            validateHandle.call($("#" + e), false, "已存在相同属性");
                        });
                    }
                });
        }
    });
    $("#reset").on("click", function () {
        $("#regist-form input[type='text']").val("");
    });
    $("#regist-form").on("focus", ".error", function () {
        $(this).val("");
        $(this).removeClass("error");
    });
});

function validate(type, value, callback) {
    var regexp = null;
    var msg = null;
    switch (type) {
        case "username":
            regexp = /^[a-zA-Z][a-zA-Z0-9_]{5,17}$/;
            msg = "字母开头, 6~18位英文字符";
            break;
        case "student-id":
            regexp = /^[1-9]\d{7}$/;
            msg = "学号8位数字，不能以0开头";
            break;
        case "phone":
            regexp = /^[1-9]\d{10}$/;
            msg = "电话11位数字，不能以0开头";
            break;
        case "email":
            regexp = /^[a-zA-Z0-9_\-]+@(([a-zA-Z0-9_\-])+\.)+[a-zA-Z]{2,4}$/;
            msg = "邮箱不合法";
            break;
        default:
            break;
    }
    callback.call($("#" + type)[0], regexp.test(value), msg);
    return this;
}

function validateHandle(result, msg) {
    if (!result) {
        $(this).val(msg);
        $(this).addClass("error");
    }
}

function regist(username, studentId, phone, email) {
    return $.post("./regist", {
        username: username,
        "student-id": studentId,
        phone: phone,
        email: email
    });
}

function showInformation(username) {
    $("input").attr("disabled", "disabled");
    $("#submit, #reset").hide();
    $("#welcome").text("INFORMATION");
    $.get("./getUserInfo", {
        username: username
    }).success(function (result) {
        if (result.result) {
            for (var key in result.user) {
                $("#" + key).val(result.user[key]);
            }
        } else {
            alert(result.msg);
            $("input").val("").removeAttr("disabled");
            $("#submit, #reset").show();
            $("#welcome").text("WELCOME");
        }
    });
}

function urlToObject(url) {
    var obj = {};
    url.split('?')[1].split('&').forEach(function (e) {
        var tmpArray = e.split('=');
        obj[tmpArray[0]] = tmpArray[1];
    });
    return obj;
}