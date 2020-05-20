import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './Home/home/home.component';
import { LoginComponent } from './login/person/login.component';
import { RegisterComponent } from './register/person/register.component';
import { TruckRegisterComponent } from './register/truck/truck-register.component';
import { ScreeningComponent } from './login/screening/screening.component';
import { TruckLoginComponent } from './login/truck/truck-login.component';
import { TruckHomeComponent } from './Truck/home/truck-home.component';
import { AuthGuardService } from './login/services/auth-guard.service';
import { AuthGuardTruckService } from './login/services/auth-guard-truck.service';
import { LocationComponent } from './Truck/location/location.component';
import { MenuComponent } from './Truck/menu/menu.component';
import { SchedulesComponent } from './Truck/schedules/schedules.component';
import { RatingComponent } from './Truck/rating/rating.component';


const routes: Routes = [

  { path: '', redirectTo: 'screening', pathMatch: 'full' },
  { path: 'screening', component: ScreeningComponent },
  { path: 'login/person', component: LoginComponent },
  { path: 'login/truck', component: TruckLoginComponent },
  { path: 'register/person', component: RegisterComponent },
  { path: 'register/truck', component: TruckRegisterComponent },
  { path: 'person/home', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'truck/home', component: TruckHomeComponent, canActivate: [AuthGuardTruckService] },
  { path: 'truck/location', component: LocationComponent, canActivate: [AuthGuardTruckService] },
  { path: 'truck/menu', component: MenuComponent, canActivate: [AuthGuardTruckService] },
  { path: 'truck/schedules', component: SchedulesComponent, canActivate: [AuthGuardTruckService] },
  { path: 'truck/rating', component: RatingComponent, canActivate: [AuthGuardTruckService] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
