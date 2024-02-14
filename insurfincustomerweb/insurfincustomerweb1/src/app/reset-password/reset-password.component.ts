import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxOtpInputConfig } from 'ngx-otp-input';
import { LoginServicesService } from '../services/login-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  otpInputConfig :NgxOtpInputConfig = {
    otpLength: 6,
    autofocus :true,
    classList :{
      inputBox:'otps',
      input:'my-super-class',
      inputFilled:'my-super-filled-class',
      inputDisabled: 'my-super-disabled-class',
      inputSuccess:'my-super-success-class',
      inputError:'my-super-error-class'
    }
  }

  resetPasswordForm!:FormGroup
  verifycode=true
  reset:any;
  otpfill:any;

  message: any;
  errormessage: any;
  userId: any;
  errorOtp: any;
  uuid: any;
  activeRoute: any;
  loginNav:boolean |undefined;
  constructor(private fb:FormBuilder,private loginService: LoginServicesService , private router:Router){}
  
  ngOnInit(): void {
    this.resetPasswordForm=this.fb.group({
      // email: ["", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}?$")]],
      phoneNum:["", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}?$|^((\\+91-? ?)|0)?[6-9]{1}[0-9]{9}$")]]
     
    })

    this.activeRoute?.queryParams?.subscribe(params => {
      this.loginNav = params['loginNav']
    })
  }
  SendVerify(){
this.verifycode=false
  }
  resetKey(){
    this.reset=true
  }
  Otphandle(ot:any){
    if(parseInt(ot)== 123456){
    }
    this.otpfill = ot.join('').length == 6;
   }
   fillhandle(value:any){
    this.otpfill = value;
    localStorage.setItem('otp',this.otpfill)
    }

    continueBtn(){
          const phone = this.resetPasswordForm.controls['phoneNum'].value;
         const data ={
            phoneNumber:phone,
            role :'CUSTOMER',
          }
           this.loginService.Customerlogin(data).subscribe({
            next:(res:any) => {
            if(res?.error == false){
              this.verifycode= false;
              sessionStorage.setItem("AccessToken", JSON.stringify(res?.data.accessToken));
              this.userId = res?.data.uuid
              // this.setExpireTimer()
            }
            else{
              this.errormessage = res?.message
            }
          },
          error:(err) => {
            this.errormessage = "No Active Internet Found, Please connect to active internet Connection."
          }
           });
       
    }
    isNumber(value: string): boolean {
      return !isNaN(Number(value));
    }
    otpvalid(){
      sessionStorage.removeItem('AccessToken2')
      const data={
        phoneNumber: this.resetPasswordForm.controls['phoneNum'].value,
        otp: this.otpfill,
        uuid: this.userId,
        role: "CUSTOMER"
      }
      // this.spinner.show()
      this.loginService.verifyPhoneOtp(data).subscribe({
        next:(res:any) => {
        if(res?.error === false){
          this.router.navigate(['./enter-new-password'])
        sessionStorage.setItem("AccessToken2", JSON.stringify(res?.data.accessToken));
        sessionStorage.setItem("refreshToken", JSON.stringify(res?.data.refreshToken));
        sessionStorage.setItem("UserId", JSON.stringify(res?.data.uuid));
        }
        else{
          this.errorOtp = res?.message
        }
      },
      error:(err) => {
        this.errorOtp = "No Active Internet Found, Please connect to active internet Connection."
      }
      });
    }
sendAgain(){
  this.continueBtn()
}
OnBackArrow(){
  this.router.navigate(['/login-with-password'])
}
OnBackArroww(){
  this.router.navigate(['/profile-page'])
}
}
