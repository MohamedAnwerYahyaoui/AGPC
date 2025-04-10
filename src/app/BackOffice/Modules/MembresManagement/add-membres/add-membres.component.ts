import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { EmployeService } from 'src/app/services/employe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Employe } from 'src/app/Models/Employe';
import { formatDate } from '@angular/common';

export function salaireValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (value == null || value === '') return null;
  if (isNaN(value)) {
    return { invalidSalary: 'Le salaire doit être un nombre.' };
  }
  if (value < 1000) {
    return { salaireMin: 'Le salaire doit être supérieur ou égal à 1000.' };
  }
  return null;
}

// Validateur plus souple : + en début facultatif, 8 à 15 chiffres
export function telephoneValidator(control: AbstractControl): ValidationErrors | null {
  const value: string = control.value || '';
  if (!value) return null; 
  const regex = /^[+]?\d{8,15}$/;
  if (!regex.test(value)) {
    return { invalidTelephoneFormat: 'Le numéro doit contenir 8 à 15 chiffres (optionnellement un + devant).' };
  }
  return null;
}

@Component({
  selector: 'app-add-membres',
  templateUrl: './add-membres.component.html',
  styleUrls: ['./add-membres.component.css']
})
export class AddMembresComponent implements OnInit {
  employeForm: FormGroup;
  isEditMode: boolean = false;
  currentId?: number;

  contrats: any[] = [];
  equipes: any[] = [];

  constructor(
    private fb: FormBuilder,
    private employeService: EmployeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.employeForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      poste: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required, telephoneValidator]],
      dateEmbauche: ['', Validators.required],
      salaire: ['', [Validators.required, salaireValidator]],
      contrat_id: [null, Validators.required],
      equipe_id: [null]
    });
  }

  ngOnInit(): void {
    this.loadContrats();
    this.loadEquipes();

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.currentId = +params['id'];
        // Récupérer l'employé existant pour pré-remplir le formulaire
        this.employeService.getEmployee(this.currentId).subscribe((emp: Employe) => {
          this.employeForm.patchValue({
            nom: emp.nom,
            prenom: emp.prenom,
            poste: emp.poste,
            email: emp.email,
            telephone: emp.telephone,
            dateEmbauche: emp.dateEmbauche ? this.formatDateForInput(emp.dateEmbauche) : '',
            salaire: emp.salaire,
            contrat_id: emp.contrat?.id,
            equipe_id: emp.equipe?.id
          });
        });
      }
    });
  }

  loadContrats(): void {
    console.log('Début du chargement des contrats');
    this.employeService.getContrats().subscribe({
      next: (data: any[]) => {
        this.contrats = data;
        console.log('Contrats chargés :', this.contrats);
      },
      error: (error) => {
        console.error('Erreur lors du chargement des contrats :', error);
      }
    });
  }

  loadEquipes(): void {
    console.log('Début du chargement des équipes');
    this.employeService.getEquipes().subscribe({
      next: (data: any[]) => {
        this.equipes = data;
        console.log('Équipes chargées :', this.equipes);
      },
      error: (error) => {
        console.error('Erreur lors du chargement des équipes :', error);
      }
    });
  }

  onSubmit(): void {
    // Vérifier la validité du formulaire
    if (this.employeForm.invalid) {
      console.warn('Formulaire invalide, aucune requête envoyée.');
      return;
    }

    const formData = this.employeForm.value;
    console.log('Envoi du formulaire :', formData);

    if (this.isEditMode && this.currentId) {
      // Mise à jour
      this.employeService.updateEmploye(this.currentId, formData).subscribe({
        next: (updatedEmp) => {
          console.log('Employé mis à jour :', updatedEmp);
          if (formData.equipe_id) {
            this.employeService.affecterEquipe(this.currentId!, formData.equipe_id).subscribe({
              next: () => this.router.navigate(['/dashboard/list-membres']),
              error: (err) => console.error('Erreur affectation équipe :', err)
            });
          } else {
            this.router.navigate(['/dashboard/list-membres']);
          }
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour de l\'employé :', err);
        }
      });
    } else {
      // Ajout
      this.employeService.addEmploye(formData, formData.contrat_id).subscribe({
        next: (newEmp: Employe) => {
          console.log('Employé créé :', newEmp);
          if (formData.equipe_id && newEmp.id) {
            this.employeService.affecterEquipe(newEmp.id, formData.equipe_id).subscribe({
              next: () => this.router.navigate(['/dashboard/list-membres']),
              error: (err) => console.error('Erreur affectation équipe :', err)
            });
          } else {
            this.router.navigate(['/dashboard/list-membres']);
          }
        },
        error: (err) => {
          console.error('Erreur lors de la création de l\'employé :', err);
        }
      });
    }
  }

  private formatDateForInput(date: string | Date): string {
    if (!date) return '';
    return formatDate(date, 'yyyy-MM-dd', 'en-US');
  }
}
