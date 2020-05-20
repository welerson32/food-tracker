import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Truck } from '../../../../../Library/Entities/Truck';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  GetGeoLocation(): Promise<any> {
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(resp => {

        resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
      },
        err => {
          reject(err);
        });
    });

  }

  logoutPerson(confirm: boolean) {
    if (confirm) {
      localStorage.removeItem('FT_Person_Session');
      window.location.reload();
    }
  }

  logoutTruck(confirm: boolean) {
    if (confirm) {
      localStorage.removeItem('FT_Truck_Session');
      window.location.reload();
    }
  }

  getTruckLocations() {
    return this.http.get<Truck[]>('http://localhost:8080/truck').toPromise();
  }

}
