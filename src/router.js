var handlers = require('./handlers.js');

function router(request, response) {
    if (request.url === '/') {
        handlers.indexHandler(request, response)
    } else if (request.url === '/items') {
        handlers.getItemsHandler(response); {
        }

    } else if (request.url === '/alldescriptions') {
        handlers.getDescriptionsHandler(response); {
        }
    } else if (request.url.includes('/insertitems')) {
        console.log('you are in router');
        console.log(request.url);
        handlers.insertItemsHandler(request,response); {
        }



    } else {
        handlers.publicHandler(request, response);
    }
}

module.exports = router;