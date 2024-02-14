import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomerServiceService } from 'src/app/services/customer-service.service';

@Component({
  selector: 'app-get-in-touch-notification-popup',
  templateUrl: './get-in-touch-notification-popup.component.html',
  styleUrls: ['./get-in-touch-notification-popup.component.css']
})
export class GetInTouchNotificationPopupComponent {
  uuid: any;
  constructor(private customerService: CustomerServiceService, private dialogRef: MatDialogRef<GetInTouchNotificationPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ,) { }
  ngOnInit(): void {

  }
  sendNotification(){
    this.uuid = JSON.parse(sessionStorage.getItem("UserId") ?? 'null');
    const data = {
      "uuid":  this.uuid,
      "proposalNumber": this.data
    }
    this.customerService.GetInTouch(data).subscribe((res: any) => {
      if(res?.error == false ){
        this.dialogRef.close(res?.message);
        // sessionStorage.setItem('notificationMessage',res?.message)
      }
    });
  }
}
