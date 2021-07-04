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

 