import { FrameModel } from "./frame.model";

export class BoardModel {
    public frames: FrameModel[] = []
    public hasSpare: boolean = false;
    public hasStrike: boolean = false;
    public totalScore: number = 0;
    constructor() {
        for (let i = 1; i < 11; i++) {
            const frame = new FrameModel(i)
            this.frames.push(frame)
        }
    }

    public setSpare(flag): void {
        this.hasSpare = flag;
    }
    public setStrike(flag): void {
        this.hasStrike = flag;
    }


    public setTotalBoardScore() {
        this.totalScore = 0
        for (let index = 0; index < this.frames.length; index++) {
            const element = this.frames[index];
            if(element.isSpare){
                //save me the next first hit
                this.getSpareBonus(index)
            }
    
            if(element.isStrike){   
                //save me the next two hits
    
            }
            this.totalScore += element.getTotalFrameScore()
            
        }
    }


    public getSpareBonus(index: number){

    }



}