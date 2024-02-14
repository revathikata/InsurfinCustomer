import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupEmailVerifiedComponent } from './signup-email-verified.component';

describe('SignupEmailVerifiedComponent', () => {
  let component: SignupEmailVerifiedComponent;
  let fixture: ComponentFixture<SignupEmailVerifiedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupEmailVerifiedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupEmailVerifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
