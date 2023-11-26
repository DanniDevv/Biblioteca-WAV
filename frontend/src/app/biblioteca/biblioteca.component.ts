import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BibliotecaService } from '../biblioteca.service';

@Component({
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.component.html',
  styleUrls: ['./biblioteca.component.css']
})
export class BibliotecaComponent implements OnInit {
  bibliotecas: any[] = [];
  currentBiblioteca: any = {};
  bibliotecaForm: FormGroup;

  constructor(private bibliotecaService: BibliotecaService, private fb: FormBuilder) {
    this.bibliotecaForm = this.fb.group({
      title: ['', Validators.required],
      descripcion: ['', Validators.required],
      imagen: [null, Validators.required],
      fecha: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getBibliotecas();
  }

  getBibliotecas(): void {
    this.bibliotecaService.getBibliotecas()
      .subscribe((bibliotecas) => {
        this.bibliotecas = bibliotecas;
      });
  }

  createBiblioteca(): void {
    this.bibliotecaService.createBiblioteca(this.bibliotecaForm.value)
      .subscribe(() => {
        this.getBibliotecas();
        this.bibliotecaForm.reset();
        this.currentBiblioteca = {};
      });
  }

  updateBiblioteca(id: string): void {
    this.bibliotecaService.updateBiblioteca(id, this.bibliotecaForm.value)
      .subscribe(() => {
        this.getBibliotecas();
        this.bibliotecaForm.reset();
        this.currentBiblioteca = {};
      });
  }

  deleteBiblioteca(id: string): void {
    this.bibliotecaService.deleteBiblioteca(id)
      .subscribe(() => {
        this.getBibliotecas();
      });
  }

  editBiblioteca(id: string): void {
    this.bibliotecaService.getBibliotecaById(id)
      .subscribe((biblioteca) => {
        this.currentBiblioteca = biblioteca;
        // Puedes establecer los valores en el formulario si es necesario
        this.bibliotecaForm.patchValue({
          title: biblioteca.title,
          descripcion: biblioteca.descripcion,
          imagen: null,  // O mantén el campo de imagen como nulo si no deseas cambiar la imagen al editar
          fecha: biblioteca.fecha
        });
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
}
