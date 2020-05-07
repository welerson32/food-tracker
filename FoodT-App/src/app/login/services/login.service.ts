import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  loginPerson(obj: any) {
    return this.http.post('http://localhost:8080/login/person', obj).toPromise();
  }

}
