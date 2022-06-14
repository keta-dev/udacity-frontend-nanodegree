// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// const fetch = require('node-fetch');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// post route
app.post("/add", getPost);

// function for POST request '/add'
function getPost(req, res) {
  projectData.temp = req.body.temp;
  projectData.date = req.body.date;
  projectData.content = req.body.content;
  res.status(200).send(projectData);
}

// get route
app.get("/all", getInfo);

function getInfo(req, res) {
  res.status(200).send(projectData);
};
// To get the /all route
// const getAllData = (req, res) => res.status(200).send(projectData);

// Setup Server
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`listening on Port http://localhost:${PORT}/`);
});
