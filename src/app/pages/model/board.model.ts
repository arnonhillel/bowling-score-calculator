import { FrameModel } from "./frame.model";

export class BoardModel {
    public frames: FrameModel[] = []
    public hasSpare: boolean = false;
    public hasStrike: boolean = false;
    public totalScore: number = 0;
    constructor() {
        for (let i = 1; i < 11; i++) {
            const frame = new FrameModel(-1, -1, 0, 0, i, 10)
            this.frames.push(frame)
        }
    }

    public setSpare(flag): void {
        this.hasSpare = flag;
    }
    public setStrike(flag): void {
        this.hasStrike = flag;
    }

    public setTotalScore() {
        this.totalScore = 0
        this.frames.forEach(element => {
            this.totalScore += element.total_frame_score
        })
    }
}