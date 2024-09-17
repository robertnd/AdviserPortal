import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PviDrivingAndClaimExperienceComponent } from './pvi-driving-and-claim-experience.component';

describe('PviDrivingAndClaimExperienceComponent', () => {
  let component: PviDrivingAndClaimExperienceComponent;
  let fixture: ComponentFixture<PviDrivingAndClaimExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PviDrivingAndClaimExperienceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PviDrivingAndClaimExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
