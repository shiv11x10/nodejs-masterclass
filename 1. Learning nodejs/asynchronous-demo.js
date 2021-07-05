fs = require('fs');

function phoneNumber(err, data) {
    console.log('data: ', data);
}

//we provide callback functions to async method
fs.readdir('c:/', phoneNumber);  //asynchronous call

console.log("this comes after"); //this will be printed first as async call will wait to be finished