import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialsService } from '../materials.service';
import { Materials, Categorie } from './../models/materials.model';
import Swal from 'sweetalert2';
import { Chart, registerables } from 'chart.js';
import { WorldBankService } from '../world-bank.service';

import { FredService } from '../fred.service';
import { environment } from 'src/environments/environment';

interface FredMarketResponse {
  observations: {
    [key: string]: Array<{
      date: string;
      value: string;
    }>;
  };
}

interface MarketData {
  acier: number;
  ciment: number;
  bois: number;
  lastUpdated: Date;
  acierTrend: 'up' | 'down' | 'stable';
  cimentTrend: 'up' | 'down' | 'stable';
  boisTrend: 'up' | 'down' | 'stable';
}

@Component({
  selector: 'app-list-materials',
  templateUrl: './list-materials.component.html',
  styleUrls: ['./list-materials.component.css'],
})
export class ListMaterialsComponent implements OnInit {
  materials: Materials[] = [];
  filteredMaterials: Materials[] = [];
  displayedMaterials: Materials[] = [];
  editingMaterial: Materials | null = null;
  categories = Object.values(Categorie);
  recommendedMaterials: Materials[] = [];
  isRecommending: boolean = false;

  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;

  searchQuery: string = '';

  private chart: Chart | null = null;
  marketData: MarketData = {
    acier: 0,
    acierTrend: 'up',
    ciment: 0,
    cimentTrend: 'down',
    bois: 0,
    boisTrend: 'stable',
    lastUpdated: new Date()
  };
  loadingPrices = false;
  priceError = false;

  constructor(
    private materialsService: MaterialsService,
    private worldBankService: WorldBankService,
    private fredService: FredService,
    private router: Router
  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.loadMaterials();
    this.loadMarketData();
  }

  loadMarketData(): void {
    this.loadingPrices = true;
    this.priceError = false;
  
    this.worldBankService.getMaterialPrices().subscribe({
      next: (prices) => {
        this.marketData = {
          acier: prices.acier,
          ciment: prices.ciment,
          bois: prices.bois,
          lastUpdated: new Date(),
          acierTrend: 'up',
          cimentTrend: 'down',
          boisTrend: 'stable'
        };
        this.loadingPrices = false;
      },
      error: (err) => {
        console.error('Error:', err);
        this.priceError = true;
        this.loadingPrices = false;
      }
    });
  }

  private processFredData(data: FredMarketResponse): void {
    if (!data?.observations) {
      console.error('Structure de données FRED invalide');
      this.useFallbackPrices();
      return;
    }
  
    // Calcul des tendances
    const calculateTrend = (values: any[]) => {
      if (!values || values.length < 2) return 'stable';
      const current = this.getValidValue([values[0]]);
      const previous = this.getValidValue([values[1]]);
      return current > previous ? 'up' : current < previous ? 'down' : 'stable';
    };
  
    this.marketData = {
      acier: this.getValidValue(data.observations['acier'] || []),
      ciment: this.getValidValue(data.observations['ciment'] || []),
      bois: this.getValidValue(data.observations['bois'] || []),
      lastUpdated: new Date(),
      acierTrend: calculateTrend(data.observations['acier'] || []),
      cimentTrend: calculateTrend(data.observations['ciment'] || []),
      boisTrend: calculateTrend(data.observations['bois'] || [])
    };
  
    console.log('Prix du marché:', this.marketData);
  }

  private getValidValue(observations: Array<{ date: string; value: string }>): number {
    if (!observations || observations.length === 0) {
      console.warn('Aucune observation valide');
      return 0;
    }
  
    const latestValid = observations.find(obs => 
      obs?.value && obs.value !== '.' && !isNaN(parseFloat(obs.value))) || { value: '0' };
    
    return parseFloat(latestValid.value);
  }

  private useFallbackPrices(): void {
    console.warn('Utilisation des prix de secours');
    this.marketData = {
      acier: 756.00,
      ciment: 150.30,
      bois: 450.75,
      lastUpdated: new Date(),
      acierTrend: 'stable',
      cimentTrend: 'stable',
      boisTrend: 'stable'
    };
  }

  loadMaterials(): void {
    this.materialsService.getMaterials().subscribe({
      next: (data) => {
        this.materials = data;
        this.filteredMaterials = data;
        this.totalItems = data.length;
        this.updateDisplayedMaterials();
        this.generateChart();
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des matériaux :', err);
      },
    });
  }

  getTrendIcon(trend: 'up' | 'down' | 'stable'): string {
    return {
      'up': 'bi bi-arrow-up-circle-fill text-success',
      'down': 'bi bi-arrow-down-circle-fill text-danger',
      'stable': 'bi bi-dash-circle-fill text-secondary'
    }[trend];
  }

  applySearch(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredMaterials = this.materials;
    } else {
      const query = this.searchQuery.toLowerCase();
      this.filteredMaterials = this.materials.filter((material) => {
        return (
          material.name.toLowerCase().includes(query) ||
          material.quantity.toString().includes(query) ||
          material.unitPrice.toString().includes(query) ||
          material.categorie.toLowerCase().includes(query)
        );
      });
    }
    this.totalItems = this.filteredMaterials.length;
    this.currentPage = 1;
    this.updateDisplayedMaterials();
    this.generateChart();
  }

  updateDisplayedMaterials(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedMaterials = this.filteredMaterials.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.updateDisplayedMaterials();
  }

  goToAddMaterial(): void {
    this.router.navigate(['/dashboard/add-material']);
  }

  startEdit(material: Materials): void {
    this.editingMaterial = { ...material };
  }

  cancelEdit(): void {
    this.editingMaterial = null;
  }

  updateMaterial(): void {
    if (this.editingMaterial && this.editingMaterial.id !== undefined) {
      this.materialsService.updateMaterial(this.editingMaterial.id, this.editingMaterial).subscribe({
        next: () => {
          this.editingMaterial = null;
          this.loadMaterials();
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour du matériau :', err);
        },
      });
    }
  }

  deleteMaterial(id: number): void {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Vous ne pourrez pas revenir en arrière !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer !',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.isConfirmed) {
        this.materialsService.deleteMaterial(id).subscribe({
          next: () => {
            Swal.fire('Supprimé !', 'Le matériau a été supprimé.', 'success');
            this.loadMaterials();
          },
          error: (err) => {
            Swal.fire('Erreur !', 'La suppression a échoué.', 'error');
            console.error('Erreur lors de la suppression du matériau :', err);
          },
        });
      }
    });
  }

  getPages(): number[] {
    const totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  recommendMaterials(material: Materials): void {
    this.isRecommending = true;

    setTimeout(() => {
      this.recommendedMaterials = this.materials.filter(
        (m) => m.categorie === material.categorie && m.id !== material.id
      );

      if (this.recommendedMaterials.length > 3) {
        this.recommendedMaterials = this.recommendedMaterials.slice(0, 3);
      }

      this.isRecommending = false;
    }, 1000);
  }

  generateChart(): void {
    const ctx = document.getElementById('materialChart') as HTMLCanvasElement;

    if (this.chart) {
      this.chart.destroy();
    }

    const categoryCounts = this.categories.map(cat => {
      return this.materials.filter(material => material.categorie === cat).length;
    });

    this.chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: this.categories,
        datasets: [{
          label: 'Nombre de matériaux par catégorie',
          data: categoryCounts,
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        }],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: {
            display: true,
            text: 'Répartition des matériaux par catégorie'
          }
        }
      }
    });
  }
}