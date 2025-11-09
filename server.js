const http = require("http");
const paths = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;
const logEvents = require('./logEvents.js');
const EventEmitter = require('events');
class Emitter extends EventEmitter { };
// initialize object 
const myEmitter = new Emitter();
myEmitter.on('log', (msg, fileName) => logEvents(msg, fileName));
const PORT = process.env.PORT || 3500;

const serverFile = async (filePath, contentType, response) => {
    try {
        const rawData = await fsPromises.readFile(filePath, !contentType.includes('image')? 'utf8': '');
        const data = contentType === 'application/json' ? JSON.parse(rawData): rawData;
        response.writeHead(
            filePath.includes('404.html') ? 404 : 200, 
            {'Content-Type': contentType}
        );
        response.end(
            contentType === 'application/json' ? JSON.stringify(data) : data
        );

    }  catch (err) {
        console.log(err);
         myEmitter.emit('log', `${err.name} : ${err.message}`, 'errLog.txt');
        response.statusCode = 500;
        response.end();
    }
}
const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  myEmitter.emit('log', `${req.url}\t${req.method}`, 'reqLog.txt');

  const extension = paths.extname(req.url);
  let contentType;

  switch (extension) {
    case '.css':
        contentType = 'text/css';
        break;
    case '.js':
        contentType = 'text/javascript';
        break;
    case '.json':
        contentType = 'application/json';
        break;
    case '.jpg':
        contentType = 'image/jpeg';
        break;
    case '.png':
        contentType = 'image/png';
        break;
    case '.txt':
        contentType = 'text/plain';
    break;
    default:
        contentType = 'text/html';
    
  }

  let filePath;
  if (contentType === 'text/html') {
  if (req.url === '/') {
    filePath = paths.join(__dirname, '03TUT', 'views', 'index.html');
  } else if (req.url.slice(-1) === '/') {
    filePath = paths.join(__dirname, '03TUT', 'views', req.url, 'index.html');
  }
  else if (paths.extname(req.url) === '.json') {
    const fileName = req.url.startsWith('/') ? req.url.slice(1) : req.url;
    filePath = paths.join(__dirname, '03TUT', 'data', fileName);
}
  else {
    filePath = paths.join(__dirname, '03TUT', 'views', req.url);
  }
} else {
  filePath = paths.join(__dirname, req.url);
}
//makes .html extension not required in the browser
  if(!extension && req.url.slice(-1) !== '/') filePath += '.html';

  const fileExists = fs.existsSync(filePath);

  if(fileExists) {
    //server the file
    serverFile(filePath, contentType, res);

  } else {

    switch(paths.parse(filePath).base) {
      case 'old-page.html':
        res.writeHead(301, {'Location': '/new-page.html'});
        res.end();
        break;
    
        case 'www-page.html':
        res.writeHead(301, {'Location': '/'});
        res.end();
        break;  

        default:
            //serve a 404 response
             serverFile(paths.join(__dirname,'03TUT', 'views', '404.html'), 'text/html', res);

    }
  }

});

server.listen(PORT, () => console.log(`server running in PORT ${PORT}`));

/*
myEmitter.on('log', (msg) => logEvents(msg));

setTimeout(() => {
    myEmitter.emit('log', 'log event emitted!!');
})
    */
/*console.log("hello world");

console.log(global);

const os = require("os");
const path = require("path");
const {add, sub, mul, div} = require('./math')

console.log(add(2, 3));
console.log(sub(2, 3));
console.log(mul(2, 3));
console.log(div(2, 3));
*/
/*
console.log(os.type());
console.log(os.version());
console.log(os.homedir());
console.log(__dirname);
console.log(__filename);

console.log(path.dirname(__filename));
console.log(path.basename(__filename));
console.log(path.extname(__filename));

console.log(path.parse(__filename));
*/