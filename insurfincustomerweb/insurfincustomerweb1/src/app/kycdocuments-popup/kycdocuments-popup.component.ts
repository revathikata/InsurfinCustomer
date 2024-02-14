import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginServicesService } from '../services/login-services.service';

@Component({
  selector: 'app-kycdocuments-popup',
  templateUrl: './kycdocuments-popup.component.html',
  styleUrls: ['./kycdocuments-popup.component.css']
})
export class KycdocumentsPopupComponent {

  documentType: string;
  
  constructor(public dialogRef: MatDialogRef<KycdocumentsPopupComponent>,public loginService:LoginServicesService,public dialog:MatDialog,
    @Inject(MAT_DIALOG_DATA)public data: { documentType: string; imageUrl: string }) {this.documentType = data.documentType;}

  closeDialog(): void {
    this.dialogRef.close();
  }
  onCancel(){
    this.dialogRef.close()
  }
  onConfirm(documentType:string){
    const userId = JSON.parse(sessionStorage.getItem('UserId')?? 'null')
    this.loginService.AccountClosure(userId).subscribe((res:any) => {
      if(res.error == false){
        this.dialogRef.close()
        this.dialog.open(KycdocumentsPopupComponent,{
               width:'345px',
               height:'133px',
               data:{documentType}
        })
      }
    })
  }
}
