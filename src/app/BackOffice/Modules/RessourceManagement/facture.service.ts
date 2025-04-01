import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Facture {
  id: number;
  date: Date; 
  totalAmount: number;
  commande: Commande; 
}

export interface Commande {
  id: number;
  description: string;  
  dateCommande: Date;   
  status: string;
  totalAmount: number;
}

@Injectable({
  providedIn: 'root'
})
export class FactureService {
  private apiUrl = 'http://localhost:8089/AGPC/facture';
  private commandeUrl = 'http://localhost:8089/AGPC/commande';

  constructor(private http: HttpClient) {}

  getFactures(): Observable<Facture[]> {
    return this.http.get<Facture[]>(this.apiUrl);
  }

  getFactureById(id: number): Observable<Facture> {
    return this.http.get<Facture>(`${this.apiUrl}/${id}`);
  }

  createFacture(facture: Facture): Observable<Facture> {
    return this.http.post<Facture>(this.apiUrl, facture);
  }

  updateFacture(id: number, facture: Facture): Observable<Facture> {
    return this.http.put<Facture>(`${this.apiUrl}/${id}`, facture);
  }

  deleteFacture(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getCommandes(): Observable<Commande[]> {
    return this.http.get<Commande[]>(this.commandeUrl);
  }
}
