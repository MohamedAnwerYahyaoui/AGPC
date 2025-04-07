import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/BackOffice/Modules/NotificationManagement/notification.service';


@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {
  
  notifications: any[] = [];

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.notificationService.getAllNotifications().subscribe(
      (data) => {
        console.log("📢 Notifications dans le composant :", data);
        this.notifications = data;
      },
      (error) => console.error("❌ Erreur :", error)
    );
  }
  

  // Exemple d'ajout de gestion des erreurs avec un message utilisateur
  loadNotifications(): void {
    this.notificationService.getAllNotifications().subscribe(
      (data) => {
        console.log('Notifications récupérées:', data);
        this.notifications = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des notifications:', error);
      }
    );
  }
  
  
  
  
  

  // Marquer une notification comme lue
  markAsRead(notification: any): void {
    const updatedNotification = { ...notification, lue: true };
    this.notificationService.updateNotification(notification.id, updatedNotification).subscribe(
      () => {
        console.log('Notification mise à jour');
        this.notifications = this.notifications.map(n => 
          n.id === notification.id ? { ...n, lue: true } : n
        );
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de la notification', error);
      }
    );
  }
  
  // Supprimer une notification
  deleteNotification(id: number): void {
    this.notificationService.deleteNotification(id).subscribe(
      () => {
        console.log('Notification supprimée');
        this.loadNotifications(); // Recharger la liste après suppression
      },
      (error) => {
        console.error('Erreur lors de la suppression de la notification', error);
      }
    );
  }
}
