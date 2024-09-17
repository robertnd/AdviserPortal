import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaxpacDeclarationsComponent } from './maxpac-declarations.component';

describe('MaxpacDeclarationsComponent', () => {
  let component: MaxpacDeclarationsComponent;
  let fixture: ComponentFixture<MaxpacDeclarationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaxpacDeclarationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaxpacDeclarationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
