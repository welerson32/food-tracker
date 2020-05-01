import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isLinear = true;
  personalData: FormGroup;
  acessData: FormGroup;
  
  sex = {
    F: "Feminino",
    M: "Masculino",
    N: "Não Binário"
  }
  
  constructor(private _formBuilder: FormBuilder) {}


  ngOnInit() {
    this.personalData = this._formBuilder.group({
      fullName: ['', Validators.required],
      nickName: ['', Validators.required],
      document: ['', Validators.required],
      birthDate: ['', Validators.required],
      sex: ['', Validators.required]
    });
    this.acessData = this._formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submit() {
    console.log(this.personalData);
    console.log(this.acessData);
  }
}
