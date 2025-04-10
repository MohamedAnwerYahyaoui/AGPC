import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {
  private apiUrl = 'http://localhost:8086/membres/Employee'; // URL de base pour les employés
  private contratUrl = 'http://localhost:8086/membres/Contrat'; // URL pour les contrats
  private equipeUrl = 'http://localhost:8086/membres/Equipe'; // URL pour les équipes

  constructor(private http: HttpClient) {}
 // Exporter les employés d'une équipe
 exportEmployees(equipeId: number): Observable<Blob> {
  // Correspond à GET /Employee/export/{equipeId}
  return this.http.get(`${this.apiUrl}/export/${equipeId}`, { responseType: 'blob' });
}

// Importer un fichier Excel pour une équipe
importEmployees(file: File, equipeId: number): Observable<any> {
  // Correspond à POST /Employee/import/{equipeId}
  const formData = new FormData();
  formData.append('file', file);
  return this.http.post(`${this.apiUrl}/import/${equipeId}`, formData, {
    responseType: 'text' // si on renvoie "Importation réussie !" côté Spring
  });
}
  deleteEmploye(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }

  getEmployee(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getEmployees(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/list`);
  }

  // Ajouter un employé
  addEmploye(employe: any, contratId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/ajouter/${contratId}`, employe);
  }

  // Mettre à jour un employé
  updateEmploye(id: number, employe: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, employe);
  }

  // Affecter une équipe
  affecterEquipe(employeId: number, equipeId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/affecterEquipe/${employeId}/${equipeId}`, {});
  }

  // Récupérer les contrats
  getContrats(): Observable<any[]> {
    const timestamp = new Date().getTime();
    return this.http.get<any[]>(`${this.contratUrl}/list?t=${timestamp}`);
  }

  // Récupérer les équipes
  getEquipes(): Observable<any[]> {
    const timestamp = new Date().getTime();
    return this.http.get<any[]>(`${this.equipeUrl}/list?t=${timestamp}`);
  }
}
