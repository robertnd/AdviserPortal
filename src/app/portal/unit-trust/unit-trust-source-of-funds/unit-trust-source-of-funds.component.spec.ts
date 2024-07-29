import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitTrustSourceOfFundsComponent } from './unit-trust-source-of-funds.component';

describe('UnitTrustSourceOfFundsComponent', () => {
  let component: UnitTrustSourceOfFundsComponent;
  let fixture: ComponentFixture<UnitTrustSourceOfFundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitTrustSourceOfFundsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnitTrustSourceOfFundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
