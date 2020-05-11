import { Component, OnInit } from '@angular/core';
import { HomeService } from './../service/service.service';
import { Truck } from './../../../../../Library/Entities/Truck';

@Component({
  selector: 'app-truck-home',
  templateUrl: './truck-home.component.html',
  styleUrls: ['./truck-home.component.css']
})
export class TruckHomeComponent implements OnInit {
  truck: Truck;

  lat = -19.918622875284022;
  lng = -43.93859346530122;

  constructor(private Service: HomeService) { this.truck = new Truck(); }

  async ngOnInit() {
    await this.Service.GetGeoLocation().then(pos => {
      this.lat = pos.lat;
      this.lng = pos.lng;
    });
    this.truck = JSON.parse(localStorage.getItem('FT_Truck_Session'));
  }

  logout() {
    this.Service.logoutTruck(confirm('Deslogar?'));
  }

}
