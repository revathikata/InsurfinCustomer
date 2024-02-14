import { Component,OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { KycdocumentsPopupComponent } from '../kycdocuments-popup/kycdocuments-popup.component';
import { Router } from '@angular/router';
import { CustomerServiceService } from '../services/customer-service.service';
import { LoginServicesService } from '../services/login-services.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {


  box=false
  selectedCustomerData:any=[]
  userId:any
  aadharFrontImg: any;
  aadharBackImg: any;
  pancardImg: any;
  bankImg1: any;
  bankImg2: any;
  aadharFronturl: any;
  aadharBackurl: any;
  pancardurl: any;
  bankcheckurl: any;
  bankdocurl: any;
  gst: any;
  Itr: any;
  cert: any;
  gsturl: any;
  Itrurl: any;
  certurl: any;
  customerUuid: any;
  selectedCustomerInfo:any = [];
  imgdocurl: any;
  imgbank1: any;
  imgdocument1: any;
  imgdocument2: any;
  imgdocument3: any;
  gstdocurl: any;
  certUrl: any;
  Itrdocurl: any;
  customerProfile: any;
  
  constructor(private dialog:MatDialog,private router:Router,private customerService:CustomerServiceService ,private  loginService :LoginServicesService){}
  ngOnInit(): void {
    this.viewCustomerDetails()
  }

  
  kycdocuments(documentType: string, imageUrl: string) {
    if (imageUrl && imageUrl.toLowerCase().includes('.pdf')) {
      window.open(imageUrl, '_blank');
    } else {
      this.dialog.open(KycdocumentsPopupComponent, {
        height: '376px',
        width: '329px',
        data: { documentType, imageUrl }
      });
    }
  }

  navigateEditDetails(){
    this.router.navigate(['./new-customer']);
  }

  // viewCustomerDetails() {
  //   // // this.selectedCustomerData = {};
  //   // this.userId = JSON.parse(localStorage.getItem('userId')?? '')
  //   // this.customerService.getCustomerInfoById(this.userId).subscribe({
  //   //   next: (res) => {
  //   //     // console.log(res);
  //   //     this.selectedCustomerData = res; 
  //   //     this.aadharFrontImg = this.selectedCustomerData.documentList && this.selectedCustomerData.documentList.find(doc => doc.documentType === 'AADHAR_FRONT_IMG').s3FileName.replace(/^\d+_/, '') ||null
  //   //     this.aadharBackImg = this.selectedCustomerData.documentList && this.selectedCustomerData.documentList.find(doc => doc.documentType === 'AADHAR_BACK_IMG').s3FileName.replace(/^\d+_/, '') ||null
  //   //     this.pancardImg = this.selectedCustomerData.documentList && this.selectedCustomerData.documentList.find(doc => doc.documentType === 'PAN_CARD').s3FileName.replace(/^\d+_/, '') ||null
  //   //     if( this.selectedCustomerData && this.selectedCustomerData.employementDetails &&this.selectedCustomerData.employementDetails.employmentType==='SALARIEDEMPLOYEE'){
  //   //       this.bankImg1 = this.selectedCustomerData.documentList && this.selectedCustomerData.documentList.find(doc => doc.documentType === 'BANK_CHEQUE').s3FileName.replace(/^\d+_/, '') ||null
  //   //       this.bankImg2 = this.selectedCustomerData.documentList && this.selectedCustomerData.documentList.find(doc => doc.documentType === 'BANK_STATEMENT').s3FileName.replace(/^\d+_/, '')  ||null
  //   //     }
  //   //     if( this.selectedCustomerData && this.selectedCustomerData.employementDetails &&this.selectedCustomerData.employementDetails.employmentType==='SELFEMPLOYEE'){
  //   //       this.gst =this.selectedCustomerData.documentList && this.selectedCustomerData.documentList.find(doc => doc.documentType === 'GST').s3FileName.replace(/^\d+_/, '')  ||null
  //   //       this.Itr =this.selectedCustomerData.documentList && this.selectedCustomerData.documentList.find(doc => doc.documentType === 'ITR').s3FileName.replace(/^\d+_/, '')  ||null
  //   //       this.cert = this.selectedCustomerData.documentList && this.selectedCustomerData.documentList.find(doc => doc.documentType === 'INCORPORATION_CERT').s3FileName.replace(/^\d+_/, '')  ||null
  //   //     }
  //   //     this.aadharFronturl = this.selectedCustomerData.documentList && this.selectedCustomerData.documentList.find(doc => doc.documentType === 'AADHAR_FRONT_IMG').s3Url
  //   //     this.aadharBackurl = this.selectedCustomerData.documentList && this.selectedCustomerData.documentList.find(doc => doc.documentType === 'AADHAR_BACK_IMG').s3Url
  //   //     this.pancardurl = this.selectedCustomerData.documentList && this.selectedCustomerData.documentList.find(doc => doc.documentType === 'PAN_CARD').s3Url
  //   //     if( this.selectedCustomerData && this.selectedCustomerData.employementDetails &&this.selectedCustomerData.employementDetails.employmentType==='SALARIEDEMPLOYEE'){
  //   //       this.bankcheckurl = this.selectedCustomerData.documentList && this.selectedCustomerData.documentList.find(doc => doc.documentType === 'BANK_CHEQUE').s3Url
  //   //       this.bankdocurl = this.selectedCustomerData.documentList && this.selectedCustomerData.documentList.find(doc => doc.documentType === 'BANK_STATEMENT').s3Url
  //   //     }
  //   //     if( this.selectedCustomerData && this.selectedCustomerData.employementDetails &&this.selectedCustomerData.employementDetails.employmentType==='SELFEMPLOYEE'){
  //   //       this.gsturl =this.selectedCustomerData.documentList && this.selectedCustomerData.documentList.find(doc => doc.documentType === 'GST').s3Url
  //   //       this.Itrurl =this.selectedCustomerData.documentList && this.selectedCustomerData.documentList.find(doc => doc.documentType === 'ITR').s3Url
  //   //       this.certurl = this.selectedCustomerData.documentList && this.selectedCustomerData.documentList.find(doc => doc.documentType === 'INCORPORATION_CERT').s3Url
  //   //     }
  //   //   },
  //   //   error: (err) => {
  //   //     console.log(err);
  //   //   }
  //   // })
  // }
  viewCustomerDetails(){
    this.selectedCustomerInfo = {};
    this.customerUuid =JSON.parse(sessionStorage.getItem('UserId') ?? '');
    this.loginService.getCustomerdata(this.customerUuid).subscribe((res:any)=>{
      this.selectedCustomerInfo = res?.data;
      if (this.selectedCustomerInfo.userDocuments !== null) {
        this.imgdocurl = (this.selectedCustomerInfo.userDocuments && this.selectedCustomerInfo.userDocuments.find((doc: any) => doc.documentType === 'BANK_STATEMENT')?.s3Url) || null
        this.imgbank1 = (this.selectedCustomerInfo.userDocuments && this.selectedCustomerInfo.userDocuments.find((doc: any) => doc.documentType === 'BANK_STATEMENT')?.s3FileName.replace(/^\d+_/, '')) || null
        this.imgdocument1 = (this.selectedCustomerInfo.userDocuments && this.selectedCustomerInfo.userDocuments.find((doc: any) => doc.documentType === 'GST')?.s3FileName.replace(/^\d+_/, '')) || null
        this.imgdocument2 = (this.selectedCustomerInfo.userDocuments && this.selectedCustomerInfo.userDocuments.find((doc: any) => doc.documentType === 'INCORPORATION_CERT')?.s3FileName.replace(/^\d+_/, '')) || null
        this.imgdocument3 = (this.selectedCustomerInfo.userDocuments && this.selectedCustomerInfo.userDocuments.find((doc: any) => doc.documentType === 'ITR')?.s3FileName.replace(/^\d+_/, '')) || null
        this.gstdocurl = (this.selectedCustomerInfo.userDocuments && this.selectedCustomerInfo.userDocuments.find((doc: any) => doc.documentType === 'GST')?.s3Url) || null
        this.certUrl = (this.selectedCustomerInfo.userDocuments && this.selectedCustomerInfo.userDocuments.find((doc: any) => doc.documentType === 'INCORPORATION_CERT')?.s3Url) || null
        this.Itrdocurl = (this.selectedCustomerInfo.userDocuments && this.selectedCustomerInfo.userDocuments.find((doc: any) => doc.documentType === 'ITR')?.s3Url) || null
        this.customerProfile = (this.selectedCustomerInfo.userDocuments && this.selectedCustomerInfo.userDocuments.find((doc: any) => doc.documentType === 'PHOTO')?.s3Url) || null
      }
      
    })
    console.log(this.imgdocurl,'checque')
    // this.router.navigate(['./new-customer'])
    // this.router.navigate(['./new-customer?validate=customer'])
    // this.router.navigate(['/new-customer'], { queryParams: { validateLocation :true }});
    // this.router.navigate(['./new-customer'])


  }

  validateCustomerLocation(){
    this.router.navigate(['./new-customer'],{ queryParams: { restrictCutomerEdit :true }})
  }
  navigateBackArrow(){
    this.router.navigate(['./login']);
  }
  backArrowNavigation(){
    this.router.navigate(['./welcome'])
  }
}
