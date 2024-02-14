import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpBackend, HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {
  baseURLcustomer = environment.baseURLcustomer;
  httpClient: HttpClient;
  proposalUrl = environment.proposalUrl;
  geoLocationKey = environment.geoLocationKey;
  baseURLDocumentation = environment.baseURLDocumentation;
  panAadharUrl = environment.panAadharverify
baseAuthurl = environment.baseURLAuthentication
  constructor(private http: HttpClient,private handler: HttpBackend,) {
    this.httpClient = new HttpClient(handler);
   }
   getproposaldetails(proposalId:any) {
    return this.http.get(this.proposalUrl +`/getProposalAndDistributorDetails?proposalId=${proposalId}`)
  }
  proposalUpadateStatus(status, proposalId){
    return this.http.put(this.proposalUrl +`/updateStatus?status=${status}&proposalId=${proposalId}`,'')
  }
  getCustomerInfoById(userId:any) {
    return this.http.get<any>(this.proposalUrl + `/getProposalPolicyDetails?customerId=${userId}`);
  }
  getCurrentAddressUsingLATLONG(latitude, longitude){
    // return this.httpClient.get<any>('https://maps.googleapis.com/maps/api/geocode/json?latlng=17.4893224,78.3512446' +'&key='+ this.geoLocationKey);
    return this.httpClient.get<any>('https://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+','+ longitude+'&key='+ this.geoLocationKey);
  }
  
  UpdateCustomer(userId, data) {
    return this.http.put<any>(this.baseURLcustomer + `/updateCustomerDetails?customerId=${userId}`,data);
  }
  Document(userId: any, DocumentType: any, formData: any) {
    return this.http.post<any>(this.baseURLDocumentation + `/uploadFile?DocumentType=${DocumentType}&userId=${userId}`, formData);
    // http://65.1.142.222:8086/api/document/uploadFile?DocumentType=PHOTO&userId=64018ad0b2d62d27311c2fe9
  }
  sendNotificationToCustomer(customerId:any,distributorId,proposalNumber) {
    return this.http.get<any>(this.proposalUrl + `/customer/sendNotification?customerId=${customerId}&distributorId=${distributorId}&proposalNumber=${proposalNumber}`);
  }
  // http://65.1.142.222:8087/api/customer/sendNotification?customerId=2134

  // http://65.1.142.222:8087/api/customer/updateCustomerDetails?customerId=648967572b777d1e7bbbcf90
  lenderPage(data){
    // return this.http.put<any>(this.baseURLcustomer + `lender/statusupdatebylender?proposalId=${proposalId}&status=approve`,'');
    return this.http.post(this.proposalUrl + `lender/lenderapproval`, data);
  }
  // http://65.1.142.222:8088/api/lender/lenderapproval
  // http://65.1.142.222:8088/api/lender/statusupdatebylender?proposalId=AVIVLI00000183&status=approve
  
  customerGetDistributor(customerId){
    return this.http.get<any>(this.proposalUrl + `/customerdashboard/getdistributors?customerId=${customerId}`);
  }
  // http://65.1.142.222:8087/api/customerdashboard/getdistributors?customerId=649d12c58553b62121af250a

  lenderTransferAmount(data) {
    return this.http.put(`${this.proposalUrl}lender/handleTransfer`,data);
  }
  
  // "http://65.1.142.222:8088/api/lender/handleTransfer"
  // getproposalpolicydetails
  getproposalpolicydetails(customerId){
    const params = new HttpParams()
    .set('customerId',customerId)
    // .set('distributorId',distributorId)
    return this.http.get(`${this.proposalUrl}/customerdashboard/getproposalpolicydetails`,{params:params})
  }
// for get Distributor details
distributorDetails(customerId,distributorId){
  const params = new HttpParams()
  .set('customerId',customerId)
  .set('distributorId',distributorId)
  return this.http.get(`${this.proposalUrl}/customerdashboard/getproposalpolicydetails`,{params:params})
}
  //shared service
  editbtn:any
  enablebtn(data:any){
    this.editbtn = data
  }
  disablebtn(){
    return this.editbtn
  }
  customerSave(userId, data){
    return this.http.post(this.baseAuthurl + `/v1/saveCustomerInfo/${userId}`, data)
  }

  panValid(data){
    return this.http.post(this.panAadharUrl + '/pan/verify', data)
  }
    // http://15.206.199.123:8094/kyc/api/pan/verify
    aadharValid(data){
      return this.http.post(this.panAadharUrl + '/aadhar/generateToken', data)
      // http://15.206.199.123:8094/kyc/api/aadhar/generateToken
    }
    aadharGenerateOtp(data){
      return this.http.post(this.panAadharUrl + '/aadhar/generateOTP', data)
      // http://15.206.199.123:8094/kyc/api/aadhar/generateOTP
    }
    aadharValidation(data){
      return this.http.post(this.panAadharUrl + '/aadhar/v2/verify', data)
      // http://15.206.199.123:8094/kyc/api/aadhar/verify
    }
    refreshCaptcha(data){
      return this.http.post(this.panAadharUrl + '/aadhar/refreshCaptcha', data)
      //http://15.206.199.123:8094/kyc/api/aadhar/refreshCaptcha
    }
    proposalComplted(data){
      return this.http.post(this.baseURLDocumentation + '/acceptConditions', data)
    }
    loanInitiated(data){
      return this.http.post(this.proposalUrl + '/initiateLoanProcess/2e3rdft453ddcc', data)
    }
    GetInTouch(data){
      return this.http.post(this.proposalUrl + '/getInTouch', data)
    }
    sentOtpVirtual(proposal){
      return this.http.post(this.proposalUrl + `/sendOtp?proposalId=${proposal}`, '')
    }
    // https://dev-api.insurfin.in/proposal/api/v1/sendOtp?proposalId=2
    VirtualVerifyPhoneOtp(data){
      return this.http.post(this.proposalUrl + `/verifyPhoneOtp`, data)
    }
}

