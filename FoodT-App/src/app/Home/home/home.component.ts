import { Component, OnInit, } from '@angular/core';
import { HomeService } from './../service/service.service';
import { LoginService } from '../../login/services/login.service';
import { Person } from './../../../../../Library/Entities/Person';

declare let google: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  person: Person;

  constructor(private Service: HomeService, private loginService: LoginService) { this.person = new Person(); }

  lat = -19.918622875284022;
  lng = -43.93859346530122;

  async ngOnInit() {
    this.updateSession();
    await this.Service.GetGeoLocation().then(pos => {
      this.lat = pos.lat;
      this.lng = pos.lng;
    });
    this.person = JSON.parse(localStorage.getItem('FT_Person_Session'));
  }

  async updateSession() {
    this.person = JSON.parse(localStorage.getItem('FT_Person_Session'));
    const person = await this.loginService.loginPerson(this.person);
    localStorage.setItem('FT_Person_Session', JSON.stringify(person));
  }

  logout() {
    this.Service.logoutPerson(confirm('Deslogar?'));
  }

}
