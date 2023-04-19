import { getParameters } from "../../helpers/helpers";
import type { IWeatherData } from "../../models/common.model";
import styles from "./weather.module.css";

export const Weather = ({
  weatherData,
}: {
  weatherData: IWeatherData | null;
}): JSX.Element => {
  const {
    icon,
    temp,
    main,
    description,
    feels,
    wind,
    humidity,
    pressure,
    city,
  } = getParameters(weatherData);

  return (
    <>
      {weatherData && (
        <div className={styles.container}>
          <div className={styles.city}>{city}</div>
          <div className={styles.tempWrap}>
            <img src={icon} alt="weather" />
            <div className={styles.temp}>{Math.round(temp as number)}°C</div>
          </div>
          <div className={styles.weather}>
            <div>{main}</div>
            <div>{description}</div>
          </div>
          <div className={styles.additionalInfoWrap}>
            <div className={styles.additionalInfoBlock}>
              <div>Feels like: {Math.round(feels as number)}°C</div>
              <div>Wind: {wind} m/s</div>
            </div>
            <div className={styles.additionalInfoBlock}>
              <div>Humidity: {humidity}%</div>
              <div>Pressure: {pressure}hPa</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
