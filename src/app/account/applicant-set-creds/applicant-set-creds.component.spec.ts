import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantSetCredsComponent } from './applicant-set-creds.component';

describe('ApplicantSetCredsComponent', () => {
  let component: ApplicantSetCredsComponent;
  let fixture: ComponentFixture<ApplicantSetCredsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicantSetCredsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicantSetCredsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
