import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contrat } from 'src/app/Models/Contrat';

@Injectable({
  providedIn: 'root'
})
export class ContratService {
  private apiUrl = 'http://localhost:8086/membres/Contrat';

  constructor(private http: HttpClient) {}

  getContrats(): Observable<Contrat[]> {
    return this.http.get<Contrat[]>(`${this.apiUrl}/list`);
  }

  getContratById(id: number): Observable<Contrat> {
    return this.http.get<Contrat>(`${this.apiUrl}/contrats/${id}`);
  }

  addContrat(contrat: Contrat): Observable<Contrat> {
    return this.http.post<Contrat>(`${this.apiUrl}/ajouter`, contrat);
  }

  updateContrat(id: number, contrat: Contrat): Observable<Contrat> {
    return this.http.put<Contrat>(`${this.apiUrl}/${id}`, contrat);
  }

  deleteContrat(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }
}
