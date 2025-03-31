import { Component, Inject, ChangeDetectorRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete-car-dialog',
  templateUrl: './confirm-delete-car-dialog.component.html',
  styleUrls: ['./confirm-delete-car-dialog.component.scss']
})
export class ConfirmDeleteCarDialogComponent {
  counter = 3;  // Contagem regressiva de 3 segundos
  disableDeleteButton = true;  // Botão de excluir desabilitado inicialmente
  interval: any;
  showCounterMessage = true;  // Variável para controlar a visibilidade da mensagem

  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteCarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cdRef: ChangeDetectorRef // Injeção do ChangeDetectorRef
  ) {
    // Iniciar a contagem regressiva ao abrir o modal
    this.startCounter();
  }

  // Função para iniciar o contador
  startCounter() {
    this.interval = setInterval(() => {
      if (this.counter > 0) {
        this.counter--;
      } else {
        clearInterval(this.interval); // Parar o contador quando chegar a zero
        this.disableDeleteButton = false; // Habilitar o botão de excluir
        this.showCounterMessage = false; // Ocultar a mensagem quando o contador chegar a zero

        // Forçar a detecção de mudanças para garantir que a mensagem desapareça
        this.cdRef.detectChanges();
      }
    }, 1000); // Contagem regressiva de 1 segundo
  }

  // Função para cancelar a exclusão
  onCancel(): void {
    this.dialogRef.close();
  }

  // Função para confirmar a exclusão
  onConfirm(): void {
    this.dialogRef.close(this.data.carId); // Passar o id do carro para exclusão
  }

  // Limpar o intervalo se o modal for fechado antes de completar
  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
