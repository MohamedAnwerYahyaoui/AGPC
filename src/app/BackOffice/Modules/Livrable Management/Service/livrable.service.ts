import { Injectable } from '@angular/core';
import { Tache } from '../Model/tache.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Livrable {
  id?: number;
  nom: string;
  description: string;
  dateLivraison: Date;
  taches?: Tache[];
}


@Injectable({
  providedIn: 'root'
})
export class LivrableService {


 private apiUrl = 'http://localhost:8086/livra/livrable';

  constructor(private http: HttpClient) { }

  getAllLivrables(): Observable<Livrable[]> {
    return this.http.get<Livrable[]>(`${this.apiUrl}/all`);
  }

  getLivrableById(id: number): Observable<Livrable> {
    return this.http.get<Livrable>(`${this.apiUrl}/find/${id}`);
  }

  addLivrable(livrable: Livrable): Observable<Livrable> {
    return this.http.post<Livrable>(`${this.apiUrl}/ajouter`, livrable);
  }

  updateLivrable(id: number, livrable: Livrable): Observable<Livrable> {
    return this.http.put<Livrable>(`${this.apiUrl}/${id}`, livrable);
  }

  deleteLivrable(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/delete/${id}`);
  }

}