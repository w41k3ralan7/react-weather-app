import React from "react";
// import "./WeatherApp.css";
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

import "./Forecast.css";

const Forecast = () => {
  return (
    <div className="forecast">
      {[0, 8, 16, 24, 32].map((index, idx) => (
        <div className="items" key={index}>
          <div className={`date${idx + 1}`}></div>
          <img className={`image${idx + 1}`} src={d01} alt="" />
          <div className={`description${idx + 1}`}></div>
          <div className={`humidity${idx + 1}`}>
            <div className={`humidityText${idx + 1}`}></div>
            <div className={`humidityIcon${idx + 1}`}>
              <img src={humidity} alt="" />
            </div>
          </div>
          <div className={`max${idx + 1}`}></div>
        </div>
      ))}
    </div>
  );
};

export default Forecast;
