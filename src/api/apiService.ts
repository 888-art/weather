import type {
  IWeatherData,
  ICitiesResponse,
  ICoordinate,
} from "../models/common.model";

const URL_API_GEO_DB = "https://wft-geo-db.p.rapidapi.com/v1/geo/cities";

const OPTIONS_API_GEO_DB = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "3f70e37e49mshe5b8dad60247979p141f3ajsnda7878edf07c",
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};

const WEATHER_API_KEY = "31dbc9346247a0047f3ba7335adb90c2";

const URL_WEATHER = "https://api.openweathermap.org/data/2.5/weather";

export const findCities = async (
  cityName: string
): Promise<ICitiesResponse[]> => {
  try {
    const response = await fetch(
      `${URL_API_GEO_DB}?namePrefix=${cityName}&minPopulation=500000`,
      OPTIONS_API_GEO_DB
    );
    const { data } = await response.json();

    return data;
  } catch (error) {
    throw new Error("Error: fetch cities list");
  }
};

export const getWeather = async ({
  latitude,
  longitude,
}: ICoordinate): Promise<IWeatherData> => {
  try {
    const response = await fetch(
      `${URL_WEATHER}?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error("Error: fetch weather");
  }
};
