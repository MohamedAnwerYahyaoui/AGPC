import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Stock } from './models/stock.model';
import { Materials } from './models/materials.model';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private apiUrl = 'http://localhost:8086/rm/stock'; 
  private stockToUpdate: Stock | null = null;
  constructor(private http: HttpClient) {}
  setStockToUpdate(stock: Stock): void {
    this.stockToUpdate = stock;
  }

  getStockToUpdate(): Stock | null {
    return this.stockToUpdate;
  }
  getAllStocks(): Observable<Stock[]> {
    return this.http.get<Stock[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Erreur lors du chargement des stocks', error);
        return throwError(error);
      })
    );
  }

  getStockById(id: number): Observable<Stock> {
    return this.http.get<Stock>(`${this.apiUrl}/${id}`);
  }

  createStock(stock: Stock): Observable<Stock> {
    return this.http.post<Stock>(`${this.apiUrl}/add`, stock).pipe(
      catchError((error) => {
        console.error('Erreur lors de l’ajout du stock', error);
        return throwError(error);
      })
    );
  }
  updateStock(id: number, stockData: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    console.log('URL de la requête PUT :', url); 
    console.log('Données envoyées :', stockData); 
    return this.http.put(url, stockData).pipe(
      catchError((error) => {
        console.error('Erreur lors de la mise à jour du stock :', error);
        return throwError(error);
      })
    );
  }

  

  deleteStock(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getAllMaterials(): Observable<Materials[]> {
    return this.http.get<Materials[]>('http://localhost:8086/rm/materials');
  }
}