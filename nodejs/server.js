var http = require('http');
var url = require("url");


var start = () => {
        http.createServer((req, res) => {
            console.log('start');
            var pathname = url.parse(res.url).pathname;
            console.log("Request for " + pathname + " received.");
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.write("Hello World");
            res.end();
        }).listen(8888);
        console.log("Server has started.");
    }
    //或
    // http.createServer((req, res) => {
    //     console.log('start');
    //     res.writeHead(200, { "Content-Type": "text/plain" });
    //     res.write("Hello World");
    //     res.end();
    // }).listen(8888);

exports.start = start;