import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

interface FredObservation {
  date: string;
  value: string;
}

@Injectable({ providedIn: 'root' })
export class FredService {
  private readonly seriesMap = {
    acier: 'WPU10',    // Metals and Metal Products
    ciment: 'WPU132',  // Concrete and Concrete Products
    bois: 'WPU08'      // Lumber and Wood Products
  };

  constructor(private http: HttpClient) {}

  getMaterialPrices(): Observable<{ observations: { [key: string]: FredObservation[] } }> {
    const requests = Object.entries(this.seriesMap).map(([key, seriesId]) => {
      const params = new HttpParams()
        .set('series_id', seriesId)
        .set('api_key', environment.fredApiKey)
        .set('file_type', 'json')
        .set('observation_start', this.getFormattedDate(120)); // 10 ans de données

      return this.http.get<{ observations: FredObservation[] }>(
        `${environment.fredApiUrl}/series/observations`, 
        { params }
      ).pipe(
        tap(response => console.log(`Réponse FRED pour ${key} (${seriesId}):`, response)),
        map(response => ({
          key,
          observations: this.processObservations(response.observations || [])
        })),
        catchError(error => {
          console.error(`Erreur FRED pour ${key} (${seriesId}):`, error);
          return of({ key, observations: [] });
        })
      );
    });

    return forkJoin(requests).pipe(
      map(results => {
        const response: { observations: { [key: string]: FredObservation[] } } = { observations: {} };
        results.forEach(result => {
          response.observations[result.key] = result.observations;
        });
        console.log('Réponse finale combinée:', response);
        return response;
      })
    );
  }

  private processObservations(observations: FredObservation[]): FredObservation[] {
    if (!observations) return [];
    
    return observations
      .filter(obs => obs?.value && obs.value !== '.')
      .map(obs => ({
        date: obs.date,
        value: obs.value
      }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  private getFormattedDate(monthsBack: number): string {
    const date = new Date();
    date.setMonth(date.getMonth() - monthsBack);
    return date.toISOString().split('T')[0];
  }
}