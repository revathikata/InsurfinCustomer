import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreActionsBottomSheetComponent } from './more-actions-bottom-sheet.component';

describe('MoreActionsBottomSheetComponent', () => {
  let component: MoreActionsBottomSheetComponent;
  let fixture: ComponentFixture<MoreActionsBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoreActionsBottomSheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoreActionsBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
