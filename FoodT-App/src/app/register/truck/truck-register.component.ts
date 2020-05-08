import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-truck-register',
  templateUrl: './truck-register.component.html',
  styleUrls: ['./truck-register.component.css']
})
export class TruckRegisterComponent implements OnInit {
  isLinear = true;
  truckData: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: RegisterService,
    private router: Router
  ) { }


  ngOnInit() {
    if (localStorage.getItem('FT_Person_Session')) {
      this.router.navigate(['home/truck']);
    }
    this.truckData = this.formBuilder.group({
      ownerName: ['', Validators.required],
      truckName: ['', Validators.required],
      document: ['', [Validators.required, Validators.maxLength(14)]],
      phone: '',
      type: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  register() {
    return this.service.registerTruck(this.truckData.value);
  }

}
