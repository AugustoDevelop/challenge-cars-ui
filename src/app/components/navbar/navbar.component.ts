import { Component, effect, inject, Injector, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  authService = inject(AuthService);
  injector = inject(Injector);
  isLoggedIn = false;
  menuOpen: boolean = false;

  ngOnInit(): void {
    effect(() => {
      this.isLoggedIn = this.authService.isLoggedIn();
    }, { injector: this.injector });
  }

  logout() {
    this.authService.logout();
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }
}
