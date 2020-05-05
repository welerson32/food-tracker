import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILogin } from '../../../../../Library/Interfaces/ILogin'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  loginPerson(login: ILogin) {
    return this.http.post('http://localhost:8080/login/person', login).toPromise();
  }

}
