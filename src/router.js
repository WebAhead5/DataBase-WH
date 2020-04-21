var handlers = require('./handlers.js');
var giphyHandler = require('./giphyhandler');
var oxfordHandler = require('./oxford');

function router(request, response) {
    if (request.url === '/') {
        handlers.indexHandler(request, response)
    }
    else if (request.url.includes('/api/words')) {
        oxfordHandler.oxfordHandler(request, response)
    }
    else if (request.url.includes('api/giphyhandler')) {
        giphyHandler.giphyModule(request, response)
    }
    else {
        handlers.publicHandler(request, response);
    } 
}

module.exports = router;