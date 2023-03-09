
var http = require('http');

var BaseDeDonnees = {};

var server = http.createServer(function(req, res) {
    var path = req.url.split('?')[0];
    if (!path || path =='/') {
        if (req.method === 'GET') {
            res.writeHead(200, {'Content-type': 'application/json'});
            if(BaseDeDonnees){
                console.log(BaseDeDonnees);
                res.end(JSON.stringify(BaseDeDonnees));
            }
            else{
                res.writeHead(404, {'Content-type': 'text/plain'});
                res.end("Not Found");
            } 
        }
    }
    else if(!path || path =='/createbdd'){
        if (req.method == "POST") {
            var body = '';
            req.on('data', function(data){
                body += data.toString();
            });
            res.writeHead(200, {'Content-type': 'text/plain'});
            req.on('end', function(){
                if(!BaseDeDonnees[body]){
                    BaseDeDonnees[body] = {};
                }
                console.log(BaseDeDonnees);
                res.end('{Database created}');
            });  
        }
        else{
            res.writeHead(404, {'Content-type': 'text/plain'});
            res.end("Not Found");
        } 
    }
    else if (!path || path!='/createbdd' || path!='/') {
        pathBdd = path.split('/')[1];
        console.log(pathBdd);
        if(req.method ==="GET"){
            //res.writeHead(200, {'Content-type': 'application/json'});
            if(BaseDeDonnees[pathBdd]){
                res.end(JSON.stringify(BaseDeDonnees[pathBdd]));
            }
            else{
                res.writeHead(404, {'Content-type': 'text/plain'});
                res.end("Not Found");
            }
        }
        if (req.method === "POST" && BaseDeDonnees[pathBdd]) {
            var body = '';
            res.writeHead(200, {'Content-type': 'application/json'});
            req.on('data', function(data){
                body += data.toString();
            });
            req.on('end', function(){
                console.log(BaseDeDonnees[pathBdd]);
                if(!BaseDeDonnees[pathBdd][body]){
                    BaseDeDonnees[pathBdd][body] = {};
                }
                console.log(BaseDeDonnees);
                res.end('{Table created}');
            });
        }
        else{
            res.writeHead(404, {'Content-type': 'text/plain'});
            res.end("Not Found"); 
        }
    }
})

server.listen(8000);