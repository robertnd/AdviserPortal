import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiDetailsComponent } from './si-details.component';

describe('SiDetailsComponent', () => {
  let component: SiDetailsComponent;
  let fixture: ComponentFixture<SiDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
