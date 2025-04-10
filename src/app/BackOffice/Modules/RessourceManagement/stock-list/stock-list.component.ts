import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Stock } from '../models/stock.model';
import { StockService } from '../stock.service';
import { Chart, registerables } from 'chart.js';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {
  stocks: Stock[] = [];
  searchTerm: string = '';
  filteredStocks: Stock[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  chart: any;

  constructor(private stockService: StockService, private router: Router) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.loadStocks();
  }

  loadStocks(): void {
    this.stockService.getAllStocks().subscribe(
      (data) => {
        this.stocks = data;
        this.filteredStocks = [...this.stocks]; 
        this.generateChart();
      },
      (error) => {
        console.error('Erreur lors du chargement des stocks', error);
      }
    );
  }

  filterStocks(): void {
   
    this.filteredStocks = this.stocks.filter(stock => 
      stock.materiel.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      stock.id?.toString().includes(this.searchTerm) || 
      stock.currentQuantity.toString().includes(this.searchTerm) || 
      stock.threshold.toString().includes(this.searchTerm)
    );
  }

  generateChart(): void {
    const materielNames = this.stocks.map(stock => stock.materiel.name);
    const quantities = this.stocks.map(stock => stock.currentQuantity);

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart("stockChart", {
      type: 'bar',
      data: {
        labels: materielNames,
        datasets: [{
          label: 'Quantité de matériel',
          data: quantities,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  deleteStock(id: number): void {
    if (id === undefined || id === null || id === 0) {
      console.error('ID du stock est invalide');
      return;  
    }
  
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
        this.stockService.deleteStock(id).subscribe(
          () => {
            this.stocks = this.stocks.filter(stock => stock.id !== id);
            this.filteredStocks = this.filteredStocks.filter(stock => stock.id !== id); 
            this.generateChart();
            Swal.fire(
              'Supprimé !',
              'Le stock a été supprimé.',
              'success'
            );
          },
          (error) => {
            console.error('Erreur lors de la suppression du stock', error);
            Swal.fire(
              'Erreur !',
              'Une erreur est survenue lors de la suppression du stock.',
              'error'
            );
          }
        );
      }
    });
  }

  editStock(id: number): void {
    if (id) {
      this.router.navigate([`/dashboard/dashboard/stock-form/${id}`]);
    }
  }

  addCommande(stockId: number): void {
    this.router.navigate([`/dashboard/commande/add`], { queryParams: { stockId: stockId } }); 
  }

  onSearchChange(): void {
    this.filterStocks(); 
  }
  navigateToStockForm(): void {
    this.router.navigate(['/dashboard/stock-form']); 
  }
}