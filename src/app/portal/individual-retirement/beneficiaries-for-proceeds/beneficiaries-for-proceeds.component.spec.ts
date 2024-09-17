import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiariesForProceedsComponent } from './beneficiaries-for-proceeds.component';

describe('BeneficiariesForProceedsComponent', () => {
  let component: BeneficiariesForProceedsComponent;
  let fixture: ComponentFixture<BeneficiariesForProceedsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeneficiariesForProceedsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeneficiariesForProceedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
