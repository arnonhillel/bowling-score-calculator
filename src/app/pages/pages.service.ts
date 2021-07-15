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
    this.initialBoard.frames[frameNumber][action] = parseInt(value)
    this.initialBoard.frames[frameNumber].maxPoints = 10 - parseInt(value)
    // check spare and strike if yes update board

    switch (action) {
      case 'first_hit':
        this.afterFirstHit(frameNumber,value);
        break;
      case 'second_hit':
        this.afterSecondHit(frameNumber,value);
        break;
      default:
        break;
    }

    this.setTotalFrameScore(this.initialBoard.frames[frameNumber])
    this.updateTotalScore(this.initialBoard)
    //update total score
    // 
    // if (frameNumber > 0) {
    // } else {
    //   this.setTotalScore(this.initialBoard.frames[frameNumber], 0)
    // }
  }


  public afterFirstHit(frameNumber: number, value){
    
  }

  public afterSecondHit(frameNumber: number, value){
    this.setCurrentFrame(frameNumber+1)
  }


  public updateTotalScore(board: BoardModel) {
    board.setTotalScore()

    this.setBoard(board)
  }

  public setTotalFrameScore(frame: FrameModel) {
    frame.setTotalScore()
  }


  public grantBonus() {

  }
}
