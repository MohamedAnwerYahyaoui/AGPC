// src/app/BackOffice/Modules/DocumentManagement/document-list/document-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentService } from 'src/app/BackOffice/Modules/DocumentManagement/document.service';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  documents: any[] = [];
  filteredDocuments: any[] = [];
  archivedDocuments: any[] = [];
  totalItems: number = 0;
  totalPages: number = 0;
  page: number = 0;
  size: number = 5;
  searchTerm: string = '';
  showArchived: boolean = false;
  qrCodeUrl: string = '';
  qrCodeVisible: boolean = false;
  hoveredDocument: any = null;
  previewPosition = { x: 0, y: 0 };

  // Statistiques
  totalDocuments: number = 0;
  archivedCount: number = 0;
  documentTypes: { [key: string]: number } = {};

  constructor(
    private router: Router,
    private documentService: DocumentService
  ) {}

  ngOnInit(): void {
    this.getDocuments();
  }

  // Récupère les documents
  getDocuments(): void {
    this.documentService.getDocuments(this.page, this.size).subscribe({
      next: (data) => {
        this.documents = data.content;
        this.filteredDocuments = this.documents.filter(d => !d.archived);
        this.archivedDocuments = this.documents.filter(d => d.archived);
        this.totalItems = data.totalItems;
        this.totalPages = data.totalPages;

        this.calculateStats();
      },
      error: (err) => console.error('Erreur:', err)
    });
  }

  // Calcule les statistiques
  calculateStats(): void {
    this.totalDocuments = this.totalItems;
    this.archivedCount = this.archivedDocuments.length;
    this.documentTypes = {};

    this.documents.forEach(doc => {
      const type = doc.typeD || 'Inconnu';
      this.documentTypes[type] = (this.documentTypes[type] || 0) + 1;
    });
  }

  // Gestion prévisualisation
  showPreview(document: any, event: MouseEvent): void {
    this.hoveredDocument = document;
    this.previewPosition = { 
      x: event.clientX + 20,
      y: event.clientY - 50
    };
  }

  hidePreview(): void {
    this.hoveredDocument = null;
  }

  // QR Code
  buildQRCodeData(document: any): string {
    return `Nom: ${document.nom}\nType: ${document.typeD}\nDate: ${document.dateCreation}`;
  }

  generateQRCode(data: string): void {
    QRCode.toDataURL(data, { width: 200 }, (err, url) => {
      this.qrCodeUrl = err ? '' : url;
      this.qrCodeVisible = !err;
    });
  }

  afficherQRCode(document: any): void {
    this.generateQRCode(this.buildQRCodeData(document));
  }

  // Recherche
  rechercherDocuments(event: Event): void {
    const term = (event.target as HTMLInputElement).value.toLowerCase();
    const docs = this.showArchived ? this.archivedDocuments : this.documents.filter(d => !d.archived);
    
    this.filteredDocuments = docs.filter(doc =>
      doc.nom.toLowerCase().includes(term) ||
      doc.typeD.toLowerCase().includes(term)
    );
  }

  // Gestion documents
  supprimerDocument(id: number): void {
    if (confirm("Confirmer la suppression ?")) {
      this.documentService.deleteDocument(id).subscribe({
        next: () => this.getDocuments(),
        error: () => alert('Erreur')
      });
    }
  }

  modifierDocument(id: number): void {
    this.router.navigate([`/dashboard/documentation/edit/${id}`]);
  }

  telechargerFichier(url: string, nom: string): void {
    const link = document.createElement('a');
    link.href = url;
    link.download = nom;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Archivage
  archiverDocument(id: number): void {
    const doc = this.documents.find(d => d.id === id);
    if (doc) {
      doc.archived = true;
      this.updateLists();
    }
  }

  desarchiverDocument(id: number): void {
    const doc = this.archivedDocuments.find(d => d.id === id);
    if (doc) {
      doc.archived = false;
      this.updateLists();
    }
  }

  updateLists(): void {
    this.filteredDocuments = this.documents.filter(d => !d.archived);
    this.archivedDocuments = this.documents.filter(d => d.archived);
    this.archivedCount = this.archivedDocuments.length;
  }

  // Pagination
  onPageChange(newPage: number): void {
    if (newPage >= 0 && newPage < this.totalPages) {
      this.page = newPage;
      this.getDocuments();
    }
  }

  toggleShowArchived(): void {
    this.showArchived = !this.showArchived;
    this.filteredDocuments = this.showArchived 
      ? [...this.archivedDocuments] 
      : this.documents.filter(d => !d.archived);
  }
}