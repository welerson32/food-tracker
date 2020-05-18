import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../Home/service/service.service';
import { LoginService } from '../../login/services/login.service';
import { Truck } from './../../../../../Library/Entities/Truck';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})
export class SchedulesComponent implements OnInit {
  truck: Truck;

  lat = -19.918622875284022;
  lng = -43.93859346530122;

  constructor(
    private Service: HomeService,
    private loginService: LoginService,
    private router: Router) { this.truck = new Truck(); }

  async ngOnInit() {
    this.updateSession();
    await this.Service.GetGeoLocation().then(pos => {
      this.lat = pos.lat;
      this.lng = pos.lng;
    });
    this.truck = JSON.parse(localStorage.getItem('FT_Truck_Session'));
  }

  async updateSession() {
    this.truck = JSON.parse(localStorage.getItem('FT_Truck_Session'));
    const truck = await this.loginService.loginTruck(this.truck);
    localStorage.setItem('FT_Truck_Session', JSON.stringify(truck));
  }

  goToMenu() {
    this.router.navigate(['truck/menu']);
  }

  goToLocation() {
    this.router.navigate(['truck/location']);
  }

  goToSchedules() {
    this.router.navigate(['truck/schedules']);
  }

  logout() {
    this.Service.logoutTruck(confirm('Deslogar?'));
  }

}
