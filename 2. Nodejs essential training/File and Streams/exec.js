const cp = require("child_process");

//Spawns a shell then executes the command within that shell, buffering any generated output.
cp.exec("open https://www.google.com");

cp.exec("node readStream", (err, data, stderr) => {
  console.log(data);
});
