/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
var http = require('http');
const { writeFile } = require("fs");

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
    const fs = require('fs');

const folder = './jsonfiles';
const maxFiles = 5;

fs.readdir(folder, (err, files) => {
  if (err) throw err;

  // Remove any directories from the list of files
  files = files.filter(file => !fs.statSync(`${folder}/${file}`).isDirectory());

  // If there are too many files, remove the oldest one
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

function getNewFile(){
const fs = require('fs');
const path = require('path');

const directoryPath = './jsonfiles'; // Remplacez cela par votre propre chemin d'accès au répertoire

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.log('Erreur lors de la lecture du répertoire', err);
    return;
  }

  // Trier les fichiers par date de modification, le plus récent en dernier
  files.sort((a, b) => {
    return fs.statSync(path.join(directoryPath, a)).mtime.getTime() -
           fs.statSync(path.join(directoryPath, b)).mtime.getTime();
  });

  // Le dernier fichier ajouté est le dernier élément du tableau "files"
  const lastFile = files[files.length - 1];

  console.log('Le dernier fichier ajouté est', lastFile);

  return lastFile;
});
}

setInterval(getNewFile, 1 * 60 * 1000)
setInterval(saveBDD, 1 * 60 * 1000);
setInterval(deleteSave, 1 * 60 * 1000);

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
        pathData = '';
        if (path.split('/')[2]) {
            pathTable = path.split('/')[2];
        }
        if ( path.split('/')[3]) {
            pathData =  path.split('/')[3];
        }

        if (pathTable === '') {
            if (req.method === 'GET') {
                res.writeHead(200, {'Content-type': 'application/json', 'Access-Control-Allow-Origin':'*'});
                if (BaseDeDonnees[pathBdd]) {
                    const TableName = Object.keys(BaseDeDonnees[pathBdd]);
                    res.end(JSON.stringify(TableName));
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
                        BaseDeDonnees[pathBdd][body] = {'config':{'lastId':0}, 'rules':{} ,'data':{}};
                        res.writeHead(200, {'Content-type': 'application/json', 'Access-Control-Allow-Origin':'*'});
                        res.end('{Table created}');
                    }
                    else {
                        res.writeHead(404, {'Content-type': 'application/json', 'Access-Control-Allow-Origin':'*'});
                        res.end('{Table already exist}');
                    }
                });
            }
            else if (req.method === 'DELETE' && BaseDeDonnees[pathBdd]) {
                res.writeHead(200, {'Content-type': 'application/json', 'Access-Control-Allow-Origin':'*'});
                BaseDeDonnees[pathBdd] = 0;
                delete BaseDeDonnees[pathBdd];
                res.end('{bdd deleted}');
            }
        }
        else if (pathTable !== '' && pathData === '') {
            if (req.method === 'GET') {
                res.writeHead(200, {'Content-type': 'application/json', 'Access-Control-Allow-Origin':'*'});
                if (BaseDeDonnees[pathBdd]) {
                    const TableContent = Object.keys(BaseDeDonnees[pathBdd][pathTable]);
                    res.end(JSON.stringify(TableContent));
                } else {
                    res.writeHead(404, {'Content-type': 'application/json', 'Access-Control-Allow-Origin':'*'});
                    res.end('Not Found');
                }
            }
        }
        else if (pathTable !== '' && pathData !== '') {
            switch (pathData) {
                case 'rules':
                    if (req.method === 'GET') {
                        res.writeHead(200, {'Content-type': 'application/json', 'Access-Control-Allow-Origin':'*'});
                        if (BaseDeDonnees[pathBdd]) {
                            res.end(JSON.stringify(BaseDeDonnees[pathBdd][pathTable].rules));
                        } else {
                            res.writeHead(404, {'Content-type': 'application/json', 'Access-Control-Allow-Origin':'*'});
                            res.end('Not Found');
                        }
                    }
                    else if (req.method === 'POST') {
                        var body = '';
                        res.writeHead(200, {'Content-type': 'application/json', 'Access-Control-Allow-Origin':'*'});
                        req.on('data', function (data) {
                            body += data.toString();
                        });
                        req.on('end', function () {
                            if (Object.keys(BaseDeDonnees[pathBdd][pathTable].rules).length !== 0) {
                                res.writeHead(404, {'Content-type': 'application/json', 'Access-Control-Allow-Origin':'*'});
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
                        res.writeHead(404, {'Content-type': 'application/json', 'Access-Control-Allow-Origin':'*'});
                        res.end('Please add rules before adding data');
                    }
                    else {
                        if (req.method === 'GET') {
                            res.writeHead(200, {'Content-type': 'application/json', 'Access-Control-Allow-Origin':'*'});
                            if (BaseDeDonnees[pathBdd]) {
                                res.end(JSON.stringify(BaseDeDonnees[pathBdd][pathTable].data));
                            } else {
                                res.writeHead(404, {'Content-type': 'application/json', 'Access-Control-Allow-Origin':'*'});
                                res.end('Not Found');
                            }
                        }
                        if (req.method === 'POST') {
                            var body = '';
                            res.writeHead(200, {'Content-type': 'application/json', 'Access-Control-Allow-Origin':'*'});
                            req.on('data', function (data) {
                                body += data.toString();
                            });
                            req.on('end', function () {
                                if ( hasSameProperties(JSON.parse(body), BaseDeDonnees[pathBdd][pathTable].rules) ) {
                                    res.writeHead(200, {'Content-type': 'application/json', 'Access-Control-Allow-Origin':'*'});
                                    const increment = BaseDeDonnees[pathBdd][pathTable].config.lastId + 1;
                                    BaseDeDonnees[pathBdd][pathTable].config.lastId = increment;
                                    BaseDeDonnees[pathBdd][pathTable].data[increment] = JSON.parse(body);
                                    res.end('{data added}');
                                }
                                else {
                                    res.writeHead(404, {'Content-type': 'application/json', 'Access-Control-Allow-Origin':'*'});
                                    res.end('incorrect data structure');
                                }
                            });
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
