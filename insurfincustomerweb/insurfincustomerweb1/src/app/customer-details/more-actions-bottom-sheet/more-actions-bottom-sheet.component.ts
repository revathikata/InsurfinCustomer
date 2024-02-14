import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { ContactNumberPopupComponent } from './contact-number-popup/contact-number-popup.component';


@Component({
  selector: 'app-more-actions-bottom-sheet',
  templateUrl: './more-actions-bottom-sheet.component.html',
  styleUrls: ['./more-actions-bottom-sheet.component.css']
})
export class MoreActionsBottomSheetComponent {
  proposalDetails: any;
  distributorphone: any;
  customerPhnNum:any;
  constructor(
    private bottomsheet: MatBottomSheet, @Inject(MAT_BOTTOM_SHEET_DATA) public documentType: string,
    private bottomSheetRef: MatBottomSheetRef<MoreActionsBottomSheetComponent>,
    private dialog: MatDialog) { }
  ngOnInit(): void {
    this.proposalDetails = JSON.parse(sessionStorage.getItem('proposalDt') ?? 'null');
    this.distributorphone = this.proposalDetails.proposalDetailsDto?.distributorPhoneNumber
    this.customerPhnNum = JSON.parse(sessionStorage.getItem('phoneNumber') ?? '')
  }

  selectOption(option: any, additionalParam: any) {
    // console.log(option.target.value , additionalParam);
    localStorage.setItem('sortfunctionality', JSON.stringify({ option: option.target.value, additionalParam }));
    this.bottomSheetRef.dismiss();
    window.location.reload()
  }

  close() {
    this.bottomSheetRef.dismiss()
  }
  // contactAdviser(){
  //   this.dialog.open(ContactNumberPopupComponent)
  // }
  openMail() {
    const recipient = 'CustomerCare@insurfin.in';
    const subject = encodeURIComponent('[InsurFin] Customer Query');
    const customerName = this.proposalDetails.proposalDetailsDto?.customerName;
    const proposalNumber = this.proposalDetails.proposalDetailsDto?.proposalNumber;
    const body = encodeURIComponent(`To,\nThe Customer Care,\nInsurFin.\n\nI have a query regarding my account with InsurFin. My Proposal Number is #${proposalNumber}.\n\nFrom:${customerName},\nPhone number:${this.customerPhnNum} `);

    const mailtoUrl = `mailto:${recipient}?subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;
  }
}
