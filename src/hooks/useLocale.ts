import { useEffect, useState } from "react";

export const DEFAULT_LOCALE = 'en';

export const useLocale = (): string[] => {
  const [locale, setLocale] = useState([DEFAULT_LOCALE]);

  useEffect(() => {
    setLocale([navigator.language, DEFAULT_LOCALE]);
  }, []);

  return locale;
};
