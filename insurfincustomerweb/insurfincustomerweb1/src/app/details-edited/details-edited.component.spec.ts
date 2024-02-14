import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsEditedComponent } from './details-edited.component';

describe('DetailsEditedComponent', () => {
  let component: DetailsEditedComponent;
  let fixture: ComponentFixture<DetailsEditedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsEditedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsEditedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
