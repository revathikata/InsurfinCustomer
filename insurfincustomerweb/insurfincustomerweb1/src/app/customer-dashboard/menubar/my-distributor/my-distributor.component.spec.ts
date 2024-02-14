import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDistributorComponent } from './my-distributor.component';

describe('MyDistributorComponent', () => {
  let component: MyDistributorComponent;
  let fixture: ComponentFixture<MyDistributorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyDistributorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyDistributorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
