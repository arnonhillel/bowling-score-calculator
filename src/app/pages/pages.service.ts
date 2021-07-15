import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BoardModel, } from './model/board.model';
import { FrameModel } from './model/frame.model';

@Injectable({
  providedIn: 'root'
})
export class PagesService {
  private initialBoard: BoardModel = new BoardModel()

  private userName = new BehaviorSubject<string>('');
  private board = new BehaviorSubject<BoardModel>(this.initialBoard);
  private currentFrame = new BehaviorSubject<number>(0);
  private prevFrame = new BehaviorSubject<number>(-1);

  serviceUserName$ = this.userName.asObservable();
  serviceBoard$ = this.board.asObservable();
  serviceCurrentFrame$ = this.currentFrame.asObservable();
  servicePrevFrame$ = this.prevFrame.asObservable();

  constructor() { }

  public setUser(name: string) {
    this.userName.next(name)
  }

  public setBoard(board: BoardModel) {
    this.board.next(board)
  }
  public setCurrentFrame(frameNumber: number) {
    this.currentFrame.next(frameNumber)
  }
  public setPrevFrame(frameNumber: number) {
    this.prevFrame.next(frameNumber)
  }



  public onHitChange(frameNumber: number, action: string, value) {
    this.initialBoard.frames[frameNumber].setTotalScore(action , parseInt(value))
    
    this.initialBoard.frames[frameNumber].maxPoints -= parseInt(value)
    // check spare and strike if yes update board

    switch (action) {
      case 'first_hit':
        this.afterFirstHit(frameNumber,value, this.initialBoard.frames[frameNumber].maxPoints);
        break;
      case 'second_hit':
        this.afterSecondHit(frameNumber,value, this.initialBoard.frames[frameNumber].maxPoints);
        break;
      default:
        break;
    }
    this.updateTotalScore()

  }


  public afterFirstHit(frameNumber: number, value, maxPoints){
    if(maxPoints <= 0){ // strike
      
      this.initialBoard.hasStrike = true;
      this.setCurrentFrame(frameNumber+1)
    }
    
  }

  public afterSecondHit(frameNumber: number, value, maxPoints){
    if(maxPoints == 0){ //spare
      this.initialBoard.hasSpare = false;
    }
    this.setCurrentFrame(frameNumber+1)
  }


  public updateTotalScore() {
    this.initialBoard.setTotalScore()
    this.setBoard(this.initialBoard)
  }

  

  public grantBonus() {

  }
}
