import { ComponentFixture, TestBed } from '@angular/core/testing'
import { LifeWrapperConsentComponent } from './life-wrapper-consent.component'

describe('LifeWrapperConsentComponent', () => {
  let component: LifeWrapperConsentComponent;
  let fixture: ComponentFixture<LifeWrapperConsentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LifeWrapperConsentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LifeWrapperConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
