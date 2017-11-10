export const PATH_LIST = '/ports';
export const PATH_SHOW = (id: string): string => `/ports/${id}`;

export class Port {
    public id: string;
    public name: string;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    };
}
