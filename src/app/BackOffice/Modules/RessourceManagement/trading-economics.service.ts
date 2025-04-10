import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

interface PriceData {
  value: number;
  trend: 'up' | 'down' | 'stable';
}

@Injectable({ providedIn: 'root' })
export class TradingEconomicsService {
  private readonly API_URL = 'https://api.tradingeconomics.com/historical/commodity';
  private readonly API_KEY = 'guest:guest'; // Remplacez par votre clé API une fois reçue (ex: 'abc123:xyz789')

  constructor(private http: HttpClient) {}

  getMaterialPrices(): Observable<{
    acier: number;
    acierTrend: 'up' | 'down' | 'stable';
    ciment: number;
    cimentTrend: 'up' | 'down' | 'stable';
    bois: number;
    boisTrend: 'up' | 'down' | 'stable';
  }> {
    const steelRequest = this.getPriceWithTrend('steel').pipe(
      catchError(() => of({ value: 756.00, trend: 'stable' as 'up' | 'down' | 'stable' }))
    );

    const lumberRequest = this.getPriceWithTrend('lumber').pipe(
      catchError(() => of({ value: 450.75, trend: 'stable' as 'up' | 'down' | 'stable' }))
    );

    return forkJoin([steelRequest, lumberRequest]).pipe(
      map(([steelData, lumberData]) => {
        return {
          acier: steelData.value,
          acierTrend: steelData.trend,
          bois: lumberData.value,
          boisTrend: lumberData.trend,
          ciment: 150.30,
          cimentTrend: 'stable' as 'up' | 'down' | 'stable',
        };
      })
    );
  }

  private getPriceWithTrend(commodity: string): Observable<PriceData> {
    return this.http
      .get<any[]>(`${this.API_URL}/${commodity}?client=${this.API_KEY}`)
      .pipe(
        map(response => {
          if (!response || response.length < 1) {
            throw new Error(`Aucune donnée pour ${commodity}`);
          }
          // Trier par date pour obtenir les deux dernières valeurs
          const sorted = response.sort(
            (a, b) => new Date(b.DateTime).getTime() - new Date(a.DateTime).getTime()
          );
          const latest = parseFloat(sorted[0].Value);
          let trend: 'up' | 'down' | 'stable' = 'stable'; // Typage explicite
          if (sorted.length > 1) {
            const previous = parseFloat(sorted[1].Value);
            trend = latest > previous ? 'up' : latest < previous ? 'down' : 'stable';
          }
          return { value: latest, trend };
        }),
        catchError(error => {
          console.error(`Erreur lors de la récupération du prix pour ${commodity}:`, error);
          throw error;
        })
      );
  }
}