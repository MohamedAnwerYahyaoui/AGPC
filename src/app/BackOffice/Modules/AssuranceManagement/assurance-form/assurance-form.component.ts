import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AssuranceService } from 'src/app/BackOffice/Modules/AssuranceManagement/assurance.service';
import { Assurance, TypeAssurance } from 'src/app/BackOffice/Modules/AssuranceManagement/models/Assurance.model';

@Component({
  selector: 'app-assurance-form',
  templateUrl: './assurance-form.component.html',
  styleUrls: ['./assurance-form.component.css'],
})
export class AssuranceFormComponent implements OnInit {
  assuranceForm: FormGroup;
  assuranceId: string | null = null;
  typeAssurance = TypeAssurance; // Permet d'accéder à l'énumération dans le template

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private assuranceService: AssuranceService,
    private route: ActivatedRoute
  ) {
    this.assuranceForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]], // Validation avec un minimum de 3 et un maximum de 100 caractères
      dateExpiration: ['', [Validators.required, this.dateExpirationValidator]],
      montantCouverture: ['', [Validators.required, Validators.min(0), Validators.pattern(/^\d+(\.\d{1,2})?$/)]], // Validation pour les montants, permet les décimales
      typeAssurance: ['', Validators.required], // Validation pour le type d'assurance
    });
  }

  ngOnInit(): void {
    this.assuranceId = this.route.snapshot.paramMap.get('id');
    if (this.assuranceId) {
      this.loadAssurance(this.assuranceId);
    }
  }

  loadAssurance(id: string): void {
    const assuranceId = Number(id);
    if (!isNaN(assuranceId)) {
      this.assuranceService.getAssuranceById(assuranceId).subscribe({
        next: (assurance) => {
          this.assuranceForm.patchValue({
            nom: assurance.nom,
            dateExpiration: assurance.dateExpiration,
            montantCouverture: assurance.montantCouverture,
            typeAssurance: assurance.typeAssurance,
          });
        },
        error: (err) => {
          console.error('Erreur lors du chargement de l\'assurance :', err);
        },
      });
    } else {
      console.error('ID invalide');
    }
  }

  // Validation de la date d'expiration pour vérifier qu'elle est dans le futur
  dateExpirationValidator(control: any): { [key: string]: boolean } | null {
    const currentDate = new Date();
    const inputDate = new Date(control.value);
    return inputDate > currentDate ? null : { 'invalidDate': true };
  }

  soumettreFormulaire(): void {
    if (this.assuranceForm.invalid) {
      console.log("Formulaire invalide");
      return;
    }

    const assurance: Assurance = {
      id: this.assuranceId ? Number(this.assuranceId) : null, // L'ID est nul pour la création
      nom: this.assuranceForm.value.nom,
      dateExpiration: this.assuranceForm.value.dateExpiration,
      montantCouverture: this.assuranceForm.value.montantCouverture,
      typeAssurance: this.assuranceForm.value.typeAssurance,
    };

    // Vérification si c'est une mise à jour ou une création
    if (this.assuranceId) {
      this.assuranceService.updateAssurance(assurance).subscribe({
        next: () => {
          console.log('Assurance mise à jour avec succès');
          this.router.navigate(['/dashboard/assurance/list']); // 🔹 Redirection après MAJ
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour de l\'assurance', err);
        },
      });
    } else {
      this.assuranceService.addAssurance(assurance).subscribe({
        next: () => {
          console.log('Assurance ajoutée avec succès');
          this.router.navigate(['/dashboard/assurance/list']); // 🔹 Redirection après ajout
        },
        error: (err) => {
          console.error('Erreur lors de l\'ajout de l\'assurance', err);
        },
      });
    }
  }

  // Vérification si le formulaire est valide
  get formControls() {
    return this.assuranceForm.controls;
  }
}