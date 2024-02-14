import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxOtpInputConfig } from 'ngx-otp-input';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataMismatchPopupComponent } from 'src/app/data-mismatch-popup/data-mismatch-popup.component';
import { CustomerServiceService } from 'src/app/services/customer-service.service';

@Component({
  selector: 'app-captcha-popup',
  templateUrl: './captcha-popup.component.html',
  styleUrls: ['./captcha-popup.component.css']
})
export class CaptchaPopupComponent {
  otpfill: any;
  aadhaarVerify: boolean = true;
  captchaVerified: boolean = false;
  selectedIndex: number | undefined;
  captcha: any;
  captchaText: any
  captchaToken: any;
  loginUserId: any;
  errorMsg: any;
  errorCaptcha: any;
  data: any = null;
  validOtp: any;
  routeData: any;
  userAadhaarnum: any;
  aadharNameError: any;
  restrictCutomerEdit: boolean = true; 

  constructor(private router: Router, private spinner: NgxSpinnerService,private route: ActivatedRoute,
   // @Inject(MAT_DIALOG_DATA) public data: any ,
     private customerService: CustomerServiceService,
     private dialog : MatDialog) {
      const navigation = this.router.getCurrentNavigation();
      if (navigation && navigation.extras.state) {
        const userData = navigation.extras.state['userData'];
        this.data = userData;
      }
      this.route.queryParams.subscribe(params => {
        this.restrictCutomerEdit = params['restrictCutomerEdit'] === 'true' 
      });
  }
  ngOnInit() {
    this.userAadhaarnum=sessionStorage.getItem('aadharNumber')?.replace(/\d{4}(?=.)/g, '$& ');
  }
  goToPreviousTab() {
   // this.dialogRef.close()
   if(this.restrictCutomerEdit === true){
    this.router.navigate(['/new-customer'],{queryParams: {
      restrictCutomerEdit: true,
    }})
   }
   else{
    this.router.navigate(['/new-customer'])
   }
  }
  handleFill(value: any) {
    this.otpfill = value;
    // this.otpfill = ot.join('').length == 6;

  }
  handleOtp(ot: any) {
    if (parseInt(ot) == 123456) {
      //  alert('success');
      // inputDisabled
    }
    else {
      //  alert('your otp is wrong')
    }
    this.otpfill = ot.join('').length == 6;
  }
  otpInputConfig: NgxOtpInputConfig = {
    otpLength: 6,
    autofocus: true,
    // behavior: 1,
    classList: {
      inputBox: 'otps',
      input: 'my-super-class',
      inputFilled: 'my-super-filled-class',
      inputDisabled: 'my-super-disabled-class',
      inputSuccess: 'my-super-success-class',
      inputError: 'my-super-error-class'
    }
  }
  onContinue() {
    this.loginUserId = JSON.parse(sessionStorage.getItem('UserId') ?? 'null');
    const data = {
      token: this.data.token,
      captcha: this.captchaText,
      userId: this.loginUserId
    }
    this.customerService.aadharGenerateOtp(data).subscribe((res: any) => {
      if (res?.error == false) {
        this.aadhaarVerify = false;
        this.captchaToken = res?.data.token
      }
      else{
       this.errorCaptcha =  res?.message
      }
    })
    //   if(this.captchaVerified){


    //     this.aadhaarVerify=true;
    //  this.captchaVerified=false;
    //   }
    //   else if(this.aadhaarVerify){
    //    this.dialogRef.closeAll()
    //     this.spinner.show()
    //     setTimeout(() => {
    //       this.spinner.hide();
    //     }, 3000);
    //     this.router.navigate(['/register'])

    //   }
    //   else{

    //   }

  }
  reloadCaptcha(){
    const data = {
      token : this.data.token
    }
    this.customerService.refreshCaptcha(data).subscribe((res:any) =>{
this.data = res?.data
this.captchaToken = res?.data.token
    })
  }
  // AadharValidation() {
  //   this.loginUserId = JSON.parse(sessionStorage.getItem('UserId') ?? '');
  //   const data = {
  //     token: this.captchaToken,
  //     otp: this.otpfill,
  //     share_code: 1234,
  //     fullName: this.data.fullname,
  //     dataOfBirth: this.data.dob.replace(/\//g, '-'),
  //     gender: this.data.gender,
  //     userId: this.loginUserId

  //   }
  //   this.customerService.aadharValidation(data).subscribe((res: any) => {
  //     if(res?.error == false){
  //       this.validOtp = res.message
  //       this.dialogRef.close(res);
  //     }
  //     else{
  //       this.errorMsg = res?.message
  //       this.dialogRef.close(res);
  //     }
  //   })
  // }
  AadharValidation() {
    this.loginUserId = JSON.parse(sessionStorage.getItem('UserId') ?? 'null');
    const data = {
      token: this.captchaToken,
      otp: this.otpfill,
      share_code: 1234,
      fullName: this.data.fullname,
      dataOfBirth: this.data.dob,
      gender: this.data.gender,
      userId: this.loginUserId

    }
    sessionStorage.setItem('SetName', JSON.stringify(data.fullName))
    this.customerService.aadharValidation(data)?.subscribe((res: any) => {
      if(res?.error == false){
        this.validOtp = res.message
        this.routeData = {
          result :res,
          aadharNumber : this.data.aadharNumber,
          // dob: this.data.dob,
          // gender: this.data.gender,
          // fullName :this.data.fullname
        }
        if(this.restrictCutomerEdit === true){
          this.router.navigate(['/new-customer'], { state:
            { userData: this.aadharNameError
           },
           queryParams: {
            restrictCutomerEdit: true,
          },
           });
        }
        else{
      this.router.navigate(['/new-customer'], { state:
          { userData: this.aadharNameError
         } });
        }
         sessionStorage.setItem('persnlDetails', JSON.stringify(this.routeData))
       // this.dialogRef.close(res);
      }
      else{
        if(res?.exceptionCode == '1078'){
       this.aadharNameError = res?.message
       if(this.restrictCutomerEdit === true){
        this.router.navigate(['/new-customer'], { state:
          { userData: this.aadharNameError
         },
         queryParams: {
          restrictCutomerEdit: true,
        },
         });
       }
       else{
       this.router.navigate(['/new-customer'], { state:
        { userData: this.aadharNameError
       } });
      }
        }
       else if(res?.exceptionCode == '1006'){
          this.errorMsg = res?.message
        }
       else{
         if(this.restrictCutomerEdit === true){
          this.router.navigate(['/new-customer'],{queryParams: {
            restrictCutomerEdit: true,
          }})
         }
         else{
          this.router.navigate(['/new-customer'])
         }
          this.dialog.open(DataMismatchPopupComponent,{
            width: '329px',
            height: '239px',
            data: {
              errorMsg: res?.message  
          }
          })
        }
      
      }
    })
  }
}




