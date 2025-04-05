import {Component, OnInit} from '@angular/core';
import {ChartConfiguration, ChartData, ChartType} from "chart.js";
import {TimeSheetService} from "../../Service/time-sheet.service";

@Component({
  selector: 'app-hours-per-task',
  templateUrl: './hours-per-task.component.html',
  styleUrls: ['./hours-per-task.component.css']
})
export class HoursPerTaskComponent implements OnInit {

  // Configuration du graphique
  public chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      }
    },
    plugins: {
      title: {
        display: true,
        text: 'Répartition des heures par tâche',
        font: {
          size: 16
        }
      },
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false
      }
    }
  };

  // Données du graphique
  public chartData: ChartData<'bar', number[], string> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Heures travaillées',
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)'
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  public chartType: ChartType = 'bar';
  public isLoading = true;
  public errorMessage: string | null = null;
  public chartTypes: ChartType[] = ['bar', 'pie', 'doughnut', 'line', 'polarArea'];
  public selectedChartType: ChartType = 'bar';

  constructor(private timeSheetService: TimeSheetService) {}

  ngOnInit(): void {
    this.loadChartData();
  }

  loadChartData(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.timeSheetService.getHoursPerTask().subscribe({
      next: (data) => {
        this.chartData.labels = Object.keys(data);
        this.chartData.datasets[0].data = Object.values(data) as number[];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading chart data:', err);
        this.errorMessage = 'Impossible de charger les données du graphique';
        this.isLoading = false;
      }
    });
  }

  changeChartType(type: ChartType): void {
    this.selectedChartType = type;
    this.chartType = type;
  }

  refreshData(): void {
    this.loadChartData();
  }
}


