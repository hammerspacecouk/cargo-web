import { useLocale } from "./useLocale";

const DATETIME_OPTIONS = {
  day: "numeric",
  month: "long",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  timeZoneName: "short"
};

export const useDateTime = (datetime: Date): string => {
  const locale = useLocale();
  return new Intl.DateTimeFormat(locale, DATETIME_OPTIONS).format(datetime);
};
