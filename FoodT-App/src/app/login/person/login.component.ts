import { Component, OnInit } from '@angular/core';
import { ILogin } from '../../../../../Library/Interfaces/ILogin';
import { LoginService } from '../services/login.service';
import { Person } from '../../../../../Library/Entities/Person';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(private service: LoginService) { }
  login: ILogin;

  ngOnInit() {
  }

  async tryLogin() {
    console.log(this.login);
    const person = await this.service.loginPerson(this.login);
    this.registrySession(person);
  }

  registrySession(person: any) {
    console.log(person);
  }

}
