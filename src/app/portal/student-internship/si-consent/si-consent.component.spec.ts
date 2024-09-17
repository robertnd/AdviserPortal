import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiConsentComponent } from './si-consent.component';

describe('SiConsentComponent', () => {
  let component: SiConsentComponent;
  let fixture: ComponentFixture<SiConsentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiConsentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
