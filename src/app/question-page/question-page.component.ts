import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.css']
})
export class QuestionPageComponent {
  @Input() question: any;
  @Output() submitEvent = new EventEmitter<number>();
  @Output() restartEvent = new EventEmitter();

  answer: number = 0;

  submit() {
    this.submitEvent.emit(this.answer);
  }

  restart() {
    this.restartEvent.emit();
  }
}
