const fs = require('fs');
const path = require('path');
const mime = require('mime-types');
const router = require('./router');

const filePath = path.join(__dirname, 'jobs.json');
fs.readFile(filePath, (error, data) => {
    if (error) {
        console.log('error in autocomplete')
    } else {
        const convertedData = JSON.parse(data);

        const arrayOfSuggestions = convertedData.filter(item => {
            const regex = /web/gi;
            return item.match(regex)
        }).sort().reverse();
    }
})