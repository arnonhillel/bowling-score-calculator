export class FrameModel {
    constructor(public first_hit: number,
        public second_hit: number,
        public total_frame_score: number,
        public bonus_score: number,
        public frame_number: number,
        public maxPoints: number) {
    }

    public setTotalScore() {
        this.total_frame_score = this.first_hit + this.second_hit + this.bonus_score
    }

    public isSpare() {
        return (((this.first_hit + this.second_hit) == 10) && (this.second_hit > 0))
    }

    public isStrike() {
        return (this.first_hit == 10)
    }
}