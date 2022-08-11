const fs = require('fs');
const path = require('path');
const mime = require('mime-types')
// ! mime.lookup('json') // 'application/json'
// ! mime.lookup('.md') // 'text/markdown'
// ! mime.lookup('file.html') // 'text/html'
// ! mime.lookup('folder/file.js') // 'application/javascript'
// ! mime.lookup('folder/.htaccess') // false

// ! mime.lookup('cats') // false

const router = (request, response) => {
    const endPoint = request.url;

    if (endPoint === '/') {
        const filePath = path.join(__dirname, "..", "public", "index.html")
        fs.readFile(filePath, (error, data)=> {
            if (error){
                response.writeHead(500, {'Content-Type' : mime.lookup('file.html')})
                response.write('Internal Server Error' + response.statusCode) 
                response.end()
            }else {
                response.writeHead(200, {'Content-Type' : mime.lookup('file.html')})
                response.write(data) 
                response.end()
            }
        })

    } else if (endPoint.includes('public')) {

        const filePath = path.join(__dirname, "..", endPoint);

        fs.readFile(filePath, (error, data) => {
            if (error) {
                response.writeHead(500, {'Content-Type' : mime.lookup('file.html')})
                response.write('Internal Server Error' + response.statusCode) 
                response.end()
            } else {
                response.writeHead(200, {"Content-Type": mime.lookup(endPoint)})
                response.write(data);
                response.end();
            }
        })

    } else {
        response.writeHead(404, {'Content-Type' : 'text/html'})
        response.write('Page os Not Found ' + response.statusCode)
        response.end()
    }
}

module.exports = router;