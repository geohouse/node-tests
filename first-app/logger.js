// made up
const url = "http://mylogger.io/log";

function log(message) {
  // Send HTTP request
  console.log(message);
}

// Exporting for use in app.js module

module.exports.log = log;
// don't need to export (used in this module only)
//module.exports.url = url;

console.log(module);
