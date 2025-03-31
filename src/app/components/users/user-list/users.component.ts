import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { User } from '../../../core/model/user.model';
import { UserService } from '../../../core/services/user/user.service';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { NotifySnackService } from '../../../shared/notify/notify-snack.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'login', 'phone', 'action'];
  dataSource = new MatTableDataSource<any>([]);
  users: User[] = [];

  constructor(
    private notify: NotifySnackService,
    private http: HttpClient,
    private router: Router,
    private userService: UserService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.http.get<User[]>(`${environment.apiUrl}/api/users`).subscribe((data) => {
      this.users = data;
      this.dataSource.data = this.users;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  viewDetails(userId: string): void {
    this.router.navigate([`/users/${userId}`]);
  }

  // Função para excluir o usuário
  deleteUser(userId: number): void {
    // Chama o serviço para excluir o usuário no backend
    this.userService.deleteUser(userId).subscribe(
      () => {
        // Após a exclusão no backend, remove o usuário localmente
        const index = this.users.findIndex(user => user.id === String(userId));
        if (index !== -1) {
          this.users.splice(index, 1);
        }

        this.notify.showSuccess("Usuário excluido com sucesso.")
      },
      error => {
        console.error('Erro ao excluir usuário', error);
        this.notify.showError("Error ao excluir usuário")
      }
    );
  }

  // Função para abrir o modal de confirmação
  openConfirmDeleteDialog(userId: number): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '500px',
      data: { id: userId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteUser(result);
      }
    });
  }
}
