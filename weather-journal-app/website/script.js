// API call here
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
// Personal API Key for OpenWeatherMap API
const apiKey = "&appid=7b8065cc7957999c5c5d6cd2d741b8f2&units=imperial";


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.toDateString();

// Global variables
const country = document.getElementById('country').value;
const zip = document.getElementById('zip').value;
const feelings = document.getElementById('feelings');
const generate = document.getElementById('generate');
const temp = document.getElementById('temp');
const date = document.getElementById('date');
const content = document.getElementById('content');

const getData = async (url) => {
    try {
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
        // if (data.cod != 200)
    } catch (error) {
      console.log(error);
    }
}

generate.addEventListener('click', update);

function update(e) {
    e.preventDefault();
    getData()

    console.log('I clicked');
}

// Function to POST data
const postData = async (url = "", info = {}) => {
    const res = await fetch(url, {
      method: "POST",
      credentials: 'same-origin',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info)
    });
    try {
      const newData = await res.json();
      return newData;
    } catch (error) {
      console.log(error);
    }
};

const retrieveData = async () => {
    const res = await fetch('/all');
    try {
    // Transform into JSON
    const allData = await request.json();
    return allData;
    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
}