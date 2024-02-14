import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CustomerServiceService } from 'src/app/services/customer-service.service';

@Component({
  selector: 'app-access-location',
  templateUrl: './access-location.component.html',
  styleUrls: ['./access-location.component.css']
})
export class AccessLocationComponent {
  lat;
  lng;
  constructor(private dialog: MatDialog,public dialogRef: MatDialogRef<AccessLocationComponent>,private customerService: CustomerServiceService,) { }
  allowLocation() {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        // console.log("latitude = ", this.lat, "longitude = ", this.lng, "location");

        this.customerService.getCurrentAddressUsingLATLONG(this.lat,this.lng).subscribe({
          next:(res)=>{
            // console.log(res);
            this.dialogRef.close(res);
          },
          error:(err)=>{
            // console.log(err);
            this.dialogRef.close(null);
          }
        })
     });

    } else {
      // console.log("User not allow");
      alert("User has not given permission for accessing location");

    }
    // this.dialog.open(AddressPopupComponent);
  }
}
