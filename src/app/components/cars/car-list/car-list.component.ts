import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from '../../../core/services/car/car.service';
import { Car } from '../../../core/model/car.model';
import { MatTableDataSource } from '@angular/material/table'; // Importar MatTableDataSource
import { MatPaginator } from '@angular/material/paginator'; // Para paginação
import { MatSort } from '@angular/material/sort'; // Para ordenação

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
    private carService: CarService,
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
      },
      error => {
        console.error('Erro ao carregar os carros', error);
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
}
