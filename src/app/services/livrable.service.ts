import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Livrable } from 'src/app/Models/Livrable';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LivrableService {

  private apiUrl = 'http://localhost:8086/membres/Livrable';

  constructor(private http: HttpClient) { }

 
  getLivrables(): Observable<Livrable[]> {
    return this.http.get<Livrable[]>(`${this.apiUrl}/list`);
  }
  

  addLivrable(livrable: Livrable): Observable<Livrable> {
    return this.http.post<Livrable>(`${this.apiUrl}/ajouter`, livrable);
  }

  updateLivrable(id: number, livrable: Livrable): Observable<Livrable> {
    return this.http.put<Livrable>(`${this.apiUrl}/${id}`, livrable);
  }

 
  deleteLivrable(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }
}

