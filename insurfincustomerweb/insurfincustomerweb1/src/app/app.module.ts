import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule, MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatExpansionModule} from '@angular/material/expansion';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConfirmPopupComponent } from './confirm-popup/confirm-popup.component';
import { ProposalSuccessfullComponent } from './proposal-successfull/proposal-successfull.component';
import { ProposalStatusComponent } from './proposal-status/proposal-status.component';
import { NewCustomerComponent } from './new-customer/new-customer.component';
import { PleaseConfirmComponent } from './please-confirm/please-confirm.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { VerifyEmailPopupComponent } from './verify-email-popup/verify-email-popup.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { FirstLoginComponent } from './first-login/first-login.component';
import { SideNavSectionComponent } from './side-nav-section/side-nav-section.component';
import { PraposalAcceptedSuccessfullyComponent } from './praposal-accepted-successfully/praposal-accepted-successfully.component';
import { NgxOtpInputModule } from 'ngx-otp-input';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './services/auth.interceptor';
import { LoginWithPasswordComponent } from './login-with-password/login-with-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { EnterNewPasswordComponent } from './reset-password/enter-new-password/enter-new-password.component';
import { KycdocumentsPopupComponent } from './kycdocuments-popup/kycdocuments-popup.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { RegistrationSuccessfullComponent } from './registration-successfull/registration-successfull.component';
import { NotificationsComponent } from './customer-dashboard/notifications/notifications.component';
import {MatBadgeModule} from '@angular/material/badge';
import { MenubarComponent } from './customer-dashboard/menubar/menubar.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { MyDistributorComponent } from './customer-dashboard/menubar/my-distributor/my-distributor.component';
import { PanMaskDirective } from './services/pan-mask.directive';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AccessLocationComponent } from './location-popups/access-location/access-location.component';
import { LocationSuccessComponent } from './location-popups/location-success/location-success.component';
import { RemoveCurrentaddressComponent } from './location-popups/remove-currentaddress/remove-currentaddress.component';
import { DetectedWrongaddressComponent } from './location-popups/detected-wrongaddress/detected-wrongaddress.component';
import { MoreActionsBottomSheetComponent } from './customer-details/more-actions-bottom-sheet/more-actions-bottom-sheet.component';
import { MenuBarProfilePageComponent } from './customer-dashboard/menubar/menu-bar-profile-page/menu-bar-profile-page.component';
import { SignOutComponent } from './customer-dashboard/menubar/sign-out/sign-out.component';
import { UnsavedChangesComponent } from './unsaved-changes/unsaved-changes.component';
import { DetailsEditedComponent } from './details-edited/details-edited.component';
import { SetupPasswordComponent } from './setup-password/setup-password.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ReCheckPopupComponent } from './re-check-popup/re-check-popup.component';
import { ReviewProposalComponent } from './customer-dashboard/review-proposal/review-proposal.component';
import { ContactNumberPopupComponent } from './customer-details/more-actions-bottom-sheet/contact-number-popup/contact-number-popup.component';
import { Login2Component } from './login-with-password/login2/login2.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { BackButtonDisableModule } from 'angular-disable-browser-back-button';
import { UploadImageBottomsheetComponent } from './upload-image-bottomsheet/upload-image-bottomsheet.component';
import { WebCamComponent } from './web-cam/web-cam.component';
import { WebcamModule } from 'ngx-webcam';
import { SignupEmailVerifiedComponent } from './signup-email-verified/signup-email-verified.component';
import { AuthorizatonLetterComponent } from './authorizaton-letter/authorizaton-letter.component';

import { CaptchaPopupComponent } from './new-customer/captcha-popup/captcha-popup.component';
import { DataMismatchPopupComponent } from './data-mismatch-popup/data-mismatch-popup.component';
import { AppCurrencyFormatDirective } from './services/app-currency-format.directive';
import { PolicyActionPageComponent } from './policy-action-page/policy-action-page.component';
import { GetInTouchNotificationPopupComponent } from './customer-dashboard/review-proposal/get-in-touch-notification-popup/get-in-touch-notification-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    PersonalDetailsComponent,
    ConfirmPopupComponent,
    ProposalSuccessfullComponent,
    ProposalStatusComponent,
    NewCustomerComponent,
    PleaseConfirmComponent,
    CustomerDetailsComponent,
    VerifyEmailPopupComponent,
    CustomerDashboardComponent,
    FirstLoginComponent,
    SideNavSectionComponent,
    PraposalAcceptedSuccessfullyComponent,
    LoginWithPasswordComponent,
    ResetPasswordComponent,
    EnterNewPasswordComponent,
    KycdocumentsPopupComponent,
    TermsConditionsComponent,
    RegistrationSuccessfullComponent,
    NotificationsComponent,
    MenubarComponent,
    MyDistributorComponent,
    PanMaskDirective,
    DatePickerComponent,
    AccessLocationComponent,
    LocationSuccessComponent,
    RemoveCurrentaddressComponent,
    DetectedWrongaddressComponent,
    MoreActionsBottomSheetComponent,
    MenuBarProfilePageComponent,
    SignOutComponent,
    UnsavedChangesComponent,
    DetailsEditedComponent,
    SetupPasswordComponent,
    ReCheckPopupComponent,
    ReviewProposalComponent,
    ContactNumberPopupComponent,
    Login2Component,
    TermsOfServiceComponent,
    PrivacyPolicyComponent,
    UploadImageBottomsheetComponent,
    WebCamComponent,
    SignupEmailVerifiedComponent,
    AuthorizatonLetterComponent,

    CaptchaPopupComponent,
      DataMismatchPopupComponent,
      AppCurrencyFormatDirective,
      PolicyActionPageComponent,
      GetInTouchNotificationPopupComponent
  ],


  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatDialogModule,
    MatSliderModule,
    MatProgressBarModule,
    MatButtonModule,
    MatToolbarModule,
    MatRadioModule,
    NgxOtpInputModule,
    HttpClientModule,
    MatCheckboxModule,
    MatBadgeModule,
    NgSelectModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatBottomSheetModule,
    MatExpansionModule,
    NgxSpinnerModule,
    WebcamModule,
    BackButtonDisableModule.forRoot()
  ],
  

  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
    
    {
    
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' }
  },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
