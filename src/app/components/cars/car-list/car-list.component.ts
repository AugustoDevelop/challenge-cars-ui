import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from '../../../core/services/car/car.service';
import { Car } from '../../../core/model/car.model';
import { MatTableDataSource } from '@angular/material/table'; // Importar MatTableDataSource
import { MatPaginator } from '@angular/material/paginator'; // Para paginação
import { MatSort } from '@angular/material/sort'; // Para ordenação
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteCarDialogComponent } from '../confirm-delete-car-dialog/confirm-delete-car-dialog.component';
import { NotifySnackService } from '../../../shared/notify/notify-snack.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent implements OnInit {
  cars: Car[] = [];
  dataSource!: MatTableDataSource<Car>;
  displayedColumns: string[] = ['model', 'color', 'licensePlate', 'year', 'action'];
  loading: boolean = false;

  // Referências para o paginador e ordenação (serão vinculadas no template)
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private notify: NotifySnackService,
    private carService: CarService,
    private cdf: ChangeDetectorRef,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCars();
  }

  // Método para buscar todos os carros
  getCars(): void {
    this.loading = true;  // Ativa o indicador de carregamento
    this.carService.getAllCars().subscribe(
      (data: Car[]) => {
        this.cars = data;
        this.dataSource = new MatTableDataSource(this.cars);
        this.dataSource.paginator = this.paginator;  // Configura o paginador
        this.dataSource.sort = this.sort;  // Configura o ordenamento
        this.loading = false;  // Desativa o indicador de carregamento
        this.notify.showSuccess("Carro exlcuido com sucesso")
      },
      error => {
        console.error('Erro ao excluir carro', error);
        this.notify.showError('Error ao carregar os carro');
        this.loading = false;
      }
    );
  }

  // Método para redirecionar para a tela de detalhes do carro
  viewCarDetails(carId: number): void {
    this.router.navigate(['cars/', carId]);
  }

  // Método para aplicar o filtro de busca na tabela
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Função para abrir o modal de confirmação
  openDeleteConfirmation(car: any): void {
    const dialogRef = this.dialog.open(ConfirmDeleteCarDialogComponent, {
      width: '500px',
      data: { carId: car.id, model: car.model, licensePlate: car.licensePlate }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteCar(result); // Exclui o carro com o ID retornado
      }
    });
  }

  deleteCar(carId: number): void {
    // Chama o serviço para excluir o carro no backend
    this.carService.deleteCar(carId).pipe().subscribe(
      () => {
        console.log('Carro excluído no backend');

        // Remove o carro da lista localmente
        const index = this.cars.findIndex(car => car.id === carId);
        if (index !== -1) {
          this.cars.splice(index, 1); // Remove o carro da lista local
          console.log('Carro removido da lista local');

          // Atualiza o dataSource para refletir a remoção
          this.dataSource = new MatTableDataSource(this.cars);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

          // Força a detecção de mudanças
          this.cdf.detectChanges();
          this.cdf.markForCheck(); // Sinaliza para a detecção de mudanças
          console.log('dataSource atualizado');
        }
      },
      error => {
        console.error('Erro ao excluir carro', error);
      }
    );
  }



}
