import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxOtpInputConfig } from 'ngx-otp-input';
import { LoginServicesService } from '../services/login-services.service';
import { HttpHeaders } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { ReCheckPopupComponent } from '../re-check-popup/re-check-popup.component';

@Component({
  selector: 'app-first-login',
  templateUrl: './first-login.component.html',
  styleUrls: ['./first-login.component.css']
})
export class FirstLoginComponent {


  loginForm!: FormGroup;
  phoneNumberValid = true
  message: any
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
  phonenumber: any;
  isDisabled: boolean = true;
  error: any;
  errormsg: any;
  getphonenumber: any;
  proposalId: any;
  timer: any;
  minutes: number = 1;
  seconds: number = 0;
  uuid: any;
  errorMessage: any;
  errorOtp: any;
  BtnDisable: boolean = false;
  loginWithEmailText: boolean = true;

  constructor(private formBuilder: FormBuilder, private router: Router,
    private customerLogin: LoginServicesService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService, private dialog: MatDialog) { }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      // email:["",[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      phonenumber: ["", [Validators.required, Validators.pattern("^(\\+91-? ?)?[6-9][0-9]{9}$")]]
    });
    this.proposalId = this.route.snapshot.queryParamMap.get('proposalId');
    sessionStorage.setItem("proposalId",this.proposalId)
if(this.router.url == '/EmailLogin'){
  this.phoneNumberValid = false
  this.getphonenumber = JSON.parse(sessionStorage.getItem('phoneNumber') ?? 'null');
  this.uuid = JSON.parse(sessionStorage.getItem('UserId') ?? 'null');
}
else{
  sessionStorage.clear();
  this.getphonenumber = this.loginForm.controls['phonenumber'].value
}
if(this.route.snapshot.queryParamMap.get('emp')){
  this.loginWithEmailText = false;
}
  }

  handleOtp(ot: any) {
    if (parseInt(ot) == 123456) {
      //  alert('success');
    }
    else {
      //  alert('your otp is wrong')
    }
    // console.log('otpcheckk', ot);
    this.otpfill = ot.join('').length == 6;
  }
  handleFill(value: any) {
    this.otpfill = value;
  }
  isNumber(value: string): boolean {

    return !isNaN(Number(value));

}
  continueOtp() {
    this.BtnDisable = true;
    setTimeout(() => {
      this.BtnDisable = false;
    }, 3000);
    const data = {
      phoneNumber: this.loginForm.controls['phonenumber'].value,
      role: "CUSTOMER",
    }
    this.customerLogin.Customerlogin(data).subscribe({
      next :(res: any) => {
      if (res?.error == false) {
        this.phoneNumberValid = false
        this.setExpireTimer()
        this.uuid = res?.data.uuid
        sessionStorage.setItem("AccessToken", JSON.stringify(res?.data.accessToken));
       this.getphonenumber = res?.data.phoneNumber;
        // sessionStorage.setItem('SetName', JSON.stringify(data.name))
        // sessionStorage.setItem('setEmail',JSON.stringify(res?.data.email))
      }
      else{
        this.errorMessage = res?.message
      }
    },
    error: (err) =>{
      this.errorMessage = "No Active Internet Found, Please connect to active internet Connection."
    }
    })

  }

  logIn() {
    this.BtnDisable = true;
    setTimeout(() => {
      this.BtnDisable = false;
    }, 3000);
    const data={
      phoneNumber: this.getphonenumber,
      otp: this.otpfill,  
      uuid: this.uuid,
      role: "CUSTOMER"
    }
    // this.spinner.show()
    this.customerLogin.verifyPhoneOtp(data)?.subscribe({
      next: (res: any) => {
        if (res?.error === false) {
          sessionStorage.setItem("AccessToken2", JSON.stringify(res?.data.accessToken));
          sessionStorage.setItem("UserId", JSON.stringify(res?.data.uuid));
          sessionStorage.setItem("email", JSON.stringify(res?.data.email));
          sessionStorage.setItem("phoneNumber", JSON.stringify(res?.data.phoneNumber));
          sessionStorage.setItem("SetName", JSON.stringify(res?.data.name));
          sessionStorage.setItem("refreshToken", JSON.stringify(res?.data.refreshToken));
    
        if (res?.data.onBoardingStatus === 'EMAIL_VERIFICATION_COMPLETE' ||
            res?.data.onBoardingStatus === 'MOBILE_VERIFICATION_COMPLETE') {
          this.router.navigate(['./terms-conditions']);
        } else if (res?.data.onBoardingStatus === 'TERMS_AND_CONDITION_COMPLETE') {
          this.router.navigate(['./customer-details']);
        } else if (res?.data.onBoardingStatus === 'ON_BOARDING_COMPLETED') {
          this.router.navigate(['./customer-dashboard']);
        } else if (res?.error === false && res?.data.onBoardingStatus === 'REGISTRATION_COMPLETE') {
          if(this.route.snapshot.queryParamMap.get('emp') || this.router.url == '/EmailLogin'){
            this.router.navigate(['./setup-password']);
          }
          else{
            this.router.navigate(['./customer-dashboard']);
          }
        }
        } else {
          this.errorOtp = res?.message;
        }
      },
      error: (err) => {
        this.errorOtp = "No active internet found. Please connect to an active internet connection.";
      }
    });
  }
  initialSection() {
    localStorage.removeItem("AccessToken");
    this.phoneNumberValid = true
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

  backArrow() {
    this.phoneNumberValid = true
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
  sendAgain() {
    if (!this.isDisabled) {
      this.continueOtp()
    }
  }
  loginWithEmail(){
    this.router.navigate(['./login-with-password'])
  }
}