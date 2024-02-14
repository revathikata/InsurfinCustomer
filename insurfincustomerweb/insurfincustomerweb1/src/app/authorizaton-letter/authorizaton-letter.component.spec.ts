import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizatonLetterComponent } from './authorizaton-letter.component';

describe('AuthorizatonLetterComponent', () => {
  let component: AuthorizatonLetterComponent;
  let fixture: ComponentFixture<AuthorizatonLetterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorizatonLetterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorizatonLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
