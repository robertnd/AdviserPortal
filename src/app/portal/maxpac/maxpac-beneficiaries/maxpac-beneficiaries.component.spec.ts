import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaxpacBeneficiariesComponent } from './maxpac-beneficiaries.component';

describe('MaxpacBeneficiariesComponent', () => {
  let component: MaxpacBeneficiariesComponent;
  let fixture: ComponentFixture<MaxpacBeneficiariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaxpacBeneficiariesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaxpacBeneficiariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
