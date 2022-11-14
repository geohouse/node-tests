//Install npm package nodemon (for Node monitor) to
// listen to the source code and auto update the server as needed.
// If don't install nodemon globally, will get error when calling 'nodemon app.js'
// Use 'npx nodemon app.js' instead.
// Joi is an object used for input validation.
const Joi = require("joi");
const express = require("express");

// returns function
const app = express();

// Will enable JSON parsing of the body of requests
app.use(express.json());

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

// Used for name property validation in the POST and the PUT sections.
function validateCourse(course) {
  // Define schema for Joi
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(course);
}

// Read course object (in the body of the request), and
// then add that new course object to the existing courses array here.
app.post("/api/courses", (request, response) => {
  const { error } = validateCourse(request.body); // destructure the returned object to just keep the error key
  //console.log(result);
  // Using NPM package JOI for input validation.
  if (error) {
    // 400 - Bad request
    response.status(400).send(error.details[0].message);
  }
  const course = {
    // manually add the id here on the server (wouldn't be needed if using a DB - it would assign itself)
    id: courses.length + 1,
    // Need to enable parsing of JSON objects in body of request
    // (not enabled by default in Express)
    name: request.body.name,
  };
  courses.push(course);
  // by convention, when we create a new field or object on the server,
  // return the updated copy of it to the client.
  response.send(course);
});

// id is name of parameter for variable path
app.get("/api/courses/:id", (request, response) => {
  // find the course matching the id param the user entered
  const course = courses.find(
    (course) => course.id === Number.parseInt(request.params.id)
  );
  //404 error if course not found
  if (!course) {
    response.status(404).send("The course with the given ID was not found.");
  }
  response.send(course);
});

// update a course
app.put("/api/courses/:id", (request, response) => {
  // look up the course
  // if not found, return 404
  const course = courses.find(
    (course) => course.id === Number.parseInt(request.params.id)
  );
  console.log(course);
  //404 error if course not found
  if (!course) {
    response.status(404).send("The course with the given ID was not found.");
  }
  // validate

  const { error } = validateCourse(request.body);
  // if invalid, return 400 - bad request
  if (error) {
    // 400 - Bad request
    response.status(400).send(error.details[0].message);
    return;
  }
  // update course
  course.name = request.body.name;
  // return the updated course
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

app.delete("/api/courses/:id", (request, response) => {
  // look up course with given id

  // not exist, return 404
  const course = courses.find(
    (course) => course.id === Number.parseInt(request.params.id)
  );
  //console.log(course);
  //404 error if course not found
  if (!course) {
    response.status(404).send("The course with the given ID was not found.");
  }
  // delete
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  // return the same course
  response.send(course);
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
