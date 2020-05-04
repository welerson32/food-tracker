import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './Home/home/home.component';
import { LoginComponent } from './login/person/login.component';
import { RegisterComponent } from './register/person/register.component';
import { TruckRegisterComponent } from './register/truck/truck-register.component';


const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login/person', component: LoginComponent },
  { path: 'register/person', component: RegisterComponent },
  { path: 'register/truck', component: TruckRegisterComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
