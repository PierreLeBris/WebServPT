
var http = require('http');

var BaseDeDonnees = {};

var server = http.createServer(function(req, res) {
    var path = req.url.split('?')[0];
    if(!path || path =='/createbdd'){

        if (req.method == "PUT") {
            var body = '';
            req.on('data', function(data){
                body += data.toString();
            });
            res.writeHead(200, {'Content-type': 'text/plain'});
            req.on('end', function(){
                if(!BaseDeDonnees[body]){
                    BaseDeDonnees[body] = {};
                }
                //BaseDeDonnees[body].push(body);
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
        if(req.method==="GET"){
            res.writeHead(200, {'Content-type': 'application/json'});
            if(!BaseDeDonnees[path]){
                console.log(BaseDeDonnees);
                res.end(JSON.stringify([]));
            } 
        }
    }  
})

server.listen(8000);