import { Injectable, Inject, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { map, of } from 'rxjs';
import { RegisterPayload, ApiResponse, LoginPayload, LoginResponse } from '../../model/common.model';
import { User } from '../../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = signal<boolean>(false);
  router = inject(Router);

  constructor(private _http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    if (this.getUserToken()) {
      this.isLoggedIn.update(() => true);
    }
  }

  users() {
    return this._http.get<ApiResponse<User>>(
      `${environment.apiUrl}/api/users`);
  }

  register(payload: RegisterPayload) {
    return this._http.post<ApiResponse<User>>(
      `${environment.apiUrl}/api/users`,
      payload
    );
  }

  login(payload: LoginPayload) {
    return this._http.post<LoginResponse>(
      `${environment.apiUrl}/api/signin`,
      payload
    ).pipe(map((response) => {
      if (isPlatformBrowser(this.platformId)) {
        sessionStorage.setItem(environment.tokenKey, response.accessToken);
      }
      this.isLoggedIn.update(() => true);
      return of({ success: true });
    }));
  }

  handleLoginSuccess(): void {
    this.router.navigate(['users']);
  }

  me() {
    return this._http.get<ApiResponse<User>>(
      `${environment.apiUrl}/users/me`
    );
  }

  isAuthenticated(): boolean {
    return !!this.getUserToken();
  }

  getUserToken() {
    if (isPlatformBrowser(this.platformId)) {
      return sessionStorage.getItem(environment.tokenKey);
    }
    return null;
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem(environment.tokenKey);
    }
    this.isLoggedIn.update(() => false);
    this.router.navigate(['login']);
  }
}
