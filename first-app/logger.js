const EventEmitter = require("events");
//const emitter = new EventEmitter();

// made up
const url = "http://mylogger.io/log";

class Logger extends EventEmitter {
  log(message) {
    // Send HTTP request
    console.log(message);

    // use to raise an event; need to register a listener that
    // listens for when the messageLogged event is raised.
    this.emit("messageLogged", { id: 1, url: "http://" });

    this.emit("logging", { data: "Here's the message!" });
  }
}

// Exporting for use in app.js module

//module.exports.Logger = Logger;
module.exports = Logger;
// don't need to export (used in this module only)
//module.exports.url = url;

console.log(module);
