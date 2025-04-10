import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";

import {Livrable, LivrableService} from "../../Service/livrable.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {LivrableFormComponent} from "../livrable-form/livrable-form.component";


import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
@Component({
  selector: 'app-livrable-list',
  templateUrl: './livrable-list.component.html',
  styleUrls: ['./livrable-list.component.css']
})
export class LivrableListComponent implements OnInit {

  dataSource = new MatTableDataSource<Livrable>();
  displayedColumns: string[] = ['nom', 'description', 'dateLivraison', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: LivrableService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.service.getAllLivrables().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
      },
      error: () => this.handleError('Erreur de chargement')
    });
  }

  openForm(livrable?: Livrable): void {
    const dialogRef = this.dialog.open(LivrableFormComponent, {
      width: '600px',
      data: livrable || { nom: '', description: '', dateLivraison: new Date() }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadData();
    });
  }

  deleteLivrable(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { message: 'Êtes-vous sûr de vouloir supprimer ce livrable ?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.deleteLivrable(id).subscribe({
          next: () => {
            this.snackBar.open('Livrable supprimé', 'OK', { duration: 3000 });
            this.loadData();
          },
          error: () => this.handleError('Erreur de suppression')
        });
      }
    });
  }

  private handleError(message: string): void {
    this.snackBar.open(message, 'OK', { duration: 5000 });
  }





  exportToPDF(): void {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm'
    });

    // En-tête personnalisé
    doc.setFontSize(18);
    doc.setTextColor(40);
    doc.setFont('helvetica', 'bold');
    doc.text('LISTE DES LIVRABLES', 140, 15, { align: 'center' });

    // Logo ou information supplémentaire
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.setFont('helvetica', 'normal');
    doc.text(`Généré le: ${new Date().toLocaleDateString()}`, 10, 15);
    doc.text('DNDSERVE_AGPC_4SAE9', 275, 15, { align: 'right' });

    // Tableau des données
    autoTable(doc, {
      head: [['Nom', 'Description', 'Date Livraison']],
      body: this.dataSource.data.map(item => [
        item.nom,
        item.description || 'N/A',
        new Date(item.dateLivraison).toLocaleDateString()
      ]),
      startY: 25,
      theme: 'grid',
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      },
      margin: { horizontal: 10 },
      styles: {
        cellPadding: 3,
        fontSize: 10,
        valign: 'middle'
      },
      columnStyles: {
        0: { cellWidth: 50 },
        1: { cellWidth: 'auto' },
        2: { cellWidth: 30 }
      }
    });

    // Pied de page
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150);
      doc.text(
        `Page ${i} sur ${pageCount}`,
        140,
        doc.internal.pageSize.height - 10,
        { align: 'center' }
      );
    }

    doc.save(`livrables_${new Date().toISOString().slice(0, 10)}.pdf`);
  }
}