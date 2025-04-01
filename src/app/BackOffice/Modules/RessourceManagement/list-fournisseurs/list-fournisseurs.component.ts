import { Component, OnInit } from '@angular/core';
import { FournisseurService } from '../fournisseur.service';
import { Fournisseur } from '../models/fournisseur.model';
import Swal from 'sweetalert2';
import { SafeUrl } from '@angular/platform-browser';
import html2canvas from 'html2canvas';
import { QRCodeModule } from 'angularx-qrcode';


@Component({
  selector: 'app-list-fournisseurs',
  templateUrl: './list-fournisseurs.component.html',
  styleUrls: ['./list-fournisseurs.component.css']
})
export class ListFournisseursComponent implements OnInit {
  fournisseurs: Fournisseur[] = [];
  filteredFournisseurs: Fournisseur[] = [];
  selectedFournisseur: Fournisseur | null = null;
  suggestions: Fournisseur[] = [];
  showSuggestions: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 1; 
  totalItems: number = 0;
  searchQuery: string = '';
  qrCodeDownloadLink: SafeUrl = "";

  constructor(private fournisseurService: FournisseurService) {}

  ngOnInit(): void {
    this.loadFournisseurs();
  }

 
  loadFournisseurs(): void {
    this.fournisseurService.getFournisseurs().subscribe({
      next: (data: Fournisseur[]) => {
        this.fournisseurs = data;
        this.filteredFournisseurs = data;
        this.totalItems = this.filteredFournisseurs.length;
      },
      error: (error) => console.error('Erreur lors du chargement :', error)
    });
  }

 
  filterFournisseurs(): void {
    if (!this.searchQuery) {
      this.filteredFournisseurs = this.fournisseurs;
      this.suggestions = [];
      this.showSuggestions = false;
    } else {
      const query = this.searchQuery.toLowerCase();
      this.suggestions = this.fournisseurs.filter(
        (fournisseur) =>
          fournisseur.name.toLowerCase().includes(query) ||
          fournisseur.contact.toLowerCase().includes(query) ||
          fournisseur.numtel.toString().toLowerCase().includes(query)
      );
      this.showSuggestions = true;
    }
    this.totalItems = this.filteredFournisseurs.length;
    this.currentPage = 1; 
  }

  
  selectSuggestion(suggestion: Fournisseur): void {
    this.searchQuery = suggestion.name;
    this.filteredFournisseurs = [suggestion];
    this.showSuggestions = false;
  }

  onBlur(): void {
    setTimeout(() => {
      this.showSuggestions = false;
    }, 200);
  }

  
  deleteFournisseur(id: number): void {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Voulez-vous vraiment supprimer ce fournisseur ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer !',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.fournisseurService.deleteFournisseur(id).subscribe({
          next: () => {
            Swal.fire('Supprimé !', 'Le fournisseur a été supprimé.', 'success');
            this.loadFournisseurs(); 
          },
          error: (error) => {
            if (error.status === 404) {
              Swal.fire('Erreur !', 'Le fournisseur n\'existe pas.', 'error');
            } else if (error.status === 403) {
              Swal.fire('Erreur !', 'Vous n\'avez pas les permissions nécessaires.', 'error');
            } else {
              Swal.fire('Erreur !', 'Une erreur est survenue lors de la suppression.', 'error');
            }
            console.error('Erreur API :', error);
          }
        });
      }
    });
  }

  
  editFournisseur(fournisseur: Fournisseur): void {
    this.selectedFournisseur = { ...fournisseur };
  }

  
  updateFournisseur(): void {
    if (this.selectedFournisseur) {
      this.fournisseurService.updateFournisseur(this.selectedFournisseur.id, this.selectedFournisseur).subscribe({
        next: () => {
          this.loadFournisseurs(); 
          this.selectedFournisseur = null;
        },
        error: (error) => console.error('Erreur lors de la mise à jour :', error)
      });
    }
  }

  
  cancelEdit(): void {
    this.selectedFournisseur = null;
  }

 
  getPaginatedFournisseurs(): Fournisseur[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredFournisseurs.slice(startIndex, endIndex);
  }

 
  changePage(page: number): void {
    this.currentPage = page;
  }

  
  getTotalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }


  getQRCodeData(fournisseur: Fournisseur): string {
    return `Nom: ${fournisseur.name}\nContact: ${fournisseur.contact}\nTéléphone: ${fournisseur.numtel}`;
  }

  
  onChangeURL(url: SafeUrl): void {
    this.qrCodeDownloadLink = url;
  }

  
  downloadCustomQRCode(elementId: string, fileName: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      html2canvas(element).then((canvas: HTMLCanvasElement) => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = fileName;
        link.click();
      });
    }
  }
}