import { convertToOptionsFormat, debounce } from "./../helpers/helpers";
import { useCallback, useEffect, useState } from "react";
import { findCities } from "../api/apiService";

interface IUseCitiesReturn {
  isError: boolean;
  options: { value: string; coord: string }[];
}

export const useCities = (cityName: string): IUseCitiesReturn => {
  const [isError, setIsError] = useState(false);
  const [options, setOptions] = useState<{ value: string; coord: string }[]>(
    []
  );

  const fetchCities = async (cityName: string) => {
    try {
      const cities = convertToOptionsFormat(await findCities(cityName));

      setOptions(cities);
      setIsError(false);
    } catch (error) {
      setIsError(true);
    }
  };
  const throttledFetchCities = useCallback(
    debounce((cityName) => fetchCities(cityName), 1200),
    []
  );

  useEffect(() => {
    if (cityName === "") {
      setOptions([]);
      setIsError(false);
    } else {
      throttledFetchCities(cityName);
    }
  }, [cityName]);

  return {
    isError,
    options,
  };
};
