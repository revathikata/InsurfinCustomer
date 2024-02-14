import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detected-wrongaddress',
  templateUrl: './detected-wrongaddress.component.html',
  styleUrls: ['./detected-wrongaddress.component.css']
})
export class DetectedWrongaddressComponent {

  
  constructor(private dialogRef: MatDialogRef<any>, private router: Router) { }


  geoButtonClicked(type){
    this.dialogRef.close(type);
  }
}
