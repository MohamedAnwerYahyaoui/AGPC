import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';import { Document } from 'src/app/BackOffice/Modules/DocumentManagement/models/document.model';
import { map, timeout, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private apiUrl = 'http://localhost:8090/document/document';

  constructor(private http: HttpClient) {}

  getDocuments(page: number = 0, size: number = 5): Observable<{ content: Document[]; totalItems: number; totalPages: number }> {
    return this.http.get<any>(`${this.apiUrl}/list?page=${page}&size=${size}`).pipe(
      map(response => {
        console.log('Réponse API (list):', response);
        return {
          content: response.content || [],
          totalItems: response.totalElements || 0,
          totalPages: response.totalPages || 0
        };
      }),
      catchError(err => {
        console.error('Error fetching documents:', err);
        return throwError(() => new Error('Failed to fetch documents'));
      })
    );
  }
  

  
  
  // Ajouter un document sans fichier
  addDocument(document: Document): Observable<Document> {
    return this.http.post<Document>(`${this.apiUrl}/adddocument`, document);
  }

  // Ajouter un document avec fichier (si nécessaire)
  addDocumentWithFile(document: Document, file: File): Observable<Document> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('nom', document.nom);
    if (document.typeD) {
      formData.append('type', document.typeD.toString());
    }
    if (document.assuranceId !== undefined) {
      formData.append('assuranceId', document.assuranceId.toString());
    }
    console.log('FormData being sent:', formData);
    console.log('File name:', file.name);
    console.log('File size:', file.size);
    return this.http.post<Document>(`${this.apiUrl}/adddocumentwithfile`, formData).pipe(
      timeout(60000),
      catchError(err => {
        console.error('Error in addDocumentWithFile:', err);
        console.error('Error message:', err.message);
        console.error('Error status:', err.status);
        console.error('Error statusText:', err.statusText);
        return throwError(() => new Error('Failed to add document with file'));
      })
    );
  }
  // Mettre à jour un document
  updateDocument(document: Document): Observable<Document> {
    if (!document.id) {
      throw new Error("Erreur : l'ID du document est manquant !");
    }
    console.log('Payload envoyé au backend:', document);
    return this.http.put<Document>(`${this.apiUrl}/updateDocument/${document.id}`, document).pipe(
      catchError(err => {
        console.error('Error in updateDocument:', err);
        return throwError(() => new Error('Failed to update document'));
      })
    );
  }
  
  

  // Supprimer un document
  deleteDocument(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteDocument/${id}`, { responseType: 'text' });
  }

  getDocumentById(id: number): Observable<Document> {
  return this.http.get<Document>(`${this.apiUrl}/getDocumentById/${id}`);
}



  
}
