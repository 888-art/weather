import { getWeather } from "../api/apiService";
import { useEffect, useState } from "react";
import type { ICoordinate, IWeatherData } from "../models/common.model";

interface IUseWeatherReturn {
  isError: boolean;
  data: IWeatherData | null;
}

export const useFetchWeather = ({
  latitude,
  longitude,
}: ICoordinate): IUseWeatherReturn => {
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<IWeatherData | null>(null);

  const getCurrentWeather = async () => {
    try {
      const currentWeather = await getWeather({ latitude, longitude });
      setData(currentWeather);
      setIsError(false);
    } catch (error) {
      setIsError(true);
    }
  };

  useEffect(() => {
    latitude && longitude && getCurrentWeather();
  }, [latitude, longitude]);

  return {
    isError,
    data,
  };
};
