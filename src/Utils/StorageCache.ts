interface StoredInterface {
  expiry: number;
  data: object;
}

export const cacheRemove = (key: string): void => {
  window.localStorage.removeItem(key);
};

// handles and encodes data for storage, with expiry time
export const cacheSet = (key: string, data: object): void => {
  const cachedData: StoredInterface = {
    expiry: Date.now() + (1000 * 60 * 60 * 24 * 28), // 28 days
    data
  };
 window.localStorage.setItem(key, JSON.stringify(cachedData));
};

// handles and decodes data from storage
export const cacheGet = (key: string): object => {
  const data = window.localStorage.getItem(key);
  if (!data) {
    return null;
  }
  const parsed: StoredInterface = JSON.parse(data);
  if (parsed.expiry < Date.now()) {
    cacheRemove(key);
    return null;
  }
  return parsed.data;
};

