import DataClient from "./DataClient";
import {UserInterface} from "./User";
import {PortInterface} from "./Port";

export interface PlayInterface {
    id: string;
    ships: {
        id: string;
    }[];
    status: string;
}

export interface DirectionInterface {
    destination: PortInterface;
    distanceUnit: number;
    journeyTimeMinutes: number;
    action: { // todo - abstract token
        token: string;
    }
}

export interface PlayShipInterface {
    ship: {
        name: string;
    };
    location: {
        name: string;
    };
    directions: {
        actionPath: string;
        directions: {
            NE? : DirectionInterface,
            E? : DirectionInterface,
            SE? : DirectionInterface,
            SW? : DirectionInterface,
            W? : DirectionInterface,
            NW? : DirectionInterface,
        }
    };
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

    async get(user?: UserInterface): Promise<PlayInterface> {
        return await this.dataClient.fetchData('/play', user);
    }

    async getForShip(shipId: string, user?: UserInterface): Promise<PlayShipInterface> {
        return await this.dataClient.fetchData(`/play/${shipId}`, user);
    }
}
