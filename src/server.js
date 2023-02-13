const http = require('http');
const url = require('url');
const query = require('querystring');

const htmlHandler = require('./htmlResponses.js');
const cssHandler = require('./cssResponses.js');
const jsonHandler = require('./jsonResponses.js');
const xmlHandler = require('./xmlResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const handleGet = (request, response, parsedUrl, params, accepts) => {
  console.log(request.url);
  switch (parsedUrl.pathname) {
    case '/':
      htmlHandler.getIndex(request, response);
      break;
    case '/style.css':
      cssHandler.getCSS(request, response);
      break;
    case '/success':
      if (accepts[0] === 'text/xml') {
        xmlHandler.success(request, response);
      } else {
        jsonHandler.success(request, response);
      }
      break;
    case '/badRequest':
      if (accepts[0] === 'text/xml') {
        xmlHandler.badRequest(request, response);
      } else {
        jsonHandler.badRequest(request, response, params);
      }
      break;
    case '/unauthorized':
      if (accepts[0] === 'text/xml') {
        xmlHandler.unauthorized(request, response);
      } else {
        jsonHandler.unauthorized(request, response, params);
      }
      break;
    case '/forbidden':
      if (accepts[0] === 'text/xml') {
        xmlHandler.forbidden(request, response);
      } else {
        jsonHandler.forbidden(request, response);
      }
      break;
    case '/internal':
      if (accepts[0] === 'text/xml') {
        xmlHandler.internal(request, response);
      } else {
        jsonHandler.internal(request, response);
      }
      break;
    case '/notImplemented':
      if (accepts[0] === 'text/xml') {
        xmlHandler.notImplemented(request, response);
      } else {
        jsonHandler.notImplemented(request, response);
      }
      break;
    case '/notFound':
      if (accepts[0] === 'text/xml') {
        xmlHandler.notFound(request, response);
      } else {
        jsonHandler.notFound(request, response);
      }
      break;
    default:
      if (accepts[0] === 'text/xml') {
        xmlHandler.notFound(request, response);
      } else {
        jsonHandler.notFound(request, response);
      }
      break;
  }
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const params = query.parse(parsedUrl.query);
  const accepts = request.headers.accept.split(',');

  handleGet(request, response, parsedUrl, params, accepts);
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
