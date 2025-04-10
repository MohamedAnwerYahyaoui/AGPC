import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatSnackBar,MatSnackBarRef } from '@angular/material/snack-bar';



@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private queue: string[] = [];  // file d'attente de messages
  private isSnackBarOpen = false;
  private duration = 6000;

  private apiUrl = 'http://localhost:8086/membres/notifications';

  constructor(private http: HttpClient,private snackBar: MatSnackBar) { }
   
 

  getNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.apiUrl);
  }
  
   /**
   * Ajoute un message à la file d'attente.
   * Si aucune notification n'est en cours, on l'affiche immédiatement.
   */
   showNotification(message: string): void {
    this.queue.push(message);
    this.displayNext();
  }

  /**
   * Affiche la notification suivante dans la file si aucune n'est actuellement en cours.
   */
  private displayNext(): void {
    if (!this.isSnackBarOpen && this.queue.length > 0) {
      this.isSnackBarOpen = true;
      const message = this.queue.shift()!; // retire le premier message de la file

      // Ouvre le SnackBar
      const snackBarRef: MatSnackBarRef<any> = this.snackBar.open(message, 'Fermer', {
        duration: this.duration,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });

      // Quand la notification se ferme (après 60s ou clic "Fermer"), on passe à la suivante
      snackBarRef.afterDismissed().subscribe(() => {
        this.isSnackBarOpen = false;
        this.displayNext();  // Affiche la notification suivante s'il y en a
      });
    }
  }
}
