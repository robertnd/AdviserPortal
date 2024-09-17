import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactOrKinComponent } from './contact-or-kin.component';

describe('ContactOrKinComponent', () => {
  let component: ContactOrKinComponent;
  let fixture: ComponentFixture<ContactOrKinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactOrKinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactOrKinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
