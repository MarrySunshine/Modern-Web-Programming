var users = require("./user.json");
var server = require("./server");
var querystring = require("querystring");
var fs = require("fs");
var url = require("url");

require("./server")
    .use("/", function (request, response) {
        server.sendFile("/index.html", request, response);
    })
    .use("/regist", function (request, response) {
        response.writeHead(200, {"Content-Type": "application/json"});
        var postData = "";
        request.addListener("data", function (e) {
            postData += e;
        });
        request.addListener("end", function () {
            var params = querystring.parse(postData);
            var result = null;
            if (result = hasDuplicateData(params)) {
                sendJson(response, {
                    result: false,
                    duplicateArray: result
                });
            } else {
                users.push(params);
                fs.writeFile("./server/user.json", JSON.stringify(users), function (err) {
                    if (err) {
                        console.log("文件写入失败");
                    } else {
                        console.log("用户" + params.username + "注册成功");
                    }
                });
                sendJson(response, {
                    result: true,
                    msg: "successfully"
                });
            }
            response.end();
        });
        console.log("200:" + request.url);
    })
    .use("/getUserInfo", function (request, response) {
        var params = url.parse(request.url, true).query;
        var user = null;
        if (user = isUserExists(params.username)) {
            sendJson(response, {
                result: true,
                msg: "获取成功",
                user: user
            });
        } else {
            sendJson(response, {
                result: false,
                msg: "用户不存在"
            });
        }
        response.end();
    });

function isUserExists(username) {
    for (var i = 0; i < users.length; ++i) {
        if (users[i].username == username) {
            return users[i];
        }
    }
    return false;
}

function hasDuplicateData(user) {
    var result = [];
    users.forEach(function (e) {
        for (var key in e) {
            if (e[key] === user[key]) {
                result.push(key);
            }
        }
    });
    return result.length === 0 ? false : result;
}

function isEmptyObject(Object) {
    var empty = true;
    for (var key in Object) {
        empty = false;
        break;
    }
    return empty;
}

function sendJson(response, json) {
    response.writeHead(200, {"Content-Type": "application/json"});
    response.write(JSON.stringify(json));
}