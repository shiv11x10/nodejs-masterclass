const fs = require("fs");

//reading binary file
fs.readFile("./assets/alex.jpg", (err, img) => {
  if (err) {
    console.log(`An error has occured: ${err.message}`);
    process.exit();
  }
  console.log("file contents read");
  console.log(img);
});

//reading text
fs.readFile("./assets/Readme.md", "UTF-8", (err, text) => {
  if (err) {
    console.log(`An error has occured: ${err.message}`);
    process.exit();
  }
  console.log("file contents read");
  console.log(text);
});