import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ActivatedRoute, Router } from '@angular/router';
import { MoreActionsBottomSheetComponent } from 'src/app/customer-details/more-actions-bottom-sheet/more-actions-bottom-sheet.component';
import { CustomerServiceService } from 'src/app/services/customer-service.service';
import { SharedService } from 'src/app/services/shared.service';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { GetInTouchNotificationPopupComponent } from './get-in-touch-notification-popup/get-in-touch-notification-popup.component';

@Component({
  selector: 'app-review-proposal',
  templateUrl: './review-proposal.component.html',
  styleUrls: ['./review-proposal.component.css']
})
export class ReviewProposalComponent {
  customerProposalDetail: any;
  proposalDetails: any;
  proposalId: any;
  uploadDocuments = false;
  mainDashboard = true;
  pendingDocuments = false;
  updatefilefrnt: any;
  imgname: any;
  documentIds: any[] = [];
  userId: any;
  updatefileback: any;
  imgback: any;
  Panupdatefile: any;
  imgbpan: any;
  updatedbankFile1: any;
  updatedbankFile2: any;
  imgbank2: any;
  documents1: any;
  imgdocument1: any;
  documents2: any;
  imgdocument2: any;
  documents3: any;
  imgdocument3: any;
  imgbank1: any;
  aadharFront: boolean = false;
  aadharBack: boolean = false;
  panCard: boolean = false;
  cancelCheque: boolean = false;
  bankStatement: boolean = false;
  gstCertificate: boolean = false;
  incomeTax: boolean = false;
  incorporation: boolean = false;
  salaryForm!: FormGroup;
  selfForm!: FormGroup;
  // salary:boolean = false
  pendingDocments: boolean = false;
  reviewPropsalDetails: boolean = true
  checkBox1 = false;
  checkBox2 = false;
  checkBox3 = false;
  checkValueCondition: any;
  bankImgName: any;
  gstImgName: any;
  ItrNameImg: any;
  firstBoxChecked:boolean=false
  IncorporateImg: any;
  viewProposal: any= true;
  PhoneNum: string ='';
  tooltip = '';
  constructor(private customerService: CustomerServiceService,
    private location: Location, private route: ActivatedRoute, 
    private sharedService: SharedService, private router: Router, private formBuilder: FormBuilder, 
    private dialog:MatDialog,private _bottomSheet: MatBottomSheet) { }
  ngOnInit(): void {
    this.getAllProposalDetails();
    this.selfForm = this.formBuilder.group({
      adharfrontimg: ["", Validators.required],
      adharbackimg: ["", Validators.required],
      pancardimg: ["", Validators.required],
      gstcertificateimg: ["", Validators.required],
      incometaximg: ["", Validators.required],
      incorporationimg: ["", Validators.required]
    });
    this.salaryForm = this.formBuilder.group({
      adharfrontimg: ["", Validators.required],
      adharbackimg: ["", Validators.required],
      pancardimg: ["", Validators.required],
      cancelchequeimg: ["", Validators.required],
      bankstatementimg: ["", [Validators.required]],
    });
this.route.queryParams.subscribe(editMode => {
  this.checkValueCondition = editMode
  });
// if(this.checkValueCondition.value == 1){
//   this.checkBox1 = true;
//   this.firstBoxChecked=this.checkBox1
// }
// if(this.checkValueCondition.value == 2){
//   this.checkBox2 = true;
//   this.checkBox1 = true;
// }
// if(this.checkValueCondition.value == 3){
//   this.checkBox3 = true;
//   this.checkBox1 = true;
//   this.checkBox3 = true;
// }
if(sessionStorage.getItem('sendValue') !==null){
  this.checkBox1 = true;
}
if(sessionStorage.getItem('sendValue2') !==null){
  this.checkBox2 = true;
}
if(sessionStorage.getItem('sendValue3') !==null){
  this.checkBox3 = true;
}
this.route.queryParams.subscribe((view:any) => {
  const getdata = view.view
  if(getdata){
    this.viewProposal = false;
  }
});
  }
  getAllProposalDetails() {
    this.customerProposalDetail = JSON.parse(sessionStorage.getItem('proposalDataa') ?? 'null')
    this.customerService.getproposaldetails(this.customerProposalDetail).subscribe((res: any) => {
      this.proposalDetails = res?.data
      // this.pro= res?.data?.proposalDetailsDto?.distributorPhoneNumber
     sessionStorage.setItem('proposalDt',JSON.stringify(this.proposalDetails))
     
      if(this.proposalDetails?.documentList !== null){
        if(this.proposalDetails?.proposalDetailsDto.employmentType === 'SALARIEDEMPLOYEE')
        this.bankImgName = (this.proposalDetails?.documentList && this.proposalDetails.documentList.find(
          (doc: any) => doc.documentType === 'BANK_STATEMENT').s3FileName.replace(/^\d+_/, '')) || null
        }if(this.proposalDetails?.proposalDetailsDto.employmentType === 'SELFEMPLOYEE'){
          // self
          this.gstImgName = (this.proposalDetails?.documentList && this.proposalDetails.documentList.find(
            (doc: any) => doc.documentType === 'GST').s3FileName.replace(/^\d+_/, '')) || null
            this.ItrNameImg = (this.proposalDetails?.documentList && this.proposalDetails.documentList.find(
              (doc: any) => doc.documentType === 'ITR').s3FileName.replace(/^\d+_/, '')) || null
              this.IncorporateImg = (this.proposalDetails?.documentList && this.proposalDetails.documentList.find(
                (doc: any) => doc.documentType === 'INCORPORATION_CERT').s3FileName.replace(/^\d+_/, '')) || null
                
      }
      sessionStorage.setItem("proposalNumber", JSON.stringify(this.proposalDetails?.proposalDetailsDto.proposalNumber));
    });
    
  }
  acceptProposal() {
    // const data = {
    //   customerId : this.customerId,
    //   proposalId : this.proposalId,
    //   status : 'ACCEPT'
    // }
    this.customerService.proposalUpadateStatus('ACCEPT',this.customerProposalDetail,).subscribe((res: any) => {
      if(res?.error == false){
        sessionStorage.setItem("proposalId", this.customerProposalDetail)
        this.sharedService.setproposalNumber(this.customerProposalDetail.proposalNumber)
        this.router.navigate(['./proposal-accepted'])
      }
    });
  }
  uploadNow() {
    this.pendingDocments = true;
    this.reviewPropsalDetails = false
  }
  proposalBack() {
    this.location.back();
  }
  openBottomSheet(): void {
    this._bottomSheet.open(MoreActionsBottomSheetComponent,{
      data:'MoreActions',
      panelClass: 'custom-fixed-bottom-sheet',
  });
  }
  navigateToHome() {
    // this.location.back();
    this.router.navigate(['/customer-dashboard'])
  }
  AdharFrontFile(event: any) {
    const file = event.target.files[0];
    const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];

    if (!allowedFileTypes.includes(file.type)) {
      event.target.value = null; // Clear the selected file
      alert('Please upload a valid file type (JPEG, PNG, or PDF).');
      return;
    }
    this.updatefilefrnt = event.target.files[0];
    if (this.updatefilefrnt.size <= 1 * 1050 * 1050) {
      // this.imagePreview = true;
      // console.log('imgg', this.updatefilefrnt);
      this.imgname = event.target.files[0].name;
      // console.log('gh', this.imgname)
      const formData = new FormData();
      formData.append('file', this.updatefilefrnt);
      // const Document =  this.AdharBack.DocumentType?.AADHAR_BACK_IMG;
      this.userId = JSON.parse(localStorage.getItem("userId") ?? '');
      this.customerService.Document(this.userId, 'AADHAR_FRONT_IMG', formData).subscribe((res: any) => {
        // res.Adharimgback;
        this.documentIds.push(res.documentId);
      });
    }
    else {
      alert('File size should not be greater than 5MB');
    }
  }


  //adhar back file//

  AdharBackFile(event: any) {
    const file = event.target.files[0];
    const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];

    if (!allowedFileTypes.includes(file.type)) {
      event.target.value = null; // Clear the selected file
      alert('Please upload a valid file type (JPEG, PNG, or PDF).');
      return;
    }
    this.updatefileback = event.target.files[0];
    if (this.updatefileback.size <= 1 * 1050 * 1050) {
      // this.imagePreview = true;
      // console.log('imgg', this.updatefileback);
      this.imgback = event.target.files[0].name;
      // console.log('gh', this.imgback)
      const formData = new FormData();
      formData.append('file', this.updatefileback);
      // const userId = JSON.parse(localStorage.getItem("loginDetails") ?? '');
      // const Document =  this.AdharBack.DocumentType?.AADHAR_BACK_IMG;
      this.customerService.Document(this.userId, 'AADHAR_BACK_IMG', formData).subscribe((res: any) => {
        // res.AdharBack;
        this.documentIds.push(res.documentId);
      });
    }
    else {
      alert('File size should not be greater than 5MB');
    }
  }

  //pan upload//
  PanFrontFile(event: any) {
    const file = event.target.files[0];
    const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];

    if (!allowedFileTypes.includes(file.type)) {
      event.target.value = null; // Clear the selected file
      alert('Please upload a valid file type (JPEG, PNG, or PDF).');
      return;
    }
    this.Panupdatefile = event.target.files[0];
    if (this.Panupdatefile.size <= 1 * 1050 * 1050) {
      // this.imagePreview = true;
      // console.log('imgg', this.Panupdatefile);
      this.imgbpan = event.target.files[0].name;
      // console.log('gh', this.imgbpan)
      const formData = new FormData();
      formData.append('file', this.Panupdatefile);
      // const userId = JSON.parse(localStorage.getItem("userId") ?? '');
      // const Document =  this.AdharBack.DocumentType?.AADHAR_BACK_IMG;
      this.customerService.Document(this.userId, 'PAN_CARD', formData).subscribe((res: any) => {
        // res.Adharimgback;
        this.documentIds.push(res.documentId);
      });
    }
    else {
      alert('File size should not be greater than 5MB');
    }
  }

  BankdetailsCheque(event: any) {
    const file = event.target.files[0];
    const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];

    if (!allowedFileTypes.includes(file.type)) {
      event.target.value = null; // Clear the selected file
      alert('Please upload a valid file type (JPEG, PNG, or PDF).');
      return;
    }
    this.updatedbankFile1 = event.target.files[0];
    if (this.updatedbankFile1.size <= 1 * 1050 * 1050) {
      // this.imagePreview = true;
      // console.log('imgg', this.updatedbankFile1);
      this.imgbank1 = event.target.files[0].name;
      // console.log('gh', this.imgbank1)
      const formData = new FormData();
      formData.append('file', this.updatedbankFile1);
      // const userId = JSON.parse(localStorage.getItem("userId") ?? '');
      // const Document =  this.AdharBack.DocumentType?.AADHAR_BACK_IMG;
      this.customerService.Document(this.userId, 'BANK_CHEQUE', formData).subscribe((res: any) => {
        // res.Adharimgback;
        this.documentIds.push(res.documentId);
      });
    }
    else {
      alert('File size should not be greater than 5MB');
    }
  }

  BankdetailStatement(event: any) {
    const file = event.target.files[0];
    const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];

    if (!allowedFileTypes.includes(file.type)) {
      event.target.value = null; // Clear the selected file
      alert('Please upload a valid file type (JPEG, PNG, or PDF).');
      return;
    }
    this.updatedbankFile2 = event.target.files[0];
    if (this.updatedbankFile2.size <= 1 * 1050 * 1050) {
      // this.imagePreview = true;
      // console.log('imgg', this.updatedbankFile2);
      this.imgbank2 = event.target.files[0].name;
      // console.log('gh', this.imgbank2)
      const formData = new FormData();
      formData.append('file', this.updatedbankFile2);
      // const userId = JSON.parse(localStorage.getItem("userId") ?? '');
      // const Document =  this.AdharBack.DocumentType?.AADHAR_BACK_IMG;
      this.customerService.Document(this.userId, 'BANK_STATEMENT', formData).subscribe((res: any) => {
        // res.Adharimgback;
        this.documentIds.push(res.documentId);
      });
    }
    else {
      alert('File size should not be greater than 5MB');
    }
  }


  uploadGstCertificate(event: any) {
    const file = event.target.files[0];
    const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];

    if (!allowedFileTypes.includes(file.type)) {
      event.target.value = null; // Clear the selected file
      alert('Please upload a valid file type (JPEG, PNG, or PDF).');
      return;
    }
    this.documents1 = event.target.files[0];
    if (this.documents1.size <= 1 * 1050 * 1050) {
      // this.imagePreview = true;
      // console.log('imgg', this.documents1);
      this.imgdocument1 = event.target.files[0].name;
      // console.log('gh', this.imgdocument1)
      const formData = new FormData();
      formData.append('file', this.documents1)
      this.customerService.Document(this.userId, 'GST', formData).subscribe((res: any) => {
        res.Adharimgback;
        this.documentIds.push(res.documentId);
      });
    }
    else {
      alert('File size should not be greater than 5MB');
    }
  }


  uploadIncomeTax(event: any) {
    const file = event.target.files[0];
    const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];

    if (!allowedFileTypes.includes(file.type)) {
      event.target.value = null; // Clear the selected file
      alert('Please upload a valid file type (JPEG, PNG, or PDF).');
      return;
    }
    this.documents2 = event.target.files[0];
    if (this.documents2.size <= 1 * 1050 * 1050) {
      // this.imagePreview = true;
      // console.log('imgg', this.imgdocument2);
      this.imgdocument2 = event.target.files[0].name;
      // console.log('gh', this.imgdocument2)
      const formData = new FormData();
      formData.append('file', this.documents2);
      this.customerService.Document(this.userId, 'ITR', formData).subscribe((res: any) => {
        res.Adharimgback;
        this.documentIds.push(res.documentId);
      });
    }
    else {
      alert('File size should not be greater than 5MB');
    }
  }


  uploadIncorporate(event: any) {
    const file = event.target.files[0];
    const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];

    if (!allowedFileTypes.includes(file.type)) {
      event.target.value = null; // Clear the selected file
      alert('Please upload a valid file type (JPEG, PNG, or PDF).');
      return;
    }
    this.documents3 = event.target.files[0];
    if (this.documents3.size <= 1 * 1050 * 1050) {
      // this.imagePreview = true;
      // console.log('imgg', this.imgdocument3);
      this.imgdocument3 = event.target.files[0].name;
      // console.log('gh', this.imgdocument3)
      const formData = new FormData();
      formData.append('file', this.documents3);
      this.customerService.Document(this.userId, 'INCORPORATION_CERT', formData).subscribe((res: any) => {
        res.Adharimgback;
        this.documentIds.push(res.documentId);
      });
    }
    else {
      alert('File size should not be greater than 5MB');
    }
  }
  onAadhaarFront() {
    this.aadharFront = true
  }
  onAadhaarBack() {
    this.aadharBack = true
  }
  onPanCard() {
    this.panCard = true
  }
  onCancelCheque() {
    this.cancelCheque = true
  }
  onBankStatement() {
    this.bankStatement = true
  }
  onGst() {
    this.gstCertificate = true
  }
  onIncome() {
    this.incomeTax = true
  }
  onIncorporation() {
    this.incorporation = true
  }
  removeAadharFront(event: Event) {
    this.imgname = ""
    event.stopPropagation();
  }
  removeAadharBack(event: Event) {
    this.imgback = ""
    event.stopPropagation();
  }

  removePan(event: Event) {
    this.imgbpan = ""
    event.stopPropagation();
  }
  removeCancelCheque(event: Event) {
    this.imgbank1 = ""
    event.stopPropagation();
  }
  removeBankStatement(event: Event) {
    this.imgbank2 = ""
    event.stopPropagation();
  }
  removeGst(event: Event) {
    this.imgdocument1 = ""
    event.stopPropagation();
  }
  removeIncome(event: Event) {
    this.imgdocument2 = ""
    event.stopPropagation();
  }
  removeIncorporation(event: Event) {
    this.imgdocument3 = ""
    event.stopPropagation();
  }
  salaryContinue() {
    const data = {
      customerKycDetails: {
        documentIds:
          this.documentIds
      },
    }
    this.customerService.UpdateCustomer(this.userId, data).subscribe((res: any) => {
      // console.log(res);
      this.pendingDocments = false;
      this.reviewPropsalDetails = true;
      window.location.reload()
    });
  }
  selfContinue() {
    const data = {
      customerKycDetails: {
        documentIds:
          this.documentIds
      },
    }
    this.customerService.UpdateCustomer(this.userId, data).subscribe((res: any) => {
      // console.log(res);
      this.pendingDocments = false;
      this.reviewPropsalDetails = true;
      window.location.reload()
    });

  }

  authenticationLetter(data){
    sessionStorage.setItem("proposalDetailss", JSON.stringify(this.proposalDetails));
    this.router.navigate(['/authorization-letter/'+data])
  }


  formatProposalDate(dateArray: number[]): string {
    if (!dateArray || dateArray.length < 3) {
      return '';
    }

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const day = dateArray[2];
    const monthIndex = dateArray[1] - 1;
    const year = dateArray[0];

    return `${day} ${months[monthIndex]} ${year}`;
  }
  navigateToLogin(){
    this.router.navigate(['/customer-dashboard'])
  }
  getIntouch(proposalDetails){
    const dialogRef =
    this.dialog.open(GetInTouchNotificationPopupComponent, {
       height:'200px',
       width:'300px',
       data : proposalDetails?.proposalDetailsDto.proposalNumber
    });
    dialogRef.afterClosed().subscribe(
      data => {
        setTimeout(() => {
          this.tooltip = 'your distributor has been notified'
          }, 3000);
      }
    );
  //   dialogRef.afterClosed().subscribe(() => {
  //     this.tooltip = sessionStorage.getItem('notificationMessage');
  // setTimeout(() => {
  //   this.tooltip = ''; 
  // }, 3000);
  //   });
    
    // const distributorMailId = this.proposalDetails?.proposalDetailsDto.distributorEmail;
    // const distributorName = this.proposalDetails?.proposalDetailsDto.distributorName; 
    // const customerName = this.proposalDetails?.proposalDetailsDto.customerName; 
    // const proposalNumber = this.proposalDetails?.proposalDetailsDto.proposalNumber; 
  
    // const subject = encodeURIComponent('[InsurFin] Notification! Customer Query on Proposal');
    // const body = encodeURIComponent(`Dear ${distributorName},%0A%0A${customerName} has questions on the proposal and/or proposal not accepted. Proposal no: #${proposalNumber}. Please get in touch with the customer.%0A%0AWarm Regards,%0AInsurFin`);
  
    // const mailtoUrl = `mailto:${distributorMailId}?subject=${subject}&body=${body}`;
    // window.location.href = mailtoUrl;
  }

}
