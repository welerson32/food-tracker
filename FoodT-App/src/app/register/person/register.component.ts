import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isLinear = true;
  personalData: FormGroup;

  sex = {
    F: 'Feminino',
    M: 'Masculino',
    N: 'Não Binário'
  };

  constructor(private formBuilder: FormBuilder, private service: RegisterService) { }


  ngOnInit() {
    this.personalData = this.formBuilder.group({
      fullName: ['', Validators.required],
      nickName: ['', Validators.required],
      document: ['', [Validators.required, Validators.maxLength(11)]],
      birthDate: ['', Validators.required],
      sex: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  register() {
    return this.service.registerPerson(this.personalData.value);
  }
}
