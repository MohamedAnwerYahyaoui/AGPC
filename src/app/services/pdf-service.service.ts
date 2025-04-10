import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PdfServiceService {
  private baseUrl = 'http://localhost:8086/membres/api/pdf'; // URL de base

  constructor(private http: HttpClient) {}

  downloadPdf(contratId: number): Observable<Blob> {
    // On concatène l’ID à la fin de l’URL
    return this.http.get(`${this.baseUrl}/${contratId}`, { responseType: 'blob' });
  }

  
}
