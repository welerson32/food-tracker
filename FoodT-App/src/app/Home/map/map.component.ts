import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HomeService } from './../service/service.service';
import { Truck } from '../../../../../Library/Entities/Truck';
import { TruckMenu } from '../../../../../Library/Entities/TruckMenu';
import { Rating } from '../../../../../Library/Entities/Rating';

export interface DialogData {
  truckName: string;
  type: string;
  menu: TruckMenu[];
  location: Location;
  rating: number;
}

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

  constructor(private service: HomeService, public dialog: MatDialog) { }


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
      location.lat = truck.location.lat;
      location.lng = truck.location.lng;
      this.marker = new google.maps.Marker({ position: location, map: this.map });
      this.marker.addListener('click', () => {
        const dialogRef = this.dialog.open(TruckDialogComponent, {
          height: '80%',
          width: '80%',
          data: { truckName: truck.truckName, menu: truck.menu, location: truck, type: truck.type },
        });
      });
    }
  }

}

@Component({
  selector: 'app-truck-dialog',
  templateUrl: 'truck.dialog.html',
  styleUrls: ['./truck.dialog.css']
})
export class TruckDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<TruckDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  close(): void {
    this.dialogRef.close();
  }

}
