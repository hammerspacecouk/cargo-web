const hasLocalStorage = (): boolean => {
  return !!(window && window.localStorage);
};

export const getStoredItem = (key: string): any => {
  if (!hasLocalStorage()) {
    return null; // so storage on server
  }

  const data = window.localStorage.getItem(key);
  if (!data) {
    return null;
  }

  return JSON.parse(data);
};

export const storeItem = (key: string, value: any): void => {
  if (!hasLocalStorage()) {
    return; // so storage on server
  }

  window.localStorage.setItem(key, JSON.stringify(value));
};

export const clearItem = (key: string) => {
  if (!hasLocalStorage()) {
    return;
  }

  window.localStorage.removeItem(key);
};
