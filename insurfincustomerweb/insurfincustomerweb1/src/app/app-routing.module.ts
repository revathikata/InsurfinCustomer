import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { NewCustomerComponent } from './new-customer/new-customer.component';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';
import { ProposalStatusComponent } from './proposal-status/proposal-status.component';
import { ProposalSuccessfullComponent } from './proposal-successfull/proposal-successfull.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { FirstLoginComponent } from './first-login/first-login.component';
import { PraposalAcceptedSuccessfullyComponent } from './praposal-accepted-successfully/praposal-accepted-successfully.component';
import { AuthGuard } from './auth.guard';
import { LoginWithPasswordComponent } from './login-with-password/login-with-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { EnterNewPasswordComponent } from './reset-password/enter-new-password/enter-new-password.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { RegistrationSuccessfullComponent } from './registration-successfull/registration-successfull.component';
import { NotificationsComponent } from './customer-dashboard/notifications/notifications.component';
import { MenubarComponent } from './customer-dashboard/menubar/menubar.component';
import { MyDistributorComponent } from './customer-dashboard/menubar/my-distributor/my-distributor.component';
import { MenuBarProfilePageComponent } from './customer-dashboard/menubar/menu-bar-profile-page/menu-bar-profile-page.component';
import { SignOutComponent } from './customer-dashboard/menubar/sign-out/sign-out.component';
import { SetupPasswordComponent } from './setup-password/setup-password.component';
import { ReviewProposalComponent } from './customer-dashboard/review-proposal/review-proposal.component';
import { Login2Component } from './login-with-password/login2/login2.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { UploadImageBottomsheetComponent } from './upload-image-bottomsheet/upload-image-bottomsheet.component';
import { WebcamComponent } from 'ngx-webcam';
import { SignupEmailVerifiedComponent } from './signup-email-verified/signup-email-verified.component';
import { AuthorizatonLetterComponent } from './authorizaton-letter/authorizaton-letter.component';
import { CaptchaPopupComponent } from './new-customer/captcha-popup/captcha-popup.component';
import { DataMismatchPopupComponent } from './data-mismatch-popup/data-mismatch-popup.component';
import { PolicyActionPageComponent } from './policy-action-page/policy-action-page.component';

const routes: Routes = [
  {path:'',pathMatch:'full', redirectTo: 'login'},
  {path:'login', pathMatch:'full', component:FirstLoginComponent},
  {path:'EmailLogin', pathMatch:'full', component:FirstLoginComponent},
  {path:'customer-dashboard', pathMatch:'full', component:CustomerDashboardComponent},
  {path:'proposal-accepted', pathMatch:'full', component:PraposalAcceptedSuccessfullyComponent,canActivate:[AuthGuard]},
  {path:'new-customer', pathMatch:'full', component:NewCustomerComponent,canActivate:[AuthGuard]},
  {path:'welcome', pathMatch:'full', component:WelcomeComponent,canActivate:[AuthGuard]},
  {path:'personal-details', pathMatch:'full', component:PersonalDetailsComponent,canActivate:[AuthGuard]},
  {path:'proposal-success', pathMatch:'full', component:ProposalSuccessfullComponent,canActivate:[AuthGuard]},
  {path:'customer-details', pathMatch:'full', component:CustomerDetailsComponent,canActivate:[AuthGuard]},
  {path:'login-with-password', pathMatch:'full', component:LoginWithPasswordComponent},
  {path:'reset-password', pathMatch:'full', component:ResetPasswordComponent},
  {path:'setup-psw',pathMatch:'full',component:ResetPasswordComponent},
  {path:'enter-new-password', pathMatch:'full', component:EnterNewPasswordComponent},
  {path:'terms-conditions', pathMatch:'full', component:TermsConditionsComponent,canActivate:[AuthGuard]},
  {path:'registration-successfull', pathMatch:'full', component:RegistrationSuccessfullComponent,canActivate:[AuthGuard]},
  {path:'notifications', pathMatch:'full', component:NotificationsComponent,canActivate:[AuthGuard]},
  {path:'my-distributor', pathMatch:'full', component:MyDistributorComponent,canActivate:[AuthGuard]},
  {path:'menubar', pathMatch:'full', component:MenubarComponent,canActivate:[AuthGuard]},
  {path:'profile-page', pathMatch:'full', component:MenuBarProfilePageComponent,canActivate:[AuthGuard]},
  {path:'sign-out', pathMatch:'full', component:SignOutComponent,canActivate:[AuthGuard]},
  {path:'setup-password', pathMatch:'full', component:SetupPasswordComponent},
  {path:'review-Proposal', pathMatch:'full', component:ReviewProposalComponent,canActivate:[AuthGuard]},
  {path:'login2', pathMatch:'full', component:Login2Component},
  { path :'privacy-policy' , component: PrivacyPolicyComponent },
  { path :'terms-of-service' , component:TermsOfServiceComponent },
  { path :'upload-image-bottomsheet' , component:UploadImageBottomsheetComponent },
  { path :'webcam' , component:WebcamComponent },
  { path :'signUp-verify' , component:SignupEmailVerifiedComponent },
  
  {path:'authorization-letter/:divId',component:AuthorizatonLetterComponent,canActivate:[AuthGuard]},
  {path:'captcha',pathMatch:'full',component:CaptchaPopupComponent,canActivate:[AuthGuard]},
  // {path:'review-Proposal/:Id', pathMatch:'full', component:ReviewProposalComponent},
  {path:'data-mismatch',pathMatch:'full',component:DataMismatchPopupComponent},
  {path:'VirtualAccount',pathMatch:'full',component:PolicyActionPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: false,scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
