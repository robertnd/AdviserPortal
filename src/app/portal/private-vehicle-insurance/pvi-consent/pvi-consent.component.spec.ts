import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PviConsentComponent } from './pvi-consent.component';

describe('PviConsentComponent', () => {
  let component: PviConsentComponent;
  let fixture: ComponentFixture<PviConsentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PviConsentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PviConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
