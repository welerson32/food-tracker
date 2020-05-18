import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { HomeService } from '../../Home/service/service.service';
import { LoginService } from '../../login/services/login.service';
import { MenuService } from '../services/menu.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Truck } from './../../../../../Library/Entities/Truck';
import { TruckMenu } from './../../../../../Library/Entities/TruckMenu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  truck: Truck;
  foodForm: FormGroup;
  food: TruckMenu;
  searchResult: any;

  lat = -19.918622875284022;
  lng = -43.93859346530122;

  constructor(
    private homeService: HomeService,
    private loginService: LoginService,
    private router: Router,
    private menuService: MenuService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder) {
    this.truck = new Truck();
    this.food = new TruckMenu();
    this.searchResult = new Object();
  }

  async ngOnInit() {
    this.updateSession();
    this.foodForm = this.formBuilder.group({
      foodName: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required]
    });
    await this.homeService.GetGeoLocation().then(pos => {
      this.lat = pos.lat;
      this.lng = pos.lng;
    });
    this.truck = JSON.parse(localStorage.getItem('FT_Truck_Session'));
    if (!this.truck.menu) {
      this.truck.menu = [];
    }
  }

  async updateSession() {
    this.truck = JSON.parse(localStorage.getItem('FT_Truck_Session'));
    const truck = await this.loginService.loginTruck(this.truck);
    localStorage.setItem('FT_Truck_Session', JSON.stringify(truck));
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

  async registry() {
    this.food.foodName = this.foodForm.controls.foodName.value;
    this.food.description = this.foodForm.controls.description.value;
    this.food.price = this.foodForm.controls.price.value;
    if (confirm(`Resgistrar prato? \n\t Nome: ${this.food.foodName} \n\t Descrição ${this.food.description} \n\t Preço ${this.food.price}`)) {
      console.log(this.truck);
      this.truck.menu.push(this.food);
      console.log(this.truck);
      await this.menuService.updateMenu(this.truck);
      this.snackBar.open('Comida adicionada ao carpadio!', 'OK', {
        duration: 5000
      });
    }
  }

  logout() {
    this.homeService.logoutTruck(confirm('Deslogar?'));
  }

}
