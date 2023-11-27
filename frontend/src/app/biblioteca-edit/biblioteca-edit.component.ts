import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-biblioteca-edit',
  templateUrl: './biblioteca-edit.component.html',
  styleUrls: ['./biblioteca-edit.component.css']
})
export class BibliotecaEditComponent {
  bibliotecaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<BibliotecaEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.bibliotecaForm = this.fb.group({
      title: [data.title, Validators.required],
      descripcion: [data.descripcion, Validators.required],
      imagen: [null, Validators.required],
      fecha: [data.fecha, Validators.required]
    });
  }

  onFileChange(event: any): void {
    const fileInput = this.bibliotecaForm.get('imagen');
    if (fileInput) {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        fileInput.setValue(file);
        fileInput.updateValueAndValidity();
      }
    }
  }

  saveChanges(): void {
    this.dialogRef.close(this.bibliotecaForm.value);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
