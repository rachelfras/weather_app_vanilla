let apiKey = `fa1047ba99073894a88e54f4a5673a70`;

function callDate(){
    let displayDay = document.querySelector("#weekday");
    displayDay.innerHTML = currentDay;

    let displayTime = document.querySelector("#time");
    displayTime.innerHTML = currentTime;  
}

let rightNow = new Date();

let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let currentDay = weekdays[rightNow.getDay()];
let hour = `0${rightNow.getHours()}`.slice(-2);
let minutes = `0${rightNow.getMinutes()}`.slice(-2);
let currentTime = `${hour}:${minutes}`;

callDate();

function displayCityTemp(response){
    let bigTemp = document.querySelector("#big-temp");
    let liveMax = document.querySelector("#max");
    let liveMin = document.querySelector("#min");
    let city = document.querySelector(".location-display");
    let liveDescription = document.querySelector("#description");
    let liveHumidity = document.querySelector("#humidity");
    let liveWind = document.querySelector("#wind");
    let iconElement = document.querySelector("#icon");

    console.log(response.data);
    bigTemp.innerHTML = Math.round(response.data.main.temp);
    liveMax.innerHTML = Math.round(response.data.main.temp_max);
    liveMin.innerHTML = Math.round(response.data.main.temp_min);
    city.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
    liveDescription.innerHTML = response.data.weather[0].main;
    liveHumidity.innerHTML = response.data.main.humidity;
    liveWind.innerHTML = Math.round(response.data.wind.speed);
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}

function search(city) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}`;
    let units = `metric`;

    axios.get(`${apiUrl}&units=${units}&appid=${apiKey}`).then(displayCityTemp);
}

function giveCurrent(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}`;
    
    axios.get(`${apiUrl}&units=${units}&appid=${apiKey}`).then(displayCityTemp);
}

function handleSubmit(event) {
    event.preventDefault();
    let inputCity = document.querySelector("#enter-city");
    search(inputCity.value);
    inputCity.value = "";
}

function searchGeolocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(giveCurrent);
}

let form = document.querySelector("#search-bar");
form.addEventListener("submit", handleSubmit);


let currentCity = document.querySelector(".current");
currentCity.addEventListener("click", searchGeolocation);

search("Tokyo");



 