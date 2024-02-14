import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxOtpInputConfig } from 'ngx-otp-input';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginServicesService } from 'src/app/services/login-services.service';

@Component({
  selector: 'app-login2',
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.css']
})
export class Login2Component {
  loginForm!: FormGroup;
  phoneNumberValid = true
  message: any
  otpInputConfig: NgxOtpInputConfig = {
    otpLength: 6,
    autofocus: true,
    behavior:1,
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

  constructor(private formBuilder: FormBuilder, private router: Router,
    private customerLogin : LoginServicesService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService , private dialog:MatDialog) { }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      // email:["",[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      phonenumber: ["", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}?$|^((\\+91-? ?)|0)?[6-9]{1}[0-9]{9}$")]]
    });
    this.proposalId = this.route.snapshot.queryParamMap.get('proposalId');
    sessionStorage.setItem("proposalId",this.proposalId)
    // console.log(this.proposalId,'prop');
  }

  handleOtp(ot: any) {
    if (parseInt(ot) == 123456) {
      //  alert('success');
    }
    else {
      //  alert('your otp is wrong')
    }
    // console.log('otpcheckk', ot);
    // this.otpfill = ot.join('').length == 6;
  }
  handleFill(value: any) {
    // console.log('otpcheckk', value);
    this.otpfill = value;
    // console.log('otpcheckk', value);
    // this.otpfill = ot.join('').length == 6;

  }
  isEmail(search:string):boolean
    {
        var  serchfind:boolean;

     var regexp = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$');

        serchfind = regexp.test(search);

        // console.log(serchfind)
        return serchfind
    }
    isPhonenumber(search:string):boolean
    {
        var  serchfind:boolean;

     var regexp = new RegExp('^((\\+91-? ?)|0)?[6-9]{1}[0-9]{9}$');

        serchfind = regexp.test(search);

        // console.log(serchfind)
        return serchfind
    }
  continueOtp() {
    this.phoneNumberValid = false
    
    localStorage.clear()
    console.clear();    
    var data = {}
    let value = this.loginForm.controls['phonenumber'].value 
    if(this.isEmail (value)){
     data = {
      email : this.loginForm.controls['phonenumber'].value
    }
  }
  else if(this.isPhonenumber(value)){
    data = {
      phoneNumber : this.loginForm.controls['phonenumber'].value
    }
    this.spinner.show();
  }
    this.customerLogin.Customerlogin(data).subscribe((res:any) =>{
// console.log(res);
this.spinner.hide();
if(res.error == false){
  this.phoneNumberValid = false
  this.getphonenumber = res?.data.phoneNumber
  this.setExpireTimer();
  localStorage.setItem("AccessToken", JSON.stringify(res?.data.accessToken))
}
else{
  // this.error = res?.message
  // this.dialog.open(ReCheckPopupComponent)
}
    })

  }

  logIn() {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Basic '); 
    const data = {
      phoneNumber: this.loginForm.controls['phonenumber'].value,
      otp: this.otpfill
    }
    this.spinner.show()
    // this.customerLogin.logindetails(data).subscribe((res: any) => {
    //   if (res.error == false) {
    //     this.router.navigate(['./terms-conditions'],{queryParamsHandling: 'preserve'})
    //     localStorage.setItem("AccessToken", JSON.stringify(res?.data.accessToken))
    //     localStorage.setItem('loginDetails', JSON.stringify(res?.data));
    //     localStorage.setItem('userId', JSON.stringify(res?.data.userId));
    //     this.spinner.hide()
    //   }
    //   else{
    //     this.errormsg = "Incorrect or invalid OTP"
    //     setTimeout(() => {
    //       this.phoneNumberValid = true
    //     }, 2000);
    //     this.spinner.hide()
    //   }

    // });
// this.router.navigate(['./customer-dashboard'])
  }
  initialSection(){
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

  backArrow(){
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
  sendAgain(){
    if (!this.isDisabled) {
      this.continueOtp()
    }
  }
  }


