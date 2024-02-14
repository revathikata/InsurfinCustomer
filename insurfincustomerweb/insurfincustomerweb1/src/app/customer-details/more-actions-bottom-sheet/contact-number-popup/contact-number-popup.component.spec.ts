import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactNumberPopupComponent } from './contact-number-popup.component';

describe('ContactNumberPopupComponent', () => {
  let component: ContactNumberPopupComponent;
  let fixture: ComponentFixture<ContactNumberPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactNumberPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactNumberPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
