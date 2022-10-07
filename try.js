const http = require('http');

const server= http.createServer();

server.listen(3333 ,() =>{
  console.log('server started...');
})