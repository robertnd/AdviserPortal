import { ComponentFixture, TestBed } from '@angular/core/testing'
import { LifeWrapperComponent } from './life-wrapper.component'

describe('LifeWrapperComponent', () => {
  let component: LifeWrapperComponent;
  let fixture: ComponentFixture<LifeWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LifeWrapperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LifeWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
