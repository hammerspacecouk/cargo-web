import DataClient from "./DataClient";
import {UserInterface} from "./User";

export interface Play {
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

    async get(user?: UserInterface): Promise<Play> {
        return await this.dataClient.fetchData('/play', user);
    }
}
