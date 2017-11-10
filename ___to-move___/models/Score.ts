export default class {
    private value: number;
    private rate: number;
    private datetime: Date;

    constructor(
        value: number,
        rate: number,
        datetime: string
    ) {
        this.value = value;
        this.rate = rate;
        this.datetime = new Date(datetime);
    }

    getValue(now: Date): string
    {
        const secondsDiff = (now.getTime() - this.datetime.getTime()) / 1000,
            earned = secondsDiff * this.rate;

        let current = this.value + earned;

        if (current < 0) {
            current = 0;
        }

        // todo - format numbers
        return current.toFixed(0);
    }
}
