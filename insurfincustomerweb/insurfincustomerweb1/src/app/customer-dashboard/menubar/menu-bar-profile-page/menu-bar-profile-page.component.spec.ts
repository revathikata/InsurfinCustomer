import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuBarProfilePageComponent } from './menu-bar-profile-page.component';

describe('MenuBarProfilePageComponent', () => {
  let component: MenuBarProfilePageComponent;
  let fixture: ComponentFixture<MenuBarProfilePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuBarProfilePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuBarProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
