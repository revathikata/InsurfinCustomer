import { Component,Inject,OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { WebCamComponent } from '../web-cam/web-cam.component';
import { MatDialog } from '@angular/material/dialog';
import { CustomerServiceService } from '../services/customer-service.service';
import { Router } from '@angular/router';
import { KycdocumentsPopupComponent } from '../kycdocuments-popup/kycdocuments-popup.component';
import { LoginServicesService } from '../services/login-services.service';

@Component({
  selector: 'app-upload-image-bottomsheet',
  templateUrl: './upload-image-bottomsheet.component.html',
  styleUrls: ['./upload-image-bottomsheet.component.css']
})
export class UploadImageBottomsheetComponent {
  takepic: any;
  profilePhoto:any;
  imagAdded: any;
  addImgpreview: boolean = false;
  profileUploaded = "";
  imagePrevieww: any;
  customerid:string = '';

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public dailogue: any,private bottomSheetRef: MatBottomSheetRef<UploadImageBottomsheetComponent>,private dialog:MatDialog,
  private customerService:CustomerServiceService,private router:Router,
  private loginService: LoginServicesService){
  }

  ngOnInit(){
  }

  profileUpload(event: any) {
    this.customerid=JSON.parse(sessionStorage.getItem('UserId')?? 'null')
    const file = event.target.files[0];
    const allowedFileTypes = ['image/jpeg', 'image/png'];
    if (!allowedFileTypes.includes(file.type)) {
      event.target.value = null; // Clear the selected file
      alert('Please upload a valid file type (JPEG, PNG).');
      return;
    }
    this.imagAdded = event.target.files[0];
    if (this.imagAdded.size <= 1 * 3024 * 2224) {
      this.handleInputChange(this.imagAdded);
      this.addImgpreview = true;
    }
    else {
      alert('File size should not be greater than 20MB');
    }
    const formData = new FormData();
      formData.append('file', this.imagAdded)
      this.customerService.Document(this.customerid, 'PHOTO', formData).subscribe((res: any) => {
        res.imagAdded;
        this.profilePhoto = res.documentId
        if(res.message === 'document uploaded'){
          window.location.reload()
        }
      });
      const data = {
        photoId: this.profilePhoto,
      }
      this.customerService.UpdateCustomer(this.customerid,data).subscribe((res) => {
      })
    event.target.value = null;
    this.bottomSheetRef.dismiss()
  }

 

  captur() {
    this.customerid=JSON.parse(sessionStorage.getItem('UserId')?? 'null')
    const dialogRef = this.dialog.open(WebCamComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.takepic = result
      window.location.reload()
          this.bottomSheetRef.dismiss()
      console.log(JSON.stringify(this.takepic));
      const formData = new FormData();
      const blob = takepictur(result._imageAsDataUrl);
      formData.append('file', blob, this.takepic);
      this.customerService.Document(this.customerid, 'PHOTO', formData).subscribe((res: any) => {
        res.result;
        this.profilePhoto = res.documentId;
      });
      const data = {
        photoId: this.profilePhoto,
      }
      this.customerService.UpdateCustomer(this.customerid,data).subscribe((res) => {
        if(res?.error == false){
          window.location.reload()
          this.bottomSheetRef.dismiss()
        }
      })
    });

  function takepictur(dataURI) {
    console.log();
      const byteString = atob(dataURI.split(',')[1]);
      const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: mimeString });
    }
  }

  closeSheet(){
    this.bottomSheetRef.dismiss()
  }

  uploadImage(){
    this.bottomSheetRef.dismiss('uploaded')
  }

  handleInputChange(files: any) {
    this.imagePrevieww = files
    var reader = new FileReader();
    reader.onloadend = this.handleReaderLoaded.bind(this);
    reader.readAsDataURL(this.imagePrevieww);
  }
  handleReaderLoaded(e: any) {
    let reader = e.target;
    this.profileUploaded = reader.result.substr(reader.result.indexOf(',') + 1);
  }
  resetpassword(){
    this.router.navigate(['./reset-password'])
    this.bottomSheetRef.dismiss()
  }
  setuppassword(){
    this.router.navigate(['/setup-password'])
    this.bottomSheetRef.dismiss()
  }
  kycdocuments(documentType:string){
        this.bottomSheetRef.dismiss();
        this.dialog.open(KycdocumentsPopupComponent,{
          width:'329px',
          height:'240px',
          data:{ documentType}
    
  })
}
}
  

