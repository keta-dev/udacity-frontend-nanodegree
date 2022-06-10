//require the express application framework
const express = require('express');
//initiate an app instance from express library
const app = express();
//setup the port
const PORT = 8080; //port doesn't have a special name but it is just a window to test the applicaton locally.
//make the endpoint object to hold the data coming from the client side
let projectData = {};
//use the express middleware for turning body and external input and coming data to be stingfied from json
app.use(express.json());//parse the json format to normal string;
app.use(express.urlencoded({ extended: false }));//is a body parser for html post form

//use the website folder as the initial path for our files
app.use(express.static("website"));
//setup cors module to enable server to listen to other http/s requests out of the server domain/port/localhost.
const cors = require('cors');
//use the cors middleware
app.use(cors());

app.post('/add', async (req, res) => {
    const info = await req.body;
    projectData = info;
    res.send(projectData);
});

app.get("/all", async (req, res) => {
    if(projectData){
        res.send(projectData);
    }
});

//listening for the server through the express.listen and which gives us confirmation that the server is working properly
// app.listen(port, _=> console.log(`listening on port ${port}`));
app.listen(PORT, () => {
  console.log(`listening on Port http://localhost:${PORT}/`);
})


// // Setup empty JS object to act as endpoint for all routes
// projectData = {};

// // Require Express to run server and routes
// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// // const fetch = require('node-fetch');

// // Start up an instance of app
// const app = express();

// /* Middleware*/
// //Here we are configuring express to use body-parser as middle-ware.
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// // Cors for cross origin allowance
// app.use(cors());

// // Initialize the main project folder
// app.use(express.static('website'));

// // To get the /all route
// const getAllData = (req, res) => res.status(200).send(projectData);

// // get route
// app.get('/all', getAllData);

// // function for POST request '/add'
// function getPost (req, res) {
//   res.status(200).send(req.body);
//   newEntries = {
//     temp: req.body.temp,
//     content: req.body.content,
//     date: req.body.date
//   }
//   projectData.push(newEntries)
// }

// // post route
// app.post('/add', getPost);

// // Setup Server
// const PORT = 8080;
// app.listen(PORT, () => {
//   console.log(`listening on Port http://localhost:${PORT}/`);
// })