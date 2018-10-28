import API from "../util/HttpClient";
import EventInterface from "../interfaces/EventInterface";

export interface HomeResponseInterface {
  readonly events: EventInterface[];
}

export const getHomeData = (): Promise<HomeResponseInterface> => {
  return API.fetch("/");
};
