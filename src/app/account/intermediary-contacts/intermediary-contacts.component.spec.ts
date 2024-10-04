import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntermediaryContactsComponent } from './intermediary-contacts.component';

describe('IntermediaryContactsComponent', () => {
  let component: IntermediaryContactsComponent;
  let fixture: ComponentFixture<IntermediaryContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntermediaryContactsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntermediaryContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
