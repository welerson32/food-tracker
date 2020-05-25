import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../Home/service/service.service';
import { TruckService } from '../../Truck/services/truck.service';
import { LoginService } from '../../login/services/login.service';
import { Truck } from './../../../../../Library/Entities/Truck';
import { Router } from '@angular/router';
import { MatSlideToggleChange } from '@angular/material';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  truck: Truck = new Truck();
  isOpen: boolean;

  lat = -19.918622875284022;
  lng = -43.93859346530122;

  constructor(
    private Service: HomeService,
    private loginService: LoginService,
    private truckService: TruckService,
    private router: Router) { this.updateSession(); }

  async ngOnInit() {
    await this.Service.GetGeoLocation().then(pos => {
      this.lat = pos.lat;
      this.lng = pos.lng;
    });
    this.truck = JSON.parse(localStorage.getItem('FT_Truck_Session'));
    this.isOpen = this.truck.open;
  }

  async updateSession() {
    this.truck = JSON.parse(localStorage.getItem('FT_Truck_Session'));
    const truck = await this.loginService.loginTruck(this.truck);
    localStorage.setItem('FT_Truck_Session', JSON.stringify(truck));
  }

  async toggleOnChange(value: MatSlideToggleChange) {
    this.truck.open = this.isOpen;
    await this.truckService.updateTruck(this.truck);
    window.location.reload();
  }

  goToMenu() {
    this.router.navigate(['truck/menu']);
  }

  goToLocation() {
    this.router.navigate(['truck/location']);
  }

  goToRating() {
    this.router.navigate(['truck/rating']);
  }

  logout() {
    this.Service.logoutTruck(confirm('Deslogar?'));
  }

}
