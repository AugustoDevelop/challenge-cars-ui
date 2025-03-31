import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';
import { LoginComponent } from './components/login/login.component';
import { UserRegisterComponent } from './components/users/user-register/register.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { AddCarComponent } from './components/cars/car-resgister/add-car.component';
import { CarListComponent } from './components/cars/car-list/car-list.component';
import { UserDetailComponent } from './components/users/user-detail/user-detail.component';
import { UsersComponent } from './components/users/user-list/users.component';
import { CarDetailsComponent } from './components/cars/car-details/car-details.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [

      { path: 'users/register', component: UserRegisterComponent },
      { path: 'users/:id', component: UserDetailComponent },
      { path: 'users', component: UsersComponent },

      { path: 'login', component: LoginComponent },



      { path: 'cars/register', canActivate: [authGuard], component: AddCarComponent },
      { path: 'cars/:id', canActivate: [authGuard], component: CarDetailsComponent },
      { path: 'cars', canActivate: [authGuard], component: CarListComponent },

      { path: '', redirectTo: 'users', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
