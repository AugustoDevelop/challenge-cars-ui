import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from '../../../core/model/car.model';
import { CarService } from '../../../core/services/car/car.service';
import { MatDialog } from '@angular/material/dialog';
import { FileUploadDialogComponent } from '../file-upload-dialog/file-upload-dialog.component';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})
export class CarDetailsComponent implements OnInit {
  car!: Car;

  constructor(
    private carService: CarService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const carId = this.route.snapshot.paramMap.get('id');
    if (carId) {
      this.getCarDetails(carId);
    }
  }

  getCarDetails(carId: string): void {
    this.carService.getCarById(carId).subscribe(
      (data) => {
        this.car = data;
      },
      (error) => {
        console.error('Erro ao carregar os detalhes do carro', error);
      }
    );
  }

  uploadImage(): void {
    this.dialog.open(FileUploadDialogComponent, {
      data: { carId: this.car.id }
    });
  }
}
