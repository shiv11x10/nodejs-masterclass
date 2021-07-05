//The readline module provides an interface for reading data from a Readable stream 
//(such as process.stdin) one line at a time. It can be accessed using:

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

rl.question("How do you like Node? ", (answer) => {
    console.log(`Your answer: ${answer}`);
})