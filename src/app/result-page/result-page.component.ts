import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.css']
})
export class ResultPageComponent {
  @Input() results: any[] = []; 
  @Input() totalScore: number = 0; 
  @Output() restartEvent = new EventEmitter();

  restart() {
    this.restartEvent.emit();
  }
}
