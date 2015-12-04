var http = require("http");
var url = require("url");
var fs = require("fs");
var path = require("path");
var contentType = require("./contentType");

var routes = {};
function start() {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        if (routes[pathname]) {
            routes[pathname](request, response);
        } else {
            sendFile(pathname, request, response);
        }
    }
    http.createServer(onRequest).listen(8000);
    console.log("Server has started.");
}

function use(route, onRequest) {
    routes[route] = onRequest;
    return this;
}

function sendFile(pathname, request, response) {
    fs.readFile("./public" + pathname, function (err, data) {
        if (err) {
            response.writeHead(404, {"Content-Type": "text/html"});
            response.write("<h1>404</h1>");
            response.end();
            console.log("404: " + request.url + "is not found");
        } else {
            response.writeHead(200, {"Content-Type": contentType.getContentTypeByExtName(path.extname(pathname))});
            response.write(data);
            response.end();
            console.log("200:" + request.url);
        }
    });
}

exports.start = start;
exports.use = use;
exports.sendFile = sendFile;