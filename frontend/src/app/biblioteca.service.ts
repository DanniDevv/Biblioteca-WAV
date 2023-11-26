import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BibliotecaService {
  private apiUrl = 'http://localhost:3000/api/bibliotecas';

  constructor(private http: HttpClient) { }

  getBibliotecas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  getBibliotecaById(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  createBiblioteca(biblioteca: any): Observable<any> {
    const formData = new FormData();
    Object.keys(biblioteca).forEach(key => {
      formData.append(key, biblioteca[key]);
    });

    return this.http.post(this.apiUrl, formData)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateBiblioteca(id: string, biblioteca: any): Observable<any> {
    const formData = new FormData();
    Object.keys(biblioteca).forEach(key => {
      formData.append(key, biblioteca[key]);
    });

    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, formData)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteBiblioteca(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('Error:', error);
    return throwError('Ocurrió un error. Por favor, inténtelo nuevamente.');
  }
}
