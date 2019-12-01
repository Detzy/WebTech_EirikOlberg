// Import a module
const http = require('http')
const url = require('url')
const qs = require('querystring')

const homeContent = '<!DOCTYPE html>' +
    '<html>' +
    '    <head>' +
    '        <meta charset="utf-8" />' +
    '        <title>ECE AST</title>' +
    '    </head>' +
    '    <body>' +
    '         <p>Hi!</p>'+
    '         <p>To use this page correctly,</p>'+
    '         <p>please enter /hello?name=_Use Your Name Here_ in the search bar</p>' +
    '         <p>To meet me, write /hello?name=Eirik</p>' +
    '    </body>' +
    '</html>'

const selfIntroContent = '<!DOCTYPE html>' +
    '<html>' +
    '    <head>' +
    '        <meta charset="utf-8" />' +
    '        <title>ECE AST</title>' +
    '    </head>' +
    '    <body>' +
    '         <p>My name is Eirik, and I am 22 years old. Je parle un peu francais</p>' +
    '    </body>' +
    '</html>'

const serverHandle = function (req, res) {
    const route = url.parse(req.url)
    const path = route.pathname
    const params = qs.parse(route.query)

    if (path === '/hello' && 'name' in params) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        if (params['name'] === 'Eirik'){
            res.write(selfIntroContent)
        }else{
            res.write('Hello ' + params['name'])
        }
    } else if (path === '/'){
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(homeContent)
    } else{
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('404, page not found')
    }
    res.end();
}

const server = http.createServer(serverHandle);
server.listen(8080)

// const serverHandle_withoutRouteExample = function (req, res) {
//     // Retrieve and print the current path
//     const path = url.parse(req.url).pathname;
//     console.log(path);

//     // Retrieve and print the queryParams
//     const queryParams = qs.parse(url.parse(req.url).query);
//     console.log(queryParams);

//     res.writeHead(200, { 'Content-Type': 'text/html' });
//     res.write(content);
//     res.end();
// }

// // Declare an http server
// http.createServer(function (req, res) {

//   // Write a response header
//   res.writeHead(200, {'Content-Type': 'text/plain'});

//   // Write a response content
//   res.end('Hello World\n');

// // Start the server
// }).listen(8080)

// curl localhost:8080 or go to http://localhost:8080