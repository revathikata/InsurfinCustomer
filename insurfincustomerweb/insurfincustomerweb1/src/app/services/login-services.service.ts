import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpBackend, HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LoginServicesService {
  baseURLAuthentication = environment.baseURLAuthentication;
  httpClient: HttpClient;
  constructor(private http: HttpClient,private handler: HttpBackend,) {
    this.httpClient = new HttpClient(handler);
   }
  //    public getHeader(){
  //   const accessToken = JSON.parse(localStorage.getItem('session')?? '');
  //   const headers = {
  //     'session' : 'Bearer '+ accessToken,
  //     // 'userId' : loginDetails.userId
  //   }
  //   return headers;
  // }
   Customerlogin(data: any) {
    return this.http.post(this.baseURLAuthentication + '/v1/loginWithPhoneNumber', data)
  }
  verifyPhoneOtp(data){
    return this.http.post(this.baseURLAuthentication +'/v1/verifyPhoneOTP',data);
  }
  customerUpdatedStatus(data){
    return this.http.put(this.baseURLAuthentication + `/v1/updateCustomerOnBoardingStatus`, data)
  }
  loginWithPassword(data: any) {
    return this.http.post(this.baseURLAuthentication + `/v1/loginWithPassword`, data)
  }

  // logindetails(data: any) {
  //   return this.http.post(this.baseURLAuthentication +'login',data,)
  // }
  // forgotPassword() {
  //   return this.http.get(this.baseURLAuthentication + `/v1/forgotOrChangePassword`)
  // }
  // forgotPasswordphone(phone: any) {
  //   return this.http.get(this.baseURLAuthentication + `/forgotPassword?phoneNumber=${phone}`)
  // }
  validateOtp(email:any, otp:any){
    return this.http.get(this.baseURLAuthentication + `/email/validateOtp?email=${email}&otp=${otp}`)
  }
  validateOtpPhone(email:any, otp:any){
    return this.http.get(this.baseURLAuthentication + `/email/validateOtp?PhoneNumber=${email}&otp=${otp}`)
  }
  setUpPassword(data: any) {
    return this.http.post(this.baseURLAuthentication + `/v1/customer/passwordSetUp`, data)
  }
  loginWithEmail(data){
    return this.http.post(this.baseURLAuthentication + `/v1/loginWithEmail`, data)
  }
  getCustomerdata(userId:any){
    return this.http.get<any>(this.baseURLAuthentication + `/v1/getCustomerData?uuid=${userId}` )
  }
  logout(data){
    return this.http.post(this.baseURLAuthentication+'/v1/logout',data);
  }
  AccountClosure(userId){
    return this.http.get(this.baseURLAuthentication +`/v1/requestForAccountClosure/${userId}`);
  }
  refreshAccessToken(data){
    return this.http.post(this.baseURLAuthentication +'/v1/renewAccessToken',data);
  }
  //  registerShortcutListeners(): void {
  //   document.addEventListener('keydown', (event: KeyboardEvent) => {
  //     if (event.ctrlKey && event.shiftKey &&event.key === 'C') {
  //       event.preventDefault(); // Prevent the default "Save" action
  //     }
  //     if (event.ctrlKey  &&event.key === 'p') {
  //       event.preventDefault(); // Prevent the default "Save" action
  //       // Optionally, display a message or perform a different action.
  //     }
  //       if ((event.ctrlKey || event.metaKey) && (event.key === 'p' || event.key === 'P')) {
  //         event.preventDefault(); // Prevent Ctrl+P
  //       }
    
  //       if ((event.ctrlKey || event.metaKey) && (event.key === 'v' || event.key === 'V')) {
  //         event.preventDefault(); // Prevent Ctrl+V
  //       }
      
  //   });
  // }
}
