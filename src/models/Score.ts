export default class {
    private value: number;
    private rate: number;
    private date: Date;

    constructor(
        value: number,
        rate: number,
        date: string
    ) {
        this.value = value;
        this.rate = rate;
        this.date = new Date(date);
    }

    getValue(now: Date): string
    {
        const secondsDiff = (now.getTime() - this.date.getTime()) / 1000,
            earned = secondsDiff * this.rate;

        let current = this.value + earned;

        if (current < 0) {
            current = 0;
        }

        // todo - format numbers
        return current.toFixed(0);
    }
}
