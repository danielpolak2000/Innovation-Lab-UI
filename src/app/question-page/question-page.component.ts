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
  sliderValue: number = 0;
  labelText: string = '';

  ngOnInit() {
    this.updateLabelText();
  }

  submit() {
    this.submitEvent.emit(this.answer);
  }

  restart() {
    this.restartEvent.emit();
  }

  onSliderChange() {
    this.updateLabelText();
  }

  private updateLabelText() {
    if (this.sliderValue === 0) {
      this.labelText = 'trifft gar nicht zu';
    } else if (this.sliderValue === 1) {
      this.labelText = 'trifft eher nicht zu';
    } else if (this.sliderValue === 2) {
      this.labelText = 'trifft eher zu';
    } else if (this.sliderValue === 3) {
      this.labelText = 'trifft genau zu';
    } else {
      this.labelText = '';
    }
  }

}
