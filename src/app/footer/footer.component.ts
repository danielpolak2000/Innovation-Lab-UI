import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  @Output() restartEvent = new EventEmitter();

  restart() {
    this.restartEvent.emit();
    window.location.reload()
  }

}
