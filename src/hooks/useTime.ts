import { useIntl } from "react-intl";

export const useTime = (datetime: Date) => {
  const intl = useIntl();
  return intl.formatTime(datetime, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};
