const http = require("http");
const fs = require("fs")
const path = require("path");

const host = "127.0.0.1";
const post = 3000;

const server = http.createServer((req, res) => {
    const filePath = path.join(__dirname, req.url === "/" ? "index.html" : req.url);
    const extName = path.extname(filePath);

    let contentType = "text/html";

    switch(extName){
        case ".js":
            contentType = "text/javascript";
            break;
        case ".css":
            contentType = "text/css";
            break;
        case ".png": 
            contentType = "image/png";
            break;
        case ".svg":
            contentType = "image/svg+xml";
            break;

    }

    fs.readFile(filePath, (err, data) => {
        if(err){
            if(err.code == "ENOENT"){
                fs.readFile(path.join(__dirname, '404.html'), (err, data) => {
                    res.writeHead(404, {'Content-Type': "text/html"});
                    res.end(data, "utf8");
                })
            }else{
                res.writeHead(500);
                res.end("Something wrog")
            }
        }else{
            res.writeHead(200, {"Content-Type": contentType})
            res.end(data, "utf8");
        }
    })
})

server.listen(post, host, () => {
    console.log("Server started http://localhost:3000")
})