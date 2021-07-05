var fs = require('fs'); // filesystem
var data = require('./data.json');

console.log(data.name);

//we provide callback function to async calls
fs.readFile('./read-write-files/data.json', 'utf-8', (err, data2)=>{
    if(err) throw err;
    var data2 = JSON.parse(data2);
    console.log(data2.name);
})