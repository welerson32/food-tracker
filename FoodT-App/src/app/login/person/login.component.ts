import { Component, OnInit } from '@angular/core';
import { ILogin } from '../../../../../Library/Interfaces/ILogin'
import { LoginService } from '../services/login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: string;
  password: string;
  loginObj: ILogin;

  constructor(private service: LoginService) { }

  ngOnInit() {
  }

  tryLogin() {
    this.loginObj.document = this.login;
    this.loginObj.password = this.password;
    this.service.loginPerson(this.loginObj);
  }

}
