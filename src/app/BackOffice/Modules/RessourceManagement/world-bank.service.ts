import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
@Injectable({ providedIn: 'root' })
export class WorldBankService {
  private readonly API_URL = 'https://api.worldbank.org/v2';
  private readonly COMMODITY_CODES = {
    acier: 'STEEL',
    ciment: 'CEMENT',
    bois: 'LUMBER'
  };

  constructor(private http: HttpClient) {}

  getMaterialPrices(): Observable<{ acier: number, ciment: number, bois: number }> {
    const params = new HttpParams()
      .set('format', 'json')
      .set('source', '15') // ID pour les prix des commodités
      .set('last', '1'); // Dernière observation disponible

    return this.http.get<any[]>(`${this.API_URL}/datacatalog`, { params }).pipe(
      map(response => {
        const prices = response[1]?.results?.[0]?.commodityprices || [];
        
        return {
          acier: this.extractPrice(prices, this.COMMODITY_CODES.acier) || 850.50,
          ciment: this.extractPrice(prices, this.COMMODITY_CODES.ciment) || 150.30,
          bois: this.extractPrice(prices, this.COMMODITY_CODES.bois) || 450.75
        };
      }),
      catchError(error => {
        console.error('World Bank API Error:', error);
        return of(this.getFallbackPrices());
      })
    );
  }

  private extractPrice(prices: any[], commodityCode: string): number | null {
    const commodity = prices.find(item => item.commodity === commodityCode);
    return commodity ? parseFloat(commodity.price) : null;
  }

  private getFallbackPrices() {
    return {
      acier:  756.00,
      ciment: 150.30,
      bois: 450.75
    };
  }
}