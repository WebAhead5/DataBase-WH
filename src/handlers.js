var fs = require('fs')
const path = require('path');
const qs = require('querystring');
const url = require('url');

const getData = require('./queries/getData');
const postData = require('./queries/postData');
const filterData = require('./queries/filterData');
const sortData = require('./queries/sortData');
const deleteData = require('./queries/deleteData');


var extensionTypesObj = {
    html: 'text/html',
    css: 'text/css',
    js: 'application/javascript',
    ico: 'image/x-icon',
    txt: 'text/plain',
    gif: 'image/gif',
    png: 'img/png'
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

const getPriceHandler = (request, response) => {
    const parsedurl = url.parse(request.url).query;

    const parsedobject = qs.parse(parsedurl);

    const name = parsedobject.description;

    getData.getPrice(name, (err, res) => {
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
    const price = parsedobject.price;


    postData(name, quantity, price, (err, res) => {
        if (err) {
            console.log(err)
            response.end('Sorry error found');
        }
        response.writeHead(200, { 'Content-Type': 'application/json' });
        // response.writeHead(302, { 'Location': '/' });
        response.end(JSON.stringify(res))



    })
}


const filterItemsHandler = (request, response) => {

    const queryfiltered = url.parse(request.url).query;

    const parsedfiltered = qs.parse(queryfiltered);

    const filtredname = parsedfiltered.product;
    const filtredquantity = parsedfiltered.quantity;
    const filtredprice = parsedfiltered.price;


    filterData(filtredname, filtredquantity, filtredprice, (err, res) => {
        if (err) {
            console.log(err)
            response.end('Sorry error found');
        }
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(res)
    })
};



const sortItemsbyquantityHandler = response => {


    console.log('you reached sorting by quantity')


    sortData.sortbyquantity((err, res) => {
        if (err) {
            console.log(err)
            response.end('Sorry error found');
        }
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(res)
    })
};

const sortItemsbypriceHandler = response => {

    console.log('you reached sorting by price')

    sortData.sortbyprice((err, res) => {
        if (err) {
            console.log(err)
            response.end('Sorry error found');
        }
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(res)
    })
};

const deleteHandler = (request, response) => {
    const queryfiltered = url.parse(request.url).query;
    const parsedfiltered = qs.parse(queryfiltered);

    console.log('deleteHandler says: firing', parsedfiltered.itemid)

    deleteData(parsedfiltered.itemid, (err, res) => {
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
    filterItemsHandler: filterItemsHandler,
    getPriceHandler: getPriceHandler,
    sortItemsbypriceHandler: sortItemsbypriceHandler,
    sortItemsbyquantityHandler: sortItemsbyquantityHandler,
    deleteHandler: deleteHandler

}