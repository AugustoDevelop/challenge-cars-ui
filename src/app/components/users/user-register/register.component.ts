import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { NotifySnackService } from '../../../shared/notify/notify-snack.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class UserRegisterComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);
  form: FormGroup = this.fb.group({})
  showPassword = false;
  showConfirmPassword = false;
  isLoading = false;
  errorMessage = '';
  passwordMismatch = false;

  constructor(
    private fb: FormBuilder,
    private notifySnack: NotifySnackService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      birthday: ['', [Validators.required]],
      login: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      password_confirmation: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10,11}$')]]
    });

    // Observando o campo de confirmação de senha
    this.form.get('password')?.valueChanges.subscribe(value => {
      this.checkPasswordMismatch();
    });

    this.form.get('password_confirmation')?.valueChanges.subscribe(value => {
      this.checkPasswordMismatch();
    });
  }

  // Method to check if passwords match
  checkPasswordMismatch(): void {
    const password = this.form.get('password')?.value;
    const confirmPassword = this.form.get('password_confirmation')?.value;
    this.passwordMismatch = password !== confirmPassword;
  }

  async submitRegister() {
    if (this.form.valid) {
      this.isLoading = true;
      try {
        await this.authService.register(this.form.value).subscribe({
          next: (response) => {
            this.notifySnack.showSuccess('Usuário cadastrado com sucesso!');
            this.router.navigate(['users']);
          },
          error: (error: any) => {
            this.notifySnack.showError(`Erro: ${error.message}`);
          }
        });
      } catch (error: any) {
        this.errorMessage = error.message;
        this.notifySnack.showError(`Erro: ${error.message}`);
      } finally {
        this.isLoading = false;
      }
    }
  }
}
