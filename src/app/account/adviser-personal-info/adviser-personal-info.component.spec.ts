import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdviserPersonalInfoComponent } from './adviser-personal-info.component';

describe('AdviserPersonalInfoComponent', () => {
  let component: AdviserPersonalInfoComponent;
  let fixture: ComponentFixture<AdviserPersonalInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdviserPersonalInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdviserPersonalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
