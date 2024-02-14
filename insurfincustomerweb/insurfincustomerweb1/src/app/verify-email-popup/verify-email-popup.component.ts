import { Component } from '@angular/core';

@Component({
  selector: 'app-verify-email-popup',
  templateUrl: './verify-email-popup.component.html',
  styleUrls: ['./verify-email-popup.component.css']
})
export class VerifyEmailPopupComponent {


  email = true
  sucess = false
  resentEmail = false
  sendagain() {
    this.resentEmail = true;
    this.email = false;
    this.sucess = false;
  }
  sendAgain(){
    this.email = false;
    this.sucess = true;
    this.resentEmail = false;

  }
  continue() {
    this.resentEmail = false;
    this.email = false;
    this.sucess = false;


  }
}


