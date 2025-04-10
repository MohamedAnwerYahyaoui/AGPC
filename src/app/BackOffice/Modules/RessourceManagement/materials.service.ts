import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import {  tap } from 'rxjs/operators';
import { Materials } from './models/materials.model';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class MaterialsService {
  private apiUrl = 'http://localhost:8086/rm/materials'; 
  private materialsSubject = new BehaviorSubject<Materials[]>([]); 
  materials$ = this.materialsSubject.asObservable(); 
  constructor(private http: HttpClient) {}

  
  getMaterials(): Observable<Materials[]> {
    return this.http.get<Materials[]>(`${this.apiUrl}/list`).pipe(
      tap(data => {
        console.log('Données reçues du serveur :', data); 
        this.materialsSubject.next(data); 
      })
    );
  }

  /**
   * Ajoute un nouveau matériau.
   * @param material - Le matériau à ajouter.
   */
  addMaterial(material: Materials): Observable<Materials> {
    return this.http.post<Materials>(`${this.apiUrl}/ajouter`, material).pipe(
      tap((newMaterial) => {
        const materialsActuels = this.materialsSubject.value;
        this.materialsSubject.next([...materialsActuels, newMaterial]); 
      }),
      catchError(this.handleError)
    );
  }
  
  
  private handleError(error: HttpErrorResponse) {
    console.error('Une erreur s\'est produite :', error);
    return throwError('Une erreur s\'est produite. Veuillez réessayer plus tard.');
  }
  /**
   * Met à jour un matériau existant.
   * @param id - L'ID du matériau à mettre à jour.
   * @param material - Les nouvelles données du matériau.
   */
  updateMaterial(id: number, material: Materials): Observable<Materials> {
    return this.http.put<Materials>(`${this.apiUrl}/${id}`, material).pipe(
      tap((updatedMaterial) => {
        const materialsActuels = this.materialsSubject.value;
        const index = materialsActuels.findIndex(m => m.id === id);
        if (index !== -1) {
          materialsActuels[index] = updatedMaterial; 
          this.materialsSubject.next([...materialsActuels]);
        }
      })
    );
  }

  /**
   * Supprime un matériau par son ID.
   * @param id - L'ID du matériau à supprimer.
   */
  deleteMaterial(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const materialsActuels = this.materialsSubject.value.filter(m => m.id !== id); 
        this.materialsSubject.next([...materialsActuels]);
      })
    );
  }
}