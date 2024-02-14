import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ConfirmPopupComponent } from '../confirm-popup/confirm-popup.component';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent {
  selectedIndex: number = 0;
  details!:FormGroup

    constructor(public dialog: MatDialog, private fb:FormBuilder) {}
  
    openDialog() {
      this.dialog.open(ConfirmPopupComponent,{
        width:'329px'
      });
      this.selectedIndex +=1
    }
    public tabChanged(tabChangeEvent: MatTabChangeEvent): void {
      this.selectedIndex = tabChangeEvent.index;
    }
    ngOnInit():void{
      this.details=this.fb.group({
        chooseproduct:[,Validators.required],
        chooseinsurer:[,Validators.required],
        chooseptype:[,Validators.required],
        product:[,Validators.required],
        proposalnumber:["",Validators.required],
        premium:["",Validators.required]
      })
    }

  }



