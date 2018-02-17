import {parse as parseQueryString} from 'query-string';

export default (queryString: string) => {
    const query = parseQueryString(queryString);
    if (!query.messages) {
        return null;
    }

    // query should be base 64 encoded json array
    return JSON.parse(atob(query.messages));
};