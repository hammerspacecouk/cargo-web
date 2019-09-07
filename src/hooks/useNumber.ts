import { useLocale } from "./useLocale";

export const useNumber = (value: number): string => {
  const locale = useLocale();
  if (value > 999999999999999) {
    return value.toExponential(12);
  }
  return new Intl.NumberFormat(locale).format(Math.round(value));
};
