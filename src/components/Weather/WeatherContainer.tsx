import { useNotification } from "../../hooks/useNotification";
import { useFetchWeather } from "../../hooks/useFetchWeather";
import type { ICoordinate } from "../../models/common.model";
import { Weather } from "./Weather";

export const WeatherContainer = ({
  latitude,
  longitude,
}: ICoordinate): JSX.Element => {
  const { isError, data: weatherData } = useFetchWeather({
    latitude,
    longitude,
  });

  useNotification({
    isShowNotification: isError,
    title: "Ошибка при получении погоды",
    description: "Произошла ошибка при получении погоды",
  });

  return <Weather weatherData={weatherData} />;
};
