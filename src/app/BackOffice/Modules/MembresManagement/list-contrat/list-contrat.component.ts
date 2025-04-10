import { Component, OnInit } from '@angular/core';
import { Contrat, TypeContrat } from 'src/app/Models/Contrat';
import { ContratService } from 'src/app/services/contrat.service';
import { PdfServiceService} from 'src/app/services/pdf-service.service';
import { NotificationService } from 'src/app/services/notification.service';


@Component({
  selector: 'app-list-contrat',
  templateUrl: './list-contrat.component.html',
  styleUrls: ['./list-contrat.component.css']
})
export class ListContratComponent implements OnInit {
  contrats: Contrat[] = [];
  page: number = 1;
  notifications: { [key: number]: string } = {};

  // Propriétés de recherche et de filtrage
  searchText: string = '';
  selectedType: string = '';
  filterStartDate: string = '';  // Saisi en format jj/mm/aaaa
  filterEndDate: string = '';    // Saisi en format jj/mm/aaaa

  // Liste des types de contrat (extrait d’une énumération ou d’une constante)
  typeContrats = Object.values(TypeContrat);
  constructor(private contratService: ContratService, private pdfService: PdfServiceService,  private notificationService: NotificationService) {}


  ngOnInit(): void {
    this.loadContrats();
  }

  loadContrats(): void {
    this.contratService.getContrats().subscribe((data: Contrat[]) => {
      this.contrats = data;
      this.checkNotifications();
    });
  }

  deleteContrat(id: number): void {
    if (confirm('Voulez-vous supprimer ce contrat ?')) {
      this.contratService.deleteContrat(id).subscribe(
        () => {
          this.contrats = this.contrats.filter(c => c.id !== id);
        },
        (error) => {
          console.error('Erreur lors de la suppression du contrat :', error);
        }
      );
    }
  }
  onDownloadPdf(id: number) {
    this.pdfService.downloadPdf(id).subscribe({
      next: (blob: Blob) => {
        // Créer une URL temporaire
        const fileURL = URL.createObjectURL(blob);
        // Ouvrir dans un nouvel onglet
        window.open(fileURL);

        // OU forcer le téléchargement
        // const link = document.createElement('a');
        // link.href = fileURL;
        // link.download = `contrat_${id}.pdf`;
        // link.click();
      },
      error: err => {
        console.error('Erreur lors du téléchargement du PDF :', err);
      }
    });
  }
  // Vérifie pour chaque contrat s'il est expiré et déclenche une notification globale.
  checkNotifications(): void {
    this.contrats.forEach((contrat) => {
      const endDate = new Date(contrat.dateFin);
      const now = new Date();
      if (endDate < now) {
        const formattedDate = endDate.toLocaleDateString('fr-FR');
        const message = `Contrat ${contrat.contrat} expiré le ${formattedDate}`;
        console.log(`Notification pour contrat ${contrat.id}: ${message}`);
        this.notificationService.showNotification(message);
      }
    });
  }
  // Supprime la notification après 3 minutes (180 000 ms)
  hideNotification(index: number): void {
    setTimeout(() => {
      console.log('Suppression notification pour index', index);
      delete this.notifications[index];
    }, 6000); // 1 minute
  }

  /**
   * Réinitialise la pagination à la page 1
   * quand un critère de filtre change.
   */
  resetPage(): void {
    this.page = 1;
  }
}

