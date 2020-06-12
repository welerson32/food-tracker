import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../Home/service/service.service';
import { TruckService } from '../../Truck/services/truck.service';
import { LoginService } from '../../login/services/login.service';
import { Truck } from './../../../../../Library/Entities/Truck';
import { Router } from '@angular/router';
import { MatSlideToggleChange } from '@angular/material';

@Component({
  selector: 'app-truck-home',
  templateUrl: './truck-home.component.html',
  styleUrls: ['./truck-home.component.css']
})
export class TruckHomeComponent implements OnInit {
  truck: Truck = new Truck();
  isOpen: boolean;
  // tslint:disable-next-line: no-inferrable-types
  rating: number = 0;
  // tslint:disable-next-line: no-inferrable-types
  trucksInProximity: number = 0;

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
    this.calcRating();
    this.countTrucks();
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

  async countTrucks() {
    const countResult = Number(await this.truckService.trucksInProximity(this.truck));
    if (countResult) {
      this.trucksInProximity = countResult;
    }
  }

  calcRating() {
    if (this.truck.rating) {
      let one = 0;
      let two = 0;
      let thre = 0;
      let four = 0;
      let five = 0;
      for (const rate of this.truck.rating) {
        switch (rate.rate) {
          case 1:
            one++;
            break;
          case 2:
            two++;
            break;
          case 3:
            thre++;
            break;
          case 4:
            four++;
            break;
          case 5:
            five++;
            break;
          default:
            break;
        }
      }
      this.rating = ((5 * five) + (4 * four) + (3 * thre) + (2 * two) + (1 * one)) / (five + four + thre + two + one);
    } else {
      this.rating = 0;
    }
  }

  goToMenu() {
    this.router.navigate(['truck/menu']);
  }

  goToLocation() {
    this.router.navigate(['truck/location']);
  }

  goToHome() {
    this.router.navigate(['truck/home']);
  }

  logout() {
    this.Service.logoutTruck(confirm('Deslogar?'));
  }

}
