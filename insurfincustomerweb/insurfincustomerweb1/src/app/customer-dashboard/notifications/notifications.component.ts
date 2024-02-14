import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent {


  verify: boolean=true;
  getNotification = true

  constructor(private router:Router) { }

  exponantial(){
this.verify=false
  }
  navigateToDashboard(){
    this.router.navigate(['customer-dashboard'])
  }
  markAsRead(){
    this.getNotification = false
  }
}

