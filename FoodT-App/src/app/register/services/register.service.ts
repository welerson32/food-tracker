import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  registerPerson(obj: FormData) {
    return this.http.post('http://localhost:8080/register/person', obj).toPromise();
  }

  registerTruck(obj: FormData) {
    return this.http.post('http://localhost:8080/register/truck', obj).toPromise();
  }

}
