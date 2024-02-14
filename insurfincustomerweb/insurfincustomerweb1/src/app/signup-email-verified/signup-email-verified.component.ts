import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxOtpInputConfig } from 'ngx-otp-input';

@Component({
  selector: 'app-signup-email-verified',
  templateUrl: './signup-email-verified.component.html',
  styleUrls: ['./signup-email-verified.component.css']
})
export class SignupEmailVerifiedComponent {
  loginForm!: FormGroup;
  emailVerify:boolean = true;
  timer: any;
  minutes: any;
  seconds: any;
  isDisabled: boolean = false;
  otpInputConfig: NgxOtpInputConfig = {
    otpLength: 6,
    autofocus: true,
    behavior: 1,
    classList: {
      inputBox: 'otps',
      input: 'my-super-class',
      inputFilled: 'my-super-filled-class',
      inputDisabled: 'my-super-disabled-class',
      inputSuccess: 'my-super-success-class',
      inputError: 'my-super-error-class'
    }
  }
  otpfill: any;
  constructor(private formBuilder: FormBuilder, private router: Router,){}
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      phonenumber: ["", [Validators.required, Validators.pattern("^(\\+91-? ?)?[6-9][0-9]{9}$")]]
    });
  }
//   isNumber(value: string): boolean {

//     return !isNaN(Number(value));

// }
continue(){
this.emailVerify = false;
}
initialSection() {
  this.emailVerify = true
}
setExpireTimer() {
  this.timer && clearInterval(this.timer);
  this.minutes = 1;
  this.seconds = 0;
  this.isDisabled = true;
  this.timer = setInterval(() => {
    this.tick();
  }, 1000);
}
tick() {
  if (this.minutes <= 0 && this.seconds <= 0) {
    clearInterval(this.timer);
    this.isDisabled = false;
    return;
  }
  if (--this.seconds < 0) {
    this.seconds = 59;
    this.minutes--;
  }
}
sendAgain(){

}
handleOtp(ot: any) {
  if (parseInt(ot) == 123456) {
  }
  else {
  }
  this.otpfill = ot.join('').length == 6;
}
handleFill(value: any) {
  this.otpfill = value;
}
phoneVerified(){
  this.router.navigate(['./setup-password'])
}
}
