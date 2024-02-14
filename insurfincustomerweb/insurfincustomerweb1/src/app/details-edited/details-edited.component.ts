import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details-edited',
  templateUrl: './details-edited.component.html',
  styleUrls: ['./details-edited.component.css']
})
export class DetailsEditedComponent {

  
  constructor(private router: Router, private matDialog: MatDialogRef<DetailsEditedComponent>) { }

  navigatePage() {
    this.matDialog.close()
    this.router.navigate(['/registration-successfull'])
  }
}
