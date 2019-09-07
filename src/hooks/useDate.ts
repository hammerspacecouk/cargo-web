import { useLocale } from "./useLocale";

const DATE_OPTIONS = {
  day: "numeric",
  month: "long",
  year: "numeric",
};

export const useDate = (datetime: Date): string => {
  const locale = useLocale();
  return new Intl.DateTimeFormat(locale, DATE_OPTIONS).format(datetime);
};
