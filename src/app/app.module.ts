import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { httpInterceptor } from './core/interceptors/http.interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AddCarComponent } from './components/cars/car-resgister/add-car.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CarListComponent } from './components/cars/car-list/car-list.component';
import { MatMenuModule } from '@angular/material/menu';
import { CarDetailsComponent } from './components/cars/car-details/car-details.component';
import { UserDetailComponent } from './components/users/user-detail/user-detail.component';
import { UserRegisterComponent } from './components/users/user-register/register.component';
import { UsersComponent } from './components/users/user-list/users.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FileUploadDialogComponent } from './components/cars/file-upload-dialog/file-upload-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    UserRegisterComponent,
    ProfileComponent,
    LayoutComponent,
    UsersComponent,
    UserDetailComponent,
    AddCarComponent,
    CarDetailsComponent,
    CarListComponent,
    FileUploadDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatDialogModule
  ],
  providers: [
    provideNgxMask(),
    provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptors([httpInterceptor]))
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
