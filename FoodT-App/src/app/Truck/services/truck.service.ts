import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class TruckService {

    constructor(private http: HttpClient) { }

    updateTruck(obj: any) {
        return this.http.post('http://localhost:8080/update/truck', obj).toPromise();
    }

    trucksInProximity(obj: any) {
        return this.http.post('http://localhost:8080/truck/count', obj).toPromise();
    }
}
