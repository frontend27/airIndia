import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainformComponent } from './trainform.component';

describe('TrainformComponent', () => {
  let component: TrainformComponent;
  let fixture: ComponentFixture<TrainformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrainformComponent]
    });
    fixture = TestBed.createComponent(TrainformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
