import { useIntl } from "react-intl";

export const useNumber = (value: number) => {
  const intl = useIntl();

  if (value > 999999999999999) {
    return value.toExponential(12);
  }
  return intl.formatNumber(Math.round(value));
};
