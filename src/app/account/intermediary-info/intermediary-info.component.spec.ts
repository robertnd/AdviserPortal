import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntermediaryInfoComponent } from './intermediary-info.component';

describe('IntermediaryInfoComponent', () => {
  let component: IntermediaryInfoComponent;
  let fixture: ComponentFixture<IntermediaryInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntermediaryInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntermediaryInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
