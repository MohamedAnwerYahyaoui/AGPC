import { Component, OnInit } from '@angular/core';
import { ChantierService } from '../../Services/chantier.service';
import { NewsService } from '../../Services/news.service';
import { Chantier } from '../../models/Chantier';
import { WeatherService } from '../../Services/wheather.service';

@Component({
  selector: 'app-list-chantier',
  templateUrl: './list-chantier.component.html',
  styleUrls: ['./list-chantier.component.css']
})
export class ListChantierComponent implements OnInit {
  chantiers: Chantier[] = [];
  newsArticles: any[] = [];
  page: number = 1;
  searchText: string = '';
  weatherData: any = {};
  city: string = '';

  constructor(
    private chantierService: ChantierService,
    private newsService: NewsService,
    private weatherService: WeatherService
  ) { }

  ngOnInit(): void {
    this.loadChantiers();
    this.loadConstructionNews();
  }

  loadChantiers(): void {
    this.chantierService.getChantier().subscribe((data: Chantier[]) => {
      this.chantiers = data;
    });
  }

  loadConstructionNews(): void {
    this.newsService.getConstructionNews().subscribe((data: any) => {
      this.newsArticles = data.articles;
    });
  }

  deleteChantier(id: number): void {
    if (confirm("Voulez-vous vraiment supprimer ce chantier ?")) {
      this.chantierService.deleteChantier(id).subscribe(() => {
        this.loadChantiers(); // Reload the list after deletion
      }, error => {
        console.error("Erreur lors de la suppression du chantier", error);
      });
    }
  }

  filteredBudgets(): Chantier[] {
    return this.chantiers.filter(chantiers =>
      chantiers.nom.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  getWeather(): void {
    if (this.city) {
      this.weatherService.getWeather(this.city).subscribe(data => {
        this.weatherData = data;
      }, error => {
        console.error("Erreur lors de la récupération des données météo", error);
      });
    }
  }
}
