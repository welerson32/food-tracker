import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSlideToggleChange } from '@angular/material';
import { HomeService } from '../../Home/service/service.service';
import { LoginService } from '../../login/services/login.service';
import { MenuService } from '../services/menu.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Truck } from './../../../../../Library/Entities/Truck';
import { TruckMenu } from './../../../../../Library/Entities/TruckMenu';
import { Router } from '@angular/router';
import { TruckService } from '../services/truck.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  foodForm: FormGroup;
  truck: Truck = new Truck();
  food: TruckMenu = new TruckMenu();
  searchResult: any = new Object();
  isOpen: boolean;

  lat = -19.918622875284022;
  lng = -43.93859346530122;

  constructor(
    private homeService: HomeService,
    private loginService: LoginService,
    private truckService: TruckService,
    private router: Router,
    private menuService: MenuService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder) { this.updateSession(); }

  async ngOnInit() {
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
    this.isOpen = this.truck.open;
    if (!this.truck.menu) {
      this.truck.menu = [];
    }
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
    window.location.reload();
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
