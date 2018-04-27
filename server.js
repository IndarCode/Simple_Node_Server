var http = require('http');
var fs = require('fs');

// send 404 page
function send404Response(request, response){
    console.log("request is coming from : " + request.url);
    response.writeHead(404, {"content-Type" : "text/html"});
    fs.createReadStream('./pnf.html').pipe(response);

}

// Handle user's request
function onRequest(request, response){
    if(request.method == "GET" && request.url == "/"){
        console.log("request is coming from : " + request.url)
        // if you just want to display a message
        // response.writeHead(200, {"content-Type" : "text/plain"});
        // response.write("This is Home Page")
        // response.end();
        response.writeHead(200, {"content-Type" : "text/html"});
        fs.createReadStream("./index.html").pipe(response);

    }
    else {
        if (request.url.indexOf('.css') != -1) { //req.url has the pathname, check if it contains '.css'

            fs.readFile(__dirname + '/style.css', function (err, data) {
                if (err) console.log(err);
                response.writeHead(200, {'Content-Type': 'text/css'});
                response.write(data);
                response.end();
            });
        }

        else {
            send404Response(request, response);
        }
    }

}






http.createServer(onRequest).listen('8888');
console.log("My server is running !!!" );
