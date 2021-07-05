const fs = require("fs");

//before we remove a directory we need to remove all the files in it
fs.readdirSync("./storage").forEach(fileName => {
  fs.unlinkSync(`./storage/${fileName}`);
});

//remove the directory
fs.rmdir("./storage", err => {
  if (err) {
    throw err;
  }

  console.log("./storage directory removed");
});
