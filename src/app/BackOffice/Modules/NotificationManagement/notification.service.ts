import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators'; // Ajoutez ici tap

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private apiUrl = 'http://localhost:http://localhost:8086/document/api/notifications';  // Assurez-vous que cette URL est correcte

  constructor(private http: HttpClient) { }

  // ✅ Récupérer toutes les notifications
  getAllNotifications(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      tap(data => console.log("📢 Notifications API reçues :", data)), // Ajoute ce log
      catchError(error => {
        console.error('❌ Erreur API:', error);
        return throwError(() => new Error('Erreur de chargement.'));
      })
    );
  }
  
  
  

  // ✅ Récupérer les notifications non lues
  getNotificationsNonLues(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/non-lues`).pipe(
      catchError(error => {
        console.error('❌ Erreur lors de la récupération des notifications non lues:', error);
        return throwError(() => new Error('Erreur de chargement des notifications non lues.'));
      })
    );
  }

  // ✅ Marquer une notification comme lue
  updateNotification(id: number, notification: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, notification).pipe(
      catchError(error => {
        console.error(`❌ Erreur lors de la mise à jour de la notification ${id}:`, error);
        return throwError(() => new Error('Erreur de mise à jour de la notification.'));
      })
    );
  }

  // ✅ Supprimer une notification
  deleteNotification(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`❌ Erreur lors de la suppression de la notification ${id}:`, error);
        return throwError(() => new Error('Erreur de suppression de la notification.'));
      })
    );
  }
}