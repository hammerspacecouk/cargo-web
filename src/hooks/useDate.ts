import { useIntl } from "react-intl";

export const useDate = (datetime: Date) => {
  const intl = useIntl();
  return intl.formatDate(datetime, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};
