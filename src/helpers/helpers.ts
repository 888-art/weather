import type {
  ICitiesResponse,
  ICoordinate,
  IWeatherData,
} from "../models/common.model";

export const debounce = <F extends (...args: any[]) => any>(
  func: F,
  waitFor: number
) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  const debounced = (...args: Parameters<F>) => {
    if (timeout !== null) {
      clearTimeout(timeout);
      timeout = null;
    }
    timeout = setTimeout(() => func(...args), waitFor);
  };

  return debounced as (...args: Parameters<F>) => ReturnType<F>;
};

export const convertToOptionsFormat = (
  data: ICitiesResponse[]
): { value: string; coord: ICoordinate }[] =>
  data.map((el) => ({
    coord: { latitude: el.latitude, longitude: el.longitude },
    value: `${el.country}, ${el.region ?? ""}, ${el.city} `,
  }));

export const getParameters = (weatherData: IWeatherData | null) => {
  const icon = weatherData?.weather?.length
    ? `https://openweathermap.org/img/wn/${weatherData.weather[0]?.icon}@2x.png`
    : "";

  const city = weatherData?.name;
  const description = weatherData?.weather[0]?.description;
  const main = weatherData?.weather[0]?.main;
  const temp = weatherData?.main.temp;
  const feels = weatherData?.main.feels_like;
  const wind = weatherData?.wind.speed;
  const humidity = weatherData?.main.humidity;
  const pressure = weatherData?.main.pressure;

  return {
    city,
    description,
    icon,
    main,
    temp,
    feels,
    wind,
    humidity,
    pressure,
  };
};
