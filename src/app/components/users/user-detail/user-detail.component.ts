import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../core/model/user.model';
import { AuthService } from '../../../core/services/auth/auth.service';
import { UserService } from '../../../core/services/user/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  user: User | null = null;
  isLoading = true;
  error: string | null = null;
  userId: string | null = null;
  isLoggedIn: boolean = false;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id')) {
      this.userId = this.route.snapshot.paramMap.get('id');
      this.isLoggedIn = this.authService.isLoggedIn();
      this.loadUserData(Number(this.userId));
    }

  }

  loadUserData(userId: number): void {
    this.isLoading = true;
    this.error = null;

    this.userService.getCurrentUser(userId).subscribe({
      next: (userData) => {
        this.user = userData;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Não foi possível carregar os dados do usuário. Tente novamente mais tarde.';
        this.isLoading = false;
        console.error('Erro ao carregar dados do usuário:', err);
      }
    });
  }

  handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeEB6l2yCY1rCqMlVuXCo-E-KMW40Hq9va1A&s';
  }

  addCar(): void {
    if (this.isLoggedIn) {
      this.router.navigate([`cars/register`]);
    } else {
      this.router.navigate(['login']);
    }
  }

  // Verifica se o usuário está logado antes de redirecionar para a página de detalhes do carro
  viewCarDetails(carId?: number): void {
    if (this.isLoggedIn) {
      // Se estiver logado, vai para a página de detalhes do carro
      this.router.navigate([`cars/${carId}`]);
    } else {
      // Se não estiver logado, redireciona para a página de login
      this.router.navigate(['login']);
    }
  }
}
