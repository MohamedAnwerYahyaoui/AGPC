import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Congee } from 'src/app/Models/congee';
import { congeeService } from 'src/app/services/congee.service';
import { NotificationService } from 'src/app/services/notification.service';


@Component({
  selector: 'app-list-congee',
  templateUrl: './list-congee.component.html',
  styleUrls: ['./list-congee.component.css']
})
export class ListCongeeComponent implements OnInit {
  congees: Congee[] = [];
  notifications: { [key: number]: string } = {};

  // Champs de recherche et filtrage
  searchText: string = '';
  selectedEtat: string = '';
  filterStartDate: string = ''; // "yyyy-MM-dd" (input type="date")
  filterEndDate: string = '';   // "yyyy-MM-dd"

  // Pagination
  page: number = 1;

  // Liste d'états possibles
  etats = ['ACCEPTEE', 'REFUSEE', 'EN_ATTENTE'];

  constructor(
    private congeeService: congeeService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadCongees();
  }

  loadCongees(): void {
    this.congeeService.getCongees().subscribe(
      (data) => {
        this.congees = data;
        this.checkNotifications();
      },
      (error) => {
        console.error('Erreur lors du chargement des congés :', error);
      }
    );
  }

  deleteCongee(id: number): void {
    if (confirm('Voulez-vous supprimer ce congé ?')) {
      this.congeeService.deleteCongee(id).subscribe(
        () => {
          // Mettre à jour localement
          this.congees = this.congees.filter((c) => c.id !== id);
        },
        (error) => {
          console.error('Erreur lors de la suppression du congé :', error);
        }
      );
    }
  }
  checkNotifications(): void {
    // Pour chaque congé, on affiche une notification globale en fonction de son état.
    this.congees.forEach((congee) => {
      let message = '';
      switch (congee.etat) {
        case 'ACCEPTEE':
          message = 'Congé accepté';
          break;
        case 'REFUSEE':
          message = 'Congé refusé';
          break;
        case 'EN_ATTENTE':
          message = 'Congé en attente';
          break;
      }
      if (message) {
        this.notificationService.showNotification(message);
      }
    });
  }

  editCongee(id: number): void {
    // Redirection vers la page d'édition
    this.router.navigate(['/dashboard/add-congee', id]);
  }

  /**
   * Réinitialise la pagination à la page 1
   * dès qu'un filtre ou la recherche change.
   */
  resetPage(): void {
    this.page = 1;
  }
}
