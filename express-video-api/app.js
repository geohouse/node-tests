// Use npx nodemon app.js to serve and restart on changes.
// Test api for a video catalog
const Joi = require("joi");
const express = require("express");

// returns function
const app = express();

// Use environment var PORT to specify port to serve from.
// In Powershell, '$Env:PORT=4000'
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});

// Enables JSON parsing of the body of requests
app.use(express.json());

const videos = [
  { id: 1, name: "Waking Ned Devine", genre: ["Irish", "Comedy"] },
  { id: 2, name: "Little Miss Sunshine", genre: ["New Mexican", "Comedy"] },
  { id: 3, name: "Amelie", genre: ["French", "Drama", "Comedy"] },
  {
    id: 4,
    name: "Knives Out",
    genre: ["Southern", "Drama", "Mystery", "Comedy"],
  },
];

app.get("/", (request, response) => {
  response.send("This is a test video API");
});

app.get("/api/movies", (request, response) => {
  response.send(videos);
});

function validateMovie(movie) {
  const schema = Joi.object({
    name: Joi.string().min(1).required(),
    // The genre array may contain any number of string entries.
    genre: Joi.array().items(Joi.string()),
  });

  return schema.validate(movie);
}

// Read the body of the request and
// add it to the videos array if it passes the schema
app.post("/api/movies", (request, response) => {
  // destructure the result; only care if there's an error and the
  // body doesn't match the schema. Otherwise will add it to the
  // videos array later.
  const { error } = validateMovie(request.body);
  if (error) {
    // 400 - bad request
    response.status(400).send(error.details[0].message);
    return;
  }
  const newVideo = {
    id: videos.length + 1,
    name: request.body.name,
    genre: request.body.genre,
  };
  videos.push(newVideo);
  response.send(newVideo);
});

//
