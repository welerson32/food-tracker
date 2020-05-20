import { Component, OnInit, } from '@angular/core';
import { HomeService } from './../service/service.service';
import { Truck } from '../../../../../Library/Entities/Truck';

declare let google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  trucks: Truck[] = [];
  lat = -19.918622875284022;
  lng = -43.93859346530122;

  map: any;
  marker: any;

  constructor(private service: HomeService) { }

  async ngOnInit() {
    await this.service.GetGeoLocation().then(pos => {
      this.lat = pos.lat;
      this.lng = pos.lng;
    });
    this.trucks = await this.service.getTruckLocations();
    this.initMap();
  }

  initMap() {
    const location = { lat: this.lat, lng: this.lng };

    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 17,
      center: location,
      disableDefaultUI: true,
    });

    for (const truck of this.trucks) {
      const infowindow = new google.maps.InfoWindow({
        content: `Janela de teste do truck ${truck.truckName}`
      });
      location.lat = truck.location.lat;
      location.lng = truck.location.lng;
      this.marker = new google.maps.Marker({ position: location, map: this.map });
      this.marker.addListener('click', () => {
        infowindow.open(this.map, this.marker);
      });
    }
  }

}
