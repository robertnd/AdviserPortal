import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PviPolicySummaryComponent } from './pvi-policy-summary.component';

describe('PviPolicySummaryComponent', () => {
  let component: PviPolicySummaryComponent;
  let fixture: ComponentFixture<PviPolicySummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PviPolicySummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PviPolicySummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
