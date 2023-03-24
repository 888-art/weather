import { Select } from "antd";

import React, { Dispatch, SetStateAction, useState } from "react";
import { useFetchCities } from "../../hooks/useFetchCities";
import { useNotification } from "../../hooks/useNotification";
import type { ICoordinate } from "../../models/common.model";

interface ISearchCityProps {
  setCurrentCoord: Dispatch<SetStateAction<ICoordinate>>;
}

export const SearchCity = ({ setCurrentCoord }: ISearchCityProps) => {
  const [value, setValue] = useState<string>("");

  const onSearch = (data: string) => {
    setValue(data);
    if (data === "") {
      setCurrentCoord({ latitude: undefined, longitude: undefined });
    }
  };

  const onSelect = (option: { value: string; coord: ICoordinate }) => {
    setCurrentCoord(option.coord);
  };

  const { isError, options, isLoading } = useFetchCities(value);

  useNotification({
    isShowNotification: isError,
    title: "Ошибка при получении списка городов",
    description: "Произошла ошибка при получении списка городов",
  });

  return (
    <Select
      showSearch
      value={value}
      style={{ width: "100%" }}
      onSearch={onSearch}
      placeholder="Enter city"
      options={options}
      onSelect={(value, option) => onSelect(option)}
      loading={isLoading}
      notFoundContent={null}
    />
  );
};
