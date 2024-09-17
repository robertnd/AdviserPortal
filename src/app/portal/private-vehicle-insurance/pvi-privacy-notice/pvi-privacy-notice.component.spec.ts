import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PviPrivacyNoticeComponent } from './pvi-privacy-notice.component';

describe('PviPrivacyNoticeComponent', () => {
  let component: PviPrivacyNoticeComponent;
  let fixture: ComponentFixture<PviPrivacyNoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PviPrivacyNoticeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PviPrivacyNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
