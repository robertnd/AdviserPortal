import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntermediaryAckComponent } from './intermediary-ack.component';

describe('IntermediaryAckComponent', () => {
  let component: IntermediaryAckComponent;
  let fixture: ComponentFixture<IntermediaryAckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntermediaryAckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntermediaryAckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
