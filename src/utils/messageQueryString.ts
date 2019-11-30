import b64u from "b64u";
import { ParsedUrlQuery } from "querystring";

export const messageQueryString = (query: ParsedUrlQuery) => {
  if (!query.messages) {
    return null;
  }

  // query should be base 64 encoded json array
  return JSON.parse(b64u.decode(query.messages as string));
};
