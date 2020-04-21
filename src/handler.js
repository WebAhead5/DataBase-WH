var fs = require('fs')
const path = require('path');

var extensionTypesObj = {
    html: 'text/html',
    css: 'text/css',
    js: 'application/javascript',
    ico: 'image/x-icon',
    txt: 'text/plain',
    gif: 'image/gif'
}

const indexHandler = function (request, response) {
    response.writeHead(200, { "Content-Type": "text/html" })
    fs.readFile(__dirname + '/../public/index.html', function (error, file) {
        if (error) {
            console.log("indexHandler error: ", error);
            return;
        }
        response.end(file)
    })
}

const publicHandler = (request, response) => {
    const url = request.url; // /public/dictionary.txt
    const extension = url.split('.')[1]; // txt
    const filePath = path.join(__dirname, "..", url);
    fs.readFile(filePath, (error, file) => {
        if (error) {
            response.writeHead(500, { 'Content-Type': 'text/html' });
            response.end("<h1>Sorry, encountered a problem</h1>");
        } else {
            response.writeHead(200, { 'Content-type': extensionTypesObj[extension] });
            response.end(file);
        }
    })
}

module.exports = {
    indexHandler: indexHandler,
    publicHandler: publicHandler,
}