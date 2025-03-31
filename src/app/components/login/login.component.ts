import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { NotifySnackService } from '../../shared/notify/notify-snack.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  showPassword = false;
  isLoading = false;
  authService = inject(AuthService);
  router = inject(Router);
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private notifySnack: NotifySnackService
  ) {
    this.form = this.formBuilder.group({
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    });
  }

  ngOnInit(): void {
    this.logout()
  }

  logout() {
    this.authService.logout();
  }

  async submitLogin() {
    if (this.form.valid) {
      this.isLoading = true;
      try {
        await this.authService.login(this.form.value).subscribe({
          next: () => {
            this.authService.handleLoginSuccess();
          },
          error: (error: any) => {
            this.notifySnack.showError(`Erro: ${error.message}`);
          },
        });
      } finally {
        this.isLoading = false;
      }
    }
  }

}
