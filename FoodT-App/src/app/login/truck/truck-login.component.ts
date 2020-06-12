import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Login } from '../../../../../Library/Entities/Login';
import { LoginService } from '../services/login.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-truck-login',
  templateUrl: './truck-login.component.html',
  styleUrls: ['./truck-login.component.css']
})
export class TruckLoginComponent implements OnInit, AfterViewInit {
  document: string;
  password: string;
  loginData: Login;

  @ViewChild('documentField', { static: false }) documentField: ElementRef;
  @ViewChild('passwordField', { static: false }) passwordField: ElementRef;

  constructor(
    private service: LoginService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.loginData = new Login();
  }

  ngOnInit() {
    if (localStorage.getItem('FT_Truck_Session')) {
      this.router.navigate(['truck/home']);
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.documentField.nativeElement.focus();
    });
  }

  async login() {
    if (!this.document || this.document.length === 0) {
      this.snackBar.open('Usuário não informado', 'OK', {
        duration: 5000
      });
      this.documentField.nativeElement.focus();
      return;
    }

    if (!this.password || this.password.length === 0) {
      this.snackBar.open('Senha de acesso não informada', 'OK', {
        duration: 5000
      });
      this.passwordField.nativeElement.focus();
      return;
    }

    this.loginData.document = this.document;
    this.loginData.password = this.password;
    const truck = await this.service.loginTruck(this.loginData);
    if (truck) {
      this.registrySession(truck);
    } else {
      this.loginEmpty();
    }
  }

  registrySession(truck: any) {
    if (this.service.validateLogin(this.loginData, truck)) {
      localStorage.setItem('FT_Truck_Session', JSON.stringify(truck));
      this.clearFields();
      this.snackBar.open(`Logado com Sucesso, bem vindo ${truck.ownerName}`, 'OK', { duration: 5000 });
      this.router.navigate(['truck/home']);
    } else {
      this.loginFailed();
    }
  }

  loginEmpty() {
    this.clearFields();
    setTimeout(() => {
      this.documentField.nativeElement.focus();
      this.snackBar.open('Acesso negado! Usuario ou Senha invalido.', 'OK', { duration: 5000 });
    });
  }

  loginFailed() {
    this.password = '';
    setTimeout(() => {
      this.passwordField.nativeElement.focus();
      this.snackBar.open('Acesso negado! Usuario ou Senha invalido.', 'OK', { duration: 5000 });
    });
  }

  clearFields() {
    this.document = '';
    this.password = '';
  }

}