import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  validateLogin(login: any, person: any) {
    if (login.password === person.password) {
      return true;
    } else {
      return false;
    }
  }

  getSessionPerson() {
    const sessionData = localStorage.getItem('FT_Person_Session');
    if (sessionData) {
      return sessionData;
    }
  }

  getSessionTruck() {
    const sessionData = localStorage.getItem('FT_Truck_Session');
    if (sessionData) {
      return sessionData;
    }
  }

  loginPerson(obj: any) {
    return this.http.post('http://localhost:8080/login/person', obj).toPromise();
  }

  loginTruck(obj: any) {
    return this.http.post('http://localhost:8080/login/truck', obj).toPromise();
  }

}
