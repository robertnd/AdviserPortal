import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaxpacSummaryComponent } from './maxpac-summary.component';

describe('MaxpacSummaryComponent', () => {
  let component: MaxpacSummaryComponent;
  let fixture: ComponentFixture<MaxpacSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaxpacSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaxpacSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
