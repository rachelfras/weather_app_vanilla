function callDate(){
    let displayDay = document.querySelector("#weekday");
    displayDay.innerHTML = currentDay;

    let displayTime = document.querySelector("#time");
    displayTime.innerHTML = currentTime;  
}

function displayCityTemp(response){
    let bigTemp = document.querySelector("#big-temp");
    let liveMax = document.querySelector("#max");
    let liveMin = document.querySelector("#min");
    let city = document.querySelector(".location-display");
    let liveDescription = document.querySelector("#description");
    let liveHumidity = document.querySelector("#humidity");
    let liveWind = document.querySelector("#wind");
    let iconElement = document.querySelector("#icon");

    celsiusTempMain = response.data.main.temp;
    celsiusTempMax = response.data.main.temp_max;
    celsiusTempMax = response.data.main.temp_min;

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

function switchMetric(event) {
    event.preventDefault();
    let tempMain = document.querySelector("#big-temp");
    let tempMax = document.querySelector("#max");
    let tempMin = document.querySelector("#min");
    tempMain.innerHTML = Math.round(celsiusTempMain);
    tempMax.innerHTML = Math.round(celsiusTempMain);
    tempMin.innerHTML = Math.round(celsiusTempMain);
}

function switchImperial(event) {
    event.preventDefault();
    let tempMain = document.querySelector("#big-temp");
    let tempMax = document.querySelector("#max");
    let tempMin = document.querySelector("#min");
    let imperialResultMain = (celsiusTempMain * 9) / 5 + 32;
    let imperialResultMax = (celsiusTempMax * 9) / 5 + 32;
    let imperialResultMin = (celsiusTempMin * 9) / 5 + 32;
    tempMain.innerHTML = Math.round(imperialResultMain);
    tempMax.innerHTML = Math.round(imperialResultMax); 
    tempMin.innerHTML = Math.round(imperialResultMin);     
}

let apiKey = `fa1047ba99073894a88e54f4a5673a70`;
let rightNow = new Date();

let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let currentDay = weekdays[rightNow.getDay()];
let hour = `0${rightNow.getHours()}`.slice(-2);
let minutes = `0${rightNow.getMinutes()}`.slice(-2);
let currentTime = `${hour}:${minutes}`;

let form = document.querySelector("#search-bar");
let currentCity = document.querySelector(".current");
form.addEventListener("submit", handleSubmit);
currentCity.addEventListener("click", searchGeolocation);

let celsiusTempMain = null;
let celsiusTempMax = null;
let celsiusTempMin = null;
let metricLink = document.querySelector(".metric");
let imperialLink = document.querySelector(".imperial");

metricLink.addEventListener("click", switchMetric);
imperialLink.addEventListener("click", switchImperial);

callDate();
search("Tokyo");



 