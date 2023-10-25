//to run the server load http
//http is present in node
const http = require('http');
const routes = require('./router1');

//create a server
const server = http.createServer(routes.routes);
console.log(routes.text)

//to make server ready we use server listen
server.listen(3000, () => {
    console.log("server listening at port 3000")
});
