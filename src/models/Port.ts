import DataClient from "./DataClient";

interface GetPortsResponse {
    items: PortInterface[];
}

export interface PortInterface {
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

    async getAll(): Promise<PortInterface[]> {
        const data: GetPortsResponse = await this.dataClient.fetchData('/ports');
        return data.items;
    }

    async getById(id: string): Promise<PortInterface> {
        return await this.dataClient.fetchData('/ports/' + id);
    }
}
