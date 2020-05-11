import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor() { }

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

}
