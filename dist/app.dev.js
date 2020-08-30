"use strict";

//api key = 057b1eb19d4e9c61714a52551bf9d58d
var kelvin = 273;
var key = "057b1eb19d4e9c61714a52551bf9d58d"; //selector

var notificationbar = document.querySelector('.notification');
var weatherIcon = document.querySelector('.weather-icon');
var temperatureValue = document.querySelector('.temperature p');
var temperatuerDes = document.querySelector('.temperature-description');
var userlocation = document.querySelector('.location'); //app data

var weather = {};
weather.temperature = {
  unit: "celcius"
}; //check if the browser allows localtion

if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(setposition, showerror);
} else {
  notificationbar.style.display = 'block';
} //set user position


function setposition(position) {
  var latitute = position.coords.latitude;
  var longitude = position.coords.longitude;
  getWeature(latitute, longitude);
} //show error when there is an error getting location


function showerror(error) {
  notificationbar.style.display = 'block';
  notificationbar.innerHTML = "".concat(error.message);
} //get weather information


function getWeature(latitude, longitude) {
  var api = "https://api.openweathermap.org/data/2.5/weather?lat=".concat(latitude, "&lon=").concat(longitude, "&appid=").concat(key);
  fetch(api).then(function (Response) {
    var data = Response.json();
    return data;
  }).then(function (data) {
    weather.temperature.value = Math.floor(data.main.temp - kelvin);
    weather.description = data.weather[0].description;
    weather.iconId = data.weather[0].icon;
    weather.city = data.name;
    weather.country = data.sys.country;
  }).then(function () {
    displayWeather();
  });
} //display the info in the UI


function displayWeather() {
  weatherIcon.innerHTML = "<img src=\"img/".concat(weather.iconId, ".png\">");
  temperatureValue.innerHTML = "".concat(weather.temperature.value, "&#176 <span>c</span>");
  temperatuerDes.innerHTML = weather.description;
  userlocation.innerHTML = "".concat(weather.city, ", ").concat(weather.country);
} //c to f


function celciusToF(temp) {
  return temp * 9 / 5 + 32;
}

temperatureValue.addEventListener('click', function () {
  if (weather.temperature.value === "undefined") return;

  if (weather.temperature.unit == "celcius") {
    var far = celciusToF(weather.temperature.value);
    far = Math.floor(far);
    temperatureValue.innerHTML = "".concat(far, "&#176 <span>f</span>");
    weather.temperature.unit = 'fahrenheit';
  } else {
    temperatureValue.innerHTML = "".concat(weather.temperature.value, "&#176 <span>c</span>");
    weather.temperature.unit = "celcius";
  }
});