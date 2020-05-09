import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-screening',
  templateUrl: './screening.component.html',
  styleUrls: ['./screening.component.css']
})
export class ScreeningComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToTruck() {
    this.router.navigate(['home/truck']);
  }

  goToPerson() {
    this.router.navigate(['home/person']);
  }

}
