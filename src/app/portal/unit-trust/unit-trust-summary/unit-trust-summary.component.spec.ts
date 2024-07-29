import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitTrustSummaryComponent } from './unit-trust-summary.component';

describe('UnitTrustSummaryComponent', () => {
  let component: UnitTrustSummaryComponent;
  let fixture: ComponentFixture<UnitTrustSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitTrustSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnitTrustSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
