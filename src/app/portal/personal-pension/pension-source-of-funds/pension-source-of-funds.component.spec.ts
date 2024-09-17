import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PensionSourceOfFundsComponent } from './pension-source-of-funds.component';

describe('PensionSourceOfFundsComponent', () => {
  let component: PensionSourceOfFundsComponent;
  let fixture: ComponentFixture<PensionSourceOfFundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PensionSourceOfFundsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PensionSourceOfFundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
