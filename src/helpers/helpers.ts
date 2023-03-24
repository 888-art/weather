import { TCitiesResponse } from "../models/common.model";

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
  data: TCitiesResponse[]
): { value: string; coord: string }[] =>
  data.map((el) => ({
    coord: `${el.latitude},${el.longitude}`,
    value: `${el.country}, ${el.region ?? ""}, ${el.city} `,
  }));
