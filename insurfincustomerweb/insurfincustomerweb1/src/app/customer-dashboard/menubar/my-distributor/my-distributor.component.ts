import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerServiceService } from 'src/app/services/customer-service.service';
import { SharedService } from 'src/app/services/shared.service';
import { MenubarComponent } from '../menubar.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-my-distributor',
  templateUrl: './my-distributor.component.html',
  styleUrls: ['./my-distributor.component.css']
})
export class MyDistributorComponent {
  customerId: any;
  distributorList: any;
  distributorId: any;
  distributorviewDetails: any;
  data: any[]=[];

  ngOnInit(): void {
    this.getDistributor();
    // this.DistributorDetails()
  }
  constructor( private customerService : CustomerServiceService,
   private router:Router, private sharedservice:SharedService , private dialog :MatDialog){}
  myDistributor=true
  viewCustomer=false

  viewDetails(){
   this.myDistributor=false
   this.viewCustomer=true
  //  console.log(this.distributorId);
   this.DistributorDetails();
  }
  navigateBackArrow(){
    this.viewCustomer =false
    this.myDistributor = true;
  }
  getDistributor(){
    this.customerId = JSON.parse(localStorage.getItem('userId')?? '')
    this.customerService.customerGetDistributor(this.customerId).subscribe((res:any) =>{
      // console.log(res,'res');
      this.distributorList = res.data;
      this.distributorId = res.data[0].distributorId
    })
  }
  DistributorDetails(){
  //  this.distributorId = this.sharedService.getDistributorId()
   let customerid=JSON.parse(localStorage.getItem('userId')?? '')
   this.customerService.distributorDetails(customerid, this.distributorId).subscribe({
    next:(response:any) =>{
       this.distributorviewDetails= response?.data
    },
    error: (error) => {
      console.error(error);
    },
    complete: () => {
      console.log('API call completed');
    }  
  })
  }
  // getCountByFeild(field: any) {
  //   let i = this.distributorviewDetails?.customerProposal?.findIndex(rec => rec.customerProposal == field);
  //   if (i > -1) {
  //     return this.distributorviewDetails.customerProposal[i];
  //   }
  //   else {
  //     return 0;
  //   }
  // }
  SeletctedProposalIndex = 0;
  ArrowClick(){
    this.SeletctedProposalIndex++;
    if (this.SeletctedProposalIndex >= this.distributorviewDetails?.customerProposal.length ) {
      this.SeletctedProposalIndex = 0;
    }
  }
  reviewProposal(){
    this.router.navigate(['./review-Proposal'])
   this.data = this.distributorviewDetails?.customerProposal?.[this.SeletctedProposalIndex]
   this.sharedservice.setCustomerProposalDetails(this.data)
  }
  leftArrow(){
    this.SeletctedProposalIndex--;
    if (this.SeletctedProposalIndex <= this.distributorviewDetails?.customerProposal.length ) {
      this.SeletctedProposalIndex = 0;
    }
  }
  openMenuBar(){
    this.dialog.open(MenubarComponent)
  }
}
