import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { StatsService } from 'src/app/services/stats.service';
import { Statistique } from 'src/app/Models/Statistique';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      y: { beginAtZero: true }
    }
  };
  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        label: 'Nombre de Contrats',
        data: [],
        backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#AB47BC', '#26C6DA']
      }
    ]
  };

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true
  };
  public pieChartData: ChartData<'pie'> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ['#4CAF50', '#FFC107', '#F44336']
      }
    ]
  };

  constructor(private statsService: StatsService) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.statsService.getStatistics().subscribe({
      next: (data: Statistique) => {
        console.log('Données reçues du service : ', data); // Pour déboguer

        // Contrats : Réassignation complète de barChartData
        this.barChartData = {
          labels: Object.keys(data.countByType),
          datasets: [
            {
              label: 'Nombre de Contrats',
              data: Object.values(data.countByType),
              backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#AB47BC', '#26C6DA']
            }
          ]
        };

        // Congés : Réassignation complète de pieChartData
        this.pieChartData = {
          labels: Object.keys(data.countByStatus),
          datasets: [
            {
              data: Object.values(data.countByStatus),
              backgroundColor: ['#4CAF50', '#FFC107', '#F44336']
            }
          ]
        };
      },
      error: err => {
        console.error('Erreur lors du chargement des statistiques : ', err);
      }
    });
  }
}