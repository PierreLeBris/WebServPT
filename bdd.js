/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
var http = require('http');

var BaseDeDonnees = {};

function hasSameProperties(obj1, obj2 ) {
    return Object.keys( obj1 ).every( function( property ) {
      return obj2.hasOwnProperty( property );
    });
  }

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
        pathData = '';
        pathDataId = '';
        if (path.split('/')[2]) {
            pathTable = path.split('/')[2];
        }
        if ( path.split('/')[3]) {
            pathData =  path.split('/')[3];
        }
        if (path.split('/')[4]) {
            pathDataId = path.split('/')[4];
        }

        if (req.method === "OPTIONS") {
            if (pathTable === '') {
                res.writeHead(204, {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, DELETE',
                    'Access-Control-Allow-Headers': 'Content-Type',
                  });
                  res.end();
            }
            else if ( pathTable !== '' && pathData === '' ) {
                res.writeHead(204, {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET',
                    'Access-Control-Allow-Headers': 'Content-Type',
                  });
                  res.end();
            }
            else if ( pathData !== '' && pathDataId === ''){
                res.writeHead(204, {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST',
                    'Access-Control-Allow-Headers': 'Content-Type',
                  });
                  res.end();
            }
            else if ( pathTable !== '' && pathData !== '' ) {
                switch (pathData) {
                    case 'rules':
                        res.writeHead(204, {
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Methods': 'GET, POST',
                            'Access-Control-Allow-Headers': 'Content-Type',
                          });
                          res.end();
                    break;
                
                    case 'data':
                        if (pathDataId === '') {
                            res.writeHead(204, {
                                'Access-Control-Allow-Origin': '*',
                                'Access-Control-Allow-Methods': 'GET, POST',
                                'Access-Control-Allow-Headers': 'Content-Type',
                              });
                              res.end();
                        }
                        else {
                            res.writeHead(204, {
                                'Access-Control-Allow-Origin': '*',
                                'Access-Control-Allow-Methods': 'GET, PUT, DELETE',
                                'Access-Control-Allow-Headers': 'Content-Type',
                              });
                              res.end();
                        }
                    break;
                }
            }
        }

        if (pathTable === '') {
            if (req.method === 'GET') {
                res.writeHead(200, {'Content-type': 'application/json'});
                if (BaseDeDonnees[pathBdd]) {
                    const TableName = Object.keys(BaseDeDonnees[pathBdd]);
                    res.end(JSON.stringify(TableName));
                } else {
                    res.writeHead(404, {'Content-type': 'application/json'});
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
                        BaseDeDonnees[pathBdd][body] = {'config':{'lastId':0}, 'rules':{} ,'data':{}};
                        res.writeHead(200, {'Content-type': 'application/json'});
                        res.end('{Table created}');
                    }
                    else {
                        res.writeHead(404, {'Content-type': 'application/json'});
                        res.end('{Table already exist}');
                    }
                });
            }
            else if (req.method === 'DELETE' && BaseDeDonnees[pathBdd]) {
                res.writeHead(200, {'Content-type': 'application/json'});
                BaseDeDonnees[pathBdd] = 0;
                delete BaseDeDonnees[pathBdd];
                res.end('{bdd deleted}');
            }
        }
        else if (pathTable !== '' && pathData === '') {
            if (req.method === 'GET') {
                res.writeHead(200, {'Content-type': 'application/json'});
                if (BaseDeDonnees[pathBdd]) {
                    const TableContent = Object.keys(BaseDeDonnees[pathBdd][pathTable]);
                    res.end(JSON.stringify(TableContent));
                } else {
                    res.writeHead(404, {'Content-type': 'application/json'});
                    res.end('Not Found');
                }
            }
        }
        else if (pathTable !== '' && pathData !== '') {
            switch (pathData) {
                case 'rules':
                    if (req.method === 'GET') {
                        res.writeHead(200, {'Content-type': 'application/json'});
                        if (BaseDeDonnees[pathBdd]) {
                            res.end(JSON.stringify(BaseDeDonnees[pathBdd][pathTable].rules));
                        } else {
                            res.writeHead(404, {'Content-type': 'application/json'});
                            res.end('Not Found');
                        }
                    }
                    else if (req.method === 'POST') {
                        var body = '';
                        res.writeHead(200, {'Content-type': 'application/json'});
                        req.on('data', function (data) {
                            body += data.toString();
                        });
                        req.on('end', function () {
                            if (Object.keys(BaseDeDonnees[pathBdd][pathTable].rules).length !== 0) {
                                res.writeHead(404, {'Content-type': 'application/json'});
                                res.end('rules already exist');
                            }
                            else {
                                BaseDeDonnees[pathBdd][pathTable].rules = JSON.parse(body);
                                res.end('{rules created}');
                            }
                        });
                    }
                break;
                case 'data':
                    if (Object.keys(BaseDeDonnees[pathBdd][pathTable].rules).length === 0) {
                        res.writeHead(404, {'Content-type': 'application/json'});
                        res.end('Please add rules before adding data');
                    }
                    else {
                        if (pathDataId === '') {
                            if (req.method === 'GET') {
                                res.writeHead(200, {'Content-type': 'application/json'});
                                if (BaseDeDonnees[pathBdd]) {
                                    res.end(JSON.stringify(BaseDeDonnees[pathBdd][pathTable].data));
                                } else {
                                    res.writeHead(404, {'Content-type': 'application/json'});
                                    res.end('Not Found');
                                }
                            }
                            if (req.method === 'POST') {
                                var body = '';
                                res.writeHead(200, {'Content-type': 'application/json'});
                                req.on('data', function (data) {
                                    body += data.toString();
                                });
                                req.on('end', function () {
                                    if ( hasSameProperties(JSON.parse(body), BaseDeDonnees[pathBdd][pathTable].rules) ) {
                                        res.writeHead(200, {'Content-type': 'application/json'});
                                        const increment = BaseDeDonnees[pathBdd][pathTable].config.lastId + 1;
                                        BaseDeDonnees[pathBdd][pathTable].config.lastId = increment;
                                        BaseDeDonnees[pathBdd][pathTable].data[increment] = JSON.parse(body);
                                        res.end('{data added}');
                                    }
                                    else {
                                        res.writeHead(404, {'Content-type': 'application/json'});
                                        res.end('incorrect data structure');
                                    }
                                });
                            } 
                        }
                        else if (pathDataId !== '') {
                            console.log(pathDataId);
                            if (req.method === 'GET') {
                                res.writeHead(200, {'Content-type': 'application/json'});
                                if (BaseDeDonnees[pathBdd]) {
                                    res.end(JSON.stringify(BaseDeDonnees[pathBdd][pathTable].data[pathDataId]));
                                } else {
                                    res.writeHead(404, {'Content-type': 'application/json'});
                                    res.end('Not Found');
                                }
                            }
                            if (req.method === "PUT") {
                                var body = '';
                                res.writeHead(200, {'Content-type': 'application/json'});
                                req.on('data', function (data) {
                                    body += data.toString();
                                });
                                req.on('end', function(){
                                    if ( hasSameProperties(JSON.parse(body), BaseDeDonnees[pathBdd][pathTable].rules) ) {
                                        res.writeHead(200, {'Content-type': 'application/json'});
                                        BaseDeDonnees[pathBdd][pathTable].data[pathDataId] = JSON.parse(body);
                                        res.end('{data updated}');
                                    }
                                })
                            }
                            if (req.method === "DELETE") {
                                res.writeHead(200, {'Content-type': 'application/json'});
                                delete BaseDeDonnees[pathBdd][pathTable].data[pathDataId];
                                res.end('{data deleted}');
                            }  
                        }
                    }
                break;
            }
        }
        else {
            res.writeHead(404, {'Content-type': 'application/json', 'Access-Control-Allow-Origin':'*'});
            res.end('Not Found');
        }
    }
});

server.listen(8000);
