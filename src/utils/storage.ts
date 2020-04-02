const hasLocalStorage = (): boolean => !!(window && window.localStorage);

export const getStoredItem = (key: string): any => {
  if (!hasLocalStorage()) {
    return null; // no storage on server
  }

  const data = window.localStorage.getItem(key);
  if (!data) {
    return null;
  }

  return JSON.parse(data);
};

export const storeItem = (key: string, value: any): void => {
  if (!hasLocalStorage()) {
    return; // no storage on server
  }

  window.localStorage.setItem(key, JSON.stringify(value));
};

export const clearItem = (key: string): void => {
  if (!hasLocalStorage()) {
    return;
  }

  window.localStorage.removeItem(key);
};
