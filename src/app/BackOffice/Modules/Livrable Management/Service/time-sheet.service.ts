import { Injectable } from '@angular/core';
import {User} from "../Model/user.model";
import {Tache} from "../Model/tache.model";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
export interface Timesheet {
  id?: number;
  date: string; // LocalDate sera converti en string (ISO format: "YYYY-MM-DD")
  heures: number;
  description: string;
  tache: Tache;
  user: User;
}
@Injectable({
  providedIn: 'root'
})
export class TimeSheetService {
  private apiUrl = 'http://localhost:8086/livra/timeSheet';
  constructor(private http: HttpClient) {}
/*
  getAllTimesheets(): Observable<Timesheet[]> {
    return this.http.get<Timesheet[]>(`${this.apiUrl}/all`).pipe(catchError(this.handleError));
  }
*/
  getTimesheetById(id: number): Observable<Timesheet> {
    return this.http.get<Timesheet>(`${this.apiUrl}/find/${id}`).pipe(catchError(this.handleError));
  }

  createTimesheet(timesheet: Timesheet): Observable<Timesheet> {
    return this.http.post<Timesheet>(`${this.apiUrl}/ajouter`, timesheet).pipe(catchError(this.handleError));
  }

  updateTimesheet(id: number, timesheet: Timesheet): Observable<Timesheet> {
    return this.http.put<Timesheet>(`${this.apiUrl}/${id}`, timesheet).pipe(catchError(this.handleError));
  }
/*
  deleteTimesheet(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/delete/${id}`).pipe(catchError(this.handleError));
  }
*/
  assignTimesheetToTaskAndUser(tacheId: number, userId: number, timesheet: Timesheet): Observable<Timesheet> {
    return this.http.put<Timesheet>(`${this.apiUrl}/affecter/${tacheId}/${userId}`, timesheet).pipe(catchError(this.handleError));
  }
/*
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Une erreur est survenue';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Code: ${error.status}, Message: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
*/




  getAllTimesheets(): Observable<Timesheet[]> {
    return this.http.get<Timesheet[]>(`${this.apiUrl}/all`).pipe(
      catchError(this.handleError)
    );
  }

  deleteTimesheet(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`, {
      responseType: 'text' // Accepte les réponses non-JSON
    }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 200 && error.error && typeof error.error === 'string') {
      // Cas où le backend renvoie une réponse texte avec status 200
      return throwError(() => new Error(error.error));
    }

    let errorMessage = 'Une erreur est survenue';
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = `Erreur: ${error.error.message}`;
    } else {
      // Erreur côté serveur
      errorMessage = `Code: ${error.status}, Message: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }





  getHoursPerTask(): Observable<any> {
    return this.http.get(`${this.apiUrl}/heures-par-tache`);
  }


}