import { Component, OnInit } from '@angular/core';
import { BibliotecaService } from '../biblioteca.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-biblioteca-list',
  templateUrl: './biblioteca-list.component.html',
  styleUrls: ['./biblioteca-list.component.css']
})
export class BibliotecaListComponent implements OnInit {
  bibliotecas: any[] = [];
  filteredBibliotecas: any[] = [];
  searchQuery: string = '';

  constructor(
    private bibliotecaService: BibliotecaService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getBibliotecas();
  }

  getBibliotecas(): void {
    this.bibliotecaService.getBibliotecas()
      .subscribe((bibliotecas) => {
        this.bibliotecas = bibliotecas;
        this.filteredBibliotecas = bibliotecas;
        this.applyFilter();
      });
  }

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

  // Agrega este método solo si necesitas la funcionalidad de edición en este componente
  editBiblioteca(id: string): void {
    this.router.navigate(['/bibliotecas', id, 'edit']);
  }
}
