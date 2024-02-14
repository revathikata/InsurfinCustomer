import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReCheckPopupComponent } from './re-check-popup.component';

describe('ReCheckPopupComponent', () => {
  let component: ReCheckPopupComponent;
  let fixture: ComponentFixture<ReCheckPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReCheckPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReCheckPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
