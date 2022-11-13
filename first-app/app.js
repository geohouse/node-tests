// run as node app.js from powershell

// built-in modules
// path is object
const path = require("path");
// Node calls all modules after wrapping them in an immediately invoked function.
// One of the parameters to that function is the filename, which is
// accessible using the __filename variable.
// Gives object with root, dir, base, ext and name keys.
const pathObj = path.parse(__filename);
console.log(pathObj);

const os = require("os");
let totalMemory = os.totalmem();
let freeMemory = os.freemem();
let lineEnding = os.EOL;

const fs = require("fs");
const filesSync = fs.readdirSync("./");
console.log(filesSync);

// loading 'events' returns the EventEmitter Class
const EventEmitter = require("events");
//const emitter = new EventEmitter();

// Async versions of the fs methods take a callback function as their last
// argument. Node calls this function when the async operation completes.
const files = fs.readdir("./", function (err, files) {
  // only 1 of err, files will be filled; the other will be null
  if (err) console.log("Error", err);
  else console.log("Result", files);
});

console.log(`Total memory is: ${totalMemory}`);
console.log(`Free memory is: ${freeMemory}`);
console.log(`Line ending is: ${lineEnding}`);

// load module
// could also load just a 'logger' and Node looks for .js extension
const Logger = require("./logger.js");
//console.log(logger);
const logger = new Logger();

// register a listener (same as .addListener())
// arg param is the object argument given in the emitter.emit() call below
logger.on("messageLogged", (arg) => {
  console.log("Listener called");
  console.log(arg);
});

// Raise: logging (data: message)

logger.on("logging", (arg) => {
  console.log(arg);
});

logger.log("message");

function sayHello(name) {
  console.log(`Hello ${name}`);
}

sayHello("Gus");

// globally avail via 'global'
// setTimeout()
// console.log()
// clearTimeout()
// setInterval()
// clearInterval()

// Node globals

// Any vars defined in Node code are NOT added to the 'global' object
// they are only scoped to the file where they are defined.

// every .js file for Node is a 'module'
// with self-contained scope (unless things are explicitly exported)

// module is a JSON object
//console.log(module);

const http = require("http");
// server is an event emitter. so can run emit(), on(), methods, etc.
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("Hello World");
    res.end();
  }

  if ((req.url = "/api/courses")) {
    res.write(JSON.stringify([1, 2, 3]));
    res.end();
  }
});

// server.on("connection", (socket) => {
//   console.log("New connection...");
// });

server.listen(3000);

console.log("listening on port 3000...");
