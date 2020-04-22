var fs = require('fs')
const path = require('path');
const qs = require('querystring');
const url = require('url');

const getData = require('./queries/getData');
const postData = require('./queries/postData');
const filterData=require('./queries/filterData');


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
    const url = request.url;
    const extension = url.split('.')[1];
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


const getItemsHandler = response => {

    getData.getData((err, res) => {
        if (err) {
            console.log(err)
            response.end('Sorry error found');
        }
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(res)
    })
};

const getDescriptionsHandler = response => {

    getData.getAllDescriptions((err, res) => {
        if (err) {
            console.log(err)
            response.end('Sorry error found');
        }
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(res)
    })
};


const insertItemsHandler = (request, response) => {

    const parsedurl = url.parse(request.url).query;

    const parsedobject = qs.parse(parsedurl);

    const name = parsedobject.description;
    const quantity = parsedobject.quantity;


    postData(name, quantity, (err, res) => {
        if (err) {
            console.log(err)
            response.end('Sorry error found');
        }
        response.writeHead(302, { 'Location': '/' });
        response.end()



    })
}


const filterItemsHandler = (request,response) => {

    const queryfiltered = url.parse(request.url).query;

    const parsedfiltered = qs.parse(queryfiltered);

    // const filtredname = parsedfiltered.product;
    const filtredquantity = parsedfiltered.quantity;
    const filtredprice =parsedfiltered.price;

    filterData(filtredquantity,filtredprice,(err, res) => {
        if (err) {
            console.log(err)
            response.end('Sorry error found');
        }
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(res)
    })
};



module.exports = {
    indexHandler: indexHandler,
    publicHandler: publicHandler,
    getItemsHandler: getItemsHandler,
    getDescriptionsHandler: getDescriptionsHandler,
    insertItemsHandler: insertItemsHandler,
    filterItemsHandler:filterItemsHandler
}