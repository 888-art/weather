import type { ICoordinate } from "./../models/common.model";
import { convertToOptionsFormat, debounce } from "../helpers/helpers";
import { useCallback, useEffect, useState } from "react";
import { findCities } from "../api/apiService";

interface IUseCitiesReturn {
  isError: boolean;
  isLoading: boolean;
  options: { value: string; coord: ICoordinate }[];
}

export const useFetchCities = (cityName: string): IUseCitiesReturn => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<
    { value: string; coord: ICoordinate }[]
  >([]);

  const fetchCities = async (cityName: string) => {
    try {
      setIsLoading(true);
      const cities = convertToOptionsFormat(await findCities(cityName));

      setOptions(cities);
      setIsError(false);
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  };
  const debouncedFetchCities = useCallback(
    debounce((cityName) => fetchCities(cityName), 1000),
    []
  );

  useEffect(() => {
    if (cityName === "") {
      setOptions([]);
      setIsError(false);
    } else {
      debouncedFetchCities(cityName);
    }
  }, [cityName]);

  return {
    isError,
    options,
    isLoading,
  };
};
