import { useNotification } from "../../hooks/useNotification";
import { useWeather } from "../../hooks/useWeather";
import { Weather } from "./Weather";

interface IWeatherContainerProps {
  latitude: string | undefined;
  longitude: string | undefined;
}

export const WeatherContainer = ({
  latitude,
  longitude,
}: IWeatherContainerProps): JSX.Element => {
  const { isError, data: weatherData } = useWeather({ latitude, longitude });

  useNotification({
    isShowNotification: isError,
    title: "Ошибка при получении погоды",
    description: "Произошла ошибка при получении погоды",
  });

  return <Weather weatherData={weatherData} />;
};
