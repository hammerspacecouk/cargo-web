let locale: string;
let timeZone: string;

const getOptions = (): Intl.ResolvedDateTimeFormatOptions | null => {
  const format: Intl.DateTimeFormat = Intl && Intl.DateTimeFormat && Intl.DateTimeFormat();
  const options = format && format.resolvedOptions && format.resolvedOptions();
  return options ? options : null;
};

const getLocale = (): string => {
  if (!locale) {
    locale = "en-GB";
    const options = getOptions();
    if (options && options.locale) {
      locale = options.locale;
    }
  }
  return locale;
};

const getTimeZone = (): string => {
  if (!timeZone) {
    timeZone = "UTC";
    const options = getOptions();
    if (options && options.timeZone) {
      timeZone = options.timeZone;
    }
  }
  return timeZone;
};

export const fullDate = (date: Date) =>
  date.toLocaleString(getLocale(), {
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    month: "long",
    second: "2-digit",
    timeZone: getTimeZone(),
    timeZoneName: "short",
    weekday: "long",
    year: "numeric",
  });
