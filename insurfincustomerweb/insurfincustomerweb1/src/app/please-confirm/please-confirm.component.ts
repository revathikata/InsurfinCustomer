import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-please-confirm',
  templateUrl: './please-confirm.component.html',
  styleUrls: ['./please-confirm.component.css']
})
export class PleaseConfirmComponent {

  constructor(private router:Router,private matDialog:MatDialogRef<PleaseConfirmComponent>){}

  navigatePage(){
    this.matDialog.close()
    this.router.navigate(['/registration-successfull'],{queryParamsHandling: 'preserve'})
  }
}
