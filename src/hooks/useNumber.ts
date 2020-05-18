import { useLocale } from "./useLocale";

export const useNumber = (value: number, precision: number = 0): string => {
  const locale = useLocale();
  if (value > 999999999999999) {
    return value.toExponential(12);
  }
  return new Intl.NumberFormat(locale).format(parseFloat((value || 0).toFixed(precision)));
};
