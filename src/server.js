const http = require('http');
const router = require('./router');

const port = process.env.PORT || 3000;
const msg = 'Server is Run'
const server = http.createServer(router);
server.listen(port, () => {
    console.log(msg)
})