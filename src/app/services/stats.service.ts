import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Statistique } from '../Models/Statistique';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  private baseUrl = 'http://localhost:8086/membres/api/statistics'; 
  // Adaptez l’URL selon votre config

  constructor(private http: HttpClient) {}

  getStatistics(): Observable<Statistique> {
    return this.http.get<Statistique>(this.baseUrl);
  }
  
}
