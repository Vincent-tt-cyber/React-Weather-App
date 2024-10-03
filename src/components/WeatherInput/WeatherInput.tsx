import React from "react";
// import styles from "./WeatherInput.module.scss";
import CustomInput from "../CustomInput/CustomInput";
import axios from "axios";
import { API_Token } from "../../App";

interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
}

const WeatherInput = () => {
  const [city, setCity] = React.useState("");
  const [weatherData, setWeatherData] = React.useState<WeatherData | null>(
    null
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setCity(event.target.value);
  };

  const getWeatherData = async () => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_Token}&units=metric`
    ).then((res) => res.json());
    console.log(res);
    setWeatherData(res);
  };

  const handleSearch = async () => {
    const res = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API_Token}`
    ).then((res) => res.json());
    console.log(res[0]);
    getWeatherData();
  };

  React.useEffect(() => {}, [weatherData]);

  return (
    <>
      {/* <form> */}
      <div>
        <CustomInput
          type="text"
          value={city}
          onChange={handleInputChange}
          placeholder="Введите название города"
        />
        <button onClick={handleSearch}>Поиск</button>
      </div>
      {/* </form> */}

      <div>
        {weatherData && (
          <div>
            <p>Температура: {weatherData.main.temp}°C</p>
            <p>Ощущается как: {weatherData.main.feels_like}°C</p>
            <p>Минимальная температура: {weatherData.main.temp_min}°C</p>
            <p>Максимальная температура: {weatherData.main.temp_max}°C</p>
          </div>
        )}
      </div>
    </>
  );
};

export default WeatherInput;
