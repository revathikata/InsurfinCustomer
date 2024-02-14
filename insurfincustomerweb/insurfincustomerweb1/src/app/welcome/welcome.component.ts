import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerServiceService } from '../services/customer-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {

 

  constructor(private router:Router) { }
  ngOnInit(): void {

  }

  customerDetails() {
    this.router.navigate(['./customer-details'])
  }


}