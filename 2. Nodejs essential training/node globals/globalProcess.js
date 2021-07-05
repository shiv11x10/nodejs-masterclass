/*The process object is a global that provides information about, and control over, 
the current Node.js process. As a global, it is always available to Node.js applications without using require(). 
It can also be explicitly accessed using require():
*/
const process = require('process');

console.log(process.pid); //get process Id
console.log(process.versions.node); //get version of node

/*The process.argv property returns an array containing the command line arguments 
passed when the Node.js process was launched. The first element will be process.execPath. 
The second element will be the path to the JavaScript file being executed. 
The remaining elements will be any additional command line arguments.
*/
console.log(process.argv);

arr = ["hi", "hey", "hello", "Hola"];
// getting an element from and array
const grab = flag => {
    let index = arr.indexOf(flag);
    return arr[index];
}

console.log(grab("hello"));