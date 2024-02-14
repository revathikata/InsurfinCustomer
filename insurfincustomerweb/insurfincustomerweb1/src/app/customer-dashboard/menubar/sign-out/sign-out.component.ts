import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginServicesService } from 'src/app/services/login-services.service';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.css']
})
export class SignOutComponent {
  refersToken: any;

constructor( private router:Router , private dialogRef:MatDialogRef<SignOutComponent>,
  private loginService : LoginServicesService){}

  signOut(){
    this.refersToken = JSON.parse(sessionStorage.getItem("refreshToken") ?? 'null');
    const data = {
      token: this.refersToken
    }
    this.loginService.logout(data).subscribe((res:any) =>{
      this.router.navigate(['/login'])
      this.dialogRef.close()
      sessionStorage.clear()
    });
  }
  cancelLogout(){
    this.dialogRef.close()
  }

}
