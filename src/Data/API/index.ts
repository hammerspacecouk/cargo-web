export interface APIClientInterface {
  getUrl(path: string): string;
  fetch(path: string, payload?: object): Promise<any>;
}
