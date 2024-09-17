import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JointApplicantComponent } from './joint-applicant.component';

describe('JointApplicantComponent', () => {
  let component: JointApplicantComponent;
  let fixture: ComponentFixture<JointApplicantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JointApplicantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JointApplicantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
