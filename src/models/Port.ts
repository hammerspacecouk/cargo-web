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
    private logger: Console;

    constructor(
        dataClient: DataClient,
        logger: Console
    ) {
        this.dataClient = dataClient;
        this.logger = logger;
    }

    async getAll(): Promise<Port[]> {
        const data: GetPortsResponse = await this.dataClient.fetchData('/ports');
        return data.items;
    }

    async getById(id: string): Promise<Port> {
        return await this.dataClient.fetchData('/ports/' + id);
    }
}
