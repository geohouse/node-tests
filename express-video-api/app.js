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

//
