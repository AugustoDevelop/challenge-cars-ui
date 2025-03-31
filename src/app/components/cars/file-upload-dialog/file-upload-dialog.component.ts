import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CarService } from '../../../core/services/car/car.service';
import { NotifySnackService } from '../../../shared/notify/notify-snack.service';

@Component({
  selector: 'app-file-upload-dialog',
  templateUrl: './file-upload-dialog.component.html',
  styleUrls: ['./file-upload-dialog.component.scss']
})
export class FileUploadDialogComponent {
  selectedFile: File | null = null;
  imagePreviewUrl: string | ArrayBuffer | null = null;

  constructor(
    public dialogRef: MatDialogRef<FileUploadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, // Dados recebidos ao abrir o modal (se necessário)
    private carService: CarService,
    private notify: NotifySnackService
  ) { }

  // Método para quando o usuário seleciona um arquivo
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      // Verifica se o arquivo é uma imagem
      if (!file.type.startsWith('image/')) {
        this.notify.showWarning('Por favor, selecione um arquivo de imagem.');
        return;
      }

      // Verifica se o tamanho do arquivo não excede 5MB
      if (file.size > 5 * 1024 * 1024) {
        this.notify.showError('A imagem deve ter no máximo 5MB.');
        return;
      }

      this.selectedFile = file;

      // Cria um URL para pré-visualização da imagem
      const reader = new FileReader();
      reader.onload = (e: any) => this.imagePreviewUrl = e.target.result;
      reader.readAsDataURL(file);  // Lê o arquivo como uma URL de dados
    }
  }

  submitImage(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.selectedFile, this.selectedFile.name);

      this.carService.uploadCarImage(this.data.carId, formData).subscribe({
        next: (response) => {
          this.notify.showSuccess('Imagem carregada com sucesso!');
          this.dialogRef.close();
        },
        error: (error) => {
          this.dialogRef.close();
          this.notify.showError('Falha ao carregar a imagem!');
        }
      });
    } else {
      this.dialogRef.close();
      this.notify.showWarning('Por favor, selecione uma imagem antes de enviar.');
    }
  }

  // Método para remover a imagem selecionada
  removeImage(): void {
    this.selectedFile = null;
    this.imagePreviewUrl = null;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
