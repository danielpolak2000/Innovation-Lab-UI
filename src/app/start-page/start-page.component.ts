import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent {
  @Output() startEvent = new EventEmitter();

  start() {
    this.startEvent.emit();
  }
}
