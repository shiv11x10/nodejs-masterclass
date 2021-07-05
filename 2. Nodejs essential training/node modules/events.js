/*Much of the Node.js core API is built around an idiomatic asynchronous event-driven architecture 
in which certain kinds of objects (called "emitters") emit named events that cause Function objects ("listeners") to be called.*/

const events = require("events");

const emitter = new events.EventEmitter();

emitter.on("customEvent", (message, user) => {
    console.log(`${user}: ${message}`);
});

// emitter.emit("customEvent", "Hello World", "Computer");
// emitter.emit("customEvent", "That's pretty cool", "Alex");

// we can find more option for stdin in readable module in nodejs documents
process.stdin.on("data", data => {
    const input = data.toString().trim();
    if(input === "exit") {
        emitter.emit("customEvent", "Goodbye!", "process");
        process.exit();
    }

    emitter.emit("customEvent", input, "terminal");
})