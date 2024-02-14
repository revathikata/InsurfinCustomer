import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessLocationComponent } from './access-location.component';

describe('AccessLocationComponent', () => {
  let component: AccessLocationComponent;
  let fixture: ComponentFixture<AccessLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessLocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
