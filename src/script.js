function callDate(){
    let displayDay = document.querySelector("#weekday");
    displayDay.innerHTML = currentDay;

    let displayTime = document.querySelector("#time");
    displayTime.innerHTML = currentTime;  
}

function formatDayDisplay(timestamp) {
    let date = new Date(timestamp * 1000);
    let numericDay = date.getDay();
    let weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return weekday[numericDay];
}

function showFuture(response) {
    let dailyForecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast-box");
    let forecastHTML = `<div class="row">`;
    
    dailyForecast.forEach(function (future, index) {
      if (index > 0 && index < 7) {
     forecastHTML = forecastHTML +
      `
        <div class="col-2 forecast-box-display">
            <div class="forecast-day">${formatDayDisplay(future.dt)}</div>
            <div class="future-numbers">
              <span id="forcast-max"
               >${Math.round(future.temp.max)}°</span>
               <span id="forecast-min"
               >${Math.round(future.temp.min)}°</span>
            </div>
            <img src="src/icons/${future.weather[0].icon}.svg" 
                 alt="${future.weather[0].description}"
                 width="42"
                 class="future-icon">
        </div>
      `;
    forecastElement.innerHTML = forecastHTML + `</div>`;
      };
    });
}

function callFuture(coordinates) {
    let lat = coordinates.lat;
    let lon = coordinates.lon;
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${apiKey}`;

    axios.get(apiUrl).then(showFuture);
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

    bigTemp.innerHTML = Math.round(response.data.main.temp);
    liveMax.innerHTML = Math.round(response.data.main.temp_max);
    liveMin.innerHTML = Math.round(response.data.main.temp_min);
    city.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
    liveDescription.innerHTML = response.data.weather[0].main;
    liveHumidity.innerHTML = response.data.main.humidity;
    liveWind.innerHTML = Math.round(response.data.wind.speed);
    iconElement.setAttribute("src", `src/icons/${(response.data.weather[0].icon)}.svg`);
    iconElement.setAttribute("alt", response.data.weather[0].description);

    callFuture(response.data.coord);
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

callDate();
search("Glasgow");
