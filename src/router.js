var handlers = require('./handlers.js');

function router(request, response) {
    if (request.url === '/') {
        handlers.indexHandler(request, response)
    } else if (request.url === '/items') {
        handlers.getItemsHandler(response); {
        }

    } else if (request.url === '/alldescriptions') {
        handlers.getDescriptionsHandler(response);

    } else if (request.url.includes('/insertitems')) {
        handlers.insertItemsHandler(request, response);


    } else if (request.url.includes('/filteritems')) {
        handlers.filterItemsHandler(request, response);

    } else if (request.url.includes('/sortitemsbyquantity')) {
        handlers.sortItemsbyquantityHandler(response);

    
    } else if (request.url.includes('/sortitemsbyprice')) {
        handlers.sortItemsbypriceHandler(response);
        
    } else if (request.url.includes('/updateprice')) {
        handlers.getPriceHandler(request, response);

    } else if (request.url.includes('/deleteitem')) {
        console.log("router request.url", request.url)
        handlers.deleteHandler(request, response);
        
    } else {
        handlers.publicHandler(request, response);
    }
}

module.exports = router;