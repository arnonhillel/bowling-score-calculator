import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BoardModel } from '../model/board.model';
import { PagesService } from '../pages.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  public userName;
  public board: BoardModel;
  public currentFrame: number;
  public prevFame: number;
  public pins = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  constructor(private pagesService: PagesService) {
    pagesService.serviceUserName$.subscribe(res => {
      this.userName = res;
    })
    pagesService.serviceBoard$.subscribe(res => {
      this.board = res;
    })
    pagesService.serviceCurrentFrame$.subscribe(res =>{
      this.currentFrame = res;
    })

    pagesService.servicePrevFrame$.subscribe(res =>{
      this.prevFame = res
    })
  }

  ngOnInit(): void {

    
  }

  public totalPins(): number[] {
    return this.pins
  }

  public onHitChange(frameNumber: number, action: string, value) {
    this.pagesService.onHitChange(frameNumber, action, value)
  }

}
