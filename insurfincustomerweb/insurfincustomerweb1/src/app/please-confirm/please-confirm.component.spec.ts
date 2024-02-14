import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PleaseConfirmComponent } from './please-confirm.component';

describe('PleaseConfirmComponent', () => {
  let component: PleaseConfirmComponent;
  let fixture: ComponentFixture<PleaseConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PleaseConfirmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PleaseConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
