import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerServiceService } from '../services/customer-service.service';
import { MenubarComponent } from './menubar/menubar.component';
import { MatDialog } from '@angular/material/dialog';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MoreActionsBottomSheetComponent } from '../customer-details/more-actions-bottom-sheet/more-actions-bottom-sheet.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../services/shared.service';
import { NgxSpinner, NgxSpinnerService, Spinner } from 'ngx-spinner';


@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent {
 
  
  proposalId : any
  allDetails: any;
  mainDashboard=true
  customerId: any;
  uploadingdocuments=false
  aadharFront = false
  updatefilefrnt: any;
  imgname: any;
  proposaldocument=true
  aadharBack:any;
  updatefileback: any;
  imgback: any;
  imgbpan: any;
  Panupdatefile: any;
  panCard: any;
  cancelCheque:any;
  bankStatement:any;
  updatedbankFile1: any;
  imgbank1: any;
  updatedbankFile2: any;
  imgdocument1: any;
  imgdocument2: any;
  imgdocument3: any;
  documents2: any;
  documents3: any;
  documents1: any;
  incorporation = false
  incomeTax = false
  gstCertificate = false
  imgbank2: any;
  selfForm!: FormGroup;
  salaryForm!: FormGroup;
  salary:boolean = true
  pendingDocuments = false
  uploadDocuments = false
  documentIds: any[] = [];
  userId: any;
  selectedCustomerData:any=[]
  panelOpenState!: boolean
  customerProposalDetails: any;
  proposalcounts: any=[];
  newProposals =true
  data: any;
  distributorIdd: any;
  loanDisbursedList: any[] =[];
  lenderpage: boolean = false;
  Allpolicies: any;
  selectedSortingOption: string = 'LowtoHigh';
  constructor( private router:Router,
    private route: ActivatedRoute, private customerService : CustomerServiceService ,
    private dialog:MatDialog , private _bottomSheet: MatBottomSheet , private formBuilder:FormBuilder , 
    public sharedService: SharedService , private spinner:NgxSpinnerService){}

  ngOnInit() {
    sessionStorage.removeItem('sendValue')
    sessionStorage.removeItem('sendValue2')
    sessionStorage.removeItem('sendValue3')
    const storedData = JSON.parse(localStorage.getItem('sortfunctionality')??'null');
    if (storedData) {
      const { option, additionalParam } = storedData;
      this.selectedSortingOption = additionalParam;
      // console.log(storedData);
      console.log(this.selectedSortingOption);
    }
    // this.route.queryParams
    // .subscribe(params => {
      // console.log(params); // { orderby: "price" }
      // this.proposalId = params.proposalId;
      // console.log(this.proposalId); // price
    // }
  // );

  // let customerid=JSON.parse(localStorage.getItem('userId')?? '')
  // this.customerService.getproposalpolicydetails(customerid).subscribe({
  //   next:(response:any) =>{
  //     let resp = response.data
  //     console.log(resp);
  //   },
  //   error: (error) => {
  //     console.error(error);
  //   },
  //   complete: () => {
  //     console.log('API call completed');
  //   }  
  // })

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
  // this.proposalId = sessionStorage.getItem("proposalId");
  // this.userId = JSON.parse(localStorage.getItem("userId") ?? '');
  // this.proposalId = this.route.snapshot.queryParamMap.get('proposalId');
  // console.log(this.proposalId,'prop');
  // if(this.proposalId){
    // this.getAllProposalDetails()
  //  }
   this.viewCustomerDetails()
}


   
    // First get the product id from the current route.
    // const routeParams = this.route.snapshot.paramMap;
    // const proposalIdFromRoute = Number(routeParams.get(''));
    // this.proposalId = this.route.snapshot.paramMap.get('id')
    // Find the product that correspond with the id provided in route.
    // this.proposal = proposalId.find(proposal => proposal.id === proposalIdFromRoute);
 
    currentProposalIndex = 0;
    nextproposal(){
      // alert('ok')
      this.currentProposalIndex++;

      if (this.currentProposalIndex >= this.proposalcounts.length) {
        this.currentProposalIndex = 0;
      }
    }
    leftArrow(){
      this.currentProposalIndex--;

  if (this.currentProposalIndex < 0) {
    this.currentProposalIndex = this.proposalcounts.length - 1;
  }
    }
  reviewProposal(){
    this.spinner.show()
    setTimeout(() => {
      this.spinner.hide()
      this.lenderpage = false
      sessionStorage.setItem('proposalNumber', JSON.stringify(this.proposalcounts?.[this.currentProposalIndex].proposalNumber));
    localStorage.setItem('showLenderPage', JSON.stringify(this.lenderpage));
    this.data = this.proposalcounts?.[this.currentProposalIndex].proposalId
     this.router.navigate(['./review-Proposal'])
     sessionStorage.setItem('proposalDataa', JSON.stringify(this.data)); 
    // this.sharedService.setCustomerProposalDetails(this.data)
    // console.log(this.data,'accpt');
    }, 3000);
  }
  LoanInitiantBtn(){
    this.spinner.show()
    setTimeout(() => {
      this.spinner.hide()
    sessionStorage.setItem('proposalNumber', JSON.stringify(this.proposalcounts?.[this.currentProposalIndex].proposalNumber));
    this.data = this.proposalcounts?.[this.currentProposalIndex].proposalId
    // this.sharedService.setCustomerProposalDetails(this.data)
    sessionStorage.setItem('proposalDataa', JSON.stringify(this.data)); 
    this.router.navigate(['./review-Proposal'],{ queryParams: { view: 'view' }})
  }, 3000);
  }
  acceptProposal(){
    // const data = {
    //   customerId : this.customerId,
    //   proposalId : this.proposalId,
    //   status : 'ACCEPT'
    // }
    this.customerService.proposalUpadateStatus(this.proposalId,'ACCEPT').subscribe((res:any) =>{
    });
   this.router.navigate(['./proposal-accepted'])
  }
  getAllProposalDetails(){
    this.proposalId = sessionStorage.getItem("proposalId");
    this.customerService.getproposaldetails(this.proposalId).subscribe((res:any) =>{
    this.allDetails = res?.data    
    });
    let customerid=JSON.parse(sessionStorage.getItem('UserId')?? '')
    this.customerService.getproposalpolicydetails(customerid).subscribe({
      next: (response: any) => {
        this.customerProposalDetails = response?.data;
        // console.log(this.customerProposalDetails, 'customerDetails');
        this.proposalcounts = response.data.customerProposal.filter((proposal: any) => proposal.displayStatus === 'Proposal acceptance pending' 
        || proposal.displayStatus === 'Waiting for documentation' || proposal.displayStatus === 'Proposal Accepted' || proposal.displayStatus === 'Escrow account created successfully');
        this.loanDisbursedList = response.data.customerProposal.filter((proposal: any) => proposal.displayStatus === 'Loan disbursed successfully');	
        // console.log(this.proposalcounts, 'prop');
        this.Allpolicies = response?.data.customerPolicy
        // console.log(this.Allpolicies);
        // Apply switch case based on selectedSortingOption
    switch (this.selectedSortingOption) {
      case 'LowtoHigh':
        this.Allpolicies.sort((a: any, b: any) => a.premiumAmount - b.premiumAmount);
        break;
      case 'HightoLow':
        this.Allpolicies.sort((a: any, b: any) => b.premiumAmount - a.premiumAmount);
        break;
      case 'alphabetical':
        this.Allpolicies.sort((a: any, b: any) => a.productName.localeCompare(b.productName));
        break;
      case 'EMIs':
        this.Allpolicies.sort((a: any, b: any) => b.emisOutstanding - a.emisOutstanding);
        break;
      case 'ClosesttoFarthest':
        this.Allpolicies.sort((a: any, b: any) => a.policyTenure - b.policyTenure);
        break;
      default:
        // Default sorting option
        this.Allpolicies.sort((a: any, b: any) => a.premiumAmount - b.premiumAmount);
        break;
    }
      },
      error: (error) => {
        // console.error(error);
      }
    });
    
  }

  selectcard(){
    if( this.proposalcounts >= 1){
    // this.proposalData = 
    }
   
  }
  menubar(){
    this.dialog.open(MenubarComponent)
  }
  openBottomSheet(documentType: string): void {
    this._bottomSheet.open(MoreActionsBottomSheetComponent,{
      data: documentType
    });
    localStorage.removeItem('sortfunctionality')
  }

  uploadNow(){
    this.uploadDocuments=true
    this.mainDashboard = false
    this.pendingDocuments = false
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
      // const userId = JSON.parse(localStorage.getItem("userId") ?? '');
      // const Document =  this.AdharBack.DocumentType?.AADHAR_BACK_IMG;
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
      console.log('imgg', this.Panupdatefile);
      this.imgbpan = event.target.files[0].name;
      console.log('gh', this.imgbpan)
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
      console.log('imgg', this.updatedbankFile1);
      this.imgbank1 = event.target.files[0].name;
      console.log('gh', this.imgbank1)
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
      console.log('imgg', this.updatedbankFile2);
      this.imgbank2 = event.target.files[0].name;
      console.log('gh', this.imgbank2)
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
      console.log('imgg', this.documents1);
      this.imgdocument1 = event.target.files[0].name;
      console.log('gh', this.imgdocument1)
      const formData = new FormData();
      formData.append('file', this.documents1)
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
      console.log('imgg', this.imgdocument2);
      this.imgdocument2 = event.target.files[0].name;
      console.log('gh', this.imgdocument2)
      const formData = new FormData();
      formData.append('file', this.documents2)
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
      console.log('imgg', this.imgdocument3);
      this.imgdocument3 = event.target.files[0].name;
      console.log('gh', this.imgdocument3)
      const formData = new FormData();
      formData.append('file', this.documents3)
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
  

  }
  removeAadharBack(event: Event) {
    this.imgback = ""
    event.stopPropagation();
  }
  removePan(event: Event) {
    this.imgbpan = ""
   
  }
  removeCancelCheque(event: Event) {
    this.imgbank1 = ""

  }
  removeBankStatement(event: Event) {
    this.imgbank2 = ""
    
  }
  removeGst(event: Event) {
    this.imgdocument1 = ""
    
  }
  removeIncome(event: Event) {
    this.imgdocument2 = ""
  
  }
  removeIncorporation(event: Event) {
    this.imgdocument3 = ""
   
  }

  salaryContinue() {
    const data = {
      customerKycDetails: {
        documentIds: 
          this.documentIds
        
      },
    }
    this.customerService.UpdateCustomer(this.userId, data).subscribe((res:any) =>{
console.log(res);
this.mainDashboard = false
this.uploadDocuments= false
this.pendingDocuments = true
    });
  }
  selfContinue() {
    const data = {
      customerKycDetails: {
        documentIds: 
          this.documentIds
      },
    }
    this.customerService.UpdateCustomer(this.userId, data).subscribe((res:any) =>{
// console.log(res);
this.mainDashboard = false
this.uploadDocuments= false
this.pendingDocuments = true
    });

  }
  documentUpload(){
    const data = {
      customerKycDetails: {
        documentIds: [
          this.documentIds
        ]
      },
    }
    this.customerService.UpdateCustomer(this.userId, data).subscribe((res:any) =>{
console.log(res);

    });
  }
  viewCustomerDetails() {
    this.selectedCustomerData = {};
    this.userId = JSON.parse(sessionStorage.getItem('UserId')?? 'null')
    this.customerService.getCustomerInfoById(this.userId).subscribe({
      next: (res) => {
        this.selectedCustomerData = res?.data.customerProposal; 
        this.proposalcounts = res?.data.customerProposal.filter((proposal: any) => proposal.displayStatus === 'Proposal acceptance pending' 
        || proposal.displayStatus === 'Waiting for documentation' || proposal.displayStatus === 'Proposal Accepted' || proposal.displayStatus === 'Escrow account created successfully');
        this.loanDisbursedList = res?.data.customerProposal.filter((proposal: any) => proposal.displayStatus === 'Loan disbursed successfully');	
        // console.log(this.proposalcounts, 'prop');
        this.Allpolicies = res?.data.customerPolicy
             
      },
      error: (err) => {
        // console.log(err);
      }
    })
  }
  navigateToHome(){
    this.sharedService.pendingDocuments = false
    this.sharedService.mainDashboard = true
  }
  continueProcessToLender(){
    // this.proposalcounts.filter((proposal: any) => {
    //   if(proposal.displayStatus === 'Escrow account created successfully'){
        this.lenderpage = true
        localStorage.setItem('showLenderPage', JSON.stringify(this.lenderpage));
        this.router.navigate(['./proposal-accepted'])
        this.data = this.proposalcounts?.[this.currentProposalIndex].proposalId
        this.sharedService.setCustomerProposalDetails(this.data)
      // }
      // else if(proposal.displayStatus === 'Proposal Accepted'){
      //   this.router.navigate(['./proposal-accepted'])
      //   this.data = this.proposalcounts?.[this.currentProposalIndex].proposalId
      //   this.sharedService.setCustomerProposalDetails(this.data)
      // }
  // })
  }
  continueProcessAccepted(){
    this.lenderpage = false
    localStorage.setItem('showLenderPage', JSON.stringify(this.lenderpage));
    this.router.navigate(['./proposal-accepted'])
    this.data = this.proposalcounts?.[this.currentProposalIndex].proposalId
    sessionStorage.setItem('proposalNumber', JSON.stringify(this.proposalcounts?.[this.currentProposalIndex].proposalNumber));  
    // this.sharedService.setCustomerProposalDetails(this.data)
  }
  
  navigateToReviewProposal(){
    this.router.navigate(['./review-Proposal'])
  }
}