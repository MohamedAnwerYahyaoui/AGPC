import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Fournisseur } from './models/fournisseur.model';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {
  private apiUrl = 'http://localhost:8086/rm/fournisseur'; 
  private apiUrlQr = 'https://api.qrserver.com/v1/create-qr-code/?data'; 

  private fournisseursSubject = new BehaviorSubject<Fournisseur[]>([]); 
  fournisseurs$ = this.fournisseursSubject.asObservable(); 

  constructor(private http: HttpClient) {}

  
  getFournisseurs(): Observable<Fournisseur[]> {
    return this.http.get<Fournisseur[]>(`${this.apiUrl}/list`).pipe(
      tap(data => {
        console.log('Données reçues du serveur :', data);
        this.fournisseursSubject.next(data); 
      })
    );
  }

  /**
   * Ajoute un nouveau fournisseur.
   * @param fournisseur - Le fournisseur à ajouter.
   */
  createFournisseur(fournisseur: Fournisseur): Observable<Fournisseur> {
    return this.http.post<Fournisseur>(`${this.apiUrl}/ajouter`, fournisseur).pipe(
      tap((newFournisseur) => {
        const fournisseursActuels = this.fournisseursSubject.value;
        this.fournisseursSubject.next([...fournisseursActuels, newFournisseur]); 
      })
    );
  }

  /**
   * Met à jour un fournisseur existant.
   * @param id - L'ID du fournisseur à mettre à jour.
   * @param fournisseur - Les nouvelles données du fournisseur.
   */
  updateFournisseur(id: number, fournisseur: Fournisseur): Observable<Fournisseur> {
    return this.http.put<Fournisseur>(`${this.apiUrl}/${id}`, fournisseur).pipe(
      tap((updatedFournisseur) => {
        const fournisseursActuels = this.fournisseursSubject.value;
        const index = fournisseursActuels.findIndex(f => f.id === id);
        if (index !== -1) {
          fournisseursActuels[index] = updatedFournisseur; 
          this.fournisseursSubject.next([...fournisseursActuels]);
        }
      })
    );
  }

  /**
   * Supprime un fournisseur par son ID.
   * @param id - L'ID du fournisseur à supprimer.
   */
  deleteFournisseur(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const fournisseursActuels = this.fournisseursSubject.value.filter(f => f.id !== id); 
        this.fournisseursSubject.next([...fournisseursActuels]);
      })
    );
  }
}