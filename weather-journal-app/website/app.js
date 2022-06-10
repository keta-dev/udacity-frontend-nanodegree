/* Global Variables */

// API call here
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=7b8065cc7957999c5c5d6cd2d741b8f2&units=imperial";

// from here you input the zip and feeling values
const zipInput = document.getElementById("zip");
const myInput = document.getElementsByClassName("myInput");
const btn = document.getElementById("generate");
const form = document.getElementById("form");

btn.addEventListener('click', Generate);

function Generate(e) {
  e.preventDefault();
  console.log('clicked');

  const zip = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;

  if (zip !== '') {
    getWeather(baseURL, zip, apiKey)
    .then((data) => {
      postData('/add', {date: newDate, temp: tempConverter(data.main.temp), content: feelings});
      f();
    }).catch ((err) => {
      console.log(err);
    });
    form.reset();
  } else {
    btn.classList.add('invalid');
  }
};

function tempConverter(k) {
  if (k < (0)) {
    return 'too low';
  } else {
    return (k - 273.15).toFixed(2);
  }
}

// To get the data for the web API
// const getWeather = async (baseURL, zip, apiKey) => {
//   const res = await fetch(baseURL+zip+key)
//   try {
//     const data = await res.json();
//     return data;
//   }
//   catch(err) {
//     console.log(err);
//   }
// }

const getWeather = async (baseURL, zip, apiKey) => {
  const response = await fetch(`${baseURL}?q=${zip}&appid=${apiKey}`);
  try {
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

// Function to POST data
const postData = async (url = "", info = {}) => {
  const res = await fetch(url, {
    method: "POST",
    credentials: 'same-origin',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      temp: info.temp,
      date: info.date,
      content: info.content
    }),
  });
  try {
    const newData = await res.json();
    console.log(`You just saved`, newData);
    return newData;
  } catch (error) {
    console.log(error);
  }
};
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

// creates the date, temperature, content dynamically
const getDate = document.getElementById("date");
const getTemp = document.getElementById("temp");
const getContent = document.getElementById("content");

const f = async () => {
  const response = await fetch('/all');
  try {
    const user = await response.json();
    getDate.innerHTML = `Date: ${user[0].date}`;
    getTemp.innerHTML = `Temperature: ${user[0].temp}`;
    getContent.innerHTML = `Content: ${user[0].content}`;
  } catch(err) {
    // catches errors both in fetch and response.json
    console.log(err);
  }
}