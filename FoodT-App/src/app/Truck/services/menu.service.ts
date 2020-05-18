import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }

  updateMenu(obj: any) {
    return this.http.post('http://localhost:8080/update/truck', obj).toPromise();
  }
}
