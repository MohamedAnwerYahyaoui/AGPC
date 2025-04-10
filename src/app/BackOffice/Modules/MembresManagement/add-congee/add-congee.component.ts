import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { congeeService } from 'src/app/services/congee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Congee } from 'src/app/Models/congee';
import { formatDate } from '@angular/common';
import { EmployeService } from 'src/app/services/employe.service';

/**
 * Validateur personnalisé pour s'assurer que dateDebut <= dateFin
 */
function dateRangeValidator(formGroup: AbstractControl): ValidationErrors | null {
  const dateDebut = formGroup.get('dateDebut')?.value;
  const dateFin = formGroup.get('dateFin')?.value;

  // Si l'un des deux champs est vide, on ne retourne pas d'erreur ici
  if (!dateDebut || !dateFin) {
    return null;
  }

  // Convertir les valeurs (string 'yyyy-MM-dd') en objets Date
  const start = new Date(dateDebut);
  const end = new Date(dateFin);

  // Vérifie si la date de début est postérieure à la date de fin
  if (start.getTime() > end.getTime()) {
    return { dateRangeInvalid: true };
  }

  return null;
}

@Component({
  selector: 'app-add-congee',
  templateUrl: './add-congee.component.html',
  styleUrls: ['./add-congee.component.css']
})
export class AddCongeeComponent implements OnInit {
  congeeForm: FormGroup;
  isEditMode: boolean = false;
  currentId?: number;
  employees: any[] = [];

  constructor(
    private fb: FormBuilder,
    private congeeService: congeeService,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeService
  ) {
    // On applique le validateur personnalisé (dateRangeValidator) au niveau du FormGroup
    this.congeeForm = this.fb.group(
      {
        nom: ['', Validators.required],
        dateDebut: ['', Validators.required],
        dateFin: ['', Validators.required],
        etat: ['', Validators.required],
        employee_id: [null, Validators.required]
      },
      {
        validators: [dateRangeValidator]
      }
    );
  }

  ngOnInit(): void {
    this.loadEmployees();

    // Vérifie si on est en mode "édition" (présence d'un paramètre 'id')
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEditMode = true;
        this.currentId = +params['id'];
        this.congeeService.getCongeeById(this.currentId).subscribe((congee: Congee) => {
          this.congeeForm.patchValue({
            nom: congee.nom,
            dateDebut: congee.dateDebut ? this.formatDateForInput(congee.dateDebut) : '',
            dateFin: congee.dateFin ? this.formatDateForInput(congee.dateFin) : '',
            etat: congee.etat,
            employee_id: congee.employe?.id
          });
        });
      }
    });
  }

  /**
   * Charge la liste des employés depuis le backend
   */
  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (data) => {
        this.employees = data;
        console.log('Employés chargés :', this.employees);
      },
      (error) => {
        console.error('Erreur lors du chargement des employés :', error);
      }
    );
  }

  /**
   * Convertit une date (string ou Date) en format 'yyyy-MM-dd'
   * pour l'affichage dans un <input type="date">
   */
  private formatDateForInput(date: string | Date): string {
    if (!date) return '';
    return formatDate(date, 'yyyy-MM-dd', 'en-US');
  }

  /**
   * Méthode déclenchée lors de la soumission du formulaire
   */
  onSubmit(): void {
    // Si le formulaire est invalide, on ne fait rien
    if (this.congeeForm.invalid) {
      return;
    }

    const formData = this.congeeForm.value;

    if (this.isEditMode && this.currentId) {
      // Mode édition
      this.congeeService.updateCongee(this.currentId, formData).subscribe(() => {
        this.router.navigate(['/dashboard/list-congee']);
      });
    } else {
      // Mode ajout
      const employeeId = formData.employee_id;
      this.congeeService.addCongeeToEmployee(employeeId, formData).subscribe(() => {
        this.router.navigate(['/dashboard/list-congee']);
      });
    }
  }
}
