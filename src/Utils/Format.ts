let locale: string;
let timeZone: string;

const getOptions = (): Intl.ResolvedDateTimeFormatOptions => {
  const format: Intl.DateTimeFormat =
    Intl && Intl.DateTimeFormat && Intl.DateTimeFormat();
  const options = format && format.resolvedOptions && format.resolvedOptions();
  return options ? options : null;
};

const getLocale = (): string => {
  if (locale) {
    return locale;
  }
  locale = "en-GB";
  const options = getOptions();
  if (options && options.locale) {
    locale = options.locale;
  }
};

const getTimeZone = (): string => {
  if (timeZone) {
    return timeZone;
  }
  timeZone = "UTC";
  const options = getOptions();
  if (options && options.timeZone) {
    timeZone = options.timeZone;
  }
};

export const fullDate = (date: Date) =>
  date.toLocaleString(getLocale(), {
    timeZone: getTimeZone(),
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short"
  });
