fs = require('fs');

data = fs.readdirSync('c:/');
console.log('data', data);

// we do not provide callback to sync function
console.log("this comes after"); //this will synchronously. so this will be printed in the end