export class FrameModel {
    private spare: boolean = false
    private strike: boolean = false
    constructor(public first_hit: number,
        public second_hit: number,
        public total_frame_score: number,
        public bonus_score: number,
        public frame_number: number,
        public maxPoints: number) {
    }

    public setTotalScore(hit: string, number: number) {
        if('first_hit' == hit){
            this.first_hit = number
            if(this.first_hit == 10){// strike
                this.setStrike(true)
            }
        }else{ // second hit
            this.second_hit = number
            if(this.first_hit + this.second_hit == 10){ // spare
                this.setSpare(true)
            }
        }
        
        this.total_frame_score = this.first_hit + this.second_hit
    }

    private setSpare(flag){
        this.spare = flag;
    }
    private setStrike(flag){
        this.strike = flag
    }
    public isSpare() {
        return this.strike
    }

    public isStrike() {
        return this.spare;
    }
}