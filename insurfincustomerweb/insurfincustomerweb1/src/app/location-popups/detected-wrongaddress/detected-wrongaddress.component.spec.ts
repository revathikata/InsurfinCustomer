import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetectedWrongaddressComponent } from './detected-wrongaddress.component';

describe('DetectedWrongaddressComponent', () => {
  let component: DetectedWrongaddressComponent;
  let fixture: ComponentFixture<DetectedWrongaddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetectedWrongaddressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetectedWrongaddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
