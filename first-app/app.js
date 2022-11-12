// run as node app.js from powershell

// load module
// could also load just a 'logger' and Node looks for .js extension
let logger = require("./logger.js");
console.log(logger);

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
console.log(module);
