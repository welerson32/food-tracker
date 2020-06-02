import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HomeService } from './../service/service.service';
import { Truck } from '../../../../../Library/Entities/Truck';
import { TruckMenu } from '../../../../../Library/Entities/TruckMenu';
import { Rating } from '../../../../../Library/Entities/Rating';
import { Person } from '../../../../../Library/Entities/Person';
import { TruckService } from 'src/app/Truck/services/truck.service';

export interface DialogData {
  truckName: string;
  type: string;
  menu: TruckMenu[];
  location: Location;
  rating: Rating;
}

declare let google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  person: Person = new Person();
  rating: Rating = new Rating();
  trucks: Truck[] = [];
  lat = -19.918622875284022;
  lng = -43.93859346530122;

  map: any;
  marker: any;

  constructor(private service: HomeService, public dialog: MatDialog, private truckService: TruckService) { }


  async ngOnInit() {
    await this.service.GetGeoLocation().then(pos => {
      this.lat = pos.lat;
      this.lng = pos.lng;
    });
    this.person = JSON.parse(localStorage.getItem('FT_Person_Session'));
    this.trucks = await this.service.getTruckLocations();
    this.initMap();
  }

  initMap() {
    const location = { lat: this.lat, lng: this.lng };

    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 17,
      center: location,
      styles: [
        {
          featureType: 'poi',
          stylers: [
            {
              visibility: 'off'
            }
          ]
        },
        {
          featureType: 'road.arterial',
          elementType: 'geometry.fill',
          stylers: [
            {
              color: '#feffcc'
            }
          ]
        },
        {
          featureType: 'road.arterial',
          elementType: 'geometry.stroke',
          stylers: [
            {
              color: '#ffd152'
            }
          ]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.fill',
          stylers: [
            {
              color: '#fbff00'
            }
          ]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [
            {
              color: '#ffc800'
            }
          ]
        }
      ],
      disableDefaultUI: true,
    });

    for (const truck of this.trucks) {
      if (!truck.rating) {
        truck.rating = [];
      }

      location.lat = truck.location.lat;
      location.lng = truck.location.lng;
      this.marker = new google.maps.Marker({
        position: location,
        map: this.map
      });

      this.marker.addListener('click', () => {
        const atualRate = truck.rating.find(rating => rating.personId === this.person._id);
        if (atualRate) {
          this.rating = atualRate;
        } else {
          this.rating = new Rating();
          this.rating.rate = 0;
        }
        const dialogRef = this.dialog.open(TruckDialogComponent, {
          height: '80%',
          width: '80%',
          data: { truckName: truck.truckName, menu: truck.menu, location: truck, type: truck.type, rating: this.rating },
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            let exist = false;
            for (let rate of truck.rating) {
              if (rate.personId === this.person._id) {
                this.rating = result;
                this.rating.personId = this.person._id;
                rate = this.rating;
                this.truckService.updateTruck(truck);
                exist = true;
              }
            }
            if (!exist) {
              this.rating = result;
              this.rating.personId = this.person._id;
              truck.rating.push(this.rating);
              this.truckService.updateTruck(truck);
            }
          }
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

  star1() {
    this.data.rating.rate = 1;
  }

  star2() {
    this.data.rating.rate = 2;
  }

  star3() {
    this.data.rating.rate = 3;
  }

  star4() {
    this.data.rating.rate = 4;
  }

  star5() {
    this.data.rating.rate = 5;
  }

}
