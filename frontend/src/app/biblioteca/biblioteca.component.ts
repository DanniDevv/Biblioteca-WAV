import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BibliotecaService } from '../biblioteca.service';

import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.component.html',
  styleUrls: ['./biblioteca.component.css']
})
export class BibliotecaComponent implements OnInit {
  bibliotecas: any[] = [];
  filteredBibliotecas: any[] = [];  // Lista filtrada para búsqueda
  currentBiblioteca: any = {};
  bibliotecaForm: FormGroup;
  selectedFile: File | null = null;
  searchQuery: string = '';  // Variable para almacenar la consulta de búsqueda

  constructor(
    private bibliotecaService: BibliotecaService,
    private fb: FormBuilder,
    private dialog: MatDialog  // Añadir esta línea

  ) {
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
        this.filteredBibliotecas = bibliotecas;  // Inicializa la lista filtrada
        this.applyFilter();  // Aplica el filtro inicial
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
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmación',
        message: '¿Estás seguro de que deseas eliminar este elemento?',
      },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.bibliotecaService.deleteBiblioteca(id)
          .subscribe(() => {
            this.getBibliotecas();
          });
      }
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
   // Método para aplicar el filtro de búsqueda
   applyFilter(): void {
    this.filteredBibliotecas = this.bibliotecas.filter((biblioteca) => {
      return (
        biblioteca.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        biblioteca.descripcion.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        biblioteca.fecha.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    });
  }
  orderList(field: string): void {
    this.filteredBibliotecas.sort((a, b) => {
      if (a[field] < b[field]) return -1;
      if (a[field] > b[field]) return 1;
      return 0;
    });
  }
}
