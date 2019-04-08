const fs = require('fs');

module.exports = function (ctx){
    console.log('Copying files to WWW...')
    fs.copyFile('src/manifest.json', 'www/manifest.json', (error)=> console.log('Error copying files'));
    return 0;
}