import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyActionPageComponent } from './policy-action-page.component';

describe('PolicyActionPageComponent', () => {
  let component: PolicyActionPageComponent;
  let fixture: ComponentFixture<PolicyActionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolicyActionPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolicyActionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
