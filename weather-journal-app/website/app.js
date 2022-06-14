/* Global Variables */
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
const apiKey = "&appid=220a3706ff5c931509ff38caacd19574&units=imperial";

const generate = document.getElementById("generate");
const form = document.getElementById("form");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

// Event listener to add function to existing HTML DOM element
// generate.addEventListener("click", performAction);
generate.addEventListener("click", Generate);

function Generate(e) {
  e.preventDefault();

  const zipID = document.getElementById("zip").value;
  const content = document.getElementById("feelings").value;

  getWeather(baseUrl, zipID, apiKey).then((data) => {
    postData("/add", { temp: (data.main.temp), date: newDate, content: content }).then((data) => {
      retrieveData();
    })
  });
}

/* making a get call*/
const getWeather = async (baseUrl, zipID, apiKey) => {
  const res = await fetch(`${baseUrl}${zipID}${apiKey}`);
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

/* Function to POST data */
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log(error);
  }
};

const retrieveData = async () => {
  'use strict'
  const request = await fetch("/all");
  try {
    const allData = await request.json();
    console.log(allData);
    // update the moreEntry with the necessary data
    if (allData.date !== undefined && allData.temp !== undefined && allData.content !== undefined) {
      document.getElementById('date').innerHTML = allData.date;
      document.getElementById('temp').innerHTML = allData.temp + ' &#8451;';
      document.getElementById('content').innerHTML = allData.content;
  }
  } catch (error) {
    console.log("error", error);
  }
};