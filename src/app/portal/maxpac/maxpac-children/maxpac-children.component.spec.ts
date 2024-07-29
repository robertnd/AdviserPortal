import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaxpacChildrenComponent } from './maxpac-children.component';

describe('MaxpacChildrenComponent', () => {
  let component: MaxpacChildrenComponent;
  let fixture: ComponentFixture<MaxpacChildrenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaxpacChildrenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaxpacChildrenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
