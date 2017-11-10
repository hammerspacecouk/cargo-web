let apiHostnameStore: string;

export let init = (
    apiHostname: string
) => {
    apiHostnameStore = apiHostname;
    // destroy this so it can't be called again
    init = () => {};
};

export const getApiHostname = (): string => apiHostnameStore;
