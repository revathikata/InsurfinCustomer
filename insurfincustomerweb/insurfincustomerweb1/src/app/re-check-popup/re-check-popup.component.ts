import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-re-check-popup',
  templateUrl: './re-check-popup.component.html',
  styleUrls: ['./re-check-popup.component.css']
})
export class ReCheckPopupComponent {

  constructor(private dialogref: MatDialogRef<ReCheckPopupComponent>) { }
  editPhoneNumber() {
    this.dialogref.close()

  }

}
