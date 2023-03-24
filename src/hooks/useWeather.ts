import { getWeather } from "./../api/apiService";
import { useEffect, useState } from "react";
import { IWeatherData } from "../models/common.model";
interface IUseWeather {
  latitude: string | undefined;
  longitude: string | undefined;
}

interface IUseWeatherReturn {
  isError: boolean;
  data: IWeatherData | null;
}

export const useWeather = ({
  latitude,
  longitude,
}: IUseWeather): IUseWeatherReturn => {
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<IWeatherData | null>(null);

  const getCurrentWeather = async () => {
    try {
      const currentWeather = await getWeather(
        latitude as string,
        longitude as string
      );
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
