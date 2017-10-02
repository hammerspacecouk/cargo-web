import DataClient from "./DataClient";

interface GetPortsResponse {
    items: Port[];
}

export interface Port {
    id: string,
    name: string
}

export default class {
    private dataClient: DataClient;

    constructor(
        dataClient: DataClient
    ) {
        this.dataClient = dataClient;
    }

    async getAll(): Promise<Port[]> {
        const data: GetPortsResponse = await this.dataClient.fetchData('/ports');
        return data.items;
    }

    async getById(id: string): Promise<Port> {
        return await this.dataClient.fetchData('/ports/' + id);
    }
}
