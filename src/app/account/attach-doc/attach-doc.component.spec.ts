import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachDocComponent } from './attach-doc.component';

describe('AttachDocComponent', () => {
  let component: AttachDocComponent;
  let fixture: ComponentFixture<AttachDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttachDocComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttachDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
