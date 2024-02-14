import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PraposalAcceptedSuccessfullyComponent } from './praposal-accepted-successfully.component';

describe('PraposalAcceptedSuccessfullyComponent', () => {
  let component: PraposalAcceptedSuccessfullyComponent;
  let fixture: ComponentFixture<PraposalAcceptedSuccessfullyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PraposalAcceptedSuccessfullyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PraposalAcceptedSuccessfullyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
