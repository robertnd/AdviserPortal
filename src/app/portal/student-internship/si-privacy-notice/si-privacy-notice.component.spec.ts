import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiPrivacyNoticeComponent } from './si-privacy-notice.component';

describe('SiPrivacyNoticeComponent', () => {
  let component: SiPrivacyNoticeComponent;
  let fixture: ComponentFixture<SiPrivacyNoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiPrivacyNoticeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiPrivacyNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
