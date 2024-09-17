import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiSummaryComponent } from './si-summary.component';

describe('SiSummaryComponent', () => {
  let component: SiSummaryComponent;
  let fixture: ComponentFixture<SiSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
