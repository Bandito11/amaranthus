const fs = require('fs');

module.exports = function (ctx){
    fs.copyFile('src/manifest.json', 'www/manifest.json', (error)=> console.error('Error copying files'));
    return 0;
}