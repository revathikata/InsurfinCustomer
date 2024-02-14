import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServicesService } from '../services/login-services.service';

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.css']
})
export class TermsConditionsComponent {

  box=false
  getUserId: any;
  errormsg: any;
  constructor( private router: Router, private loginService : LoginServicesService
    ) { }
  termsContinue(){
    this.getUserId = JSON.parse(sessionStorage.getItem('UserId') ?? '');
    const data = {
      uuid: this.getUserId,
      customerOnBoardingStatus : 'TERMS_AND_CONDITION_COMPLETE',
      registrationCompleted: false,
      termsAndConditionsAccepted: true
    }
    this.loginService.customerUpdatedStatus(data).subscribe({
      next : (res:any) =>{
      if(res.error == false){
        this.router.navigate(['./welcome'])
      }
      else {
        this.errormsg = res?.message
      }
    },
    error: (err) => {
      this.errormsg = "No Active Internet Found, Please connect to active internet Connection."
    }
  });
  //   this.router.navigate(['./welcome'],{queryParamsHandling: 'preserve'})
  // }
  }
}
