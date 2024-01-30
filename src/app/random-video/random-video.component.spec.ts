import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomVideoComponent } from './random-video.component';

describe('RandomVideoComponent', () => {
  let component: RandomVideoComponent;
  let fixture: ComponentFixture<RandomVideoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RandomVideoComponent]
    });
    fixture = TestBed.createComponent(RandomVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
