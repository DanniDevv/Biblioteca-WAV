import { Component, OnInit } from '@angular/core';
import { BibliotecaService } from '../biblioteca.service';

@Component({
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.component.html',
  styleUrls: ['./biblioteca.component.css']
})
export class BibliotecaComponent implements OnInit {
  bibliotecas: any[] = [];
  currentBiblioteca: any = {};

  constructor(private bibliotecaService: BibliotecaService) { }

  ngOnInit(): void {
    this.getBibliotecas();
  }

  getBibliotecas(): void {
    this.bibliotecaService.getBibliotecas()
      .subscribe((bibliotecas) => {
        this.bibliotecas = bibliotecas;
      });
  }

  getBibliotecaById(id: string): void {
    this.bibliotecaService.getBibliotecaById(id)
      .subscribe((biblioteca) => {
        this.currentBiblioteca = biblioteca;
      });
  }

  createBiblioteca(biblioteca: any): void {
    this.bibliotecaService.createBiblioteca(biblioteca)
    .subscribe(() => {
      this.getBibliotecas();
      this.currentBiblioteca = {};
    });
  }

// En el componente Angular
updateBiblioteca(id: string, biblioteca: any): void {
  this.bibliotecaService.updateBiblioteca(id, biblioteca)
      .subscribe(() => {
          this.getBibliotecas();
          this.currentBiblioteca = {};
      });
}

  deleteBiblioteca(id: string): void {
    this.bibliotecaService.deleteBiblioteca(id)
    .subscribe(() => {
      this.getBibliotecas();
    });
  }

  editBiblioteca(id: string):void{
    this.getBibliotecaById(id)
  }
}
