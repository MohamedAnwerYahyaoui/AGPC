import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Timesheet, TimeSheetService } from '../../Service/time-sheet.service';
import { TimeSheetFormComponent } from '../time-sheet-form/time-sheet-form.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-time-sheet-list',
  templateUrl: './time-sheet-list.component.html',
  styleUrls: ['./time-sheet-list.component.css']
})
export class TimeSheetListComponent implements OnInit {
  dataSource = new MatTableDataSource<Timesheet>();
  displayedColumns: string[] = ['date', 'heures', 'description', 'tache', 'user', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private timesheetService: TimeSheetService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.timesheetService.getAllTimesheets().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
      },
      error: () => this.handleError('Erreur de chargement des timesheets')
    });
  }

  openForm(timesheet?: Timesheet): void {
    const dialogRef = this.dialog.open(TimeSheetFormComponent, {
      width: '600px',
      data: timesheet || {
        date: new Date(),
        heures: 0,
        description: '',
        tache: null,
        user: null
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadData();
    });
  }

  deleteTimesheet(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { message: 'Êtes-vous sûr de vouloir supprimer ce timesheet ?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.timesheetService.deleteTimesheet(id).subscribe({
          next: () => {
            this.snackBar.open('Timesheet supprimé', 'OK', { duration: 3000 });
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
    doc.text('LISTE DES TIMESHEETS', 140, 15, { align: 'center' });

    // Information supplémentaire
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.setFont('helvetica', 'normal');
    doc.text(`Généré le: ${new Date().toLocaleDateString()}`, 10, 15);
    doc.text('DNDSERVE_AGPC_4SAE9', 275, 15, { align: 'right' });

    // Tableau des données
    autoTable(doc, {
      head: [['Date', 'Heures', 'Description', 'Tâche', 'Utilisateur']],
      body: this.dataSource.data.map(item => [
        new Date(item.date).toLocaleDateString(),
        item.heures + 'h',
        item.description || 'N/A',
        item.tache?.nom || 'N/A',
        item.user?.username || 'N/A'
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
        valign: 'middle',
        overflow: 'linebreak'
      },
      columnStyles: {
        0: { cellWidth: 30 },
        1: { cellWidth: 20 },
        2: { cellWidth: 70 },
        3: { cellWidth: 40 },
        4: { cellWidth: 40 }
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

    doc.save(`timesheets_${new Date().toISOString().slice(0, 10)}.pdf`);
  }
}
