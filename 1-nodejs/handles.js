// ./handles.js
// Necessary imports
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
    '         <p>Hi!</p>' +
    '         <p>To use this page correctly,</p>' +
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

module.exports = {
    serverHandle: function(req, res) {
        const route = url.parse(req.url)
        const path = route.pathname
        const params = qs.parse(route.query)

        if (path === '/hello' && 'name' in params) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            if (params['name'] === 'Eirik') {
                res.write(selfIntroContent)
            } else {
                res.write('Hello ' + params['name'])
            }
        } else if (path === '/') {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(homeContent)
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.write('404, page not found')
        }
        res.end();
    }
}
