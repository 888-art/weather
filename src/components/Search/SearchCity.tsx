import { AutoComplete } from "antd";

import React, { Dispatch, SetStateAction, useState } from "react";
import { useCities } from "../../hooks/useCities";
import { useNotification } from "../../hooks/useNotification";

interface ISearchCityProps {
  setCurrentCoord: Dispatch<
    SetStateAction<{
      latitude: string | undefined;
      longitude: string | undefined;
    }>
  >;
}

export const SearchCity = ({ setCurrentCoord }: ISearchCityProps) => {
  const [value, setValue] = useState<string>("");

  const onChange = (data: string) => {
    setValue(data);
    if (data === "") {
      setCurrentCoord({ latitude: undefined, longitude: undefined });
    }
  };

  const onSelect = (option: { value: string; coord: string }) => {
    const [latitude, longitude] = option.coord.split(",");
    setCurrentCoord({ latitude, longitude });
  };

  const { isError, options } = useCities(value);

  useNotification({
    isShowNotification: isError,
    title: "Ошибка при получении списка городов",
    description: "Произошла ошибка при получении списка городов",
  });

  return (
    <AutoComplete
      value={value}
      style={{ width: "100%" }}
      onChange={onChange}
      placeholder="Choose city"
      options={options}
      notFoundContent="empty data"
      onSelect={(value, option) => onSelect(option)}
    />
  );
};
