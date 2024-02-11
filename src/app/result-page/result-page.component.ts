import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { RandomVideoComponent } from '../random-video/random-video.component';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.css']
})
export class ResultPageComponent {
  @Input() results: any[] = [];
  @Input() totalScore: number = 0;
  @Output() restartEvent = new EventEmitter();
  showVideo = false;


  @ViewChild(RandomVideoComponent) randomVideoComponent: RandomVideoComponent | undefined;

  restart() {
    this.restartEvent.emit();
    window.location.reload();
  }

  startRandomVideo() {
    this.showVideo = true;
  }
}
