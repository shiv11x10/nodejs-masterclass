var fs = require('fs');

var data = {
    name: 'Shivam'
}

//writing callback function for async is necessary
fs.writeFile('./read-write-files/data-write.json', JSON.stringify(data), (err)=>{
    console.log('write finished', err);
})