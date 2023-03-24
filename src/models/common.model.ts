export type TCitiesResponse = Record<string, unknown> & {
  city: string;
  latitude: number;
  longitude: number;
  country: string;
  region: string;
};

interface IWeather {
  description: string;
  icon: string;
  main: string;
}

export interface IWeatherData {
  name: string;
  weather: IWeather[];
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  main: {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  visibility: number;
}
