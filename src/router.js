var handlers = require('./handlers.js');

function router(request, response) {
    if (request.url === '/') {
        handlers.indexHandler(request, response)
    }
    else if (request.url === '/items') {
        handlers.getItemsHandler(response); {
        }
        //     else if (request.url.includes('api/giphyhandler')) {
        //         giphyHandler.giphyModule(request, response)
        //     }
    } else {
        handlers.publicHandler(request, response);
    }
}

module.exports = router;