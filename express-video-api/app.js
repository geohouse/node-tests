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

app.get("/api/movies/:id", (request, response) => {
  const movie = videos.find(
    (video) => video.id === Number.parseInt(request.params.id)
  );
  //404 error if movie not found
  if (!movie) {
    response.status(404).send("The movie with the given ID was not found.");
    return;
  }
  response.send(movie);
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

// Update a movie
app.put("/api/movies/:id", (request, response) => {
  const movie = videos.find(
    (video) => video.id === Number.parseInt(request.params.id)
  );
  //404 error if movie not found
  if (!movie) {
    response.status(404).send("The movie with the given ID was not found.");
    return;
  }
  const { error } = validateMovie(request.body);
  if (error) {
    // 400 - bad request
    response.status(400).send(error.details[0].message);
    return;
  }
  movie.name = request.body.name;
  movie.genre = request.body.genre;

  // Need to find the index of the movie
  const videoIndex = videos.findIndex(
    (video) => video.id === Number.parseInt(request.params.id)
  );
  // Splice in the revised movie info to the videos array, replacing the
  // previous entry for that movie.
  videos.splice(videoIndex, 1, movie);
  // return the updated movie
  response.send(movie);
});

app.delete("/api/movies/:id", (request, response) => {
  const movie = videos.find(
    (video) => video.id === Number.parseInt(request.params.id)
  );
  //404 error if movie not found
  if (!movie) {
    response.status(404).send("The movie with the given ID was not found.");
    return;
  }
  // delete
  // find index by looking for the exact object within the array (not searching for id match specifically)
  const index = videos.indexOf(movie);
  // Delete 1 element starting at index
  videos.splice(index, 1);
  response.send(movie);
});

//
