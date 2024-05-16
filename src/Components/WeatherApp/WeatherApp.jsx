import React, { useEffect } from "react";
import "./WeatherApp.css";
import d01 from "../Assets/01d.png";
import n01 from "../Assets/01n.png";
import d02 from "../Assets/02d.png";
import n02 from "../Assets/02n.png";
import d03 from "../Assets/03d.png";
import d04 from "../Assets/04d.png";
import d09 from "../Assets/09d.png";
import d10 from "../Assets/10d.png";
import n10 from "../Assets/10n.png";
import d11 from "../Assets/11d.png";
import d13 from "../Assets/13d.png";
import d50 from "../Assets/50d.png";
import windspeed from "../Assets/windspeed.png";
import humidity from "../Assets/humidity.png";
import searchIcon from "../Assets/search.png";
import Forecast from "./Forecast";

const WeatherApp = () => {
  const apiKey = "3ff6b3a022eca1762cd578eb5e86b75e";

  const descriptionToImageMap = (description, time, sunrise, sunset) => {
    if (description === "clear sky") {
      return time > sunrise && time < sunset ? d01 : n01;
    }
    if (description === "few clouds") {
      return time > sunrise && time < sunset ? d02 : n02;
    }
    if (description === "scattered clouds") {
      return d03;
    }
    if (description === "broken clouds" || description === "overcast clouds") {
      return d04;
    }
    if (description === "shower rain") {
      return d09;
    }
    if (/rain/.test(description)) {
      return time > sunrise && time < sunset ? d10 : n10;
    }
    if (/thunderstorm|drizzle/.test(description)) {
      return d11;
    }
    if (description === "snow") {
      return d13;
    }
    if (
      description === "mist" ||
      description === "smoke" ||
      description === "haze" ||
      description === "fog" ||
      description === "dust" ||
      description === "tornado"
    ) {
      return d50;
    }
    return "";
  };

  const search = async () => {
    const cityName = document.querySelector(".cityInput").value;
    if (!cityName) {
      return; // No need to continue if no city name is provided
    }

    try {
      const url1 = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
      const url2 = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&&appid=${apiKey}&units=metric`;

      const response1 = await fetch(url1);
      if (!response1.ok) {
        throw new Error("Failed to fetch weather data1");
      }
      const data1 = await response1.json();

      const response2 = await fetch(url2);
      if (!response2.ok) {
        throw new Error("Failed to fetch weather data2");
      }
      const data2 = await response2.json();

      const sunrise = data1.sys.sunrise;
      const sunset = data1.sys.sunset;
      const currenttime = data1.dt;

      document.querySelector(".date1").innerHTML =
        data2.list[0].dt_txt.split(" ")[0];
      document.querySelector(".date2").innerHTML =
        data2.list[8].dt_txt.split(" ")[0];
      document.querySelector(".date3").innerHTML =
        data2.list[16].dt_txt.split(" ")[0];
      document.querySelector(".date4").innerHTML =
        data2.list[24].dt_txt.split(" ")[0];
      document.querySelector(".date5").innerHTML =
        data2.list[32].dt_txt.split(" ")[0];

      // Update UI with weather data

      document.querySelector(".humidity-percent").innerHTML =
        data1.main.humidity + "%";
      document.querySelector(".windspeed").innerHTML =
        data1.wind.speed + " kmph";
      document.querySelector(".weather-temp").innerHTML =
        data1.main.temp + "°C";
      document.querySelector(".weather-location").innerHTML = data1.name;
      document.querySelector(".discription").innerHTML =
        data1.weather[0].description;
      const image = document.querySelector(".weather-img");
      image.setAttribute(
        "src",
        descriptionToImageMap(
          data1.weather[0].description,
          currenttime,
          sunrise,
          sunset
        )
      );

      const indices = [0, 8, 16, 24, 32];
      const images = [
        document.querySelector(".image1"),
        document.querySelector(".image2"),
        document.querySelector(".image3"),
        document.querySelector(".image4"),
        document.querySelector(".image5"),
      ];

      indices.forEach((index, idx) => {
        const weatherDescription = data2.list[index].weather[0].description;
        images[idx].setAttribute(
          "src",
          descriptionToImageMap(
            weatherDescription,
            currenttime,
            sunrise,
            sunset
          )
        );
        document
          .querySelector(`.humidityIcon${idx + 1}`)
          .setAttribute("src", humidity);
        document.querySelector(`.humidityText${idx + 1}`).innerHTML =
          data2.list[index].main.humidity + "% humidity";
        document.querySelector(`.max${idx + 1}`).innerHTML =
          "Max temp : " + data2.list[index].main.temp_max + "°C";
        document.querySelector(`.description${idx + 1}`).innerHTML =
          data2.list[index].weather[0].description;
      });
    } catch (error) {
      alert("Error fetching weather data:", error);
      console.error("Error fetching weather data");
    }
  };
  useEffect(() => {
    search("Karsog");
  }, []);

  return (
    <div className="container">
      <div className="top-bar">
        <input
          type="text"
          className="cityInput"
          placeholder="enter your city"
        />
        <div
          className="search-icon"
          onClick={() => {
            search();
          }}
        >
          <img src={searchIcon} alt="" />
        </div>
      </div>
      <div className="weather-image">
        <img className="weather-img" src="" alt="" />
        <div className="discription"></div>
        <div className="weather-temp"></div>
        <div className="weather-location"></div>
      </div>

      <div className="data-container">
        <div className="data">
          <img src={humidity} alt="" className="icon" />
          <div className="humidity-percent"></div>
          <div className="text">Humidity</div>
        </div>

        <div className="data">
          <img src={windspeed} alt="" className="icon" />
          <div className="windspeed"></div>
          <div className="text">Wind Speed</div>
        </div>
      </div>

      <Forecast />
    </div>
  );
};

export default WeatherApp;
