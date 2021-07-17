import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BoardModel, } from './model/board.model';

@Injectable({
  providedIn: 'root'
})
export class PagesService {
  private initialBoard: BoardModel = new BoardModel()

  private userName = new BehaviorSubject<string>('');
  private board = new BehaviorSubject<BoardModel>(this.initialBoard);
  private currentFrame = new BehaviorSubject<number>(0);
  private prevFrame = new BehaviorSubject<number>(-1);
  public firstHitBonus = 0
  public firstHitAfterStrike = 0
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
    this.initialBoard.frames[frameNumber].setTotalFrameScore(action, parseInt(value))

    this.initialBoard.frames[frameNumber].maxPoints -= parseInt(value)
    switch (action) {
      case 'first_hit':
        this.afterFirstHit(frameNumber, value, this.initialBoard.frames[frameNumber].maxPoints);
        break;
      case 'second_hit':
        this.afterSecondHit(frameNumber, value, this.initialBoard.frames[frameNumber].maxPoints);
        break;
      default:
        break;
    }
    this.updateTotalScore()

  }


  public afterFirstHit(frameNumber: number, value, maxPoints) {
    let prevFrame = this.initialBoard.frames[frameNumber - 1]
    if (frameNumber > 0 && this.initialBoard.frames[frameNumber - 1].isSpare()) {
      prevFrame.setBonusScore(value + this.firstHitBonus)
    }
    if (frameNumber > 0 && prevFrame.isStrike()) {
      if(this.firstHitAfterStrike == 0){
        this.firstHitBonus = value
        this.firstHitAfterStrike = 1;
      }else{
        prevFrame.setBonusScore(value + this.firstHitBonus);
        this.resetStrikeBonus()
      }
    }
    if (maxPoints == 0) { // strike   
      this.setCurrentFrame(frameNumber + 1)
    }

  }


  public afterSecondHit(frameNumber: number, value, maxPoints) {
    if (frameNumber > 0 && this.initialBoard.frames[frameNumber - 1].isStrike()) {
      this.initialBoard.frames[frameNumber - 1].setBonusScore(value + this.firstHitBonus)
      this.resetStrikeBonus()
    }
   
    this.setCurrentFrame(frameNumber + 1)
    this.setPrevFrame(frameNumber)
    this.updateTotalScore()
  }


  public updateTotalScore() {
    this.initialBoard.setTotalBoardScore()
    this.setBoard(this.initialBoard)
  }



  public resetStrikeBonus() {
    this.firstHitAfterStrike = 0;
    this.firstHitBonus = 0;
  }
}
