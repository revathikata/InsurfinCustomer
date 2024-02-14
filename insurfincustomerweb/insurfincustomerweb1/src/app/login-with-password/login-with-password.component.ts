import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServicesService } from '../services/login-services.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login-with-password',
  templateUrl: './login-with-password.component.html',
  styleUrls: ['./login-with-password.component.css']
})


export class LoginWithPasswordComponent {
  loginPasswordForm!:FormGroup
  emailPhonenumber: any;
  message: any;
  emailpage :boolean = true;
  errorMessage: any;
  BtnDisable: boolean = false;
  emailCheck : boolean = false;
  setupPwsText: boolean = false;
  showPassword = true;
  EmailerrorMessage: any;
constructor(private formbuilder:FormBuilder,private router:Router,private customerLogin:LoginServicesService){}

ngOnInit(): void {
  this.loginPasswordForm=this.formbuilder.group({
     email:["",[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    //  phonenumber: ["", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}?$|^((\\+91-? ?)|0)?[6-9]{1}[0-9]{9}$"),Validators.minLength(10)]],
     password:["",Validators.required]
  })
  // this.emailPhonenumber = JSON.parse(localStorage.getItem('emailOrPhonenumber') ??'')
}
EmailValidation(){
  const data = {
    email : this.loginPasswordForm.controls['email'].value,
    role : "CUSTOMER",
  }
  this.customerLogin.loginWithEmail(data).subscribe({
    next: (res:any) =>{
      if(res?.error == false && res?.data.setUpPassword == true){
        this.emailCheck = true;
        this.EmailerrorMessage = ''
      }
      else if (res?.error == false && res?.data.setUpPassword == false){
        this.router.navigate(['./EmailLogin']) 
        sessionStorage.setItem("phoneNumber", JSON.stringify(res?.data.phoneNumber));
        sessionStorage.setItem("UserId", JSON.stringify(res?.data.uuid));
        sessionStorage.setItem("AccessToken", JSON.stringify(res?.data.accessToken));
      }
      else{
        this.EmailerrorMessage = res?.message
        if(res?.error == true && res?.exceptionCode == 1067){
          this.setupPwsText = true;
        }
      }
    },
    error:(err) => {
      this.EmailerrorMessage = "No Active Internet Found, Please connect to active internet Connection."
    }
    });

}
logIn(){
  this.BtnDisable = true;
  setTimeout(() => {
    this.BtnDisable = false;
  }, 3000);
  const data = {
    email : this.loginPasswordForm.controls['email'].value,
    role : "CUSTOMER",
    password : this.loginPasswordForm.controls['password'].value,
  }
  this.customerLogin.loginWithPassword(data).subscribe({
    next: (res:any) =>{
    if(res?.error == false){
      sessionStorage.setItem("AccessToken2", JSON.stringify(res?.data.accessToken));
      sessionStorage.setItem("UserId", JSON.stringify(res?.data.uuid));
      sessionStorage.setItem("email", JSON.stringify(res?.data.email));
      sessionStorage.setItem("phoneNumber", JSON.stringify(res?.data.phoneNumber));
      sessionStorage.setItem("SetName", JSON.stringify(res?.data.name));
      sessionStorage.setItem("refreshToken", JSON.stringify(res?.data.refreshToken));
      this.router.navigate(['./customer-dashboard'])
    }
    else{
      this.errorMessage = res?.message
    }
  },
  error:(err) => {
    this.errorMessage = "No Active Internet Found, Please connect to active internet Connection."
  }
  })
}

forgotPassword(){
  this.router.navigate(['./reset-password'],{queryParams : {loginNav:true}})
}
clearErrorMessage() {

  if (this.message) {

      this.message = '';

      this.loginPasswordForm.controls['password'].setErrors(null);

  }
}
continueBtn(){
this.emailpage = false;
}
setupFlow(){
this.router.navigate(['login'],{ queryParams: { emp: true } })
}
navigateBackArrow(){
  this.router.navigate(['/login'])
}
PasswordVisibility() {
  this.showPassword = !this.showPassword;
}
}
