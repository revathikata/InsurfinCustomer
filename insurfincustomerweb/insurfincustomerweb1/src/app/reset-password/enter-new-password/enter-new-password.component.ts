import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServicesService } from 'src/app/services/login-services.service';
@Component({
  selector: 'app-enter-new-password',
  templateUrl: './enter-new-password.component.html',
  styleUrls: ['./enter-new-password.component.css']
})
export class EnterNewPasswordComponent {

  email: any;
  otp:  any;
  newpassword = true;
  newPasswordForm!: FormGroup
  message: any;
  hidePassword = true;
  showPassword = true
  userId: any;

  constructor(private formbuilder:FormBuilder,
    private loginService : LoginServicesService,
    private router:Router
  ){}
  
  ngOnInit(): void {
    this.newPasswordForm=this.formbuilder.group({
      enterpassword:["",[Validators.required,this.passwordValidator()]],
      repassword:["",Validators.required]
    }, { validators: this.matchpassword });
  }

  matchpassword(newPasswordForm: FormGroup) {
    return newPasswordForm.controls['enterpassword'].value && newPasswordForm.controls
    ['enterpassword'].value === newPasswordForm.controls['repassword'].value ? newPasswordForm.controls
    ['repassword'].setErrors(null) : newPasswordForm.controls['repassword'].setErrors({ 'misMatch': true })
  }
  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const passwordPattern = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[A-Z]).{8,15}$/;
      const valid = passwordPattern.test(control.value);
      return valid ? null : { invalidPassword: true };
    };
  }
  resetPassword(){
    this.userId = JSON.parse(sessionStorage.getItem('UserId') ?? 'null')
   const data = {
      uuid : this.userId,
      password:  this.newPasswordForm.controls['repassword'].value,
 }
    this.loginService.setUpPassword(data).subscribe({
      next:(res:any) =>{
      if(res.error == false){
        this.newpassword=false
      }
      else{
        this.message = res.message
      }
    },
    error:(err) => {
      this.message = "No Active Internet Found, Please connect to active internet Connection."
    }
    });
  }
  backToLogin(){
    this.router.navigate(['./login-with-password'])

  }
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
  PasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  OnBackArrowClick(){
    this.router.navigate(['/reset-password'])
  }
}
