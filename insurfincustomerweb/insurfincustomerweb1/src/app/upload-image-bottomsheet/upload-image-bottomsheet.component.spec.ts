import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadImageBottomsheetComponent } from './upload-image-bottomsheet.component';

describe('UploadImageBottomsheetComponent', () => {
  let component: UploadImageBottomsheetComponent;
  let fixture: ComponentFixture<UploadImageBottomsheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadImageBottomsheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadImageBottomsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
