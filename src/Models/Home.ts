import API from "../Infrastructure/API";
import EventInterface from "../DomainInterfaces/EventInterface";

export interface HomeResponseInterface {
  readonly events: EventInterface[];
}

export const getHomeData = (): Promise<HomeResponseInterface> => {
  return API.fetch('/');
};
