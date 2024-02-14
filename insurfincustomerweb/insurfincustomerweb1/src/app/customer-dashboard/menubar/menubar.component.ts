import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SignOutComponent } from './sign-out/sign-out.component';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})


export class MenubarComponent {
  menubar=true
  constructor(private router:Router,private dialogRef:MatDialogRef<MenubarComponent> , private dialog: MatDialog){}


  profile(){
    this.menubar=false
  }

  homePage(){
    this.dialogRef.close()
    this.router.navigate(['./customer-dashboard'])
  }
  profilePage(){
    this.dialogRef.close()
    this.router.navigate(['./profile-page'])
}
myDistributor(){
  this.dialogRef.close()
    this.router.navigate(['./my-distributor'])
}
openDialog() {
  this.dialogRef.close()
  this.dialog.open(SignOutComponent);
}
menuBarClose(){
  this.dialogRef.close()
}
}
