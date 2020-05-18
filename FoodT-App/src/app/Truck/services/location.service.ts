import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  searchLocation(parameters: string) {
    const key = 'AIzaSyD31ZMrfh2BsM9TrMHQEKoYAtZe83GrViQ';
    return this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${parameters},+CA&key=${key}`).toPromise();
  }

  updateLocation(obj: any) {
    return this.http.post('http://localhost:8080/update/truck', obj).toPromise();
  }
}
