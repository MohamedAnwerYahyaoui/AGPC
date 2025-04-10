import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Congee } from 'src/app/Models/congee';

@Injectable({
  providedIn: 'root'
})
export class congeeService {
  private apiUrl = 'http://localhost:8086/membres/Congee';

  constructor(private http: HttpClient) {}

  getCongeeById(id: number): Observable<Congee> {
    return this.http.get<any>(`${this.apiUrl}/congees/${id}`).pipe(
      map(response => {
        // Transforme la réponse pour créer la propriété employee_id
        return {
          ...response,
          employee_id: response.employe ? response.employe.id : null
        } as Congee;
      })
    );
  }
  getCongeeByNom(nom: string): Observable<Congee> {
    return this.http.get<any>(`${this.apiUrl}/nom/check/${encodeURIComponent(nom)}`).pipe(
      map(response => {
        return {
          ...response,
          employee_id: response.employe ? response.employe.id : null
        } as Congee;
      })
    );
  }

  // Les autres méthodes restent inchangées...
  updateCongee(id: number, congee: Congee): Observable<Congee> {
    return this.http.put<Congee>(`${this.apiUrl}/${id}`, congee);
  }

  addCongeeToEmployee(employeeId: number, congee: Congee): Observable<Congee> {
    return this.http.post<Congee>(`${this.apiUrl}/employee/${employeeId}`, congee);
  }

  deleteCongee(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }

  getCongees(): Observable<Congee[]> {
    return this.http.get<Congee[]>(`${this.apiUrl}/list`).pipe(
      map(congees => congees.map(c => ({
        ...c,
        employee_id: c.employe ? c.employe.id : null
      })))
    );
  }
   // Calcul + email si < 5
   checkRemainingDaysByNom(nomCongee: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/check/nom/${encodeURIComponent(nomCongee)}`);
  }
  
  }
