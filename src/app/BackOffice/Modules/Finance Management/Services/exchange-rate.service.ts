import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {
  private apiKey = 'b0cda9e7067df2ffd8b8a90c'; // Replace with your API key
  private apiUrl = `https://v6.exchangerate-api.com/v6/${this.apiKey}/latest/TND`;

  constructor(private http: HttpClient) { }

  getExchangeRates(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
