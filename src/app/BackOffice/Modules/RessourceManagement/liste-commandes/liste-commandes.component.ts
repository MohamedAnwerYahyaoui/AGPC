import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommandeService } from '../commande.service';
import { Commande } from '../models/commande.model';
import { Router } from '@angular/router';
import { trigger, transition, animate, style } from '@angular/animations';
import Swal from 'sweetalert2';
import * as L from 'leaflet';

@Component({
  selector: 'app-liste-commandes',
  templateUrl: './liste-commandes.component.html',
  styleUrls: ['./liste-commandes.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s ease-out', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class ListeCommandesComponent implements OnInit, AfterViewInit {
  commandes: Commande[] = [];
  filteredCommandes: Commande[] = [];
  searchTerm: string = '';
  page: number = 1;
  public map: any;

  statistics = {
    enAttente: 0,
    enCours: 0,
    livree: 0,
  };

  constructor(
    private commandeService: CommandeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCommandes();
  }

  ngAfterViewInit(): void {
    setTimeout(() => { // Solution pour le timing
      this.initMap();})
  }

  private initMap(): void {
    this.map = L.map('map', {
      preferCanvas: true, // Optimisation pour nombreux marqueurs
      zoomControl: true // Activer les contrôles de zoom
    }).setView([36.8065, 10.1815], 12);
  
    // Couche de tuiles avec paramètres optimisés
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors',
      noWrap: true, // Empêcher le wrapping de la carte
      updateWhenIdle: true // Optimisation des performances
    }).addTo(this.map);
  
    // Redimensionnement après initialisation
    setTimeout(() => {
      this.map.invalidateSize();
    }, 100);
  }

  private addMarkers(): void {
    // Supprimer les anciens marqueurs
    this.map.eachLayer((layer: any) => {
      if (layer instanceof L.Marker) {
        this.map.removeLayer(layer);
      }
    });

    this.commandes.forEach(commande => {
      if (commande.fournisseur?.contact) {
        const randomOffset = () => (Math.random() * 0.1 - 0.05);
        const marker = L.marker(
          [36.8065 + randomOffset(), 10.1815 + randomOffset()],
          {
            title: `Commande ${commande.id}`,
            icon: L.divIcon({
              html: `<div style="background-color: #007bff; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center;">C${commande.id}</div>`,
              className: ''
            })
          }
        ).addTo(this.map);
        
        marker.bindPopup(`
          <b>Commande ${commande.id}</b><br>
          Fournisseur: ${commande.fournisseur?.name || 'Non spécifié'}<br>
          Statut: ${commande.status}<br>
          Montant: ${commande.totalAmount} TND
        `);
      }
    });
  }

  getCommandes(): void {
    this.commandeService.getAllCommandes().subscribe((data) => {
      this.commandes = data.map((commande) => {
        commande.date = new Date(commande.date);
        commande.status = this.normalizeStatus(commande.status);
        return commande;
      });
      this.filteredCommandes = [...this.commandes];
      this.calculateStatistics();
      
      // Mettre à jour les marqueurs après avoir reçu les données
      if (this.map) {
        this.addMarkers();
      }
    });
  }

 

  normalizeStatus(status: string): string {
    switch (status.toUpperCase()) {
      case 'EN ATTENTE':
      case 'EN_ATTENTE':
        return 'EN_ATTENTE';
      case 'EN COURS':
      case 'EN_COURS':
        return 'EN_COURS';
      case 'LIVRÉE':
      case 'LIVREE':
        return 'LIVREE';
      default:
        return status;
    }
  }

  calculateStatistics(): void {
    this.statistics = {
      enAttente: 0,
      enCours: 0,
      livree: 0
    };

    this.filteredCommandes.forEach((commande) => {
      if (commande.status === 'EN_ATTENTE') {
        this.statistics.enAttente++;
      } else if (commande.status === 'EN_COURS') {
        this.statistics.enCours++;
      } else if (commande.status === 'LIVREE') {
        this.statistics.livree++;
      }
    });
  }

  supprimerCommande(id: number): void {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Vous ne pourrez pas revenir en arrière !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer !',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.commandeService.deleteCommande(id).subscribe(
          () => {
            this.getCommandes();
            Swal.fire(
              'Supprimé !',
              'La commande a été supprimée.',
              'success'
            );
          },
          (error) => {
            console.error('Erreur lors de la suppression de la commande', error);
            Swal.fire(
              'Erreur !',
              'Une erreur est survenue lors de la suppression de la commande.',
              'error'
            );
          }
        );
      }
    });
  }

  modifierCommande(id: number): void {
    this.router.navigate([`/dashboard/commande/edit/${id}`]);
  }

  ajouterCommande(): void {
    this.router.navigate(['/dashboard/commande/add']);
  }

  accederAuPaiement(commandeId: number): void {
    this.router.navigate([`/dashboard/ajouter-facture`, { commandeId }]);
  }

  filtrerCommandes(): void {
    if (!this.searchTerm) {
      this.filteredCommandes = [...this.commandes];
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredCommandes = this.commandes.filter(
        (commande) =>
          commande.id.toString().includes(term) ||
          commande.date.toLocaleDateString().includes(term) ||
          commande.status.toLowerCase().includes(term) ||
          commande.totalAmount.toString().includes(term)
      );
    }
    this.calculateStatistics();
  }
} 