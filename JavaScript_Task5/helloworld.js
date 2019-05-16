const http = require('http');
var fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

var cnt = 0;
const server = http.createServer((req, res) => {
  
  if (req.url === '/') {
    cnt++;
    fs.readFile('demo.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });

  } else if (req.url === '/counter'){
    res.statusCode = 200;
    cnt++;
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('access-control-allow-origin', '*');
    res.setHeader('access-control-allow-headers', 'origin,x-request-with,content-type,accept');
    res.end('Hello World\n' + 'asked:' + cnt + ' times.');
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('viga!');
  }
  console.log(req.url);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
