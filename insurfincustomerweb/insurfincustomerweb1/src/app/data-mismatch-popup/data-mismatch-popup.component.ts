import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-data-mismatch-popup',
  templateUrl: './data-mismatch-popup.component.html',
  styleUrls: ['./data-mismatch-popup.component.css']
})
export class DataMismatchPopupComponent {

  constructor(private dialogRef:MatDialogRef<any>,@Inject(MAT_DIALOG_DATA) public data: any){

  }

  ngOnInit(){

  }
  OnCloseICon(){
    this.dialogRef.close()
  }
}
