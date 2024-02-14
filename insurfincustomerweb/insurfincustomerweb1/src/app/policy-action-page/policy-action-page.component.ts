import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxOtpInputConfig } from 'ngx-otp-input';
import { CustomerServiceService } from '../services/customer-service.service';
import { LoginServicesService } from '../services/login-services.service';

@Component({
  selector: 'app-policy-action-page',
  templateUrl: './policy-action-page.component.html',
  styleUrls: ['./policy-action-page.component.css']
})
export class PolicyActionPageComponent {

  getphonenumber:any;
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
  timer: any;
  minutes: number = 1;
  seconds: number = 0;
  isDisabled: boolean = true;
  viewOtpScreen:boolean = true;
  checkBox:boolean = false;
  validateOtp : boolean = true;
  uuid: any;
  proposalId: any;
  otpError: any;
  sendOtpError: any;
  constructor( private  route: ActivatedRoute,private customerService: CustomerServiceService,
    private loginService: LoginServicesService ){

  }

  ngOnInit(){
  //  this.uuid = this.route.snapshot.queryParamMap.get('customerId');
    this.proposalId = this.route.snapshot.queryParamMap.get('proposalId');
  }
  handleOtp(ot: any) {
    if (parseInt(ot) == 123456) {
    }
    else {
    }
  }
  handleFill(value: any) {
    this.otpfill = value;
  }

  backArrow(){
    this.viewOtpScreen= true;
  }
  onContinue(){
    this.proposalId = this.proposalId
    this.customerService.sentOtpVirtual(this.proposalId).subscribe((res:any) =>{
      if(res?.error == false){
        this.viewOtpScreen= false;
      }
      else{
        this.sendOtpError = res?.message
      }
    });
  }
  otpContinue(){
    const data={
      proposalId: this.proposalId,
      otp: this.otpfill,  
    }
    this.customerService.VirtualVerifyPhoneOtp(data)?.subscribe((res:any) =>{
      if(res?.error == false){
        this.validateOtp = false;
      }
      else{
        this.otpError = res?.message
      }
    });
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
  sendAgain() {
    if (!this.isDisabled) {
      this.onContinue()
    }
  }

  yourLocation(event: any) {
    this.checkBox = event.checked;
  }
}
