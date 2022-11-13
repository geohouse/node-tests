const express = require("express");

// returns function
const app = express();

// These are some of the avail. methods.
// app.get();
// app.post();
// app.put();
// app.delete();

// callback function is called the 'route handler'
app.get("/", (request, response) => {
  //request has useful properties with info about the incoming request.
  response.send("Hello World");
});

app.get("/api/courses", (request, response) => {
  response.send([1, 2, 3]);
});

// callback fxn will be called when application starts listening on the given port.
app.listen(3000, () => {
  console.log("listening on port 3000...");
});

// Starting code
// const http = require("http");

// const server = http.createServer((request, response) => {
//   if (request.url === "/") {
//     response.write("Hello World");
//     response.end();
//   }

//   if (request.url === "/api/courses") {
//     response.write(JSON.stringify([1, 2, 3]));
//     response.end();
//   }
// });

// server.listen(3000);

// console.log("listening on port 3000...");
