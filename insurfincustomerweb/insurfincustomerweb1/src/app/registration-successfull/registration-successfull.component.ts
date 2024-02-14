import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServicesService } from '../services/login-services.service';

@Component({
  selector: 'app-registration-successfull',
  templateUrl: './registration-successfull.component.html',
  styleUrls: ['./registration-successfull.component.css']
})
export class RegistrationSuccessfullComponent {
  getUserId: any;
  errormsg: any;
  successmsg: any;
  constructor(private router:Router,private loginService : LoginServicesService){}
  ngOnInit(): void {
    this.registerSuccess();
  }

  registerSuccess(){
    this.getUserId = JSON.parse(sessionStorage.getItem('UserId') ?? '');
    const data = {
      uuid: this.getUserId,
      customerOnBoardingStatus : 'REGISTRATION_COMPLETE',
      registrationCompleted: true,
      termsAndConditionsAccepted: true
    }
    this.loginService.customerUpdatedStatus(data).subscribe({
      next: (res:any) =>{
        if(res?.error == false){
          this.successmsg = res?.message
        }
        else{
          this.errormsg = res?.message
        }
      },
      error: (err) => {
        this.errormsg = "No Active Internet Found, Please connect to active internet Connection."
      }
  });
  }
  continueBtn(){
    this.router.navigate(['./setup-password'],{ queryParams: { registered: true } })
  }
  navigateBackArrow(){
   this.router.navigate(['./new-customer'])
  }

}
