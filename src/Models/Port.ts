import API from "../Data/API";
import PortInterface from "../DomainInterfaces/PortInterface";

export interface PortsResponse {
  // readonly pagination: PaginationInterface; // todo
  readonly items: PortInterface[];
}

export const fetchList = (): Promise<PortsResponse> => {
  return API.fetch("/ports");
};

export const getPort = (id: string): Promise<PortInterface> => {
  return API.fetch(`/ports/${id}`);
};
