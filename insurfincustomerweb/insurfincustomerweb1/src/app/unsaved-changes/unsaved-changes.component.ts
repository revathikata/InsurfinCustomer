import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unsaved-changes',
  templateUrl: './unsaved-changes.component.html',
  styleUrls: ['./unsaved-changes.component.css']
})
export class UnsavedChangesComponent {
  
  constructor(private router:Router,private matDialog:MatDialogRef<UnsavedChangesComponent>){}

  navigatePage(){
    this.matDialog.close()
    this.router.navigate(['/registration-successfull'])
  }
}
