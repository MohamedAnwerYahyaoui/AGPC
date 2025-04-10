import { Component, OnInit } from '@angular/core';
import { AssuranceService } from '../assurance.service'; // Chemin corrigé
import { Assurance, TypeAssurance } from 'src/app/BackOffice/Modules/AssuranceManagement/models/Assurance.model';
import { ChangeDetectorRef } from '@angular/core';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-assurance-list',
  templateUrl: './assurance-list.component.html',
  styleUrls: ['./assurance-list.component.css']
})
export class AssuranceListComponent implements OnInit {
  assurances: Assurance[] = [];
  selectedAssurance: Assurance | null = null;
  searchTerm: string = '';
  selectedType: string = '';
  typesAssurances: string[] = Object.values(TypeAssurance);
  page: number = 0;
  size: number = 5;
  totalItems: number = 0;
  totalMontantCouverture: number = 0;
  comingExpirations: Assurance[] = [];
  showNotifications: boolean = false;
  today: Date = new Date();

  // Variables pour la météo
  weatherData: any = null;
  weatherError: string | null = null;
  city: string = 'Paris'; // Ville par défaut

  constructor(private assuranceService: AssuranceService) {}

  ngOnInit(): void {
    this.getAllAssurances();
    this.getWeather();
  }

  getWeather(): void {
    console.log('Début de la requête météo pour la ville :', this.city);
    this.weatherError = null;
    this.assuranceService.getWeatherByCity(this.city).subscribe({
      next: (data) => {
        console.log('Réponse de l\'API météo :', data);
        this.weatherData = data;
      },
      error: (err) => {
        console.error('Erreur détaillée :', err);
        this.weatherError = 'Impossible de récupérer les données météo. Détails : ' + err.message;
      },
      complete: () => {
        console.log('Requête météo terminée');
      }
    });
  }

  getAllAssurances(): void {
    this.assuranceService.getAllAssurances(this.page, this.size).subscribe({
      next: (data) => {
        this.assurances = data.content;
        this.totalItems = data.totalElements;
        this.calculateTotalMontantCouverture();
        this.checkUpcomingExpirations();
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des assurances :', err);
      }
    });
  }

  filterByType(): void {
    if (this.selectedType && this.selectedType !== 'Tous') {
      this.assurances = this.assurances.filter(assurance => assurance.typeAssurance === this.selectedType);
      this.calculateTotalMontantCouverture();
      this.checkUpcomingExpirations();
    } else {
      this.getAllAssurances();
    }
  }

  calculateTotalMontantCouverture(): void {
    this.totalMontantCouverture = this.assurances.reduce((total, assurance) => total + (assurance.montantCouverture || 0), 0);
  }

  checkUpcomingExpirations(): void {
    const today = new Date();
    const thresholdDate = new Date(today);
    thresholdDate.setDate(today.getDate() + 7);
    this.comingExpirations = this.assurances.filter(assurance => {
      if (assurance.dateExpiration) {
        const expirationDate = new Date(assurance.dateExpiration);
        return expirationDate >= today && expirationDate <= thresholdDate;
      }
      return false;
    });
  }

  onPageChange(page: number): void {
    this.page = page;
    this.getAllAssurances();
  }

  openEditPopup(assurance: Assurance): void {
    if (assurance.dateExpiration) {
      assurance.dateExpiration = new Date(assurance.dateExpiration).toISOString().split('T')[0];
    }
    this.selectedAssurance = { ...assurance };
  }

  saveChanges(): void {
    if (this.selectedAssurance && this.selectedAssurance.id !== undefined) {
      this.assuranceService.updateAssurance(this.selectedAssurance).subscribe({
        next: (updatedAssurance) => {
          alert('Assurance modifiée avec succès !');
          const index = this.assurances.findIndex(a => a.id === updatedAssurance.id);
          if (index !== -1) {
            this.assurances[index] = updatedAssurance;
          }
          this.selectedAssurance = null;
          this.calculateTotalMontantCouverture();
          this.checkUpcomingExpirations();
        },
        error: (err) => {
          console.error('Erreur lors de la modification de l\'assurance :', err);
        }
      });
    }
  }

  deleteAssurance(id: number | null): void {
    if (id === null || id === undefined) return;
    if (confirm("Voulez-vous vraiment supprimer cette assurance ?")) {
      this.assuranceService.deleteAssurance(id).subscribe({
        next: () => {
          alert(`Assurance avec ID ${id} supprimée.`);
          this.assurances = this.assurances.filter(assurance => assurance.id !== id);
          this.totalItems--;
          this.calculateTotalMontantCouverture();
          this.checkUpcomingExpirations();
        },
        error: (err) => {
          console.error('Erreur lors de la suppression :', err);
        }
      });
    }
  }

  downloadPDF(id: number): void {
    this.assuranceService.getAssuranceById(id).subscribe({
      next: (assurance) => {
        const doc = new jsPDF();
  
        // En-tête
        doc.setFontSize(18);
        doc.setTextColor(0, 102, 204); // Bleu foncé pour le titre
        doc.text('Attestation d\'Assurance', 20, 20);
  
        // Séparation de l'en-tête
        doc.setDrawColor(0, 102, 204);
        doc.setLineWidth(0.5);
        doc.line(20, 22, 190, 22); // Ligne de séparation
  
        // Section des détails de l'assurance
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0); // Noir pour les données
        doc.text('Détails de l\'Assurance', 20, 30);
  
        const tableHeaders = ['Détail', 'Valeur'];
        const tableData = [
          ['Nom', assurance.nom],
          ['Type d\'Assurance', assurance.typeAssurance],
          ['Date d\'Expiration', new Date(assurance.dateExpiration).toLocaleDateString()],
          ['Montant de Couverture', `${assurance.montantCouverture} EUR`]
        ];
  
        // Dessiner un tableau avec des en-têtes personnalisés
        const colWidths = [80, 100];
        const startY = 35;
        const rowHeight = 10;
        const xOffset = 20;
  
        // Couleur des en-têtes
        doc.setFillColor(0, 102, 204); // Bleu foncé
        doc.rect(xOffset, startY, colWidths[0], rowHeight, 'F'); // Première colonne
        doc.rect(xOffset + colWidths[0], startY, colWidths[1], rowHeight, 'F'); // Deuxième colonne
        doc.setTextColor(255, 255, 255); // Blanc pour les en-têtes
        doc.text(tableHeaders[0], xOffset + 5, startY + 7);
        doc.text(tableHeaders[1], xOffset + colWidths[0] + 5, startY + 7);
  
        // Remplir le tableau avec les données
        doc.setTextColor(0, 0, 0); // Retour au texte noir
        let yPosition = startY + rowHeight;
        for (let i = 0; i < tableData.length; i++) {
          doc.text(tableData[i][0], xOffset + 5, yPosition + 5);
          doc.text(tableData[i][1], xOffset + colWidths[0] + 5, yPosition + 5);
          yPosition += rowHeight;
        }
  
        // Ajouter une ligne de séparation
        doc.setDrawColor(0, 102, 204);
        doc.line(20, yPosition + 5, 190, yPosition + 5); // Ligne sous les détails
  
        // Section météo si disponible
        if (this.weatherData) {
          doc.setFontSize(12);
          doc.setTextColor(0, 0, 0); // Noir pour les données météo
          doc.text(`Météo à ${this.weatherData.name}:`, 20, yPosition + 15);
          doc.text(`Température: ${this.weatherData.main.temp}°C`, 20, yPosition + 25);
          doc.text(`Condition: ${this.weatherData.weather[0].description}`, 20, yPosition + 35);
          yPosition += 40; // Ajuster la position de la fin de la météo
        }
  
        // Footer
        doc.setFontSize(10);
        doc.setTextColor(150, 150, 150); // Gris clair pour le pied de page
        doc.text('Généré par l\'application  Techroots', 20, yPosition + 10);
        doc.text(`Date de génération: ${new Date().toLocaleString()}`, 20, yPosition + 20);
  
        // Sauvegarder le PDF
        doc.save(`Attestation_${id}.pdf`);
      },
      error: (err) => {
        console.error('Erreur lors de la génération du PDF :', err);
        alert('Erreur lors de la génération du PDF');
      }
    });
  }
  
  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
  }
}