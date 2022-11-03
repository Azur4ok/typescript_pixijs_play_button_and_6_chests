import { ResultData } from "../constants"


export class RandomChestController {
    private static chestWin: number = 0
    private static bonusWin: number = 0
    private static totalWin: number = 0


    private static randomChestNumber() {
        const randomValue = Math.random()
        return Math.round(randomValue) && Math.round(randomValue * 1000)
    }

    public static play() {
        this.chestWin = this.randomChestNumber()

        if (this.chestWin > 0) {
            this.bonusWin = this.randomChestNumber()
        } else {
            this.bonusWin = 0
        }

        this.totalWin = this.chestWin + this.bonusWin
        return {
            chestWin: this.chestWin,
            bonusWin: this.bonusWin,
            totalWin: this.totalWin
        } as ResultData
    }

    public static getCurrentData() {
        return {
            chestWin: this.chestWin,
            bonusWin: this.bonusWin,
            totalWin: this.totalWin
        } as ResultData
    }


    static reset() {
        this.chestWin = this.bonusWin = this.totalWin = 0
    }
}