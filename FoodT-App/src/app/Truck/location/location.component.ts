import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { HomeService } from '../../Home/service/service.service';
import { LoginService } from '../../login/services/login.service';
import { LocationService } from '../services/location.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Truck } from './../../../../../Library/Entities/Truck';
import { Location } from './../../../../../Library/Entities/Location';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  truck: Truck;
  adressForm: FormGroup;
  location: Location;
  searchResult: any;

  lat = -19.918622875284022;
  lng = -43.93859346530122;

  constructor(
    private homeService: HomeService,
    private loginService: LoginService,
    private locationService: LocationService,
    private router: Router,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder) {
    this.truck = new Truck();
    this.location = new Location();
    this.searchResult = new Object();
  }

  async ngOnInit() {
    this.updateSession();
    this.adressForm = this.formBuilder.group({
      street: ['', Validators.required],
      number: ['', Validators.required],
      neighborhood: ['', Validators.required],
      city: ['', Validators.required]
    });
    await this.homeService.GetGeoLocation().then(pos => {
      this.lat = pos.lat;
      this.lng = pos.lng;
    });
    this.truck = JSON.parse(localStorage.getItem('FT_Truck_Session'));
  }

  async updateSession() {
    this.truck = JSON.parse(localStorage.getItem('FT_Truck_Session'));
    const truck = await this.loginService.loginTruck(this.truck);
    localStorage.setItem('FT_Truck_Session', JSON.stringify(truck));
  }

  async search() {
    const streetNumber = this.adressForm.controls.number.value;
    const street = this.adressForm.controls.street.value;
    const neighborhood = this.adressForm.controls.neighborhood.value;
    const city = this.adressForm.controls.city.value;
    const parameters = `${streetNumber},+${street.replace(/ /g, '+')},+${neighborhood.replace(/ /g, '+')},+${city.replace(/ /g, '+')}`;
    this.searchResult = await this.locationService.searchLocation(parameters);
    if (this.searchResult) {
      if (confirm(`Deseja salvar o endereço "${this.searchResult.results[0].formatted_address}", como sua localização atual?`)) {
        this.location.lat = this.searchResult.results[0].geometry.location.lat;
        this.location.lng = this.searchResult.results[0].geometry.location.lng;
        this.location.street = this.searchResult.results[0].address_components[1].long_name;
        this.location.number = this.searchResult.results[0].address_components[0].long_name;
        this.location.neighborhood = this.searchResult.results[0].address_components[2].long_name;
        this.location.city = this.searchResult.results[0].address_components[3].long_name;
        this.location.uf = this.searchResult.results[0].address_components[4].short_name;
        this.location.postalCode = this.searchResult.results[0].address_components[6].long_name;
        this.truck.location = this.location;
        await this.locationService.updateLocation(this.truck);
        this.snackBar.open('Localização atualizada com sucesso!', 'OK', {
          duration: 5000
        });
      } else {
        this.snackBar.open('Registro de localização cancelado!', 'OK', {
          duration: 5000
        });
        window.location.reload();
      }
    } else {
      this.snackBar.open('Endereço não encontrado!', 'OK', {
        duration: 5000
      });
      window.location.reload();
    }
  }

  goToMenu() {
    this.router.navigate(['truck/menu']);
  }

  goToLocation() {
    this.router.navigate(['truck/location']);
  }

  goToSchedules() {
    this.router.navigate(['truck/schedules']);
  }

  goToRating() {
    this.router.navigate(['truck/rating']);
  }

  logout() {
    this.homeService.logoutTruck(confirm('Deslogar?'));
  }

}
