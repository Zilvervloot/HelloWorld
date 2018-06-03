
var http = require('http'), path = require('path'), fs = require('fs');
var processUptime = require('./modules/processinfo');
var mimeType = require('./modules/mimetype.js');

http.createServer( function (request, response) {

    var file = path.normalize('.'+ request.url);
    fs.exists(file, function(exists) {
        if (exists)
        {
            if (fs.statSync(file).isDirectory()) {
                response.writeHead(200, {'content-type': 'text/plain'});
                response.end('Hello World ' + processUptime.uptime());
            }
            else
            {
                // todo: different mime-types
                response.writeHead(200, {'content-type': mimeType(file)});
                fs.createReadStream(file).pipe(response);
            }
        }
        else {
            response.writeHead(404);
            response.end('Not found!');
        }
    });

}).listen(8080, function() {
    console.log('Server started!');
    }
);
