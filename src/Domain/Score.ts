export class Score {
    public initialValue: number;
    public changeRate: number;
    public calculationDate: Date;

    constructor(value: number, changeRate: number, calculationDate: Date) {
        this.initialValue = value;
        this.changeRate = changeRate;
        this.calculationDate = calculationDate;
    };

    getValue(now: Date): number {
        const secondsDiff = (now.getTime() - this.calculationDate.getTime()) / 1000,
            earned = secondsDiff * this.changeRate;

        let current = this.initialValue + earned;

        if (current < 0) {
            current = 0;
        }

        return current;
    }
}
