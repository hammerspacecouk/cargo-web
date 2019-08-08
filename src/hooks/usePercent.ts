import { useIntl } from "react-intl";

export const usePercent = (value: number) => {
  const intl = useIntl();
  return intl.formatNumber(value, { style: "percent" });
};
