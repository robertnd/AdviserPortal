import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualRetirementSummaryComponent } from './individual-retirement-summary.component';

describe('IndividualRetirementSummaryComponent', () => {
  let component: IndividualRetirementSummaryComponent;
  let fixture: ComponentFixture<IndividualRetirementSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualRetirementSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndividualRetirementSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
