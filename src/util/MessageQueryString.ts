import b64u from "b64u";
import { parse as parseQueryString } from "query-string";

export const messageQueryString = (queryString: string) => {
  const query = parseQueryString(queryString);
  if (!query.messages) {
    return null;
  }

  // query should be base 64 encoded json array
  return JSON.parse(b64u.decode(query.messages));
};
