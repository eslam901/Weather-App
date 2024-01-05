'use strict'

const search = document.getElementById("search"),
  weather = document.getElementById("weather"),
  days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

search.addEventListener('input', () => {
  if (/\w{3,}/.test(search.value)) {
    let weatherSearch = [];
    let myHttp = new XMLHttpRequest();
    myHttp.open(
      "GET",
      `https://api.weatherapi.com/v1/search.json?key=fad1cc29dd84409f9ee171915240101&q=${search.value}`
    );
    myHttp.send();
    myHttp.addEventListener("readystatechange", () => {
      if (myHttp.readyState == 4) {
        weatherSearch = JSON.parse(myHttp.response);
        if (weatherSearch.length>0) {
          display(weatherSearch[0].url);
        }
      }
    });
  }
})

async function display(url) {
  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=fad1cc29dd84409f9ee171915240101&q=${url}&days=3`
  );
  let weatherCity = await response.json()
  const pathToDay = weatherCity.forecast.forecastday[0];
  const dateToDay = new Date(pathToDay.date);
  const dayOfMonth = dateToDay.getDate();
  const monthName = months[dateToDay.getMonth()];
  const toDay = days[dateToDay.getDay()];
  weather.innerHTML = `
  <div id="today" class="weatherDiv">
    <div class="flex justify-between">
            <span>
              ${toDay}
            </span>
            <span>
              ${dayOfMonth}${monthName}
            </span>
          </div>
          <p id="city" class="text-lg font-bold my-6">${weatherCity.location.name}</p>
          <div id="temp" class="flex justify-between px-4 items-center">
            <h3 class="text-7xl font-bold">${weatherCity.current.temp_c}<sup>o</sup>C</h3>
            <picture class="w-2/6">
              <img src="http:${weatherCity.current.condition.icon}">
            </picture>
          </div>
          <p class="text-blue-700 my-6">${weatherCity.current.condition.text}</p>
          <div class="flex">
            <div class="w-1/3 flex font-bold">
              <img src="./images/icon-umberella.png" class="mr-2">
              <span id="rain">${weatherCity.forecast.forecastday[0].day.daily_chance_of_rain} %</span>
            </div>
            <div class="w-1/3 flex font-bold">
              <img src="./images/icon-wind.png" class="mr-2">
              <span id="wind">${weatherCity.current.wind_kph} Kph</span>
            </div>
            <div class="w-1/3 flex font-bold">
              <img src="./images/icon-compass.png" class="mr-2">
              <span id="dir">${weatherCity.current.wind_dir}</span>
            </div>
          </div>
        </div>
  
  `;
  for (let i = 0; i < weatherCity.forecast.forecastday.length; i++) {
    const path = weatherCity.forecast.forecastday[i+1];
    const forecastDiv = document.createElement("div");
    const date = new Date(path.date);
    const day = days[date.getDay()];
    forecastDiv.classList.add("weatherDiv", "text-center");
    forecastDiv.innerHTML = `
    <div class="text-center">
      <span>
        ${day}
      </span>
    </div>
    <div class="my-5">
      <img src="https:${path.day.condition.icon}" class="mx-auto">
    </div>
    <h3 class="text-3xl font-bold">${path.day.maxtemp_c}<sup>o</sup>C</h3>
    <small>${path.day.mintemp_c}<sup>o</sup>C</small>
    <p class="text-blue-700 my-6">${path.day.condition.text}</p>
  `;
    weather.appendChild(forecastDiv); 
  }
}

display('cairo')