import { Component, OnInit } from '@angular/core';
import { BudgetServiceService } from '../../Services/budget-service.service';
import { Budget } from '../../models/Budget';
import { expences } from './../../models/Expences';
import { ConstructionMaterialsService } from '../../Services/construction-materials.service'; // Import the new service

import { AddBudgetComponent } from '../add-budget/add-budget.component';
import { MatDialog } from '@angular/material/dialog';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-list-budget',
  templateUrl: './list-budget.component.html',
  styleUrls: ['./list-budget.component.css']
})
export class ListBudgetComponent implements OnInit {
  budget: Budget[] = [];
  searchText: string = '';
  page: number = 1;

  constructor(
    private rs: BudgetServiceService,
    private dialog: MatDialog,
    private materialsService: ConstructionMaterialsService // Inject the new service
  ) { }

  ngOnInit(): void {
    this.loadBudgets();
  }

  loadBudgets(): void {
    this.rs.getBudget().subscribe((data: Budget[]) => {
      this.budget = data;
      this.calculateTotalExpenses();
    });
  }



  deleteBudget(id: number): void {
    if (confirm("Voulez-vous vraiment supprimer ce budget ?")) {
      this.rs.deleteBudget(id).subscribe(() => {
        this.loadBudgets(); // Recharge la liste des budgets après suppression
      }, error => {
        console.error("Erreur lors de la suppression du budget", error);
      });
    }
  }

  openAddBudgetDialog(): void {
    const dialogRef = this.dialog.open(AddBudgetComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadBudgets(); // Reload the budgets after adding a new one
      }
    });
  }

  filteredBudgets(): Budget[] {
    return this.budget.filter(budget =>
      budget.nom.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  calculateTotalExpenses(): void {
    this.budget.forEach(budget => {
      this.rs.getExpencesByBudgetId(budget.id).subscribe((expences: expences[]) => {
        const totalExpenses = expences.reduce((total, expence) => total + expence.montant, 0);
        budget.expences = expences; // Assign the array of expences
        budget.totalExpenses = totalExpenses; // Assign the total expenses
        budget.montant_left = budget.montant - totalExpenses;
      });
    });
  }

  generatePDF(budget: Budget): void {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(18);
    doc.setTextColor(40);
    doc.text(`Budget Report for ${budget.nom}`, 10, 10);

    // Add budget details
    doc.setFontSize(12);
    doc.setTextColor(60);
    doc.text(`Montant: ${budget.montant} TND`, 10, 20);
    doc.text(`Total Expenses: ${budget.totalExpenses} TND`, 10, 30);
    doc.text(`Montant Left: ${budget.montant_left} TND`, 10, 40);
    doc.text(`Tache: ${budget.tache.nom}`, 10, 50);

    // Add expenses table
    const expencesData = budget.expences.map((expence: expences) => [
      expence.id,
      expence.montant,
      expence.category,
      expence.description
    ]);

    autoTable(doc, {
      head: [['ID', 'Montant', 'Category', 'Description']],
      body: expencesData,
      startY: 60,
      theme: 'grid',
      headStyles: {
        fillColor: [22, 160, 133],
        textColor: [255, 255, 255],
        fontSize: 12
      },
      bodyStyles: {
        fillColor: [245, 245, 245],
        textColor: [0, 0, 0],
        fontSize: 10
      },
      alternateRowStyles: {
        fillColor: [255, 255, 255]
      },
      margin: { top: 10 }
    });

    // Save the PDF
    doc.save(`Budget_Report_${budget.nom}.pdf`);
  }
}