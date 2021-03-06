import { useLocale } from "./useLocale";

const PERCENT_OPTIONS = { style: "percent" };

export const usePercent = (intValue?: number) => {
  const locale = useLocale();
  let decimal;
  let label;

  if (intValue !== undefined) {
    decimal = intValue / 100;
    label = new Intl.NumberFormat(locale, PERCENT_OPTIONS).format(intValue / 100);
  }

  return {
    decimal,
    label,
  };
};
