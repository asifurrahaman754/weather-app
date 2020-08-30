//api key = 057b1eb19d4e9c61714a52551bf9d58d

//selector
const notificationbar = document.querySelector('.notification');
const weatherIcon = docuemnt.querySelector('.weather-icon');
const temperatureValue = document.querySelector('.temperature p');
const temperatuerDes = document.querySelector('.temperatuer-description');
const location = document.querySelector('.location');

//app data
const weather = {

}
weather.temperature= {
    unit : "celcius"
}

//check if the browser allows localtion
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setpositon, showerror)
}else{
    notificationbar.style.display = 'block';
}

//set user position
function setpositon(position){
    let latitute = position.coords.latitude;
    let longitude = position.coords.longitude
    getWeature(latitute,longitude)
}

//show error when there is an error getting location
function showerror(error){
    notificationbar.style.display = 'block';
}