"use strict";

//api key = 057b1eb19d4e9c61714a52551bf9d58d
//selector
var notificationbar = document.querySelector('.notification');
var weatherIcon = docuemnt.querySelector('.weather-icon');
var temperatureValue = document.querySelector('.temperature p');
var temperatuerDes = document.querySelector('.temperatuer-description');
var location = document.querySelector('.location'); //app data

var weather = {};
weather.temperature = {
  unit: "celcius"
}; //check if the browser allows localtion

if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(setpositon, showerror);
} else {
  notificationbar.style.display = 'block';
} //set user position


function setpositon(position) {
  var latitute = position.coords.latitude;
  var longitude = position.coords.longitude;
  getWeature(latitute, longitude);
} //show error when there is an error getting location


function showerror(error) {
  notificationbar.style.display = 'block';
}