import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PviVehiclesComponent } from './pvi-vehicles.component';

describe('PviVehiclesComponent', () => {
  let component: PviVehiclesComponent;
  let fixture: ComponentFixture<PviVehiclesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PviVehiclesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PviVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
