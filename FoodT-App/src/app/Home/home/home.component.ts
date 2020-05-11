import { Component, OnInit, } from '@angular/core';
import { HomeService } from './../service/service.service';
import { Person } from './../../../../../Library/Entities/Person';

declare let google: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  person: Person;

  constructor(private Service: HomeService) { this.person = new Person(); }

  lat = -19.918622875284022;
  lng = -43.93859346530122;

  async ngOnInit() {
    await this.Service.GetGeoLocation().then(pos => {
      this.lat = pos.lat;
      this.lng = pos.lng;
    });
    this.person = JSON.parse(localStorage.getItem('FT_Person_Session'));
  }

  logout() {
    this.Service.logoutPerson(confirm('Deslogar?'));
  }

}
