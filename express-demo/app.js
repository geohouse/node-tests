//Install npm package nodemon (for Node monitor) to
// listen to the source code and auto update the server as needed.
// If don't install nodemon globally, will get error when calling 'nodemon app.js'
// Use 'npx nodemon app.js' instead.

const express = require("express");

// returns function
const app = express();

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

// These are some of the avail. methods.
// app.get();
// app.post();
// app.put();
// app.delete();

// callback function is called the 'route handler'
app.get("/", (request, response) => {
  //request has useful properties with info about the incoming request.
  response.send("Hello World!!!!");
});

app.get("/api/courses", (request, response) => {
  response.send(courses);
});

// id is name of parameter for variable path
app.get("/api/courses/:id", (request, response) => {
  // find the course matching the id param the user entered
  const course = courses.find(
    (course) => course === Number.parseInt(request.params.id)
  );
  //404 error if course not found
  if (!course) {
    response.status(404).send("The course with the given ID was not found.");
  }
  response.send(course);
});

// app.get("/api/posts/:year/:month", (request, response) => {
//   // Gets the route parameters (year and month)
//   //response.send(request.params);
//   // Gets the query parameters (anything following a '?' in the URL)
//   response.send(request.query);
// });

// Use environment variable PORT to specify the port. This is usu. available
// in the hosting env. to tell the app which port it will be running on.
// In Powershell, '$Env:PORT=5000'
// On mac, 'export PORT=5000
// Use Env variable PORT value if exists, otherwise arb. value.
const port = process.env.PORT || 3000;

// callback fxn will be called when application starts listening on the given port.
app.listen(port, () => {
  console.log(`listening on port ${port}...`);
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
