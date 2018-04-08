export const PATH_LIST = "/ports";
export const PATH_SHOW = (id: string): string => `/ports/${id}`;

export default interface PortInterface {
  id: string;
  name: string;
};
