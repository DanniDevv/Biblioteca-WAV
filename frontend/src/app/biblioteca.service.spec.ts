import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BibliotecaService {
  private apiUrl = 'http://localhost:3000/api/bibliotecas';

  constructor(private http: HttpClient) { }

  getBibliotecas(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getBibliotecaById(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get(url);
  }

  createBiblioteca(biblioteca: any): Observable<any> {
    return this.http.post(this.apiUrl, biblioteca);
  }

  updateBiblioteca(id: string, biblioteca: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, biblioteca);
  }

  deleteBiblioteca(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
