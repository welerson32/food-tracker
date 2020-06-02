import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSlideToggleChange } from '@angular/material';
import { HomeService } from '../../Home/service/service.service';
import { TruckService } from '../../Truck/services/truck.service';
import { LoginService } from '../../login/services/login.service';
import { LocationService } from '../services/location.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Truck } from './../../../../../Library/Entities/Truck';
import { Location } from './../../../../../Library/Entities/Location';
import { Router } from '@angular/router';

declare let google: any;

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  truck: Truck = new Truck();
  isOpen: boolean;
  adressForm: FormGroup;
  location: Location = new Location();
  searchResult: any = new Object();

  lat = -19.918622875284022;
  lng = -43.93859346530122;

  map: any;
  marker: any;

  constructor(
    private homeService: HomeService,
    private truckService: TruckService,
    private loginService: LoginService,
    private locationService: LocationService,
    private router: Router,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder) { this.updateSession(); }

  async ngOnInit() {
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
    this.isOpen = this.truck.open;
    this.initMap();
  }

  async updateSession() {
    this.truck = JSON.parse(localStorage.getItem('FT_Truck_Session'));
    const truck = await this.loginService.loginTruck(this.truck);
    localStorage.setItem('FT_Truck_Session', JSON.stringify(truck));
  }

  async toggleOnChange(value: MatSlideToggleChange) {
    this.truck.open = this.isOpen;
    await this.truckService.updateTruck(this.truck);
    window.location.reload();
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
        this.location.street = this.searchResult.results[0].address_components[1].short_name;
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

  initMap() {
    const location = { lat: this.lat, lng: this.lng };
    location.lat = this.truck.location.lat;
    location.lng = this.truck.location.lng;

    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: location,
      styles: [
        {
          featureType: 'poi',
          stylers: [
            {
              visibility: 'off'
            }
          ]
        },
        {
          featureType: 'road.arterial',
          elementType: 'geometry.fill',
          stylers: [
            {
              color: '#feffcc'
            }
          ]
        },
        {
          featureType: 'road.arterial',
          elementType: 'geometry.stroke',
          stylers: [
            {
              color: '#ffd152'
            }
          ]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.fill',
          stylers: [
            {
              color: '#fbff00'
            }
          ]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [
            {
              color: '#ffc800'
            }
          ]
        }
      ],
      disableDefaultUI: true,
    });

    this.marker = new google.maps.Marker({ position: location, map: this.map });

  }

  goToMenu() {
    this.router.navigate(['truck/menu']);
  }

  goToLocation() {
    this.router.navigate(['truck/location']);
  }

  goToHome() {
    this.router.navigate(['truck/home']);
  }

  logout() {
    this.homeService.logoutTruck(confirm('Deslogar?'));
  }

}
