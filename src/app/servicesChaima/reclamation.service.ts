import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reclamation } from '../modelsChaima/reclamation';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  private apiUrl = 'http://localhost:reclamations/reclamations';

  constructor(private http: HttpClient) { }

  
  getAllReclamations(): Observable<Reclamation[]> {
    return this.http.get<Reclamation[]>(this.apiUrl);
  }
  
  getUserReclamations(userId: number): Observable<Reclamation[]> {
    return this.http.get<Reclamation[]>(`${this.apiUrl}/user?userId=${userId}`);
  }
  
  createReclamation(reclamation: Reclamation, file?: File): Observable<Reclamation> {
    const formData = new FormData();
    formData.append('reclamation', new Blob([JSON.stringify(reclamation)], { type: 'application/json' }));
    if (file) {
        formData.append('file', file);
    }
    return this.http.post<Reclamation>(this.apiUrl, formData);
  }

  getFile(id: number): Observable<Blob> {
    const url = `http://localhost:8086/reclamations/file/${id}`;
    return this.http.get(url, { responseType: 'blob' });
  }
  
  updateReclamation(reclamation: Reclamation): Observable<Reclamation> {
    return this.http.put<Reclamation>(this.apiUrl, reclamation);
  }

  deleteReclamation(id: number): Observable<void> {
    if (id !== undefined && id !== null) {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    } else {
        console.warn("Invalid ID for deletion:", id);
        return new Observable<void>();
    }
  }
  
  getReclamationById(id: number): Observable<Reclamation> {
    return this.http.get<Reclamation>(`${this.apiUrl}/${id}`);
  }
}
