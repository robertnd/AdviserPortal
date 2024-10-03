import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdviserContactsComponent } from './adviser-contacts.component';

describe('AdviserContactsComponent', () => {
  let component: AdviserContactsComponent;
  let fixture: ComponentFixture<AdviserContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdviserContactsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdviserContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
