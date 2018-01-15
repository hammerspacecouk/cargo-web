export const PATH_LIST = '/ships';
export const PATH_SHOW = (id: string): string => `/ships/${id}`;
export const PLAY_PATH_SHOW = (id: string): string => `/play/${id}`;

// todo - these objects should only be interfaces, so they maintain the ability to be serialised

export class Ship {
    public id: string;
    public name: string;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    };
}
