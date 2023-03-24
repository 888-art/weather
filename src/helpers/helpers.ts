import type { ICitiesResponse, ICoordinate } from "../models/common.model";

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
