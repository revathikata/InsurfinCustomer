import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

public pendingDocuments : Boolean = false
public mainDashboard : Boolean = true
  distributorid: any;
  customerDetails: any;
  proposalNum: any;


  constructor() { }

  setDistributorId(id){
    this.distributorid = id;
  }
getDistributorId(){
  return this.distributorid
}
setCustomerProposalDetails(list){
  this.customerDetails = list;
}
getCustomerProposalDetails(){
 return this.customerDetails 
}
setproposalNumber(number){
  this.proposalNum = number;
}
getproposalNumber(){
  return this.proposalNum
}
}
