// src/app/services/assurance.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Assurance, TypeAssurance } from 'src/app/BackOffice/Modules/AssuranceManagement/models/Assurance.model';

@Injectable({
  providedIn: 'root',
})
export class AssuranceService {
  private apiUrl = 'http://localhost:8086/document/assurance'; // URL de votre API Spring Boot
  private weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather'; // URL de l'API OpenWeatherMap
  private apiKey = '4432008fee87b1335a2fd0a0a054d92a'; 

  constructor(private http: HttpClient) {}

  // Récupérer toutes les assurances
  getAllAssurances(page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/list?page=${page}&size=${size}`);
  }

  // Récupérer une assurance par son ID
  getAssuranceById(id: number): Observable<Assurance> {
    return this.http.get<Assurance>(`${this.apiUrl}/${id}`);
  }

  // Ajouter une nouvelle assurance
  addAssurance(assurance: Assurance): Observable<Assurance> {
    return this.http.post<Assurance>(`${this.apiUrl}/add`, assurance);
  }

  // Mettre à jour une assurance
  updateAssurance(assurance: Assurance): Observable<Assurance> {
    return this.http.put<Assurance>(`${this.apiUrl}/update/${assurance.id}`, assurance);
  }

  // Supprimer une assurance
  deleteAssurance(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  // Générer un PDF
  generatePDF(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/generate-pdf/${id}`, { responseType: 'blob' });
  }

  // Nouvelle méthode pour récupérer les données météo
  getWeatherByCity(city: string): Observable<any> {
    return this.http.get(`${this.weatherApiUrl}?q=${city}&appid=${this.apiKey}&units=metric`);
  }
}