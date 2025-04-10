import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Equipe } from 'src/app/Models/Equipe';

@Injectable({
  providedIn: 'root'
})
export class EquipeService {
  private apiUrl = 'http://localhost:8086/membres/Equipe';  

  constructor(private http: HttpClient) {}
   // Met à jour le rating de l'équipe
   updateRating(equipeId: number, rating: number): Observable<Equipe> {
    return this.http.put<Equipe>(`${this.apiUrl}/${equipeId}/rating`, { rating });
  }

  getEquipes(): Observable<Equipe[]> {
    return this.http.get<Equipe[]>(`${this.apiUrl}/list`);
  }

  getEquipeById(id: number): Observable<Equipe> {
    return this.http.get<Equipe>(`${this.apiUrl}/${id}`);
  }

  createEquipe(equipe: any): Observable<Equipe> {
    return this.http.post<Equipe>(`${this.apiUrl}/ajouter`, equipe);
  }

  updateEquipe(id: number, equipe: any): Observable<Equipe> {
    return this.http.put<Equipe>(`${this.apiUrl}/${id}`, equipe);
  }

  deleteEquipe(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }

  affecterLivrable(equipeId: number, livrableId: number): Observable<Equipe> {
    return this.http.post<Equipe>(`${this.apiUrl}/affecterLivrable/${equipeId}/${livrableId}`, {});
  }
}


