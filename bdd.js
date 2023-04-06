/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
var http = require('http');
const { writeFile } = require("fs");
const fs = require('fs');
const path = require('path');

function hasSameProperties(obj1, obj2 ) {
    return Object.keys( obj1 ).every( function( property ) {
    return obj2.hasOwnProperty( property );
  });
}

function saveBDD(){
    var now = new Date();
    var logfile_name = './jsonfiles/logfile' + now.getDate() + "." + now.getMonth() + "." + now.getFullYear() + "." + now.getHours() + "-" + now.getMinutes() + '.json';
    const bdd = {BaseDeDonnees}

    writeFile(logfile_name, JSON.stringify(bdd, null, 2), (error) => {
        if (error) {
            console.log("An error has occurred ", error);
            return;
        }
    console.log("Data written successfully to the file");
  });
}

function deleteSave(){
    const folder = './jsonfiles';
    const maxFiles = 5;

    fs.readdir(folder, (err, files) => {
        if (err) throw err;

    files = files.filter(file => !fs.statSync(`${folder}/${file}`).isDirectory());

    if (files.length > maxFiles) {
        files.sort((a, b) => {
        return fs.statSync(`${folder}/${a}`).mtime.getTime() - fs.statSync(`${folder}/${b}`).mtime.getTime();
    });

    const oldestFile = files[0];
    fs.unlink(`${folder}/${oldestFile}`, (err) => {
        if (err) throw err;
        console.log(`Deleted oldest file: ${oldestFile}`);
        });
    }
});

}

function getLastFileInFolder(folderPath) {
  const files = fs.readdirSync(folderPath);
  const sortedFiles = files.sort((a, b) => {
    return fs.statSync(path.join(folderPath, a)).mtime.getTime() -
           fs.statSync(path.join(folderPath, b)).mtime.getTime();
  });
  return sortedFiles[sortedFiles.length - 1];
}

if (!fs.existsSync('./jsonfiles')) {
    fs.mkdirSync('./jsonfiles');
}

var BaseDeDonnees = {};

const lastFile = getLastFileInFolder(__dirname + "/jsonfiles");

if (lastFile !== undefined) {
    fs.readFile(__dirname + "/jsonfiles" + "/" + lastFile, 'utf8', (err, data) => {
        if (err) throw err;
        dataReturned = JSON.parse(data);
        BaseDeDonnees = dataReturned.BaseDeDonnees;
    });
}
else {
    BaseDeDonnees = {};
}

setInterval(saveBDD, 1 * 60 * 1000);
setInterval(deleteSave, 1 * 60 * 1000);
    
var server = http.createServer(function (req, res) {
    var path = req.url.split('?')[0];
    var search = req.url.split('?')[1];

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
                        if (pathDataId === '' && (search === '' || !search)) {
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
                        else if (pathDataId === '' && search !== '' ) {
                            if (req.method === "GET") {
                                objectResult = {};
                                objectTest = {}
                                arrayParams = search.split('&');
                                arrayParams.forEach(element => {
                                    test = element.split('=')
                                    objectTest[test[0]]=test[1]
                                });
                                console.log(objectTest);
                               for (let index = 0; index < Object.keys(BaseDeDonnees[pathBdd][pathTable].data).length; index++) {
                                
                               }
                               res.end('{test}');
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
