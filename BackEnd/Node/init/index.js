// const Person = require('./person');
// //import Person from "./person";
// const Logger = require('./logger');

// const logger = new Logger();
// logger.on('message', (data) => console.log('Called Listener', data));

// logger.log('Hello World !');
// logger.log('Hi !');
// logger.log('Hello');

//const person1 = new Person('Huy', 23);

//person1.greeting();

const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
  //   if (req.url === '/') {
  //     fs.readFile(
  //       path.join(__dirname, 'public', 'index.html'),
  //       (err, content) => {
  //         if (err) throw err;
  //         res.writeHead(200, { 'Content-Type': 'text/html' });
  //         res.end(content);
  //       }
  //     );
  //   }
  //   if (req.url === '/about') {
  //     fs.readFile(
  //       path.join(__dirname, 'public', 'about.html'),
  //       (err, content) => {
  //         if (err) throw err;
  //         res.writeHead(200, { 'Content-Type': 'text/html' });
  //         res.end(content);
  //       }
  //     );
  //   }
  //   if (req.url === '/api/users') {
  //     const users = [
  //       { name: 'Jane Tran', age: 23 },
  //       { name: 'Pood Low', age: 18 },
  //     ];
  //     res.writeHead(200, { 'Content-Type': 'application/json' });
  //     res.end(JSON.stringify(users));
  //   }

  //Build file path
  let filePath = path.join(
    __dirname,
    'public',
    req.url === '/' ? 'index.html' : req.url
  );
  res.end();
  // Extension of life
  let extname = path.extname(filePath);
  // Initial content type
  let contentType = 'text/html';
  // Check ext and set content type
  switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
      contentType = 'image/jpg';
      break;
  }
  // Check if contentType is text/html but no .html file extension
  if (contentType == 'text/html' && extname == '') filePath += '.html';
  // log the filePath
  console.log(filePath);
  // log the content Type
  console.log(contentType);
  // Read file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code == 'ENOENT') {
        // Page not found
        fs.readFile(
          path.join(__dirname, 'public', '404.html'),
          (err, content) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content);
          }
        );
      } else {
        // Some server error
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
