import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PviSummaryComponent } from './pvi-summary.component';

describe('PviSummaryComponent', () => {
  let component: PviSummaryComponent;
  let fixture: ComponentFixture<PviSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PviSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PviSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
