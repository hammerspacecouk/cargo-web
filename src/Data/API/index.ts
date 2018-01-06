export interface APIClientInterface {
    fetch(path: string): Promise<any>
}
