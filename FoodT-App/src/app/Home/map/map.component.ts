import { Component, OnInit,} from '@angular/core';
import { HomeService } from './../service/service.service';

declare let google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./../../app.component.css']
})
export class MapComponent implements OnInit {

  constructor(private Service: HomeService) { }

  lat = -19.918622875284022;
  lng = -43.93859346530122;

  map: any;
  marker: any;

  async ngOnInit() {
    await this.Service.GetGeoLocation().then(pos => {
      this.lat = pos.lat; 
      this.lng = pos.lng;
    });
    this.initMap();
  }

  markOnClick(event){
    console.log(event);
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    this.marker = new google.maps.Marker({ position: location, map: this.map });
    return this.initMap();
  }

  initMap() {
    var location = { lat: this.lat, lng: this.lng };

    this.map = new google.maps.Map(document.getElementById('map'), { 
                zoom: 17, 
                center: location,
                disableDefaultUI: true,
              });

    this.marker = new google.maps.Marker({ position: location, map: this.map });

    
}

  placeMarkerAndPanTo(latLng, map) {
    this.marker.setPosition(latLng)
    map.panTo(latLng);
  }

}
