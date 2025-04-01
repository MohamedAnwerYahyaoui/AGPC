import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Commande } from './models/commande.model';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private baseUrl = 'http://localhost:8089/AGPC/commande'; 

  constructor(private http: HttpClient) { }

  
  getAllCommandes(): Observable<Commande[]> {
    return this.http.get<Commande[]>(`${this.baseUrl}`);
  }

  
  getCommandeById(id: number): Observable<Commande> {
    return this.http.get<Commande>(`${this.baseUrl}/${id}`);
  }

  
  createCommande(commande: Commande): Observable<Commande> {
    return this.http.post<Commande>(`${this.baseUrl}/add`, commande);
  }

  
  updateCommande(id: number, commande: Commande): Observable<Commande> {
    return this.http.put<Commande>(`${this.baseUrl}/${id}`, commande);
  }


  deleteCommande(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
