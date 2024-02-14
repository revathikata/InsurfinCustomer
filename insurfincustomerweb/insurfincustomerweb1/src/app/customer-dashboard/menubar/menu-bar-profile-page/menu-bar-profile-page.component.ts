import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomerServiceService } from 'src/app/services/customer-service.service';
import { MenubarComponent } from '../menubar.component';
import { Router } from '@angular/router';
import { KycdocumentsPopupComponent } from 'src/app/kycdocuments-popup/kycdocuments-popup.component';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { UploadImageBottomsheetComponent } from 'src/app/upload-image-bottomsheet/upload-image-bottomsheet.component';
import { LoginServicesService } from 'src/app/services/login-services.service';

@Component({
  selector: 'app-menu-bar-profile-page',
  templateUrl: './menu-bar-profile-page.component.html',
  styleUrls: ['./menu-bar-profile-page.component.css']
})
export class MenuBarProfilePageComponent {


  loginUserId: String = '';
  customerData: any = []
  aadharFront:any;
  aadharBack:any;
  panCard:any;
  cancelCheque:any;
  bankStatement:any;
  gstCertificate:any;
  incomeTax:any;
  certificateOfIncorporation:any;
  bankdocurl: any;
  aadharfrontUrl: any;
  aadharbackUrl: any;
  panUrl: any;
  bankChequeurl: any;
  imgdocurl: any;
  gstdocurl: any;
  certUrl: any;
  Itrdocurl: any;
  customerProfilePic:any;


  constructor(private loginService: LoginServicesService , private dialog:MatDialog , private router:Router,private bottomSheet: MatBottomSheet) { }

  ngOnInit() {
      this.loginUserId = JSON.parse(sessionStorage.getItem('UserId') ?? 'null')
      this.getCustomerInfo()
  }
  getCustomerInfo() {
    this.loginService.getCustomerdata(this.loginUserId).subscribe({
      next: (res) => {
        this.customerData = res?.data
        // console.log(this.customerData);
        if (this.customerData.userDocuments !== null) {
          this.imgdocurl = (this.customerData.userDocuments && this.customerData.userDocuments.find((doc: any) => doc.documentType === 'BANK_STATEMENT')?.s3Url) || null
          this.bankStatement = (this.customerData.userDocuments && this.customerData.userDocuments.find((doc: any) => doc.documentType === 'BANK_STATEMENT')?.s3FileName.replace(/^\d+_/, '')) || null
          this.gstCertificate = (this.customerData.userDocuments && this.customerData.userDocuments.find((doc: any) => doc.documentType === 'GST')?.s3FileName.replace(/^\d+_/, '')) || null
          this.certificateOfIncorporation = (this.customerData.userDocuments && this.customerData.userDocuments.find((doc: any) => doc.documentType === 'INCORPORATION_CERT')?.s3FileName.replace(/^\d+_/, '')) || null
          this.incomeTax = (this.customerData.userDocuments && this.customerData.userDocuments.find((doc: any) => doc.documentType === 'ITR')?.s3FileName.replace(/^\d+_/, '')) || null
          this.gstdocurl = (this.customerData.userDocuments && this.customerData.userDocuments.find((doc: any) => doc.documentType === 'GST')?.s3Url) || null
          this.certUrl = (this.customerData.userDocuments && this.customerData.userDocuments.find((doc: any) => doc.documentType === 'INCORPORATION_CERT')?.s3Url) || null
          this.Itrdocurl = (this.customerData.userDocuments && this.customerData.userDocuments.find((doc: any) => doc.documentType === 'ITR')?.s3Url) || null
          this.customerProfilePic = (this.customerData.userDocuments && this.customerData.userDocuments.find((doc: any) => doc.documentType === 'PHOTO')?.s3Url) || null
        }
       
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  openMenuBar(){
    this.dialog.open(MenubarComponent)
  }
  navigateToNewCustomer(){
    this.router.navigate(['/new-customer'])
    
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

  openBottomSheet(customerData,type: string): void {
    const bottomSheetRef = this.bottomSheet.open(UploadImageBottomsheetComponent, {
      data: {type,customerData},
      panelClass: 'custom-fixed-bottom-sheet',
    });
    bottomSheetRef.afterDismissed().subscribe((ressult) => {
      if (ressult === 'uploaded') {
      }
    })
  }

}
