const path = require("path");

const v8 = require("v8"); // javascript engine

let dirName = path.join(__dirname);

console.log(dirName);
console.log(v8.getHeapStatistics());