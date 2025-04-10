import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EquipeService } from 'src/app/services/equipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Equipe } from 'src/app/Models/Equipe';
import { LivrableService } from 'src/app/services/livrable.service';
import { Livrable } from 'src/app/Models/Livrable';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-add-equipe',
  templateUrl: './add-equipe.component.html',
  styleUrls: ['./add-equipe.component.css']
})
export class AddEquipeComponent implements OnInit {
  equipeForm: FormGroup;
  isEditMode: boolean = false;
  currentId?: number;

  livrables: Livrable[] = [];

  constructor(
    private fb: FormBuilder,
    private equipeService: EquipeService,
    private route: ActivatedRoute,
    private router: Router,
    private livrableService: LivrableService
  ) {
    this.equipeForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(3)]],
      nombreMembres: [0, [Validators.required, Validators.min(1)]],
      contactEquipe: ['', [Validators.required, Validators.minLength(3)]],
      dateCreation: ['', Validators.required],
      livrable_id: [null] // pas forcément obligatoire
    });
  }

  ngOnInit(): void {
    this.loadLivrables();
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.currentId = +params['id'];
        this.equipeService.getEquipeById(this.currentId).subscribe((equipe: Equipe) => {
          this.equipeForm.patchValue({
            nom: equipe.nom,
            nombreMembres: equipe.nombreMembres,
            contactEquipe: equipe.contactEquipe,
            dateCreation: equipe.dateCreation ? this.formatDateForInput(equipe.dateCreation) : '',
            livrable_id: equipe.livrable?.id
          });
        });
      }
    });
  }

  private loadLivrables(): void {
    this.livrableService.getLivrables().subscribe(
      data => {
        this.livrables = data;
      },
      error => {
        console.error('Erreur lors du chargement des livrables :', error);
      }
    );
  }

  private formatDateForInput(date: string | Date): string {
    return formatDate(date, 'yyyy-MM-dd', 'en-US');
  }

  submitForm(): void {
    if (this.equipeForm.invalid) {
      return;
    }
    const formData = this.equipeForm.value;

    if (this.isEditMode && this.currentId) {
      // Mise à jour
      this.equipeService.updateEquipe(this.currentId, formData).subscribe(updatedEquipe => {
        // Affecter le livrable si sélectionné
        if (formData.livrable_id) {
          this.equipeService.affecterLivrable(this.currentId!, formData.livrable_id).subscribe(() => {
            this.router.navigate(['/dashboard/list-equipe']);
          });
        } else {
          this.router.navigate(['/dashboard/list-equipe']);
        }
      });
    } else {
      // Création
      this.equipeService.createEquipe(formData).subscribe(newEquipe => {
        if (newEquipe.id && formData.livrable_id) {
          this.equipeService.affecterLivrable(newEquipe.id, formData.livrable_id).subscribe(() => {
            this.router.navigate(['/dashboard/list-equipe']);
          });
        } else {
          this.router.navigate(['/dashboard/list-equipe']);
        }
      });
    }
  }

  resetForm(): void {
    this.isEditMode = false;
    this.currentId = undefined;
    this.equipeForm.reset();
  }
}
