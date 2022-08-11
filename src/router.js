const fs = require('fs');
const path = require('path');
const mime = require('mime-types');

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

    } else if (endPoint === '/suggestions') {

        const filePathJobs = path.join(__dirname, "jobs.json");

        fs.readFile(filePathJobs, (error, data) => {
            if (error) {
                response.writeHead(500, {'Content-Type' : mime.lookup('file.html')})
                response.write('Internal Server Error' + response.statusCode) 
                response.end()
            } else {
                const allJobsData = JSON.parse(data);

                const searchInput = `${request.headers.inputvalue}`;
        
                const arrayOfSuggestions = allJobsData.filter(item => {
                    // This way we add regex with variables. 
                    const regex = new RegExp(`${searchInput}`, "gi");
                    return item.match(regex)
                }).sort().reverse();

                const uniqueArrayofSuggestions = Array.from(new Set(arrayOfSuggestions));
                
                response.write(JSON.stringify(uniqueArrayofSuggestions))
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