import axios from "axios";
import React, { useEffect, useState } from "react";
// https://www.weatherapi.com/docs/conditions.json - языки
// http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}

function App() {
  const [value, setValue] = useState("Москва");
  const [weatherData, setWeatherData] = useState([]);
  const [dayText, setDayText] = useState("");
  const [conditionText, setConditionText] = useState("");
  // const [bacground, setBackground] = useState("");

  const API_KEY = "120a1e738d234ea4b9b152427240310";

  const searchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const getDataWeather = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data } = await axios.get(
      `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${value}`
    );

    console.log(data);

    if (data) {
      setWeatherData([data]);
      setValue("");

      if (data.current.is_day === 1) {
        setDayText("День");
      } else {
        setDayText("Ночь");
      }
    }
  };

  const getRussianText = async () => {
    try {
      const { data } = await axios.get(
        "https://www.weatherapi.com/docs/conditions.json"
      );
      if (data) {
        data.map((el) => {
          if (el.code == weatherData[0].current.condition.code) {
            console.log("el code", el.languages);
            const data = el.languages;
            const result = data.find((el) => el.lang_name == "Russian");
            // console.log("result", result['day_text']);

            setConditionText(result["day_text"]);
          }
        });
      }
    } catch (error) {
      console.error("Не удалось получить данные", error);
    }
  };

  // const getBackground = async () => {
  //   switch (weatherData.current) {
  //     case value:
  //       break;

  //     default:
  //       break;
  //   }
  // };

  React.useEffect(() => {
    getRussianText();

    // if (weatherData.length == 0) {
    //   setValue("London");
    //   getDataWeather({ preventDefault: () => {} } as React.FormEvent);
    // }
  }, [weatherData, value]);

  return (
    <>
      <div className="container">
        <form onSubmit={getDataWeather}>
          <input
            className="input"
            type="text"
            value={value}
            onChange={searchValue}
            placeholder="Введите город"
          />
          <button
            className="button-input"
            type="submit"
            // onClick={getDataWeather}
          >
            Найти
          </button>
        </form>
        <div>
          {weatherData ? (
            <>
              <div>
                {weatherData.map((el, key) => (
                  <div key={key} className="weather-card">
                    <div className="weather-card__header">
                      <img
                        src={`https:${el.current.condition.icon}`}
                        alt={el.current.condition.text}
                      />
                      <h2>
                        {el.location.name} <span>({dayText})</span>
                      </h2>
                    </div>
                    <p>{conditionText}</p>
                    <h1>{el.current.temp_c}°C</h1>
                    <p>Ветер: {el.current.wind_kph} км/ч</p>
                    <p>Влажность: {el.current.humidity}%</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div>
              <div key={key} className="weather-card">
                <div className="weather-card__header">
                  {/* <img
                        src={el.current.condition.icon}
                        alt={el.current.condition.text}
                      /> */}
                  <h2>---</h2>
                </div>
                <h1>0°C</h1>
                <p>---</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
