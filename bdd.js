/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
var http = require('http');

var BaseDeDonnees = {};

var server = http.createServer(function (req, res) {
    var path = req.url.split('?')[0];

    if (!path || path === '/') {
        if (req.method === 'GET') {
            res.writeHead(200, {'Content-type': 'application/json', 'Access-Control-Allow-Origin':'*'});
            if (BaseDeDonnees) {
                const bddName = Object.keys(BaseDeDonnees);
                res.end(JSON.stringify(bddName));
            } else {
                res.writeHead(404, {'Content-type': 'application/json', 'Access-Control-Allow-Origin':'*'});
                res.end('Not Found');
            }
        }
        else if (req.method === 'POST') {
            var body = '';
            req.on('data', function (data) {
                body += data.toString();
            });
            res.writeHead(200, {'Content-type': 'application/json', 'Access-Control-Allow-Origin':'*'});
            req.on('end', function () {
                if (!body) {
                    res.writeHead(404, {'Content-type': 'application/json', 'Access-Control-Allow-Origin':'*'});
                    res.end('{Error: Database name can not be empty}');
                }
                else {
                    if (!BaseDeDonnees[body]) {
                        BaseDeDonnees[body] = {};
                        res.end('{Database created}');
                    }
                    else {
                        res.writeHead(404, {'Content-type': 'application/json', 'Access-Control-Allow-Origin':'*'});
                        res.end('{DataBase already exist}');
                    }
                }
            });
        }
        else {
            res.writeHead(404, {'Content-type': 'application/json', 'Access-Control-Allow-Origin':'*'});
            res.end('Not Found');
        }

    }
    else if (!path || path !== '/') {
        pathBdd = path.split('/')[1];
        pathTable = '';
        if (path.split('/')[2]) {
            pathTable = path.split('/')[2];
        }

        if (pathTable === '') {
            if (req.method === 'GET') {
                res.writeHead(200, {'Content-type': 'application/json', 'Access-Control-Allow-Origin':'*'});
                if (BaseDeDonnees[pathBdd]) {
                    res.end(JSON.stringify(BaseDeDonnees[pathBdd]));
                } else {
                    res.writeHead(404, {'Content-type': 'application/json', 'Access-Control-Allow-Origin':'*'});
                    res.end('Not Found');
                }
            }
            else if (req.method === 'POST' && BaseDeDonnees[pathBdd]) {
                var body = '';
                req.on('data', function (data) {
                    body += data.toString();
                });
                req.on('end', function () {
                    if (!BaseDeDonnees[pathBdd][body]) {
                        BaseDeDonnees[pathBdd][body] = {};
                        res.writeHead(200, {'Content-type': 'application/json', 'Access-Control-Allow-Origin':'*'});
                        res.end('{Table created}');
                    }
                    else {
                        res.writeHead(404, {'Content-type': 'application/json', 'Access-Control-Allow-Origin':'*'});
                        res.end('{Table already exist}')
                    }
                });
            }
            /*else if (req.method === 'PUT' && BaseDeDonnees[pathBdd]) {
                var body = '';
                req.on('data', function (data) {
                    body += data.toString();
                });
                req.on('end', function () {
                    if (!BaseDeDonnees[body]) {
                        BaseDeDonnees[body] = BaseDeDonnees[pathBdd];
                        delete BaseDeDonnees[pathBdd];
                        res.writeHead(200, {'Content-type': 'application/json', 'Access-Control-Allow-Origin':'*'});
                        res.end('{bdd altered}');
                    }
                    else {
                        res.writeHead(404, {'Content-type': 'application/json', 'Access-Control-Allow-Origin':'*'});
                        res.end('{There is database with this name}');
                    }
                });
            }*/
            else if (req.method === 'DELETE' && BaseDeDonnees[pathBdd]) {
                res.writeHead(200, {'Content-type': 'application/json', 'Access-Control-Allow-Origin':'*'});
                BaseDeDonnees[pathBdd] = 0;
                delete BaseDeDonnees[pathBdd];
                console.log(BaseDeDonnees);
                res.end('{bdd deleted}');
            }
        }
        else if (pathTable !== '') {
            if (req.method === 'GET') {
                res.writeHead(200, {'Content-type': 'application/json', 'Access-Control-Allow-Origin':'*'});
                if (BaseDeDonnees[pathBdd]) {
                    res.end(JSON.stringify(BaseDeDonnees[pathBdd][pathTable]));
                } else {
                    res.writeHead(404, {'Content-type': 'application/json', 'Access-Control-Allow-Origin':'*'});
                    res.end('Not Found');
                }
            }
            if (req.method === 'POST') {
                var body = '';
                res.writeHead(200, {'Content-type': 'application/json', 'Access-Control-Allow-Origin':'*'});
                req.on('data', function (data) {
                    body += data;
                });
                req.on('end', function () {
                    if (!BaseDeDonnees[pathBdd][pathTable].rules) {
                    BaseDeDonnees[pathBdd][pathTable].rules = body;
                    }
                    console.log(BaseDeDonnees[pathBdd][pathTable].rules);
                    res.end('{rules created}');
                });
            }
        }
        else {
            res.writeHead(404, {'Content-type': 'application/json', 'Access-Control-Allow-Origin':'*'});
            res.end('Not Found');
        }
    }
});

server.listen(8000);
