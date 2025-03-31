import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete-dialog',
  templateUrl: './confirm-delete-dialog.component.html',
  styleUrls: ['./confirm-delete-dialog.component.scss']
})
export class ConfirmDeleteDialogComponent implements OnInit {
  counter = 3;
  interval: any;
  showCounterMessage = true;
  disableDeleteButton = false;

  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
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
      }
    }, 1000); // Contagem regressiva de 1 segundo
    this.disableDeleteButton = true; // Desabilitar o botão no início
  }

  // Função para cancelar a exclusão
  onCancel(): void {
    this.dialogRef.close();
  }

  // Função para confirmar a exclusão
  onConfirm(): void {
    this.dialogRef.close(this.data.id); // Passar o id do usuário para exclusão
  }

  // Limpar o intervalo se o modal for fechado antes de completar
  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
