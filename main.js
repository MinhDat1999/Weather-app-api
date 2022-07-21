const inputSearch = document.querySelector(".search");
const nameCity = document.querySelector(".name");
const deg = document.querySelector(".temp");
const wind = document.querySelector(".wind");
const humidityEl = document.querySelector(".humidity");
const weatherEl = document.querySelector(".cloud");
const changweaather = document.querySelector(".condition");
const iconEl = document.querySelector(".icon");
const timeEl = document.querySelector(".time");
const datEl = document.querySelector(".date");
const boxbody = document.querySelector("body");
const cityandName = document.querySelector(".city-time");
const errormasage = document.querySelector(".erro");
const app = document.querySelector(".weather-app");
const btnsub = document.querySelector(".submit");
const ListCity = document.querySelectorAll(".cities .city");

var DayofWeek = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fir", "Sat"];
async function changeWeatherAPI(key) {
  let api = `http://api.weatherstack.com/current?access_key=11924c45ebef296080079db2fdadca06&query=${key}`;
  let responseWeatherAPI = await fetch(api);
  let data = await responseWeatherAPI.json();
  if (data.error) {
    errormasage.innerText =
      "Can't connect (Maybe the area name is wrong or the area doesn't exist)";
  } else {
    nameCity.innerText = data.location.name;
    deg.innerHTML = `<span>${Math.floor(
      data.current.temperature
    )}&#176;</span>`;
    wind.innerText = Math.floor(data.current.wind_speed * 3.6) + " m/s";
    humidityEl.innerText = data.current.humidity + "%";
    weatherEl.innerText = data.current.cloudcover + "%";
    changweaather.innerText = data.current.weather_descriptions[0];
    iconEl.src = `${data.current.weather_icons[0]}`;
    var day = new Date(data.location.localtime);

    function timetwoNumber(n) {
      return n > 9 ? "" + n : "0" + n;
    }
    timeEl.innerText = `${day.getHours()}:${timetwoNumber(day.getMinutes())}`;
    datEl.innerText = ` ${DayofWeek[day.getUTCDay()]} ${day.getDate()} .${
      day.getMonth() + 1
    } ${day.getFullYear()} `;
    if (data.current.is_day == "yes") {
      if (data.current.weather_descriptions[0].includes("cloudy")) {
        if (data.current.temperature > 30) {
          app.style.backgroundImage = " url(Image/light/may.jpg)";
          btnsub.style.background = "#fa6d1b";
          boxbody.style.backgroundImage =
            "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2)), url(Image/light/may.jpg)";
          console.log(boxbody);
        } else {
          app.style.backgroundImage = "url(Image/light/maynhe.jpg)";
          btnsub.style.background = "gray";
          boxbody.style.backgroundImage =
            " linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2)), url(Image/light/maynhe.jpg)";
          console.log("may");
        }
      }
      if (data.current.weather_descriptions[0].includes("rain")) {
        app.style.backgroundImage = "url(Image/light/mua.jpg)";
        btnsub.style.background = "black";
        btnsub.style.color = "#fff";
        boxbody.style.backgroundImage =
          "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2)), url(Image/light/mua.jpg)";
      }
      if (data.current.weather_descriptions[0].includes("Clear")) {
        app.style.backgroundImage = "url(Image/light/clear.jpg)";
        btnsub.style.background = "#8AB4F8";
        boxbody.style.backgroundImage =
          "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2)), url(Image/light/clear.jpg)";
      }
      if (data.current.weather_descriptions[0].includes("Sunny")) {
        app.style.backgroundImage = "url(Image/light/nang.jpg)";
        btnsub.style.background = "#9A785C";
        boxbody.style.backgroundImage =
          "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2)), url(Image/light/nang.jpg)";
      }
    } else {
      if (data.current.weather_descriptions[0].includes("rain")) {
        app.style.backgroundImage = "url(Image/night/muadem.jpg)";
        btnsub.style.background = "#325c80";
        boxbody.style.backgroundImage = "url(Image/night/muadem.jpg)";
      }
      if (data.current.weather_descriptions[0].includes("Clear")) {
        app.style.backgroundImage = "url(Image/night/night.jpg)";
        btnsub.style.background = "#3C4A91";
        boxbody.style.backgroundImage = "url(Image/night/night.jpg)";
      }
      if (data.current.weather_descriptions[0].includes("cloudy")) {
        app.style.backgroundImage = "url(Image/night/clear.jpg)";
        btnsub.style.background = "#181e27";
        boxbody.style.backgroundImage = "url(Image/night/clear.jpg)";
      }
    }
  }
}
ListCity.forEach(function (item) {
  item.addEventListener("click", () => {
    changeWeatherAPI(item.innerText);
  });
});
btnsub.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("aaa");
  errormasage.innerText = "";

  changeWeatherAPI();
  inputSearch.value = "";
});
inputSearch.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    errormasage.innerText = "";
    let keyseach = inputSearch.value.trim();
    e.preventDefault();
    changeWeatherAPI(keyseach);
    this.value = "";
  }
});
