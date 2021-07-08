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

function displayCurrent(response){
    let temp = Math.round(response.data.main.temp);
    let bigTemp = document.querySelector("#big-temp");
    bigTemp.innerHTML = temp;

    let city = document.querySelector(".location-display");
    city.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
}

function giveCurrent(position){
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}`;
    
    axios.get(`${apiUrl}&units=${units}&appid=${apiKey}`).then(displayCurrent);
}

function search(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(giveCurrent);
}

let form = document.querySelector("#search-bar");
form.addEventListener("click", search);



 