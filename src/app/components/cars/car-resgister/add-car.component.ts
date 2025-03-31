import { Component, OnInit } from '@angular/core';
import { Car } from '../../../core/model/car.model';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarService } from '../../../core/services/car/car.service';
import { NotifySnackService } from '../../../shared/notify/notify-snack.service';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.scss']
})
export class AddCarComponent implements OnInit {
  isLoading = false;
  addCarForm!: FormGroup;
  userId: string | null = null;
  imageError: string | null = null;
  previewUrl: string | null = null;
  imageFile: File | null = null;
  currentYear = new Date().getFullYear();

  constructor(
    private fb: FormBuilder,
    private carService: CarService,
    private router: Router,
    private route: ActivatedRoute,
    private notify: NotifySnackService
  ) { }

  ngOnInit(): void {
    this.addCarForm = this.fb.group({
      model: ['', [Validators.required, Validators.minLength(3)]],
      year: ['', [
        Validators.required,
        Validators.min(1900),
        Validators.max(this.currentYear)
      ]],
      color: ['', [Validators.required]],
      licensePlate: ['', [Validators.required]]
    });

    this.userId = this.route.snapshot.paramMap.get('userId');
  }


  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) {
      return;
    }

    const file = input.files[0];
    this.imageError = null;

    // Validar tipo de arquivo
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedFileTypes.includes(file.type)) {
      this.imageError = 'Apenas imagens nos formatos JPG, JPEG e PNG são permitidas';
      return;
    }

    // Validar tamanho (5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB em bytes
    if (file.size > maxSize) {
      this.imageError = 'A imagem deve ter no máximo 5MB';
      return;
    }

    // Criar preview
    this.createImagePreview(file);
    this.imageFile = file;
  }

  createImagePreview(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  removeImage(): void {
    this.previewUrl = null;
    this.imageFile = null;
    this.imageError = null;
  }

  // Verifica se o formulário é válido
  get f() {
    return this.addCarForm.controls;
  }

  // Função para adicionar o carro
  onSubmit(): void {
    if (this.addCarForm.invalid) {
      return;
    }

    this.isLoading = true;

    const car: Car = {
      model: this.addCarForm.value.model,
      year: this.addCarForm.value.year,
      licensePlate: this.addCarForm.value.licensePlate,
      color: this.addCarForm.value.color,
      image: this.addCarForm.value.image ? this.addCarForm.value.image.name : ''
    };

    this.carService.addCar(car).subscribe(
      (response) => {
        this.isLoading = false;
        this.notify.showSuccess("Carro cadastrado com sucesso")
        this.router.navigate([`/cars`]);
      },
      (error) => {
        this.isLoading = false;
        alert('Erro ao adicionar o carro, tente novamente!');
      }
    );
  }
}
