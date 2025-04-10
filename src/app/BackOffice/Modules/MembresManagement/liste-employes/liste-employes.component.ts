import { Component, OnInit } from '@angular/core';
import { EmployeService } from 'src/app/services/employe.service';
import { Router } from '@angular/router';
import { Employe } from 'src/app/Models/Employe';

@Component({
  selector: 'app-liste-employes',
  templateUrl: './liste-employes.component.html',
  styleUrls: ['./liste-employes.component.css']
})
export class ListeEmployesComponent implements OnInit {
  employees: Employe[] = [];
  page: number = 1;

  // Filtres
  searchTerm: string = '';
  selectedContrat: number | '' = '';
  selectedEquipe: number | '' = '';

  // Données pour les listes déroulantes
  contrats: any[] = [];
  equipes: any[] = [];

  constructor(
    private employeService: EmployeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
    this.loadContrats();
    this.loadEquipes();
  }

  loadEmployees() {
    this.employeService.getEmployees().subscribe(data => {
      this.employees = data;
    });
  }

  loadContrats() {
    this.employeService.getContrats().subscribe(data => {
      this.contrats = data;
    });
  }

  loadEquipes() {
    this.employeService.getEquipes().subscribe(data => {
      this.equipes = data;
    });
  }

  deleteEmploye(id: number) {
    this.employeService.deleteEmploye(id).subscribe(() => {
      this.loadEmployees();
    });
  }

  editEmploye(id: number) {
    this.router.navigate(['/dashboard/add-membres', id]);
  }

  goToAddMembre() {
    this.router.navigate(['/dashboard/add-membres']);
  }

  resetPage(): void {
    this.page = 1;
  }
}
