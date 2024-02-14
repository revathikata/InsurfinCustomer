import { Component, OnInit } from '@angular/core';
import { CustomerServiceService } from '../services/customer-service.service';
import { Router } from '@angular/router';
import { SharedService } from '../services/shared.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginServicesService } from '../services/login-services.service';

@Component({
  selector: 'app-praposal-accepted-successfully',
  templateUrl: './praposal-accepted-successfully.component.html',
  styleUrls: ['./praposal-accepted-successfully.component.css'],
})
export class PraposalAcceptedSuccessfullyComponent implements OnInit {
  proposalAccepted = true;
  lenderService = false;
  getUserId: any;
  proposalId: any;
  success: boolean = false;
  transferAmount: boolean = false;
  trasnferSuccess: boolean = false;
  distributorId: any;
  proposalNumberr: any;
  showlender: boolean = false;
  AadharValid: boolean = false;
  AadharForm!: FormGroup
  getaadharNumber: any;
  AadharMismatchError: any;
  AadharVerifiedMsg: any;
  isLoanSubmitted: boolean = false;
  constructor(
    private customerService: CustomerServiceService,
    private loginService: LoginServicesService,
    private router: Router,
    public sharedService: SharedService, private formbuilder: FormBuilder,
  ) { }
  ngOnInit(): void {
    this.getUserId = JSON.parse(sessionStorage.getItem('UserId') ?? 'null');
    this.proposalNumberr = JSON.parse(sessionStorage.getItem('proposalNumber') ?? 'null');
    // this.lenderdetails();
    this.showlender = JSON.parse(sessionStorage.getItem('showLenderPage') ?? 'null')
    this.AadharForm = this.formbuilder.group({
      aadhaarnum: [, [Validators.required, Validators.pattern("^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$")]],
      reEnteraadhaarnum: [, [Validators.required, Validators.pattern("^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$")]],
    }, { validators: this.matchpassword });

    if (this.showlender === true) {
      this.proposalAccepted = false;
      this.transferAmount = true;
      this.lenderService = false;
    }
    else {
      this.proposalAccepted = true;
      this.transferAmount = false;
      this.lenderService = false;
    }
    this.getCustomerInfo()
  }

  matchpassword(AadharForm: FormGroup) {
    return AadharForm.controls['aadhaarnum'].value && AadharForm.controls
    ['aadhaarnum'].value === AadharForm.controls['reEnteraadhaarnum'].value ? AadharForm.controls
    ['reEnteraadhaarnum'].setErrors(null) : AadharForm.controls['reEnteraadhaarnum'].setErrors({ 'misMatch': true })
  }
  // passwordValidator(): ValidatorFn {
  //   return (control: AbstractControl): { [key: string]: any } | null => {
  //     const passwordPattern = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[A-Z]).{8,15}$/;
  //     const valid = passwordPattern.test(control.value);
  //     return valid ? null : { invalidPassword: true };
  //   };
  // }
  // continuePayment() {
  //   // this.proposalAccepted = false;
  //   // this.proposalAccepted = false;
  //   // this.transferAmount = false;
  //   // this.lenderService = true;
  // }
  getCustomerInfo() {
    this.loginService.getCustomerdata(this.getUserId).subscribe((res: any) => {
      this.getaadharNumber = res?.data.aadhaarNumber
    });
  }
  AadharValidationPage() {
    this.AadharValid = true;
  }
  InputAadharValidation(value) {
    if (this.getaadharNumber.substr(8)
      !== this.AadharForm.controls['reEnteraadhaarnum'].value.substr(8)) {
      this.AadharMismatchError = "Aadhaar mismatch. Last 4 digits of the entered Aadhaar don't match the one with distributor."
      return;
    }
    else {
      // this.AadharVerifiedMsg = "Aadhar Verified"
      this.AadharMismatchError = ''
    }
  }
  AadharValidation() {
    const data = {
      "aadhaarNumber": this.AadharForm.controls['reEnteraadhaarnum'].value,
      "proposalNumber": this.proposalNumberr,
      "userId": this.getUserId
    }
    this.customerService.loanInitiated(data).subscribe((res: any) => {
      if (res?.error == false) {
             this.isLoanSubmitted = true;
             this.proposalAccepted = false;
      }
    });

  }
  escrowService() {
    this.success = true;
    setTimeout(() => {
      this.transferAmount = true;
      this.lenderService = false;
    }, 2000);
    // this.distributorId = this.sharedService.getDistributorId();
    // this.proposalNumberr = this.sharedService.getproposalNumber(); 
    // this.customerService.sendNotificationToCustomer(this.getUserId,this.distributorId,this.proposalNumberr).subscribe((res: any) => {});
    if (sessionStorage.getItem('proposalId') != null) {
      // this.proposalId = sessionStorage.getItem('proposalId');
      this.proposalId = this.sharedService.getCustomerProposalDetails()
    }
    else {
      this.proposalId = sessionStorage.getItem('proposalId');

    }
    const data = {
      lenderId: '64a2b6023b2d6b27cab17148',
      proposalId: this.proposalId,
      status: 'approve',
    };
    this.customerService.lenderPage(data).subscribe((res: any) => {
      // console.log(res);
    });
  }

  navigateToProposaldetails() {
    // this.sharedService.pendingDocuments = true;
    // this.sharedService.mainDashboard = false;
    this.router.navigate(['/customer-dashboard']);
  }

  navigateToProposal() {
    this.proposalAccepted = true
    this.lenderService = false
    this.transferAmount = false
  }
  navigateToLender() {
    // this.proposalAccepted = false
    // this.lenderService = true
    // this.transferAmount = false
    this.router.navigate(['/customer-dashboard'])
  }

  transferMoney() {
    setTimeout(() => {
      this.trasnferSuccess = true;
    }, 1000);
    // this.proposalId = sessionStorage.getItem('proposalId');
    if (sessionStorage.getItem('proposalId') != null) {
      // this.proposalId = sessionStorage.getItem('proposalId');
      this.proposalId = this.sharedService.getCustomerProposalDetails()
    }
    else {
      this.proposalId = sessionStorage.getItem('proposalId');

    }
    const data = {
      customerId: this.getUserId,
      lenderId: "64a2b6023b2d6b27cab17148",
      proposalId: this.proposalId
    }
    this.customerService.lenderTransferAmount(data).subscribe((res: any) => {
      // console.log(res.error);
    })
  }

  //   lenderdetails(){
  //     const data = {

  //     }
  //     this.proposalId = sessionStorage.getItem("proposalId");
  //     this.customerService.lenderPage(this.proposalId).subscribe((res:any) =>{
  // console.log(res);

  //     })
  //   }

  navigateToReviewProposal(){
    this.router.navigate(['./review-Proposal']);
  }
  navigateToDashboard(){
    this.router.navigate(['/customer-dashboard']);
  }
}
