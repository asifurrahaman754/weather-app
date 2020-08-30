//api key = 057b1eb19d4e9c61714a52551bf9d58d

const kelvin = 273;
const key = "057b1eb19d4e9c61714a52551bf9d58d";

//selector
const notificationbar = document.querySelector('.notification');
const weatherIcon = document.querySelector('.weather-icon');
const temperatureValue = document.querySelector('.temperature p');
const temperatuerDes = document.querySelector('.temperature-description');
let userlocation = document.querySelector('.location');

//app data
const weather = {};
weather.temperature= {
    unit : "celcius"
};

//check if the browser allows localtion
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setposition, showerror)
}else{
    notificationbar.style.display = 'block';
}

//set user position
function setposition(position){
    let latitute = position.coords.latitude;
    let longitude = position.coords.longitude;
    getWeature(latitute,longitude);
}

//show error when there is an error getting location
function showerror(error){
    notificationbar.style.display = 'block';
    notificationbar.innerHTML = `${error.message}`;
}

//get weather information
function getWeature(latitude,longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    fetch(api)
        .then(Response => {
            let data = Response.json();
            return data;
        })
        .then(data => {
           weather.temperature.value = Math.floor(data.main.temp - kelvin);
           weather.description = data.weather[0].description;
           weather.iconId = data.weather[0].icon;
           weather.city = data.name;
           weather.country = data.sys.country;
        })
        .then(() => {
            displayWeather();
        })
}

//display the info in the UI
function displayWeather(){
    weatherIcon.innerHTML = `<img src="img/${weather.iconId}.png">`;
    temperatureValue.innerHTML = `${weather.temperature.value}&#176 <span>c</span>`;
    temperatuerDes.innerHTML = weather.description;
    userlocation.innerHTML = `${weather.city}, ${weather.country}`;
}

//c to f
function celciusToF(temp){
    return (temp * 9/5)+32;
}
temperatureValue.addEventListener('click',function(){
    if(weather.temperature.value === "undefined") return;

    if(weather.temperature.unit == "celcius"){
        let far = celciusToF(weather.temperature.value);
        far = Math.floor(far);
        temperatureValue.innerHTML = `${far}&#176 <span>f</span>`;
        weather.temperature.unit = 'fahrenheit';
    }else{
        temperatureValue.innerHTML = `${weather.temperature.value}&#176 <span>c</span>`;
        weather.temperature.unit = "celcius";
    }
})