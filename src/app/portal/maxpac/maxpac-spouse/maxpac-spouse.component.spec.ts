import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaxpacSpouseComponent } from './maxpac-spouse.component';

describe('MaxpacSpouseComponent', () => {
  let component: MaxpacSpouseComponent;
  let fixture: ComponentFixture<MaxpacSpouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaxpacSpouseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaxpacSpouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
