import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginServicesService } from '../services/login-services.service';

@Component({
  selector: 'app-setup-password',
  templateUrl: './setup-password.component.html',
  styleUrls: ['./setup-password.component.css']
})
export class SetupPasswordComponent {
  SetupFormgroup!:FormGroup
  email: any;
  otp:  any;
  msg: any;
  // setupUnsuccess: any
  setup=true
  hidePassword = true;
  showPassword = true
  userId: any;
  errorMsg: any;
  getemail: any;
  skipText: boolean = false;

  constructor(private fb:FormBuilder,
    private router: Router, private loginService:LoginServicesService,
    private route: ActivatedRoute,){}


  ngOnInit(): void {
    this.getemail = JSON.parse(sessionStorage.getItem('email') ?? 'null'); 
    this.SetupFormgroup = this.fb.group({
      // email: ["" || this.getemail, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}?$")]],
      email: [{value:this.getemail, disabled: true}, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}?$")]],
      enterpassword: ["", [Validators.required, this.passwordValidator(),]],
      repassword: ["",Validators.required]

    },
    { validators: this.matchpassword });
    if(this.route.snapshot.queryParamMap.get('registered')){
      this.skipText = true;
    }
  }
  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const passwordPattern = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[A-Z]).{8,15}$/;
      const valid = passwordPattern.test(control.value);
      return valid ? null : { invalidPassword: true };
    };
  }

  matchpassword(SetupFormgroup: FormGroup) {
    return SetupFormgroup.controls['enterpassword'].value && SetupFormgroup.controls
    ['enterpassword'].value === SetupFormgroup.controls['repassword'].value ? SetupFormgroup.controls
    ['repassword'].setErrors(null) : SetupFormgroup.controls['repassword'].setErrors({ 'misMatch':true})
}

setUpPassword() {
  // this.email = localStorage.getItem('email');
  this.userId = JSON.parse(sessionStorage.getItem('UserId') ?? '');
    const data ={
      uuid : this.userId,
      password:  this.SetupFormgroup.controls['repassword'].value,
  }
  this.loginService.setUpPassword(data).subscribe({
    next: (res:any) => {
     if(res?.error == false){
      this.router.navigate(['./customer-dashboard'])
     }
     else{
      this.errorMsg = res?.message
     }
    },
    error: (err) => {
      this.errorMsg = "No Active Internet Found, Please connect to active internet Connection."
    }
  });
 
}

loginNavigate(){
  // localStorage.setItem("passwordSet",'')
  this.router.navigate(['./terms-conditions']);
}

togglePasswordVisibility() {
  this.hidePassword = !this.hidePassword;
}
PasswordVisibility() {
  this.showPassword = !this.showPassword;
}
loginMobile(){
  this.router.navigate(['./login'])
}
skipFunction(){
  this.router.navigate(['/customer-dashboard'])
}
}
