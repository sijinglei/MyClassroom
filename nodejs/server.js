var http = require('http');
http.createServer((res, req) => {
    console.log('start');
    req.writeHead(200, { "Content-Type": "text/plain" });
    req.write("Hello World");
    req.end();
}).listen(8888)
console.log("Server has started.");