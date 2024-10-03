import React from "react";

import styles from "./Header.module.scss";
import CustomInput from "../CustomInput/CustomInput";
import WeatherInput from "../WeatherInput/WeatherInput";

const Header = () => {
  return (
    <header className={styles["header"]}>
      <h1>Прогноз погоды</h1>
      <WeatherInput />
    </header>
  );
};

export default Header;
