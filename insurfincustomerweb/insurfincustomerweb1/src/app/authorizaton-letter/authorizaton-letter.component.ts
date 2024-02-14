import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoreActionsBottomSheetComponent } from '../customer-details/more-actions-bottom-sheet/more-actions-bottom-sheet.component';
import { HttpClient } from "@angular/common/http";
import { AccessLocationComponent } from '../location-popups/access-location/access-location.component';
import { MatDialog } from '@angular/material/dialog';
import { CustomerServiceService } from '../services/customer-service.service';
import { MatCheckboxChange } from '@angular/material/checkbox';
@Component({
  selector: 'app-authorizaton-letter',
  templateUrl: './authorizaton-letter.component.html',
  styleUrls: ['./authorizaton-letter.component.css']
})
export class AuthorizatonLetterComponent {
  private _bottomSheet: any;
  divToShow: any;
  checkBox = false;
  proposalAccepted: boolean = true;
  geoLocation: any;
  ipAddress: any;
  currentAddressValue: any;
  customerName: any;
  phoneNumber: any;
  proposalNumber: any;
  timeDate = new Date();
  div1: any;
  uuid: any;
  geoLoc: any;
  completedValue: any;
  completedValue2: any;
  sendValue: any;
  checkedValue: boolean = false;
  checkedValue2: boolean = false;
  checkedValue3: boolean = false;
  allchecked: any;
  browserName: any;
  timeStamp: any;
  completedValue3: any;
  prosalDetails: any;
  letterType: any;
  email: any;
  constructor(private router: Router, private route: ActivatedRoute,
    private dialog: MatDialog, private http: HttpClient, private customerService: CustomerServiceService,) {
    // this.div1 = this.route.snapshot.params['div1'];
  }

  ngOnInit() {

    const customername = JSON.parse(sessionStorage.getItem('SetName') ?? 'null').toLowerCase();
   // this.customerName = customername.charAt(0).toUpperCase() + customername.slice(1);
   const words = customername.split(' ');

   // Capitalize the first letter of each word
   this.customerName = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  
   this.prosalDetails = JSON.parse(sessionStorage.getItem('proposalDetailss') ?? 'null');
    this.proposalNumber = JSON.parse(sessionStorage.getItem('proposalNumber') ?? 'null');
    this.uuid = JSON.parse(sessionStorage.getItem('UserId') ?? 'null');
    this.phoneNumber = JSON.parse(sessionStorage.getItem('phoneNumber') ?? 'null');
    this.email = JSON.parse(sessionStorage.getItem('email') ?? 'null');
    this.route.params.subscribe(params => {
      this.divToShow = params['divId'];
    });
    // console.log((new Date().getTime()));
    this.timeStamp = "";

    if (JSON.parse(sessionStorage.getItem("sendValue2") ?? 'null') !== null) {
      this.checkedValue2 = true
      // this.allchecked = 1
    }
    if (JSON.parse(sessionStorage.getItem("sendValue") ?? 'null') !== null) {
      this.checkedValue = true
      // this.allchecked = 1
    }
    if (JSON.parse(sessionStorage.getItem("sendValue3") ?? 'null') !== null) {
      this.checkedValue3 = true
      // this.allchecked = 1
    }
    this.allchecked = 1;
    this.allchecked  += this.checkedValue ? 1 : 0;
    this.allchecked  += this.checkedValue2 ? 1 : 0;
    this.allchecked  += this.checkedValue3 ? 1 : 0;
    this.allchecked = Math.min(this.allchecked, 3);
    // this.geoLocation = JSON.parse(sessionStorage.getItem('addressDetails') ?? 'null');
    //     this.http.get("http://api.ipify.org/?format=json").subscribe((res:any)=>{
    //   this.ipAddress = res.ip;
    //   console.log(this.ipAddress);

    // });

  }


  navigateToHome() {
    this.router.navigate(['/review-Proposal'])
  }
  navigateToLogin() {
    this.router.navigate(['/customer-dashboard'])
  }
  openBottomSheet(): void {
    this._bottomSheet.open(MoreActionsBottomSheetComponent, {
      data: 'MoreActions',
      panelClass: 'custom-fixed-bottom-sheet',
    });
  }
  onAccept() {
    this.proposalAccepted = false
  }
  onAccept1() {
    this.proposalAccepted = false
    this.completedValue = 1
    sessionStorage.setItem('sendValue', JSON.stringify(this.completedValue))
    this.checkedValue = true
    // if (this.checkedValue && this.checkedValue2 == true) {
    //   this.allchecked = 2
    // } else {
    //   this.allchecked = 1
    // }
  }
  onAccept2() {
    this.proposalAccepted = false
    this.completedValue2 = 2
    sessionStorage.setItem('sendValue2', JSON.stringify(this.completedValue2))
    this.checkedValue2 = true
    // if (this.checkedValue && this.checkedValue2 == true) {
    //   this.allchecked = 2
    // } else {
    //   this.allchecked = 1
    // }
  }
  onAccept3() {
    this.proposalAccepted = false
    this.completedValue3 = 3
    sessionStorage.setItem('sendValue3', JSON.stringify(this.completedValue3))
    this.checkedValue3 = true
    // if (this.checkedValue && this.checkedValue2 == true) {
    //   this.allchecked = 2
    // } else {
    //   this.allchecked = 1
    // }
  }
  openProposal() {
    if(this.divToShow === 'div1'){
     this.letterType = "INSURER_PAYMENT_AUTH"
    }
    if(this.divToShow === 'div2'){
      this.letterType = "INSURER_POLICY_ACTION"
    }
    if(this.divToShow === 'div3'){
      this.letterType = "LENDER_AUTH_SIGNED"
    }
    const data = {
      "type": this.letterType,
      "geoLocation": this.currentAddressValue?.address[0] + ',' + this.currentAddressValue?.address.slice(1).join(',') +
        + this.currentAddressValue?.city + ',' + this.currentAddressValue?.state + ',' + this.currentAddressValue?.country,
      "ipAddress": "2405:201:5019:802b:2d5b:19f4:28b2:882c",
      "borrowerName": this.customerName,
      "timeStamp": this.timeStamp,
      "mobileNumber": this.phoneNumber,
      "policyNumber": this.proposalNumber,
      "uuid": this.uuid
    }
    this.customerService.proposalComplted(data).subscribe((res: any) => {
    });
    this.router.navigate(['/review-Proposal'], { queryParams: { value: this.allchecked } })
  }

  locationAccessGranted: boolean = false;
  yourLocation(event: MatCheckboxChange) {
    let dialogRef;
    if (event.checked) {
      const timeStamp = (new Date().getTime());
      const date = new Date(timeStamp);
      const day = String(date.getDate()).padStart(2, '0');
      // const month = String(date.getMonth() + 1).padStart(2, '0');
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']; 
      const monthIndex = date.getMonth(); const month = months[monthIndex];
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');

      this.timeStamp = `${day} ${month} ${year} ${hours}:${minutes}:${seconds}`;
      const customername = JSON.parse(sessionStorage.getItem('SetName') ?? 'null').toLowerCase();
      const words = customername.split(' ');

// Capitalize the first letter of each word
this.browserName = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      //this.browserName = customername.charAt(0).toUpperCase() + customername.slice(1);
      this.phoneNumber = JSON.parse(sessionStorage.getItem('phoneNumber') ?? 'null');
      dialogRef = this.dialog.open(AccessLocationComponent, {
        width: '270px',
      })






      dialogRef.afterClosed().subscribe((res) => {
        // console.log(this.communicationAddress.value);
        // console.log(res);
        // let userEnteredAddress = this.communicationAddress.value;
        if (res) {
          let firstAddress = res.results[0 || 1 || 2];
          let tempAddress = []
          let addressObj: any = {
            address: []
          };
          firstAddress.address_components.forEach(x => {
            if (x.types.indexOf('country') !== -1) {
              addressObj['country'] = x.long_name;
            }
            if (x.types.indexOf('postal_code') !== -1) {
              addressObj['pincode'] = x.long_name;
            }
            if (x.types.indexOf('administrative_area_level_1') !== -1) {
              addressObj['state'] = x.long_name;
            }
            if (x.types.indexOf('administrative_area_level_3') !== -1) {
              addressObj['town'] = x.long_name;
            }
            if (x.types.indexOf('locality') !== -1) {
              addressObj['city'] = x.long_name;
            }
            if (x.types.indexOf('sublocality') !== -1 || x.types.indexOf('neighborhood') !== -1 || x.types.indexOf('route') !== -1 || x.types.indexOf('street_number') !== -1) {
              addressObj['address'].push(x.long_name);
            }
          })
          addressObj['formatted_Address'] = firstAddress.formatted_address;
          addressObj['location'] = firstAddress.geometry.location;
          // this.latitude = firstAddress.geometry.location.lat,
          // this.langitude = firstAddress.geometry.location.lng
          this.currentAddressValue = addressObj
          console.log(this.currentAddressValue);

          let isUserAdressMatched = false;
          // if(addressObj.address.indexOf(userEnteredAddress.addressline1) !== -1) 
          //   isUserAdressMatched = true;
          addressObj.address.forEach((address: string) => {
            // if (address.toLowerCase() === userEnteredAddress.addressline1.toLowerCase() ||
            //   address.toLowerCase() === userEnteredAddress.addressline2.toLowerCase()) {
            //   isUserAdressMatched = true;
            // }
          })
          // if(addressObj.address.indexOf(userEnteredAddress.addressline2) !== -1) 
          // isUserAdressMatched = true;
          // if (isUserAdressMatched) {
          //   // Need to call api or need to add one flag for stating that user address is matched with geo address
          //   // alert("Address matched");
          // this.appendCurrentAddresss(addressObj, true);
          //   const dialogRef = this.dialog.open(LocationSuccessComponent);
          //   dialogRef.afterClosed().subscribe(() => {
          //     //  this.selectedIndex = 1;
          //     // this.communicationAddressContinue();
          //   });
          //   // this.permanentAddressContinue();

          // } else {
          //   let dialogRef2 = this.dialog.open(DetectedWrongaddressComponent);
          //   //this.communicationAddressContinue();
          //   dialogRef2.afterClosed().subscribe((res) => {
          //     if (res) {
          //       if (res == 'detectGeoAddress') {
          //         this.yourLocation();
          //       } else if (res == 'continueGeoAddress') {
          //         // Show geo address in the new tab as per figma with the addressObj data with disable fields
          //         // console.log(addressObj);
          //         this.showCurrentAddress = true;
          //         this.appendCurrentAddresss(addressObj, false);
          //       }
          //     }
          //   });
          // }
          this.locationAccessGranted = true;
        }


      });
    }


    else if (!event.checked) {
      this.timeStamp = ""
      const customername = ""
      this.browserName = ""
      this.phoneNumber = ""
    }
  }

}
