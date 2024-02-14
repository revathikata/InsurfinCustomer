import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetInTouchNotificationPopupComponent } from './get-in-touch-notification-popup.component';

describe('GetInTouchNotificationPopupComponent', () => {
  let component: GetInTouchNotificationPopupComponent;
  let fixture: ComponentFixture<GetInTouchNotificationPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetInTouchNotificationPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetInTouchNotificationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
