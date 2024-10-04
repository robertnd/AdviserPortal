import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntermediaryCredsComponent } from './intermediary-creds.component';

describe('IntermediaryCredsComponent', () => {
  let component: IntermediaryCredsComponent;
  let fixture: ComponentFixture<IntermediaryCredsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntermediaryCredsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntermediaryCredsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
